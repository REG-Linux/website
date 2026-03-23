export interface Env {
  DB: D1Database;
  GITHUB_CLIENT_ID: string;
  GITHUB_REDIRECT_URI: string;
  GITHUB_CLIENT_SECRET: string;
  JWT_SECRET: string;
  CORS_ORIGIN: string;
  DEV_TOKENS?: string; // comma-separated pre-approved device tokens
}

export type DeviceType = 'handheld' | 'sbc' | 'tvbox' | 'console' | 'pc' | 'unknown';
export type Arch = 'armv7' | 'aarch64' | 'riscv64' | 'x86_64';
export type Status = 'works' | 'partial' | 'broken' | 'na' | 'untested';

export interface Device {
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
  created_at: string;
}

export interface Feature {
  id: string;
  label: string;
  category: string;
  sort_order: number;
}

export interface LatestResult {
  device_id: string;
  feature_id: string;
  status: Status;
  build_date: string;
  author: string;
  notes: string;
}

export interface JWTPayload {
  sub: string;
  username: string;
  avatar: string;
  exp: number;
  iat: number;
}
