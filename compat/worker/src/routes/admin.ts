import type { Env, Device } from '../types';
import { json } from '../lib/http';
import { getJWTFromRequest, verifyJWT } from '../lib/auth';
import { readFile, commitFile, dispatchWorkflow, listWorkflowRuns } from '../lib/github-api';

const OWNER = 'REG-Linux';
const REPO = 'website';
const OVERRIDES_PATH = '_data/device_overrides.yml';

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
      // Quote values that contain special YAML chars
      const needsQuote = /[:#{}[\],&*?|>!%@`]/.test(v) || v === '' || v !== v.trim();
      const quoted = needsQuote ? `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : v;
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
        fileExists = true; // Will create new file
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
