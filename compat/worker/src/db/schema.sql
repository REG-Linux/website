-- REG-Linux Compatibility Matrix — D1 Schema
-- Run via: wrangler d1 execute reg-compat --file=src/db/schema.sql

CREATE TABLE IF NOT EXISTS devices (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  brand        TEXT NOT NULL,
  type         TEXT NOT NULL CHECK(type IN ('handheld','sbc','tvbox','console','pc','unknown')),
  soc_slug     TEXT,
  soc_name     TEXT,
  cpu_arch     TEXT,
  cpu_model    TEXT,
  cpu_cores    TEXT,
  cpu_clock    TEXT,
  gpu_model    TEXT,
  gpu_driver   TEXT,
  gpu_api      TEXT,
  kernel       TEXT,
  arch         TEXT CHECK(arch IN ('armv7','aarch64','riscv64','x86_64')),
  wiki_url     TEXT,
  image        TEXT,
  na_features  TEXT,   -- JSON array: ["ethernet","battery"]
  display_size TEXT,   -- "3.5 inch"
  display_res  TEXT,   -- "640x480"
  ram          TEXT,   -- "1 GB LPDDR4"
  storage      TEXT,   -- "SD only" or "32GB eMMC + SD"
  wifi_chip    TEXT,   -- "RTL8821CS"
  bt_chip      TEXT,   -- "RTL8821CS"
  has_fan      INTEGER,-- 1/0/NULL
  compositor   TEXT,   -- "Sway" or "Weston"
  install_notes TEXT,  -- Markdown: device-specific install instructions
  status       TEXT DEFAULT 'todo' CHECK(status IN ('released','testing','wip','todo')),
  created_at   TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS features (
  id           TEXT PRIMARY KEY,
  label        TEXT NOT NULL,
  category     TEXT NOT NULL CHECK(category IN ('boot','display','connectivity','system','controls','gpu')),
  sort_order   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS test_results (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id    TEXT NOT NULL REFERENCES devices(id),
  feature_id   TEXT NOT NULL REFERENCES features(id),
  build_date   TEXT NOT NULL,   -- "2025-03-15" ISO date
  author       TEXT NOT NULL,   -- GitHub username
  status       TEXT NOT NULL CHECK(status IN ('works','partial','broken','na','untested')),
  notes        TEXT DEFAULT '',
  submitted_at TEXT DEFAULT (datetime('now')),
  -- One result per (device, feature, build_date, author)
  UNIQUE(device_id, feature_id, build_date, author)
);

-- For the matrix: latest result per (device, feature), tie-broken by submitted_at
CREATE VIEW IF NOT EXISTS latest_results AS
SELECT tr.device_id, tr.feature_id, tr.status, tr.build_date, tr.author, tr.notes
FROM test_results tr
WHERE tr.rowid = (
  SELECT tr2.rowid FROM test_results tr2
  WHERE tr2.device_id = tr.device_id AND tr2.feature_id = tr.feature_id
  ORDER BY tr2.build_date DESC, tr2.submitted_at DESC
  LIMIT 1
);

CREATE INDEX IF NOT EXISTS idx_results_device     ON test_results(device_id, build_date DESC);
CREATE INDEX IF NOT EXISTS idx_results_feature    ON test_results(feature_id);
CREATE INDEX IF NOT EXISTS idx_results_author     ON test_results(author);

-- Device tokens for self-registering devices
CREATE TABLE IF NOT EXISTS device_tokens (
  token        TEXT PRIMARY KEY,
  device_id    TEXT NOT NULL,
  system_uuid  TEXT NOT NULL UNIQUE,
  board_file_hash TEXT,
  ip_address   TEXT,
  reg_version  TEXT,
  created_at   TEXT DEFAULT (datetime('now')),
  last_used    TEXT,
  revoked      INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_device_tokens_uuid ON device_tokens(system_uuid);
CREATE INDEX IF NOT EXISTS idx_device_tokens_device ON device_tokens(device_id);
CREATE INDEX IF NOT EXISTS idx_results_build_date ON test_results(build_date DESC);

-- Board path → device ID mapping (system.board contains paths like "amlogic/odroidc5")
CREATE TABLE IF NOT EXISTS board_device_map (
  board_path   TEXT PRIMARY KEY,
  device_id    TEXT NOT NULL REFERENCES devices(id)
);
CREATE INDEX IF NOT EXISTS idx_board_device_map_device ON board_device_map(device_id);

-- Seed features (run once)
INSERT OR IGNORE INTO features VALUES
  -- Boot
  ('boot',              'Boot',           'boot',          1),
  ('rescue_mode',       'Rescue Mode',    'boot',          2),
  -- Display
  ('display',           'Display',        'display',       10),
  ('hdmi_out',          'HDMI Out',       'display',       11),
  ('audio',             'Audio',          'display',       12),
  ('hdmi_audio',        'HDMI Audio',     'display',       13),
  -- Connectivity
  ('wifi',              'WiFi',           'connectivity',  20),
  ('bluetooth',         'Bluetooth',      'connectivity',  21),
  ('ethernet',          'Ethernet',       'connectivity',  22),
  ('usb_host',          'USB Host',       'connectivity',  23),
  ('usb_otg',           'USB OTG',        'connectivity',  24),
  ('sd_card',           'SD Card',        'connectivity',  25),
  -- System
  ('suspend',           'Suspend/Resume', 'system',        30),
  ('thermal',           'Thermal Mgmt',   'system',        31),
  ('battery',           'Battery',        'system',        32),
  -- Controls
  ('buttons',           'Buttons',        'controls',      40),
  ('analog_sticks',     'Analog Sticks',  'controls',      41),
  ('controller_hotplug','Hotplug',        'controls',      42),
  ('rumble',            'Rumble',         'controls',      43),
  -- GPU
  ('gpu_accel',         'GPU Accel',      'gpu',           50),
  ('vulkan',            'Vulkan',         'gpu',           51),
  ('gles',              'OpenGL ES',      'gpu',           52);
