const API = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? 'http://localhost:8787'
  : 'https://compat.reglinux.org';

export type Status = 'works' | 'partial' | 'broken' | 'na' | 'untested';
export type DeviceType = 'handheld' | 'sbc' | 'tvbox' | 'console' | 'pc' | 'unknown';
export type Arch = 'armv7' | 'aarch64' | 'riscv64' | 'x86_64';

export interface Feature {
  id: string;
  label: string;
  category: string;
}

export interface ResultEntry {
  status: Status;
  build_date?: string;
  author?: string;
  notes?: string;
}

export interface MatrixDevice {
  id: string;
  title: string;
  brand: string;
  type: DeviceType;
  soc_name: string | null;
  arch: Arch | null;
  kernel: string | null;
  wiki_url: string | null;
  image: string | null;
  score: number;
  results: Record<string, ResultEntry>;
}

export interface MatrixResponse {
  devices: MatrixDevice[];
  features: Feature[];
  generated_at: string;
}

export interface DeviceDetail {
  id: string;
  title: string;
  brand: string;
  type: DeviceType;
  soc_slug: string | null;
  soc_name: string | null;
  cpu_arch: string | null;
  cpu_model: string | null;
  cpu_cores: string | null;
  cpu_clock: string | null;
  gpu_model: string | null;
  gpu_driver: string | null;
  gpu_api: string | null;
  kernel: string | null;
  arch: Arch | null;
  wiki_url: string | null;
  image: string | null;
  na_features: string;
  display_size: string | null;
  display_res: string | null;
  ram: string | null;
  storage: string | null;
  wifi_chip: string | null;
  bt_chip: string | null;
  has_fan: number | null;
  compositor: string | null;
  install_notes: string | null;
}

export interface HistoryEntry {
  build_date: string;
  author: string;
  submitted_at: string;
  results: Record<string, string>;
  notes: string;
}

export interface DeviceResponse {
  device: DeviceDetail;
  features: Feature[];
  latest: Record<string, ResultEntry>;
  history: HistoryEntry[];
}

export interface MeResponse {
  username: string;
  avatar: string;
}

