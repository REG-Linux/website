import { describe, it, expect } from 'vitest';
import { signState, verifyState, issueJWT, verifyJWT, parseCookies, getJWTFromRequest, setCookie } from '../lib/auth';

const TEST_SECRET = 'test-secret-key-for-vitest-32bytes!';

describe('signState / verifyState', () => {
  it('produces a nonce.signature format', async () => {
    const state = await signState(TEST_SECRET);
    expect(state).toContain('.');
    const parts = state.split('.');
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBeGreaterThan(0);
    expect(parts[1].length).toBeGreaterThan(0);
  });

  it('verifies a valid state token', async () => {
    const state = await signState(TEST_SECRET);
    const valid = await verifyState(state, TEST_SECRET);
    expect(valid).toBe(true);
  });

  it('rejects a tampered state token', async () => {
    const state = await signState(TEST_SECRET);
    const tampered = 'AAAA' + state.slice(4);
    const valid = await verifyState(tampered, TEST_SECRET);
    expect(valid).toBe(false);
  });

  it('rejects a state with wrong secret', async () => {
    const state = await signState(TEST_SECRET);
    const valid = await verifyState(state, 'wrong-secret');
    expect(valid).toBe(false);
  });

  it('rejects a state with no dot separator', async () => {
    const valid = await verifyState('nodothere', TEST_SECRET);
    expect(valid).toBe(false);
  });

  it('rejects an empty string', async () => {
    const valid = await verifyState('', TEST_SECRET);
    expect(valid).toBe(false);
  });

  it('produces unique tokens each call', async () => {
    const a = await signState(TEST_SECRET);
    const b = await signState(TEST_SECRET);
    expect(a).not.toBe(b);
  });
});

describe('issueJWT / verifyJWT', () => {
  const payload = { sub: 'github:testuser', username: 'testuser', avatar: 'https://example.com/avatar.png' };

  it('produces a 3-part JWT', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET);
    const parts = jwt.split('.');
    expect(parts.length).toBe(3);
  });

  it('round-trips: verify returns the payload', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET, 3600);
    const result = await verifyJWT(jwt, TEST_SECRET);
    expect(result).not.toBeNull();
    expect(result!.sub).toBe('github:testuser');
    expect(result!.username).toBe('testuser');
    expect(result!.avatar).toBe('https://example.com/avatar.png');
    expect(result!.iat).toBeTypeOf('number');
    expect(result!.exp).toBeTypeOf('number');
    expect(result!.exp).toBeGreaterThan(result!.iat);
  });

  it('rejects a JWT with tampered payload', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET);
    const parts = jwt.split('.');
    // Tamper the payload section
    parts[1] = parts[1].slice(0, -3) + 'XXX';
    const result = await verifyJWT(parts.join('.'), TEST_SECRET);
    expect(result).toBeNull();
  });

  it('rejects a JWT with tampered signature', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET);
    const parts = jwt.split('.');
    parts[2] = 'invalidsignature';
    const result = await verifyJWT(parts.join('.'), TEST_SECRET);
    expect(result).toBeNull();
  });

  it('rejects a JWT with wrong secret', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET);
    const result = await verifyJWT(jwt, 'wrong-secret');
    expect(result).toBeNull();
  });

  it('rejects an expired JWT', async () => {
    // Issue with TTL of -1 second (already expired)
    const jwt = await issueJWT(payload, TEST_SECRET, -1);
    const result = await verifyJWT(jwt, TEST_SECRET);
    expect(result).toBeNull();
  });

  it('rejects a JWT with only 2 parts', async () => {
    const result = await verifyJWT('header.body', TEST_SECRET);
    expect(result).toBeNull();
  });

  it('rejects an empty string', async () => {
    const result = await verifyJWT('', TEST_SECRET);
    expect(result).toBeNull();
  });

  it('rejects garbage input', async () => {
    const result = await verifyJWT('not.a.jwt', TEST_SECRET);
    expect(result).toBeNull();
  });

  it('preserves payload fields through round-trip', async () => {
    const customPayload = { sub: 'github:user123', username: 'user123', avatar: '' };
    const jwt = await issueJWT(customPayload, TEST_SECRET, 600);
    const result = await verifyJWT(jwt, TEST_SECRET);
    expect(result).not.toBeNull();
    expect(result!.sub).toBe('github:user123');
    expect(result!.username).toBe('user123');
    expect(result!.avatar).toBe('');
  });

  it('default TTL is 7 days', async () => {
    const jwt = await issueJWT(payload, TEST_SECRET);
    const result = await verifyJWT(jwt, TEST_SECRET);
    expect(result).not.toBeNull();
    const sevenDays = 7 * 24 * 3600;
    expect(result!.exp - result!.iat).toBe(sevenDays);
  });
});

describe('parseCookies', () => {
  it('parses a single cookie', () => {
    expect(parseCookies('foo=bar')).toEqual({ foo: 'bar' });
  });

  it('parses multiple cookies', () => {
    expect(parseCookies('foo=bar; baz=qux')).toEqual({ foo: 'bar', baz: 'qux' });
  });

  it('handles values with = signs', () => {
    const result = parseCookies('token=abc=def');
    expect(result.token).toBe('abc=def');
  });

  it('trims whitespace', () => {
    expect(parseCookies('  foo  =  bar  ')).toEqual({ foo: 'bar' });
  });

  it('returns empty for empty string', () => {
    expect(parseCookies('')).toEqual({});
  });

  it('ignores malformed entries without =', () => {
    expect(parseCookies('noequalssign; foo=bar')).toEqual({ foo: 'bar' });
  });
});

describe('getJWTFromRequest', () => {
  it('returns JWT from reg_auth cookie', () => {
    const req = new Request('https://example.com', {
      headers: { Cookie: 'reg_auth=myjwt; other=value' },
    });
    expect(getJWTFromRequest(req)).toBe('myjwt');
  });

  it('returns null when no Cookie header', () => {
    const req = new Request('https://example.com');
    expect(getJWTFromRequest(req)).toBeNull();
  });

  it('returns null when reg_auth cookie missing', () => {
    const req = new Request('https://example.com', {
      headers: { Cookie: 'other=value' },
    });
    expect(getJWTFromRequest(req)).toBeNull();
  });
});

describe('setCookie', () => {
  it('formats a Set-Cookie header correctly', () => {
    const result = setCookie('reg_auth', 'tokenvalue', 604800);
    expect(result).toBe('reg_auth=tokenvalue; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=604800');
  });

  it('includes all security flags', () => {
    const result = setCookie('test', 'val', 100);
    expect(result).toContain('HttpOnly');
    expect(result).toContain('Secure');
    expect(result).toContain('SameSite=Lax');
  });
});
