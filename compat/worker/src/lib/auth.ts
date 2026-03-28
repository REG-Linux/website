import type { JWTPayload } from '../types';

function base64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(s: string): Uint8Array {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - (s.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function hmacSign(data: string, secret: string): Promise<string> {
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return base64url(sig);
}

// --- State token (CSRF for OAuth) ---

export async function signState(secret: string): Promise<string> {
  const nonce = base64url(crypto.getRandomValues(new Uint8Array(16)).buffer);
  const sig = await hmacSign(nonce, secret);
  return `${nonce}.${sig}`;
}

export async function verifyState(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf('.');
  if (dot < 0) return false;
  const nonce = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  // Constant-time comparison via crypto.subtle.verify
  const key = await hmacKey(secret);
  const sigBytes = base64urlDecode(sig);
  const dataBytes = new TextEncoder().encode(nonce);
  return crypto.subtle.verify('HMAC', key, sigBytes, dataBytes);
}

// --- JWT ---

export async function issueJWT(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  secret: string,
  ttlSeconds = 7 * 24 * 3600,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = { ...payload, iat: now, exp: now + ttlSeconds };

  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).buffer as ArrayBuffer);
  const body = base64url(new TextEncoder().encode(JSON.stringify(fullPayload)).buffer as ArrayBuffer);
  const sig = await hmacSign(`${header}.${body}`, secret);

  return `${header}.${body}.${sig}`;
}

export async function verifyJWT(token: string, secret: string): Promise<JWTPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, sig] = parts;
  // Constant-time comparison via crypto.subtle.verify
  const key = await hmacKey(secret);
  const sigBytes = base64urlDecode(sig);
  const dataBytes = new TextEncoder().encode(`${header}.${body}`);
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, dataBytes);
  if (!valid) return null;

  try {
    const payload: JWTPayload = JSON.parse(new TextDecoder().decode(base64urlDecode(body)));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

// --- Cookie helpers ---

export function parseCookies(header: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  for (const pair of header.split(';')) {
    const eq = pair.indexOf('=');
    if (eq < 0) continue;
    cookies[pair.slice(0, eq).trim()] = pair.slice(eq + 1).trim();
  }
  return cookies;
}

export function getJWTFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  const cookies = parseCookies(cookieHeader);
  return cookies['reg_auth'] || null;
}

export function setCookie(name: string, value: string, maxAge: number): string {
  return `${name}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=${maxAge}`;
}