export async function fetchMatrix(filters?: {
  type?: string; arch?: string; brand?: string;
}): Promise<MatrixResponse> {
  const params = new URLSearchParams();
  if (filters?.type) params.set('type', filters.type);
  if (filters?.arch) params.set('arch', filters.arch);
  if (filters?.brand) params.set('brand', filters.brand);
  const qs = params.toString();
  const res = await fetch(`${API}/api/matrix${qs ? '?' + qs : ''}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`matrix fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchDevice(id: string): Promise<DeviceResponse> {
  const res = await fetch(`${API}/api/device/${encodeURIComponent(id)}`, { credentials: 'include' });
  if (!res.ok) throw new Error(`device fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchMe(): Promise<MeResponse | null> {
  try {
    const res = await fetch(`${API}/api/auth/me`, { credentials: 'include' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// --- Admin API ---

export type DeviceStatus = 'released' | 'testing' | 'wip' | 'todo';

export interface AdminDevice {
  id: string;
  title: string;
  brand: string;
  type: DeviceType;
  soc_name: string | null;
  arch: Arch | null;
  image: string | null;
  status: DeviceStatus;
}

export interface DeviceOverrides {
  title?: string;
  brand?: string;
  image?: string;
  status?: DeviceStatus;
  [key: string]: string | undefined;
}

export interface AdminDeviceResponse {
  device: DeviceDetail & { status: DeviceStatus };
  overrides: DeviceOverrides;
  sha: string;
}

export interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  html_url: string;
}

// --- Stats types ---

export interface FeatureCoverage {
  id: string;
  label: string;
  category: string;
  tested: number;
  total: number;
}

export interface TypeCoverage {
  type: string;
  total: number;
  tested: number;
}

export interface TesterStat {
  author: string;
  devices: number;
  results: number;
}

export interface RecentSubmission {
  device_id: string;
  device_title: string;
  author: string;
  build_date: string;
  submitted_at: string;
  feature_count: number;
}

export interface StaleDevice {
  id: string;
  title: string;
  brand: string;
  type: string;
  last_tested: string;
}

export interface AdminStatsResponse {
  total_devices: number;
  tested_devices: number;
  untested_devices: number;
  total_results: number;
  recent_24h: number;
  recent_7d: number;
  coverage_by_feature: FeatureCoverage[];
  coverage_by_type: TypeCoverage[];
  top_testers: TesterStat[];
  recent_submissions: RecentSubmission[];
  stale_devices: StaleDevice[];
}

// --- Moderation types ---

export interface AdminResult {
  id: number;
  device_id: string;
  device_title: string;
  feature_id: string;
  feature_label: string;
  build_date: string;
  author: string;
  status: Status;
  notes: string;
  submitted_at: string;
}

export interface AdminResultsResponse {
  results: AdminResult[];
  total: number;
  limit: number;
  offset: number;
}

// --- Token types ---

export interface AdminToken {
  token: string;
  device_id: string;
  device_title: string | null;
  system_uuid: string;
  ip_address: string | null;
  reg_version: string | null;
  created_at: string;
  last_used: string | null;
  revoked: number;
  result_count: number;
}

// --- Device notes types ---

export interface DeviceNotesData {
  meta_description?: string;
  summary?: string;
  best_for?: string;
  field_notes?: string[];
  known_limits?: string[];
  compatibility_checks?: string[];
}

// --- SoC / Device creation types ---

export interface AdminSoC {
  soc_slug: string;
  soc_name: string;
  cpu_arch: string | null;
  cpu_model: string | null;
  cpu_cores: string | null;
  cpu_clock: string | null;
  gpu_model: string | null;
  gpu_driver: string | null;
  gpu_api: string | null;
  kernel: string | null;
  arch: Arch | null;
}

export interface CreateDeviceBody {
  id: string;
  title: string;
  brand: string;
  type: string;
  soc_slug?: string;
  arch?: string;
}

// --- Feature management types ---

export interface AdminFeature {
  id: string;
  label: string;
  category: string;
  sort_order: number;
}

export async function fetchAdminDevices(): Promise<{ devices: AdminDevice[] }> {
  const res = await fetch(`${API}/api/admin/devices`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`admin devices fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchAdminDevice(id: string): Promise<AdminDeviceResponse> {
  const res = await fetch(`${API}/api/admin/device/${encodeURIComponent(id)}`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`admin device fetch failed: ${res.status}`);
  return res.json();
}

export async function updateAdminDevice(id: string, fields: DeviceOverrides, sha: string): Promise<{ ok: boolean; sha: string }> {
  const res = await fetch(`${API}/api/admin/device/${encodeURIComponent(id)}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, sha }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) throw new Error('conflict');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `update failed: ${res.status}`);
  }
  return res.json();
}

export async function runPipeline(pipeline: string, inputs?: Record<string, string>): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/run/${pipeline}`, {
    method: 'POST',
    credentials: 'include',
    headers: inputs ? { 'Content-Type': 'application/json' } : {},
    body: inputs ? JSON.stringify({ inputs }) : undefined,
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`run failed: ${res.status}`);
  return res.json();
}

export async function fetchAdminRuns(): Promise<{ runs: WorkflowRun[] }> {
  const res = await fetch(`${API}/api/admin/runs`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`runs fetch failed: ${res.status}`);
  return res.json();
}

export async function submitResults(body: {
  device_id: string;
  build_date: string;
  results: Record<string, Status>;
  notes: string;
}): Promise<{ ok: boolean; inserted: number }> {
  const res = await fetch(`${API}/api/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 429) throw new Error('rate_limit_exceeded');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `submit failed: ${res.status}`);
  }
  return res.json();
}

// --- Admin Stats ---

export async function fetchAdminStats(): Promise<AdminStatsResponse> {
  const res = await fetch(`${API}/api/admin/stats`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`stats fetch failed: ${res.status}`);
  return res.json();
}

// --- Inline status update ---

// --- Moderation ---

export async function fetchAdminResults(filters?: {
  device?: string; author?: string; limit?: number; offset?: number;
}): Promise<AdminResultsResponse> {
  const params = new URLSearchParams();
  if (filters?.device) params.set('device', filters.device);
  if (filters?.author) params.set('author', filters.author);
  if (filters?.limit) params.set('limit', String(filters.limit));
  if (filters?.offset) params.set('offset', String(filters.offset));
  const qs = params.toString();
  const res = await fetch(`${API}/api/admin/results${qs ? '?' + qs : ''}`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`results fetch failed: ${res.status}`);
  return res.json();
}

export async function deleteAdminResult(id: number): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/result/${id}`, {
    method: 'DELETE', credentials: 'include',
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`delete failed: ${res.status}`);
  return res.json();
}

export async function deleteAdminResultsBatch(ids: number[]): Promise<{ ok: boolean; deleted: number }> {
  const res = await fetch(`${API}/api/admin/results/batch-delete`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`batch delete failed: ${res.status}`);
  return res.json();
}

// --- Tokens ---

export async function fetchAdminTokens(): Promise<{ tokens: AdminToken[] }> {
  const res = await fetch(`${API}/api/admin/tokens`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`tokens fetch failed: ${res.status}`);
  return res.json();
}

export async function revokeAdminToken(token: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/token/${encodeURIComponent(token)}/revoke`, {
    method: 'POST', credentials: 'include',
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`revoke failed: ${res.status}`);
  return res.json();
}

// --- Bulk status ---

export async function bulkUpdateStatus(deviceIds: string[], status: DeviceStatus): Promise<{ ok: boolean; updated: number }> {
  const res = await fetch(`${API}/api/admin/bulk-status`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ device_ids: deviceIds, status }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`bulk update failed: ${res.status}`);
  return res.json();
}

// --- Device notes ---

export async function fetchDeviceNotes(id: string): Promise<{ notes: DeviceNotesData; sha: string }> {
  const res = await fetch(`${API}/api/admin/device/${encodeURIComponent(id)}/notes`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`notes fetch failed: ${res.status}`);
  return res.json();
}

export async function updateDeviceNotes(id: string, notes: DeviceNotesData, sha: string): Promise<{ ok: boolean; sha: string }> {
  const res = await fetch(`${API}/api/admin/device/${encodeURIComponent(id)}/notes`, {
    method: 'PUT', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes, sha }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) throw new Error('conflict');
  if (!res.ok) throw new Error(`notes update failed: ${res.status}`);
  return res.json();
}

// --- Features ---

export async function fetchAdminFeatures(): Promise<{ features: AdminFeature[] }> {
  const res = await fetch(`${API}/api/admin/features`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`features fetch failed: ${res.status}`);
  return res.json();
}

export async function createAdminFeature(feature: AdminFeature): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/features`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feature),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) throw new Error('feature id already exists');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `create failed: ${res.status}`);
  }
  return res.json();
}

export async function updateAdminFeature(id: string, fields: Partial<Omit<AdminFeature, 'id'>>): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/feature/${encodeURIComponent(id)}`, {
    method: 'PUT', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `update failed: ${res.status}`);
  }
  return res.json();
}

export async function deleteAdminFeature(id: string): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/feature/${encodeURIComponent(id)}`, {
    method: 'DELETE', credentials: 'include',
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? 'cannot delete: has results');
  }
  if (!res.ok) throw new Error(`delete failed: ${res.status}`);
  return res.json();
}

