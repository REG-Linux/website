import type { Env, Device, Feature } from '../types';
import { json } from '../lib/http';
import { getJWTFromRequest, verifyJWT } from '../lib/auth';
import { readFile, commitFile, commitBinaryFile, dispatchWorkflow, listWorkflowRuns } from '../lib/github-api';

const OWNER = 'REG-Linux';
const REPO = 'website';
const OVERRIDES_PATH = '_data/device_overrides.yml';
const NOTES_PATH = '_data/device_notes.yml';
const VALID_CATEGORIES = ['boot', 'display', 'connectivity', 'system', 'controls', 'gpu'];

const PIPELINE_WORKFLOWS: Record<string, string> = {
  'sync-devices': 'sync-devices.yml',
  'deploy-site': 'pages.yml',
  'deploy-compat': 'compat-deploy.yml',
  'refresh-downloads': 'refresh-downloads.yml',
};

function isAdmin(username: string, env: Env): boolean {
  const admins = new Set((env.ADMIN_USERS ?? '').split(',').map(s => s.trim()).filter(Boolean));
  return admins.has(username);
}

/** Authenticate request and verify admin. Returns username or an error Response. */
async function requireAdmin(request: Request, env: Env): Promise<string | Response> {
  if (!env.GITHUB_REPO_TOKEN || !env.ADMIN_USERS) {
    return json({ error: 'admin not configured' }, 503);
  }

  const token = getJWTFromRequest(request);
  if (!token) return json({ error: 'not_authenticated' }, 401);

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) return json({ error: 'invalid_token' }, 401);

  if (!isAdmin(payload.username, env)) {
    return json({ error: 'forbidden' }, 403);
  }

  return payload.username;
}

// --- Simple YAML helpers (no external dependency) ---

