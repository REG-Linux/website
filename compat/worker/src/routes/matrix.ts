import type { Env, Device, Feature, LatestResult } from '../types';
import { json, parseNaFeatures } from '../lib/http';

const VALID_TYPES = new Set(['handheld', 'sbc', 'tvbox', 'console', 'pc']);
const VALID_ARCHS = new Set(['armv7', 'aarch64', 'riscv64', 'x86_64']);

export async function handleMatrix(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const typeFilter = url.searchParams.get('type');
  const archFilter = url.searchParams.get('arch');
  const brandFilter = url.searchParams.get('brand');

  // Build device query with optional filters
  const conditions: string[] = [];
  const params: string[] = [];

  if (typeFilter && VALID_TYPES.has(typeFilter)) {
    conditions.push('type = ?');
    params.push(typeFilter);
  }
  if (archFilter && VALID_ARCHS.has(archFilter)) {
    conditions.push('arch = ?');
    params.push(archFilter);
  }
  if (brandFilter) {
    conditions.push('brand = ?');
    params.push(brandFilter);
  }

  const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

  // Fetch devices, features, and latest results
  const [devicesResult, featuresResult] = await env.DB.batch([
    env.DB.prepare(`SELECT * FROM devices ${where} ORDER BY brand, title`).bind(...params),
    env.DB.prepare('SELECT * FROM features ORDER BY sort_order'),
  ]);

  const devices = devicesResult.results as unknown as Device[];
  const features = featuresResult.results as unknown as Feature[];

  if (devices.length === 0) {
    return json({
      devices: [],
      features: features.map(f => ({ id: f.id, label: f.label, category: f.category })),
      generated_at: new Date().toISOString(),
    });
  }

  // Fetch all latest results (join filtering happens in JS — avoids SQLite variable limits)
  const resultsResult = await env.DB.prepare('SELECT * FROM latest_results').all();
  const allResults = resultsResult.results as unknown as LatestResult[];

  // Filter to only matching device IDs
  const deviceIdSet = new Set(devices.map(d => d.id));
  const latestResults = allResults.filter(r => deviceIdSet.has(r.device_id));

  // Index results by device_id
  const resultsByDevice = new Map<string, Map<string, LatestResult>>();
  for (const r of latestResults) {
    let deviceMap = resultsByDevice.get(r.device_id);
    if (!deviceMap) {
      deviceMap = new Map();
      resultsByDevice.set(r.device_id, deviceMap);
    }
    deviceMap.set(r.feature_id, r);
  }

  // Build response
  const featureIds = features.map(f => f.id);

  const deviceEntries = devices.map(device => {
    const naFeatures = new Set(parseNaFeatures(device.na_features));
    const deviceResults = resultsByDevice.get(device.id) ?? new Map<string, LatestResult>();

    const results: Record<string, unknown> = {};
    let works = 0;
    let partial = 0;
    let naCount = 0;
    let total = 0;

    for (const fid of featureIds) {
      const r = deviceResults.get(fid);
      if (r) {
        results[fid] = { status: r.status, build_date: r.build_date, author: r.author };
        if (r.notes) (results[fid] as Record<string, unknown>).notes = r.notes;
      } else if (naFeatures.has(fid)) {
        results[fid] = { status: 'na' };
      } else {
        results[fid] = { status: 'untested' };
      }

      const status = (results[fid] as Record<string, string>).status;
      total++;
      if (status === 'works') works++;
      else if (status === 'partial') partial++;
      else if (status === 'na') naCount++;
    }

    const denominator = total - naCount;
    const score = denominator > 0 ? Math.round(((works + partial * 0.5) / denominator) * 100) : 0;

    return {
      id: device.id,
      title: device.title,
      brand: device.brand,
      type: device.type,
      soc_name: device.soc_name,
      arch: device.arch,
      kernel: device.kernel,
      wiki_url: device.wiki_url,
      image: device.image,
      score,
      results,
    };
  });

  return json({
    devices: deviceEntries,
    features: features.map(f => ({ id: f.id, label: f.label, category: f.category })),
    generated_at: new Date().toISOString(),
  });
}
