import { describe, it, expect } from 'vitest';

// Test the pure functions from device-register.ts
// The truncateIp and input validation logic

function truncateIp(ip: string): string {
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  } else if (ip.includes(':')) {
    const parts = ip.split(':');
    return parts.slice(0, 3).join(':') + '::';
  }
  return 'unknown';
}

describe('truncateIp', () => {
  it('truncates IPv4 last octet', () => {
    expect(truncateIp('192.168.1.42')).toBe('192.168.1.0');
  });

  it('truncates IPv4 with 255 in last octet', () => {
    expect(truncateIp('10.0.0.255')).toBe('10.0.0.0');
  });

  it('handles IPv4 with zeros', () => {
    expect(truncateIp('0.0.0.0')).toBe('0.0.0.0');
  });

  it('truncates IPv6 to /48', () => {
    expect(truncateIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:0db8:85a3::');
  });

  it('truncates short IPv6', () => {
    expect(truncateIp('2606:4700:3030::6815:1c53')).toBe('2606:4700:3030::');
  });

  it('returns unknown for garbage', () => {
    expect(truncateIp('not-an-ip')).toBe('unknown');
  });

  it('returns unknown for empty string', () => {
    expect(truncateIp('')).toBe('unknown');
  });
});

describe('device registration input validation regexes', () => {
  const SAFE_ID = /^[a-z0-9][a-z0-9._-]{1,99}$/;
  const SAFE_UUID = /^[a-f0-9-]{16,128}$/;
  const SAFE_HASH = /^[a-f0-9]{32,128}$/;
  const SAFE_VERSION = /^[a-zA-Z0-9._-]{0,64}$/;

  describe('SAFE_ID', () => {
    it('accepts valid device IDs', () => {
      expect(SAFE_ID.test('anbernic-rg35xx-plus')).toBe(true);
      expect(SAFE_ID.test('raspberry-pi-4')).toBe(true);
      expect(SAFE_ID.test('steam-deck')).toBe(true);
      expect(SAFE_ID.test('milk-v-mars')).toBe(true);
    });

    it('rejects IDs with uppercase', () => {
      expect(SAFE_ID.test('Anbernic-RG35XX')).toBe(false);
    });

    it('rejects IDs starting with special chars', () => {
      expect(SAFE_ID.test('-invalid')).toBe(false);
      expect(SAFE_ID.test('.invalid')).toBe(false);
    });

    it('rejects IDs with spaces or special chars', () => {
      expect(SAFE_ID.test('device id')).toBe(false);
      expect(SAFE_ID.test('device<script>')).toBe(false);
      expect(SAFE_ID.test("device'; DROP TABLE")).toBe(false);
    });

    it('rejects single char', () => {
      expect(SAFE_ID.test('a')).toBe(false);
    });

    it('rejects IDs over 100 chars', () => {
      expect(SAFE_ID.test('a' + 'b'.repeat(100))).toBe(false);
    });
  });

  describe('SAFE_UUID', () => {
    it('accepts valid UUIDs', () => {
      expect(SAFE_UUID.test('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(SAFE_UUID.test('abcdef0123456789abcdef0123456789')).toBe(true);
    });

    it('rejects short strings', () => {
      expect(SAFE_UUID.test('abcdef')).toBe(false);
    });

    it('rejects uppercase hex', () => {
      expect(SAFE_UUID.test('550E8400-E29B-41D4-A716-446655440000')).toBe(false);
    });

    it('rejects injection attempts', () => {
      expect(SAFE_UUID.test("'; DROP TABLE device_tokens; --")).toBe(false);
    });
  });

  describe('SAFE_HASH', () => {
    it('accepts valid hex hashes', () => {
      expect(SAFE_HASH.test('a'.repeat(64))).toBe(true);
      expect(SAFE_HASH.test('0123456789abcdef'.repeat(4))).toBe(true);
    });

    it('rejects short hashes', () => {
      expect(SAFE_HASH.test('abcdef')).toBe(false);
    });

    it('rejects non-hex', () => {
      expect(SAFE_HASH.test('g'.repeat(64))).toBe(false);
    });
  });

  describe('SAFE_VERSION', () => {
    it('accepts valid versions', () => {
      expect(SAFE_VERSION.test('25.03.15')).toBe(true);
      expect(SAFE_VERSION.test('v1.0.0-beta')).toBe(true);
      expect(SAFE_VERSION.test('nightly_2025-03-15')).toBe(true);
    });

    it('accepts empty string', () => {
      expect(SAFE_VERSION.test('')).toBe(true);
    });

    it('rejects injection attempts', () => {
      expect(SAFE_VERSION.test('1.0; rm -rf /')).toBe(false);
    });
  });
});
