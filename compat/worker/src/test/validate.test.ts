import { describe, it, expect } from 'vitest';
import { validateSubmission, VALID_STATUSES, VALID_FEATURE_IDS } from '../lib/validate';

describe('validateSubmission', () => {
  const validBody = {
    device_id: 'anbernic-rg35xx-plus',
    build_date: new Date().toISOString().slice(0, 10), // today
    results: { boot: 'works', wifi: 'partial' },
    notes: 'Test note',
  };

  it('accepts a valid submission', () => {
    const result = validateSubmission(validBody);
    expect(typeof result).toBe('object');
    expect((result as { device_id: string }).device_id).toBe('anbernic-rg35xx-plus');
  });

  it('rejects null body', () => {
    expect(validateSubmission(null)).toBe('body must be a JSON object');
  });

  it('rejects non-object body', () => {
    expect(validateSubmission('string')).toBe('body must be a JSON object');
    expect(validateSubmission(42)).toBe('body must be a JSON object');
  });

  it('rejects missing device_id', () => {
    const body = { ...validBody, device_id: undefined };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects empty device_id', () => {
    const body = { ...validBody, device_id: '' };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects device_id over 100 chars', () => {
    const body = { ...validBody, device_id: 'a'.repeat(101) };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects missing build_date', () => {
    const body = { ...validBody, build_date: undefined };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects non-ISO build_date', () => {
    const body = { ...validBody, build_date: '03-15-2025' };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects future build_date', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const body = { ...validBody, build_date: future.toISOString().slice(0, 10) };
    expect(typeof validateSubmission(body)).toBe('string');
  });

  it('rejects build_date older than 1 year', () => {
    const old = new Date();
    old.setFullYear(old.getFullYear() - 2);
    const body = { ...validBody, build_date: old.toISOString().slice(0, 10) };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
    expect(result).toContain('older than 1 year');
  });

  it('rejects unknown feature_id', () => {
    const body = { ...validBody, results: { nonexistent_feature: 'works' } };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
    expect(result).toContain('unknown feature_id');
  });

  it('rejects invalid status value', () => {
    const body = { ...validBody, results: { boot: 'excellent' } };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
    expect(result).toContain('invalid status');
  });

  it('rejects empty results', () => {
    const body = { ...validBody, results: {} };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
    expect(result).toContain('at least one feature');
  });

  it('rejects results as array', () => {
    const body = { ...validBody, results: ['works'] };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
  });

  it('trims notes to 500 chars', () => {
    const body = { ...validBody, notes: 'x'.repeat(600) };
    const result = validateSubmission(body);
    expect(typeof result).toBe('object');
    expect((result as { notes: string }).notes.length).toBe(500);
  });

  it('allows missing notes', () => {
    const { notes: _, ...noNotes } = validBody;
    const result = validateSubmission(noNotes);
    expect(typeof result).toBe('object');
    expect((result as { notes: string }).notes).toBe('');
  });

  it('rejects non-string notes', () => {
    const body = { ...validBody, notes: 42 };
    const result = validateSubmission(body);
    expect(typeof result).toBe('string');
    expect(result).toContain('notes must be a string');
  });

  it('accepts all valid statuses', () => {
    for (const status of VALID_STATUSES) {
      const body = { ...validBody, results: { boot: status } };
      const result = validateSubmission(body);
      expect(typeof result).toBe('object');
    }
  });

  it('accepts all valid feature IDs', () => {
    const results: Record<string, string> = {};
    for (const featureId of VALID_FEATURE_IDS) {
      results[featureId] = 'works';
    }
    const body = { ...validBody, results };
    const result = validateSubmission(body);
    expect(typeof result).toBe('object');
    expect(Object.keys((result as { results: Record<string, string> }).results).length).toBe(22);
  });
});
