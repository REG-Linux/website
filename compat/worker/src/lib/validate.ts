import type { Status } from '../types';

export const VALID_STATUSES = new Set<Status>(['works', 'partial', 'broken', 'na', 'untested']);

export const VALID_FEATURE_IDS = new Set([
  'boot', 'rescue_mode', 'display', 'hdmi_out', 'audio', 'hdmi_audio',
  'wifi', 'bluetooth', 'ethernet', 'usb_host', 'usb_otg', 'sd_card',
  'suspend', 'thermal', 'battery', 'buttons', 'analog_sticks',
  'controller_hotplug', 'rumble', 'gpu_accel', 'vulkan', 'gles',
]);

export interface SubmissionInput {
  device_id: string;
  build_date: string;
  results: Record<string, Status>;
  notes: string;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function validateSubmission(body: unknown): SubmissionInput | string {
  if (!body || typeof body !== 'object') return 'body must be a JSON object';

  const b = body as Record<string, unknown>;

  // device_id
  if (typeof b.device_id !== 'string' || !b.device_id || b.device_id.length > 100) {
    return 'device_id must be a non-empty string (max 100 chars)';
  }

  // build_date
  if (typeof b.build_date !== 'string' || !ISO_DATE_RE.test(b.build_date)) {
    return 'build_date must be an ISO date string (YYYY-MM-DD)';
  }
  const date = new Date(b.build_date + 'T00:00:00Z');
  if (isNaN(date.getTime())) return 'build_date is not a valid date';
  const now = new Date();
  if (date > now) return 'build_date cannot be in the future';
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  if (date < oneYearAgo) return 'build_date cannot be older than 1 year';

  // results
  if (!b.results || typeof b.results !== 'object' || Array.isArray(b.results)) {
    return 'results must be an object mapping feature_id to status';
  }
  const results = b.results as Record<string, unknown>;
  const validated: Record<string, Status> = {};
  for (const [featureId, status] of Object.entries(results)) {
    if (!VALID_FEATURE_IDS.has(featureId)) {
      return `unknown feature_id: ${featureId}`;
    }
    if (typeof status !== 'string' || !VALID_STATUSES.has(status as Status)) {
      return `invalid status "${status}" for feature ${featureId}`;
    }
    validated[featureId] = status as Status;
  }
  if (Object.keys(validated).length === 0) {
    return 'results must contain at least one feature';
  }

  // notes
  let notes = '';
  if (b.notes !== undefined) {
    if (typeof b.notes !== 'string') return 'notes must be a string';
    notes = b.notes.trim().slice(0, 500);
  }

  return {
    device_id: b.device_id,
    build_date: b.build_date,
    results: validated,
    notes,
  };
}