export async function patchDeviceStatus(id: string, status: DeviceStatus): Promise<{ ok: boolean }> {
  const res = await fetch(`${API}/api/admin/device/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) throw new Error('conflict');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `patch failed: ${res.status}`);
  }
  return res.json();
}

// --- SoCs ---

export async function fetchAdminSocs(): Promise<{ socs: AdminSoC[] }> {
  const res = await fetch(`${API}/api/admin/socs`, { credentials: 'include' });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) throw new Error(`socs fetch failed: ${res.status}`);
  return res.json();
}

// --- Device creation ---

export async function createDevice(body: CreateDeviceBody): Promise<{ ok: boolean; id: string }> {
  const res = await fetch(`${API}/api/admin/devices`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (res.status === 409) throw new Error('device id already exists');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `create failed: ${res.status}`);
  }
  return res.json();
}

// --- Image upload ---

export async function uploadDeviceImage(deviceId: string, imageData: string, filename?: string): Promise<{ ok: boolean; image_url: string }> {
  const res = await fetch(`${API}/api/admin/upload-image`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ device_id: deviceId, image_data: imageData, filename }),
  });
  if (res.status === 401) throw new Error('not_authenticated');
  if (res.status === 403) throw new Error('not_admin');
  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(data.error ?? `upload failed: ${res.status}`);
  }
  return res.json();
}