/** Parse a simple YAML mapping file into a Record<string, Record<string, string>>. */
function parseOverridesYaml(content: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  let currentKey: string | null = null;

  for (const line of content.split('\n')) {
    // Skip blank lines and comments
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // Top-level key (no leading whitespace, ends with colon)
    const topMatch = line.match(/^([a-zA-Z0-9_-]+):\s*$/);
    if (topMatch) {
      currentKey = topMatch[1];
      result[currentKey] = result[currentKey] ?? {};
      continue;
    }

    // Indented key-value pair under current top-level key
    if (currentKey) {
      const kvMatch = line.match(/^\s+([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (kvMatch) {
        let value = kvMatch[2].trim();
        // Strip surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        result[currentKey][kvMatch[1]] = value;
      }
    }
  }

  return result;
}

/** Serialize overrides back to YAML. */
function serializeOverridesYaml(data: Record<string, Record<string, string>>): string {
  const lines: string[] = [];

  for (const [deviceId, fields] of Object.entries(data)) {
    const entries = Object.entries(fields);
    if (entries.length === 0) continue;
    lines.push(`${deviceId}:`);
    for (const [k, v] of entries) {
      // Strip newlines from values to prevent YAML injection
      const clean = v.replace(/[\r\n]+/g, ' ').trim();
      // Quote values that contain special YAML chars
      const needsQuote = /[:#{}[\],&*?|>!%@`]/.test(clean) || clean === '' || clean !== clean.trim();
      const quoted = needsQuote ? `"${clean.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : clean;
      lines.push(`  ${k}: ${quoted}`);
    }
  }

  // End with newline
  return lines.length > 0 ? lines.join('\n') + '\n' : '';
}

// --- Handlers ---

export async function handleAdminDevices(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const { results } = await env.DB.prepare('SELECT * FROM devices ORDER BY brand, title').all<Device>();
  return json({ devices: results });
}

export async function handleAdminDevice(request: Request, env: Env, deviceId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const device = await env.DB.prepare('SELECT * FROM devices WHERE id = ?')
    .bind(deviceId).first<Device>();

  if (!device) return json({ error: 'device not found' }, 404);

  // Fetch overrides from GitHub
  let overrides: Record<string, string> = {};
  let sha = '';

  try {
    const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH);
    sha = file.sha;
    const allOverrides = parseOverridesYaml(file.content);
    overrides = allOverrides[deviceId] ?? {};
  } catch (err) {
    // File may not exist yet — that's fine, return empty overrides
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes('404')) {
      throw err;
    }
  }

  return json({ device, overrides, sha });
}

export async function handleAdminDeviceUpdate(request: Request, env: Env, deviceId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  // Parse body
  let body: { fields: Record<string, string>; sha: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  if (!body.fields || typeof body.fields !== 'object') {
    return json({ error: 'missing fields object' }, 400);
  }

  if (typeof body.sha !== 'string') {
    return json({ error: 'missing sha' }, 400);
  }

  // Verify device exists
  const device = await env.DB.prepare('SELECT id FROM devices WHERE id = ?')
    .bind(deviceId).first<{ id: string }>();

  if (!device) return json({ error: 'device not found' }, 404);

  // Retry loop for conflict resolution (up to 3 attempts)
  let currentSha = body.sha;
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    // Read current file (or start empty if 404)
    let currentContent = '';
    let fileSha = currentSha;
    let fileExists = true;

    try {
      const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH);
      currentContent = file.content;
      fileSha = file.sha;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('404')) {
        fileExists = false; // File doesn't exist — will create
        fileSha = ''; // No SHA for new file
      } else {
        throw err;
      }
    }

    // On first attempt, verify SHA matches what the client sent (optimistic lock)
    if (attempt === 0 && fileSha && body.sha && fileSha !== body.sha) {
      // Stale SHA on first attempt — re-read and proceed (counts as retry)
    }

    // Parse, merge, serialize
    const allOverrides = currentContent ? parseOverridesYaml(currentContent) : {};
    allOverrides[deviceId] = { ...(allOverrides[deviceId] ?? {}), ...body.fields };

    // Remove empty-string values (treat as "delete this override")
    for (const [k, v] of Object.entries(allOverrides[deviceId])) {
      if (v === '') delete allOverrides[deviceId][k];
    }

    // Remove device entry entirely if no fields remain
    if (Object.keys(allOverrides[deviceId]).length === 0) {
      delete allOverrides[deviceId];
    }

    const newContent = serializeOverridesYaml(allOverrides);

    try {
      // For new files, don't pass SHA
      const commitSha = fileExists && fileSha
        ? await commitFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH, newContent, fileSha, `admin: update ${deviceId}`)
        : await commitFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH, newContent, '', `admin: update ${deviceId}`);

      return json({ ok: true, sha: commitSha });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === 'conflict' && attempt < maxRetries - 1) {
        // Re-fetch and retry
        continue;
      }
      throw err;
    }
  }

  return json({ error: 'conflict after retries' }, 409);
}

export async function handleAdminRun(request: Request, env: Env, pipeline: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const workflowFile = PIPELINE_WORKFLOWS[pipeline];
  if (!workflowFile) {
    return json({ error: 'invalid pipeline', valid: Object.keys(PIPELINE_WORKFLOWS) }, 400);
  }

  await dispatchWorkflow(env.GITHUB_REPO_TOKEN!, OWNER, REPO, workflowFile);

  return json({ ok: true, pipeline });
}

export async function handleAdminRuns(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const runs = await listWorkflowRuns(env.GITHUB_REPO_TOKEN!, OWNER, REPO, 10);

  return json({ runs });
}

// --- Stats endpoint ---

export async function handleAdminStats(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  // Run all queries in parallel
  const [
    totalDevicesR,
    testedDevicesR,
    totalResultsR,
    recent24hR,
    recent7dR,
    coverageByFeatureR,
    coverageByTypeR,
    topTestersR,
    recentSubmissionsR,
    staleDevicesR,
    featuresR,
  ] = await Promise.all([
    // Total devices
    env.DB.prepare('SELECT COUNT(*) AS cnt FROM devices').first<{ cnt: number }>(),

    // Devices with at least one test result
    env.DB.prepare('SELECT COUNT(DISTINCT device_id) AS cnt FROM test_results').first<{ cnt: number }>(),

    // Total test result rows
    env.DB.prepare('SELECT COUNT(*) AS cnt FROM test_results').first<{ cnt: number }>(),

    // Submissions in last 24h (distinct device+author+build_date combos)
    env.DB.prepare(
      `SELECT COUNT(DISTINCT device_id || '|' || author || '|' || build_date) AS cnt
       FROM test_results WHERE submitted_at > datetime('now', '-1 day')`
    ).first<{ cnt: number }>(),

    // Submissions in last 7 days
    env.DB.prepare(
      `SELECT COUNT(DISTINCT device_id || '|' || author || '|' || build_date) AS cnt
       FROM test_results WHERE submitted_at > datetime('now', '-7 days')`
    ).first<{ cnt: number }>(),

    // Coverage by feature: how many devices have been tested per feature
    env.DB.prepare(
      `SELECT feature_id, COUNT(DISTINCT device_id) AS tested
       FROM test_results WHERE status != 'untested'
       GROUP BY feature_id`
    ).all<{ feature_id: string; tested: number }>(),

    // Coverage by type
    env.DB.prepare(
      `SELECT d.type, COUNT(DISTINCT d.id) AS total,
              COUNT(DISTINCT tr.device_id) AS tested
       FROM devices d
       LEFT JOIN test_results tr ON tr.device_id = d.id
       GROUP BY d.type`
    ).all<{ type: string; total: number; tested: number }>(),

    // Top testers (top 10)
    env.DB.prepare(
      `SELECT author, COUNT(DISTINCT device_id) AS devices, COUNT(*) AS results
       FROM test_results
       GROUP BY author ORDER BY devices DESC LIMIT 10`
    ).all<{ author: string; devices: number; results: number }>(),

    // Recent submissions (last 20 distinct submission batches)
    env.DB.prepare(
      `SELECT tr.device_id, d.title AS device_title, tr.author, tr.build_date,
              MAX(tr.submitted_at) AS submitted_at, COUNT(*) AS feature_count
       FROM test_results tr
       JOIN devices d ON d.id = tr.device_id
       GROUP BY tr.device_id, tr.author, tr.build_date
       ORDER BY submitted_at DESC LIMIT 20`
    ).all<{
      device_id: string; device_title: string; author: string;
      build_date: string; submitted_at: string; feature_count: number;
    }>(),

    // Stale devices: tested but last test > 90 days ago
    env.DB.prepare(
      `SELECT d.id, d.title, d.brand, d.type, MAX(tr.build_date) AS last_tested
       FROM devices d
       JOIN test_results tr ON tr.device_id = d.id
       GROUP BY d.id
       HAVING MAX(tr.build_date) < date('now', '-90 days')
       ORDER BY last_tested ASC LIMIT 30`
    ).all<{ id: string; title: string; brand: string; type: string; last_tested: string }>(),

    // All features (for mapping)
    env.DB.prepare('SELECT * FROM features ORDER BY sort_order').all<Feature>(),
  ]);

  const totalDevices = totalDevicesR?.cnt ?? 0;
  const testedDevices = testedDevicesR?.cnt ?? 0;
  const features = featuresR.results;

  // Build coverage_by_feature with labels
  const featureTestedMap = new Map(coverageByFeatureR.results.map(r => [r.feature_id, r.tested]));
  const coverageByFeature = features.map(f => ({
    id: f.id,
    label: f.label,
    category: f.category,
    tested: featureTestedMap.get(f.id) ?? 0,
    total: totalDevices,
  }));

  const coverageByType = coverageByTypeR.results.map(r => ({
    type: r.type,
    total: r.total,
    tested: r.tested,
  }));

  return json({
    total_devices: totalDevices,
    tested_devices: testedDevices,
    untested_devices: totalDevices - testedDevices,
    total_results: totalResultsR?.cnt ?? 0,
    recent_24h: recent24hR?.cnt ?? 0,
    recent_7d: recent7dR?.cnt ?? 0,
    coverage_by_feature: coverageByFeature,
    coverage_by_type: coverageByType,
    top_testers: topTestersR.results,
    recent_submissions: recentSubmissionsR.results,
    stale_devices: staleDevicesR.results,
  });
}

// --- Inline status update (no SHA required from client) ---

export async function handleAdminDeviceStatusPatch(request: Request, env: Env, deviceId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { status: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const validStatuses = ['released', 'testing', 'wip', 'todo'];
  if (!body.status || !validStatuses.includes(body.status)) {
    return json({ error: 'invalid status', valid: validStatuses }, 400);
  }

  // Verify device exists
  const device = await env.DB.prepare('SELECT id FROM devices WHERE id = ?')
    .bind(deviceId).first<{ id: string }>();
  if (!device) return json({ error: 'device not found' }, 404);

  // Retry loop — read/modify/write with conflict resolution
  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    let currentContent = '';
    let fileSha = '';

    try {
      const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH);
      currentContent = file.content;
      fileSha = file.sha;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('404')) throw err;
      // File doesn't exist yet — will create
    }

    const allOverrides = currentContent ? parseOverridesYaml(currentContent) : {};
    allOverrides[deviceId] = { ...(allOverrides[deviceId] ?? {}), status: body.status };

    const newContent = serializeOverridesYaml(allOverrides);

    try {
      const commitSha = await commitFile(
        env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH,
        newContent, fileSha, `admin: set ${deviceId} status to ${body.status}`
      );
      return json({ ok: true, status: body.status, sha: commitSha });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === 'conflict' && attempt < maxRetries - 1) continue;
      throw err;
    }
  }

  return json({ error: 'conflict after retries' }, 409);
}

// --- Test result moderation ---

export async function handleAdminResults(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  const device = url.searchParams.get('device');
  const author = url.searchParams.get('author');
  const limit = Math.max(1, Math.min(parseInt(url.searchParams.get('limit') ?? '50') || 50, 200));
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') ?? '0') || 0);

  let where = '1=1';
  const binds: string[] = [];
  if (device) { where += ' AND tr.device_id = ?'; binds.push(device); }
  if (author) { where += ' AND tr.author = ?'; binds.push(author); }

  const query = `
    SELECT tr.id, tr.device_id, d.title AS device_title, tr.feature_id, f.label AS feature_label,
           tr.build_date, tr.author, tr.status, tr.notes, tr.submitted_at
    FROM test_results tr
    JOIN devices d ON d.id = tr.device_id
    JOIN features f ON f.id = tr.feature_id
    WHERE ${where}
    ORDER BY tr.submitted_at DESC
    LIMIT ? OFFSET ?
  `;
  binds.push(String(limit), String(offset));

  const stmt = env.DB.prepare(query);
  const { results } = await stmt.bind(...binds).all();

  // Total count for pagination
  const countQuery = `SELECT COUNT(*) AS cnt FROM test_results tr WHERE ${where}`;
  const countBinds = binds.slice(0, -2);
  const countStmt = env.DB.prepare(countQuery);
  const total = countBinds.length > 0
    ? await countStmt.bind(...countBinds).first<{ cnt: number }>()
    : await countStmt.first<{ cnt: number }>();

  return json({ results, total: total?.cnt ?? 0, limit, offset });
}

export async function handleAdminResultDelete(request: Request, env: Env, resultId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const id = parseInt(resultId);
  if (isNaN(id)) return json({ error: 'invalid result id' }, 400);

  const { meta } = await env.DB.prepare('DELETE FROM test_results WHERE id = ?').bind(id).run();
  return json({ ok: true, deleted: meta.changes ?? 0 });
}

export async function handleAdminResultsBatchDelete(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { ids: number[] };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  if (!Array.isArray(body.ids) || body.ids.length === 0 || body.ids.length > 500) {
    return json({ error: 'ids must be an array of 1-500 integers' }, 400);
  }

  const placeholders = body.ids.map(() => '?').join(',');
  const { meta } = await env.DB.prepare(`DELETE FROM test_results WHERE id IN (${placeholders})`)
    .bind(...body.ids).run();

  return json({ ok: true, deleted: meta.changes ?? 0 });
}

// --- Device token management ---

export async function handleAdminTokens(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const { results } = await env.DB.prepare(`
    SELECT dt.token, dt.device_id, d.title AS device_title, dt.system_uuid,
           dt.ip_address, dt.reg_version, dt.created_at, dt.last_used, dt.revoked,
           (SELECT COUNT(*) FROM test_results tr WHERE tr.author = 'device:' || substr(dt.system_uuid, 1, 8)) AS result_count
    FROM device_tokens dt
    LEFT JOIN devices d ON d.id = dt.device_id
    ORDER BY dt.created_at DESC
  `).all();

  return json({ tokens: results });
}

export async function handleAdminTokenRevoke(request: Request, env: Env, token: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  if (!/^[a-f0-9]{64}$/.test(token)) {
    return json({ error: 'invalid token format' }, 400);
  }

  const { meta } = await env.DB.prepare('UPDATE device_tokens SET revoked = 1 WHERE token = ?')
    .bind(token).run();

  if ((meta.changes ?? 0) === 0) return json({ error: 'token not found' }, 404);
  return json({ ok: true });
}

// --- Bulk status update ---

export async function handleAdminBulkStatus(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { device_ids: string[]; status: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const validStatuses = ['released', 'testing', 'wip', 'todo'];
  if (!body.status || !validStatuses.includes(body.status)) {
    return json({ error: 'invalid status', valid: validStatuses }, 400);
  }
  if (!Array.isArray(body.device_ids) || body.device_ids.length === 0 || body.device_ids.length > 100) {
    return json({ error: 'device_ids must be an array of 1-100 IDs' }, 400);
  }

  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    let currentContent = '';
    let fileSha = '';

    try {
      const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH);
      currentContent = file.content;
      fileSha = file.sha;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('404')) throw err;
    }

    const allOverrides = currentContent ? parseOverridesYaml(currentContent) : {};
    for (const id of body.device_ids) {
      allOverrides[id] = { ...(allOverrides[id] ?? {}), status: body.status };
    }

    const newContent = serializeOverridesYaml(allOverrides);
    const msg = `admin: bulk set ${body.device_ids.length} devices to ${body.status}`;

    try {
      await commitFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH, newContent, fileSha, msg);
      return json({ ok: true, updated: body.device_ids.length });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg === 'conflict' && attempt < maxRetries - 1) continue;
      throw err;
    }
  }

  return json({ error: 'conflict after retries' }, 409);
}

// --- Device notes (YAML with multi-line values + lists) ---

interface DeviceNotes {
  meta_description?: string;
  summary?: string;
  best_for?: string;
  field_notes?: string[];
  known_limits?: string[];
  compatibility_checks?: string[];
}

function parseNotesYaml(content: string): Record<string, DeviceNotes> {
  const result: Record<string, DeviceNotes> = {};
  let currentDevice: string | null = null;
  let currentField: string | null = null;
  let currentValue = '';
  let currentList: string[] | null = null;

  const LIST_FIELDS = new Set(['field_notes', 'known_limits', 'compatibility_checks']);

  function flush() {
    if (currentDevice && currentField) {
      const notes = result[currentDevice] ??= {};
      if (currentList !== null) {
        (notes as Record<string, unknown>)[currentField] = currentList;
      } else {
        (notes as Record<string, unknown>)[currentField] = currentValue.trim();
      }
    }
    currentField = null;
    currentValue = '';
    currentList = null;
  }

  for (const line of content.split('\n')) {
    if (line.trim() === '---') continue;

    const deviceMatch = line.match(/^([a-zA-Z0-9_-]+):\s*$/);
    if (deviceMatch) {
      flush();
      currentDevice = deviceMatch[1];
      result[currentDevice] ??= {};
      continue;
    }

    if (!currentDevice) continue;

    const fieldMatch = line.match(/^  ([a-zA-Z_]+):\s*(.*)$/);
    if (fieldMatch) {
      flush();
      currentField = fieldMatch[1];
      let rest = fieldMatch[2].trim();
      // Strip surrounding quotes
      if ((rest.startsWith('"') && rest.endsWith('"')) || (rest.startsWith("'") && rest.endsWith("'"))) {
        rest = rest.slice(1, -1);
      }

      if (LIST_FIELDS.has(currentField)) {
        currentList = [];
        if (rest && !rest.startsWith('-')) {
          currentList = null;
          currentValue = rest;
        }
      } else {
        currentValue = rest;
      }
      continue;
    }

    if (currentList !== null) {
      const listMatch = line.match(/^  - (.+)$/);
      if (listMatch) {
        currentList.push(listMatch[1].trim());
        continue;
      }
    }

    if (currentField && currentList === null && /^    /.test(line)) {
      currentValue += ' ' + line.trim();
      continue;
    }
  }

  flush();
  return result;
}

function serializeNotesYaml(data: Record<string, DeviceNotes>): string {
  const lines: string[] = ['---'];
  const LIST_FIELDS = ['field_notes', 'known_limits', 'compatibility_checks'];
  const SCALAR_FIELDS = ['meta_description', 'summary', 'best_for'];

  for (const [deviceId, notes] of Object.entries(data)) {
    if (!notes || Object.keys(notes).length === 0) continue;
    lines.push(`${deviceId}:`);

    for (const key of SCALAR_FIELDS) {
      const val = (notes as Record<string, unknown>)[key] as string | undefined;
      if (val) {
        if (val.length > 70) {
          const words = val.split(' ');
          let current = `  ${key}: `;
          const chunks: string[] = [];
          for (const w of words) {
            if (current.length + w.length + 1 > 78 && chunks.length > 0) {
              chunks.push(current);
              current = '    ' + w;
            } else {
              current += (current.endsWith(' ') || current.endsWith(':') ? '' : ' ') + w;
            }
          }
          chunks.push(current);
          lines.push(...chunks);
        } else {
          lines.push(`  ${key}: ${val}`);
        }
      }
    }

    for (const key of LIST_FIELDS) {
      const list = (notes as Record<string, unknown>)[key] as string[] | undefined;
      if (list && list.length > 0) {
        lines.push(`  ${key}:`);
        for (const item of list) {
          lines.push(`  - ${item}`);
        }
      }
    }
  }

  return lines.join('\n') + '\n';
}

export async function handleAdminDeviceNotes(request: Request, env: Env, deviceId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let notes: DeviceNotes = {};
  let sha = '';

  try {
    const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, NOTES_PATH);
    sha = file.sha;
    const all = parseNotesYaml(file.content);
    notes = all[deviceId] ?? {};
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes('404')) throw err;
  }

  return json({ notes, sha });
}

export async function handleAdminDeviceNotesUpdate(request: Request, env: Env, deviceId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { notes: DeviceNotes; sha: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  if (!body.notes || typeof body.notes !== 'object') {
    return json({ error: 'missing notes object' }, 400);
  }

  const device = await env.DB.prepare('SELECT id FROM devices WHERE id = ?')
    .bind(deviceId).first<{ id: string }>();
  if (!device) return json({ error: 'device not found' }, 404);

  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    let currentContent = '';
    let fileSha = '';

    try {
      const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, NOTES_PATH);
      currentContent = file.content;
      fileSha = file.sha;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('404')) throw err;
    }

    const allNotes = currentContent ? parseNotesYaml(currentContent) : {};
    const hasContent = Object.values(body.notes).some(v =>
      v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0)
    );
    if (hasContent) {
      allNotes[deviceId] = body.notes;
    } else {
      delete allNotes[deviceId];
    }

    const newContent = serializeNotesYaml(allNotes);

    try {
      const commitSha = await commitFile(
        env.GITHUB_REPO_TOKEN!, OWNER, REPO, NOTES_PATH,
        newContent, fileSha, `admin: update notes for ${deviceId}`
      );
      return json({ ok: true, sha: commitSha });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg === 'conflict' && attempt < maxRetries - 1) continue;
      throw err;
    }
  }

  return json({ error: 'conflict after retries' }, 409);
}

// --- Feature management ---

export async function handleAdminFeatures(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const { results } = await env.DB.prepare('SELECT * FROM features ORDER BY sort_order').all<Feature>();
  return json({ features: results });
}

export async function handleAdminFeatureCreate(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { id: string; label: string; category: string; sort_order: number };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  if (!body.id || !/^[a-z_]+$/.test(body.id)) {
    return json({ error: 'id must be lowercase letters and underscores' }, 400);
  }
  if (!body.label || body.label.length > 50) {
    return json({ error: 'label required (max 50 chars)' }, 400);
  }
  if (!VALID_CATEGORIES.includes(body.category)) {
    return json({ error: 'invalid category', valid: VALID_CATEGORIES }, 400);
  }
  if (typeof body.sort_order !== 'number') {
    return json({ error: 'sort_order must be a number' }, 400);
  }

  try {
    await env.DB.prepare('INSERT INTO features (id, label, category, sort_order) VALUES (?, ?, ?, ?)')
      .bind(body.id, body.label, body.category, body.sort_order).run();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('UNIQUE') || msg.includes('PRIMARY')) {
      return json({ error: 'feature id already exists' }, 409);
    }
    throw err;
  }

  return json({ ok: true, feature: body });
}

export async function handleAdminFeatureUpdate(request: Request, env: Env, featureId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { label?: string; category?: string; sort_order?: number };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const sets: string[] = [];
  const binds: (string | number)[] = [];

  if (body.label !== undefined) {
    if (!body.label || body.label.length > 50) return json({ error: 'label required (max 50 chars)' }, 400);
    sets.push('label = ?'); binds.push(body.label);
  }
  if (body.category !== undefined) {
    if (!VALID_CATEGORIES.includes(body.category)) {
      return json({ error: 'invalid category', valid: VALID_CATEGORIES }, 400);
    }
    sets.push('category = ?'); binds.push(body.category);
  }
  if (body.sort_order !== undefined) {
    sets.push('sort_order = ?'); binds.push(body.sort_order);
  }

  if (sets.length === 0) return json({ error: 'no fields to update' }, 400);

  binds.push(featureId);
  const { meta } = await env.DB.prepare(`UPDATE features SET ${sets.join(', ')} WHERE id = ?`)
    .bind(...binds).run();

  if ((meta.changes ?? 0) === 0) return json({ error: 'feature not found' }, 404);
  return json({ ok: true });
}

export async function handleAdminFeatureDelete(request: Request, env: Env, featureId: string): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const count = await env.DB.prepare('SELECT COUNT(*) AS cnt FROM test_results WHERE feature_id = ?')
    .bind(featureId).first<{ cnt: number }>();

  if (count && count.cnt > 0) {
    return json({ error: `Cannot delete: ${count.cnt} test results reference this feature. Delete results first.` }, 409);
  }

  const { meta } = await env.DB.prepare('DELETE FROM features WHERE id = ?').bind(featureId).run();
  if ((meta.changes ?? 0) === 0) return json({ error: 'feature not found' }, 404);
  return json({ ok: true });
}

// --- SoC list (for device creation dropdown) ---

export async function handleAdminSocs(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  const { results } = await env.DB.prepare(`
    SELECT DISTINCT soc_slug, soc_name, cpu_arch, cpu_model, cpu_cores, cpu_clock,
           gpu_model, gpu_driver, gpu_api, kernel, arch
    FROM devices
    WHERE soc_slug IS NOT NULL
    ORDER BY soc_name
  `).all();

  return json({ socs: results });
}

// --- Manual device creation ---

export async function handleAdminDeviceCreate(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: {
    id: string; title: string; brand: string; type: string;
    soc_slug?: string; arch?: string;
  };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  // Validate required fields
  if (!body.id || !/^[a-z0-9-]+$/.test(body.id)) {
    return json({ error: 'id must be lowercase alphanumeric with hyphens' }, 400);
  }
  if (!body.title || body.title.length > 100) {
    return json({ error: 'title required (max 100 chars)' }, 400);
  }
  if (!body.brand || body.brand.length > 50) {
    return json({ error: 'brand required (max 50 chars)' }, 400);
  }
  const validTypes = ['handheld', 'sbc', 'tvbox', 'console', 'pc'];
  if (!body.type || !validTypes.includes(body.type)) {
    return json({ error: 'invalid type', valid: validTypes }, 400);
  }

  // Check device doesn't already exist
  const existing = await env.DB.prepare('SELECT id FROM devices WHERE id = ?')
    .bind(body.id).first<{ id: string }>();
  if (existing) {
    return json({ error: 'device id already exists' }, 409);
  }

  // If SoC provided, look up its details for auto-fill
  let socData: Record<string, string | null> = {
    soc_slug: null, soc_name: null, cpu_arch: null, cpu_model: null,
    cpu_cores: null, cpu_clock: null, gpu_model: null, gpu_driver: null,
    gpu_api: null, kernel: null, arch: null,
  };

  if (body.soc_slug) {
    const soc = await env.DB.prepare(`
      SELECT DISTINCT soc_slug, soc_name, cpu_arch, cpu_model, cpu_cores, cpu_clock,
             gpu_model, gpu_driver, gpu_api, kernel, arch
      FROM devices WHERE soc_slug = ? LIMIT 1
    `).bind(body.soc_slug).first();

    if (soc) {
      socData = soc as Record<string, string | null>;
    } else {
      return json({ error: `SoC "${body.soc_slug}" not found. Select from the dropdown.` }, 400);
    }
  }

  // Override arch if explicitly provided (for edge cases)
  const arch = body.arch || socData.arch;

  // Determine NA features based on type
  const NA_BY_TYPE: Record<string, string[]> = {
    sbc: ['battery', 'analog_sticks', 'buttons', 'suspend', 'rumble'],
    handheld: ['ethernet'],
    console: ['analog_sticks', 'ethernet', 'battery'],
    pc: ['battery', 'buttons', 'analog_sticks'],
    tvbox: ['battery', 'analog_sticks', 'buttons', 'suspend', 'rumble'],
  };
  const naFeatures = JSON.stringify(NA_BY_TYPE[body.type] ?? []);

  // Insert into D1
  await env.DB.prepare(`
    INSERT INTO devices (id, title, brand, type, soc_slug, soc_name, cpu_arch, cpu_model,
      cpu_cores, cpu_clock, gpu_model, gpu_driver, gpu_api, kernel, arch, na_features, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'todo')
  `).bind(
    body.id, body.title, body.brand, body.type,
    socData.soc_slug, socData.soc_name, socData.cpu_arch, socData.cpu_model,
    socData.cpu_cores, socData.cpu_clock, socData.gpu_model, socData.gpu_driver,
    socData.gpu_api, socData.kernel, arch, naFeatures,
  ).run();

  // Also persist as override so it survives re-seeding
  const maxRetries = 3;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    let currentContent = '';
    let fileSha = '';
    try {
      const file = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH);
      currentContent = file.content;
      fileSha = file.sha;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('404')) throw err;
    }

    const allOverrides = currentContent ? parseOverridesYaml(currentContent) : {};
    allOverrides[body.id] = {
      title: body.title,
      brand: body.brand,
      status: 'todo',
      _manual: 'true', // marker for manually-created devices
    };

    const newContent = serializeOverridesYaml(allOverrides);
    try {
      await commitFile(
        env.GITHUB_REPO_TOKEN!, OWNER, REPO, OVERRIDES_PATH,
        newContent, fileSha, `admin: create device ${body.id}`
      );
      break;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg === 'conflict' && attempt < maxRetries - 1) continue;
      // Don't fail the whole request — D1 insert already succeeded
      console.error('Failed to commit override for new device:', msg);
      break;
    }
  }

  return json({ ok: true, id: body.id });
}

// --- Image upload ---

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB base64 (~1.5MB original)
const IMAGE_PATH_PREFIX = 'assets/images/';

export async function handleAdminUploadImage(request: Request, env: Env): Promise<Response> {
  const auth = await requireAdmin(request, env);
  if (auth instanceof Response) return auth;

  let body: { device_id: string; image_data: string; filename?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  if (!body.device_id || !/^[a-z0-9-]+$/.test(body.device_id)) {
    return json({ error: 'invalid device_id' }, 400);
  }

  if (!body.image_data || typeof body.image_data !== 'string') {
    return json({ error: 'missing image_data (base64)' }, 400);
  }

  // Strip data URI prefix if present
  let base64 = body.image_data;
  const dataUriMatch = base64.match(/^data:[^;]+;base64,(.+)$/);
  if (dataUriMatch) {
    base64 = dataUriMatch[1];
  }

  // Validate base64 and size
  if (!/^[A-Za-z0-9+/]+=*$/.test(base64.replace(/\s/g, ''))) {
    return json({ error: 'invalid base64 data' }, 400);
  }
  if (base64.length > MAX_IMAGE_SIZE) {
    return json({ error: 'image too large (max ~1.5MB)' }, 400);
  }

  const ext = body.filename?.match(/\.(webp|png|jpg|jpeg)$/i)?.[1]?.toLowerCase() ?? 'webp';
  const filePath = `${IMAGE_PATH_PREFIX}${body.device_id}.${ext}`;

  // Check if file already exists (to get SHA for update)
  let existingSha = '';
  try {
    const existing = await readFile(env.GITHUB_REPO_TOKEN!, OWNER, REPO, filePath);
    existingSha = existing.sha;
  } catch {
    // File doesn't exist — that's fine
  }

  const commitSha = await commitBinaryFile(
    env.GITHUB_REPO_TOKEN!, OWNER, REPO, filePath,
    base64.replace(/\s/g, ''), existingSha,
    `admin: upload image for ${body.device_id}`
  );

  const imageUrl = `/assets/images/${body.device_id}.${ext}`;

  return json({ ok: true, image_url: imageUrl, sha: commitSha });
}
