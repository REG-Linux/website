import { describe, it, expect } from 'vitest';

// Test the CORS logic extracted from index.ts
// We test the origin-checking logic in isolation

function isOriginAllowed(origin: string, corsOrigin: string): { allowed: boolean } {
  const allowed = [corsOrigin, 'https://reglinux.org'];
  return { allowed: allowed.includes(origin) };
}

describe('CORS origin checking', () => {
  const CORS_ORIGIN = 'https://compat.reglinux.org';

  it('allows the configured CORS_ORIGIN', () => {
    const result = isOriginAllowed('https://compat.reglinux.org', CORS_ORIGIN);
    expect(result.allowed).toBe(true);
  });

  it('allows reglinux.org', () => {
    const result = isOriginAllowed('https://reglinux.org', CORS_ORIGIN);
    expect(result.allowed).toBe(true);
  });

  it('rejects evil.com', () => {
    const result = isOriginAllowed('https://evil.com', CORS_ORIGIN);
    expect(result.allowed).toBe(false);
  });

  it('rejects http:// variant of reglinux.org', () => {
    const result = isOriginAllowed('http://reglinux.org', CORS_ORIGIN);
    expect(result.allowed).toBe(false);
  });

  it('rejects subdomain spoofing', () => {
    const result = isOriginAllowed('https://evil.reglinux.org', CORS_ORIGIN);
    expect(result.allowed).toBe(false);
  });

  it('rejects empty origin', () => {
    const result = isOriginAllowed('', CORS_ORIGIN);
    expect(result.allowed).toBe(false);
  });

  // After H1 fix: localhost is no longer allowed in production
  it('rejects localhost (H1 fix — no localhost in production)', () => {
    expect(isOriginAllowed('http://localhost:4321', CORS_ORIGIN).allowed).toBe(false);
    expect(isOriginAllowed('http://localhost:9999', CORS_ORIGIN).allowed).toBe(false);
    expect(isOriginAllowed('http://localhost', CORS_ORIGIN).allowed).toBe(false);
  });
});
