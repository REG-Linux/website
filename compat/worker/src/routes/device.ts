import type { Env, Device, Feature, LatestResult } from '../types';
import { json, parseNaFeatures } from '../lib/http';

interface TestResultRow {
  feature_id: string;
  build_date: string;
  author: string;
  submitted_at: string;
  status: string;
  notes: string;
}

export async function handleDevice(_request: Request, env: Env, deviceId: string): Promise<Response> {
  if (!deviceId) return json({ error: 'device id required' }, 400);

  const [deviceResult, featuresResult, latestResult, historyResult] = await env.DB.batch([
    env.DB.prepare('SELECT * FROM devices WHERE id = ?').bind(deviceId),
    env.DB.prepare('SELECT * FROM features ORDER BY sort_order'),
    env.DB.prepare('SELECT * FROM latest_results WHERE device_id = ?').bind(deviceId),
    env.DB.prepare(
      `SELECT feature_id, build_date, author, submitted_at, status, notes
       FROM test_results WHERE device_id = ?
       ORDER BY build_date DESC, submitted_at DESC`,
    ).bind(deviceId),
  ]);

  const device = deviceResult.results[0] as unknown as Device | undefined;
  if (!device) return json({ error: 'device not found' }, 404);

  const features = featuresResult.results as unknown as Feature[];
  const latestResults = latestResult.results as unknown as LatestResult[];
  const historyRows = historyResult.results as unknown as TestResultRow[];

  // Build latest results map
  const naFeatures = new Set(parseNaFeatures(device.na_features));
  const latest: Record<string, unknown> = {};
  const featureIds = features.map(f => f.id);

  const latestByFeature = new Map<string, LatestResult>();
  for (const r of latestResults) latestByFeature.set(r.feature_id, r);

  for (const fid of featureIds) {
    const r = latestByFeature.get(fid);
    if (r) {
      latest[fid] = { status: r.status, build_date: r.build_date, author: r.author };
      if (r.notes) (latest[fid] as Record<string, unknown>).notes = r.notes;
    } else if (naFeatures.has(fid)) {
      latest[fid] = { status: 'na' };
    } else {
      latest[fid] = { status: 'untested' };
    }
  }

  // Group history by (build_date, author)
  const historyMap = new Map<string, { build_date: string; author: string; submitted_at: string; results: Record<string, string>; notes: string }>();
  for (const row of historyRows) {
    const key = `${row.build_date}|${row.author}`;
    let entry = historyMap.get(key);
    if (!entry) {
      entry = {
        build_date: row.build_date,
        author: row.author,
        submitted_at: row.submitted_at,
        results: {},
        notes: '',
      };
      historyMap.set(key, entry);
    }
    entry.results[row.feature_id] = row.status;
    if (row.notes && !entry.notes) entry.notes = row.notes;
  }

  return json({
    device,
    features: features.map(f => ({ id: f.id, label: f.label, category: f.category })),
    latest,
    history: [...historyMap.values()],
  });
}
