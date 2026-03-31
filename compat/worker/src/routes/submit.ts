import type { Env, Device } from '../types';
import { json, parseNaFeatures } from '../lib/http';
import { getJWTFromRequest, verifyJWT } from '../lib/auth';
import { validateSubmission } from '../lib/validate';

interface DeviceToken {
  token: string;
  device_id: string;
  system_uuid: string;
  revoked: number;
}

/** Authenticate via JWT cookie (browser) or device token (device). Returns author string or null. */
async function authenticate(request: Request, env: Env): Promise<{ author: string; source: 'github' | 'device' | 'dev'; deviceId?: string } | null> {
  // Try device token first: Authorization: Bearer device:<token>
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer device:')) {
    const deviceToken = authHeader.slice('Bearer device:'.length);

    // Check if it's a pre-approved dev token (god mode — no rate limits, any device)
    const devTokens = new Set((env.DEV_TOKENS ?? '').split(',').map(t => t.trim()).filter(Boolean));
    if (devTokens.has(deviceToken)) {
      return { author: 'dev', source: 'dev' };
    }

    const row = await env.DB.prepare(
      'SELECT token, device_id, system_uuid, revoked FROM device_tokens WHERE token = ?',
    ).bind(deviceToken).first<DeviceToken>();

    if (!row) return null;
    if (row.revoked) return null;

    // Update last_used
    await env.DB.prepare(
      `UPDATE device_tokens SET last_used = datetime('now') WHERE token = ?`,
    ).bind(deviceToken).run();

    // Author is "device:<uuid_prefix>" for traceability
    const uuidPrefix = row.system_uuid.slice(0, 8);
    return { author: `device:${uuidPrefix}`, source: 'device', deviceId: row.device_id };
  }

  // Try JWT cookie (browser flow)
  const jwt = getJWTFromRequest(request);
  if (jwt) {
    const payload = await verifyJWT(jwt, env.JWT_SECRET);
    if (payload) {
      return { author: payload.username, source: 'github' };
    }
  }

  return null;
}

export async function handleSubmit(request: Request, env: Env): Promise<Response> {
  // Authenticate (supports both browser JWT and device token)
  const auth = await authenticate(request, env);
  if (!auth) return json({ error: 'not_authenticated' }, 401);

  // Parse and validate body
  const contentType = request.headers.get('Content-Type') ?? 'missing';
  const rawBody = await request.text();
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    const preview = rawBody.length > 200 ? rawBody.slice(0, 200) + '...' : rawBody;
    return json({ error: 'invalid JSON body', content_type: contentType, body_preview: preview }, 400);
  }

  const result = validateSubmission(body);
  if (typeof result === 'string') return json({ error: result }, 400);

  const { device_id, build_date, results, notes } = result;

  // Resolve board path → device ID (system.board sends "odroidc5" not "hardkernel-odroid-c5")
  let resolvedDeviceId = device_id;
  let deviceRow = await env.DB.prepare('SELECT id, na_features FROM devices WHERE id = ?')
    .bind(device_id).first<Pick<Device, 'id' | 'na_features'>>();

  if (!deviceRow) {
    // Try board_device_map (exact or suffix match)
    const mapped = await env.DB.prepare(
      `SELECT device_id FROM board_device_map WHERE board_path = ? OR board_path LIKE ?`
    ).bind(device_id, `%/${device_id}`).first<{ device_id: string }>();
    if (mapped) {
      resolvedDeviceId = mapped.device_id;
      deviceRow = await env.DB.prepare('SELECT id, na_features FROM devices WHERE id = ?')
        .bind(resolvedDeviceId).first<Pick<Device, 'id' | 'na_features'>>();
    }
  }

  if (!deviceRow) return json({ error: 'device not found' }, 404);
  resolvedDeviceId = deviceRow.id;

  // If device token auth, enforce that submitted device_id matches the token's device_id
  // Dev tokens can submit for any device
  if (auth.source === 'device' && auth.deviceId && auth.deviceId !== resolvedDeviceId) {
    return json({ error: 'device_id does not match token' }, 403);
  }

  // Validate na constraints
  const naFeatures = new Set(parseNaFeatures(deviceRow.na_features));
  for (const [featureId, status] of Object.entries(results)) {
    if (status === 'na' && !naFeatures.has(featureId)) {
      return json({ error: `feature "${featureId}" is not N/A for this device` }, 400);
    }
  }

  // Rate limit: dev tokens skip all limits
  if (auth.source !== 'dev') {
    const rateResult = await env.DB.prepare(
      `SELECT COUNT(*) as cnt FROM test_results
       WHERE author = ? AND submitted_at >= datetime('now', '-1 hour')`,
    ).bind(auth.author).first<{ cnt: number }>();

    if (rateResult && rateResult.cnt >= 10) {
      return json({ error: 'rate_limit_exceeded', detail: 'max 10 submissions per hour' }, 429);
    }
  }

  // For device submissions: limit total rows per author (prevents DB bloat from compromised tokens)
  if (auth.source === 'device') {
    const authorTotal = await env.DB.prepare(
      'SELECT COUNT(*) as cnt FROM test_results WHERE author = ?',
    ).bind(auth.author).first<{ cnt: number }>();

    // 22 features × ~30 builds = 660 rows max per device lifetime — cap at 1000
    if (authorTotal && authorTotal.cnt >= 1000) {
      return json({ error: 'rate_limit_exceeded', detail: 'device submission lifetime limit reached' }, 429);
    }
  }

  // Upsert results
  const statements = Object.entries(results).map(([featureId, status]) =>
    env.DB.prepare(
      `INSERT INTO test_results (device_id, feature_id, build_date, author, status, notes)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(device_id, feature_id, build_date, author)
       DO UPDATE SET status = excluded.status, notes = excluded.notes, submitted_at = datetime('now')`,
    ).bind(resolvedDeviceId, featureId, build_date, auth.author, status, notes),
  );

  await env.DB.batch(statements);

  return json({ ok: true, inserted: Object.keys(results).length, author: auth.author });
}
