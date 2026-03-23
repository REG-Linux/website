import type { Env } from '../types';
import { json } from '../lib/http';

interface RegisterBody {
  device_id: string;
  arch: string;
  kernel: string;
  board_file_hash: string;
  system_uuid: string;
  reg_version: string;
}

function truncateIp(ip: string): string {
  if (ip.includes('.')) {
    // IPv4: zero out last octet
    const parts = ip.split('.');
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  } else if (ip.includes(':')) {
    // IPv6: keep first 3 groups (/48)
    const parts = ip.split(':');
    return parts.slice(0, 3).join(':') + '::';
  }
  return 'unknown';
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

export async function handleDeviceRegister(request: Request, env: Env): Promise<Response> {
  // Parse body
  let body: RegisterBody;
  try {
    body = await request.json() as RegisterBody;
  } catch {
    return json({ error: 'invalid JSON body' }, 400);
  }

  const { device_id, arch, board_file_hash, system_uuid, reg_version } = body;

  // Validate required fields
  if (!device_id || !system_uuid || !board_file_hash) {
    return json({ error: 'missing required fields: device_id, system_uuid, board_file_hash' }, 400);
  }

  // Strict input validation — only allow safe characters
  const SAFE_ID = /^[a-z0-9][a-z0-9._-]{1,99}$/;
  const SAFE_UUID = /^[a-f0-9-]{16,128}$/;
  const SAFE_HASH = /^[a-f0-9]{32,128}$/;
  const SAFE_VERSION = /^[a-zA-Z0-9._-]{0,64}$/;

  if (typeof device_id !== 'string' || !SAFE_ID.test(device_id)) {
    return json({ error: 'invalid device_id' }, 400);
  }

  if (typeof system_uuid !== 'string' || !SAFE_UUID.test(system_uuid)) {
    return json({ error: 'invalid system_uuid' }, 400);
  }

  if (typeof board_file_hash !== 'string' || !SAFE_HASH.test(board_file_hash)) {
    return json({ error: 'invalid board_file_hash' }, 400);
  }

  if (reg_version && !SAFE_VERSION.test(reg_version)) {
    return json({ error: 'invalid reg_version' }, 400);
  }

  // Check device exists in our database
  const device = await env.DB.prepare('SELECT id, arch FROM devices WHERE id = ?')
    .bind(device_id).first<{ id: string; arch: string | null }>();

  if (!device) {
    return json({ error: 'unknown device_id' }, 404);
  }

  // Check arch matches (if we have it on record)
  if (device.arch && arch) {
    const archMap: Record<string, string> = {
      'aarch64': 'aarch64', 'arm64': 'aarch64',
      'armv7l': 'armv7', 'armhf': 'armv7',
      'x86_64': 'x86_64', 'riscv64': 'riscv64',
    };
    const normalizedArch = archMap[arch] ?? arch;
    if (device.arch !== normalizedArch) {
      return json({ error: 'arch mismatch' }, 400);
    }
  }

  // Store truncated IP for rate limiting (GDPR: minimize personal data)
  // IPv4: keep first 3 octets (192.168.1.x → 192.168.1.0)
  // IPv6: keep first 48 bits (/48 prefix)
  const rawIp = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? 'unknown';
  const ip = truncateIp(rawIp);

  // --- Anti-abuse: layered rate limiting ---

  // Layer 1: max 3 registrations per IP per hour
  const ipRate = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM device_tokens
     WHERE ip_address = ? AND created_at >= datetime('now', '-1 hour')`,
  ).bind(ip).first<{ cnt: number }>();

  if (ipRate && ipRate.cnt >= 3) {
    return json({ error: 'rate_limit_exceeded', detail: 'max 3 registrations per IP per hour' }, 429);
  }

  // Layer 2: max 10 total registrations per IP (lifetime)
  // Prevents slow-drip abuse over days
  const ipLifetime = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM device_tokens WHERE ip_address = ?`,
  ).bind(ip).first<{ cnt: number }>();

  if (ipLifetime && ipLifetime.cnt >= 10) {
    return json({ error: 'rate_limit_exceeded', detail: 'max 10 registrations per IP' }, 429);
  }

  // Layer 3: global cap — max 500 total tokens
  // Prevents DB bloat. 186 devices × ~2-3 installs each = ~500 max realistic
  const globalCount = await env.DB.prepare(
    'SELECT COUNT(*) as cnt FROM device_tokens',
  ).first<{ cnt: number }>();

  if (globalCount && globalCount.cnt >= 500) {
    return json({ error: 'registration_closed', detail: 'max device registrations reached' }, 429);
  }

  // Layer 4: max 5 tokens per device_id
  // Prevents one device model from being spammed
  const deviceRate = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM device_tokens WHERE device_id = ?`,
  ).bind(device_id).first<{ cnt: number }>();

  if (deviceRate && deviceRate.cnt >= 5) {
    return json({ error: 'rate_limit_exceeded', detail: 'max 5 registrations per device model' }, 429);
  }

  // Check if this UUID is already registered
  const existing = await env.DB.prepare(
    'SELECT token, device_id, revoked FROM device_tokens WHERE system_uuid = ?',
  ).bind(system_uuid).first<{ token: string; device_id: string; revoked: number }>();

  if (existing) {
    if (existing.device_id !== device_id) {
      return json({ error: 'system_uuid already registered for a different device' }, 409);
    }
    if (existing.revoked) {
      return json({ error: 'device token has been revoked' }, 403);
    }
    // Return existing token (idempotent — doesn't count as new registration)
    await env.DB.prepare(
      `UPDATE device_tokens SET last_used = datetime('now'), reg_version = ? WHERE system_uuid = ?`,
    ).bind(reg_version ?? '', system_uuid).run();

    return json({ ok: true, token: existing.token, existing: true });
  }

  // Generate new token
  const token = generateToken();

  await env.DB.prepare(
    `INSERT INTO device_tokens (token, device_id, system_uuid, ip_address, reg_version)
     VALUES (?, ?, ?, ?, ?)`,
  ).bind(token, device_id, system_uuid, ip, reg_version ?? '').run();

  return json({ ok: true, token, existing: false });
}
