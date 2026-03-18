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
