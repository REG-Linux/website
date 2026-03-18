# REG-Linux Compatibility Matrix — Claude Code Spec

## Context

REG-Linux is a Buildroot-based retrogaming OS targeting 100 devices across ARM, AArch64,
RISC-V, and x86_64. The website repo (`REG-Linux/website`) is Jekyll + GitHub Pages.

This project adds `compat.reglinux.org` — a live compatibility tracking dashboard backed
by Cloudflare Workers + D1, with a JS widget embeddable in the existing Jekyll/MkDocs wiki.

**Constraints:**
- All device metadata lives in `_data/devices.yml` and `_data/socs.yml` in the website repo
- Testeurs must authenticate via GitHub OAuth (scope: `read:user` only)
- Zero manual seeding — extract everything from existing YAML
- Hosting: Cloudflare Pages (frontend) + Workers (API) + D1 (database)
- Widget must work with a single `<script>` tag in MkDocs pages

---

## Repo structure to create

```
compat/                          ← new directory at root of website repo
  worker/
    src/
      index.ts                   ← main Worker entrypoint
      routes/
        matrix.ts                ← GET /api/matrix
        device.ts                ← GET /api/device/:id
        submit.ts                ← POST /api/submit
        auth.ts                  ← GET /api/auth/github, /api/auth/callback
      db/
        schema.sql               ← D1 schema
        seed.ts                  ← reads canonical JSON, seeds devices table
      lib/
        auth.ts                  ← GitHub OAuth helpers
        validate.ts              ← submission validation
    wrangler.toml
    package.json
    tsconfig.json

  dashboard/                     ← Astro static site → compat.reglinux.org
    src/
      pages/
        index.astro              ← global matrix view
        device/[id].astro        ← per-device detail + history
        submit.astro             ← submission form (requires GitHub auth)
      components/
        Matrix.tsx               ← filterable matrix table
        DeviceDetail.tsx         ← feature grid + build history
        SubmitForm.tsx           ← test submission form
        StatusBadge.tsx          ← ✅ ⚠️ ❌ N/A badge component
      lib/
        api.ts                   ← typed fetch wrappers for Worker API
      styles/
        global.css               ← reuse CSS vars from reglinux.org
    astro.config.mjs
    package.json

  widget/
    src/
      widget.ts                  ← standalone embeddable widget (no deps)
    rollup.config.js
    package.json

  scripts/
    extract_devices.py           ← Step 1: YAML → canonical JSON
    seed_d1.py                   ← Step 2: canonical JSON → D1 via Wrangler
```

---

## Step 1 — Extract & normalize device data

### Script: `compat/scripts/extract_devices.py`

Reads from the website repo root (run from there):
- `_data/devices.yml`   → title, brand, soc name(s), image, wiki_url
- `_data/socs.yml`      → cpu arch, cores, clock, gpu model, gpu driver, kernel

Outputs `compat/scripts/devices_canonical.json`.

**Logic:**

```python
# SoC name matching: devices.yml uses "Rockchip RK3566", socs.yml key is "rockchip-rk3566"
# Normalize: lowercase, replace spaces with hyphens, strip parentheses
# Fallback: if no match, set soc_slug=null and log a warning

# Device type detection (from device ID):
HANDHELD_PATTERNS = ["rg", "rgb", "rk2023", "x35", "x55", "xu10", "odin",
                     "pocket", "steam-deck", "rog-ally", "gameforce", "ayaneo",
                     "magicx", "odroid-go", "powkiddy"]
SBC_PATTERNS = ["raspberry-pi", "banana-pi", "orange-pi", "nano-pi", "khadas",
                "radxa", "firefly", "hardkernel-odroid-c", "hardkernel-odroid-m",
                "beelink", "milk-v", "starfive", "mqmaker", "asus-tinker"]
CONSOLE_PATTERNS = ["capcom", "nes-classic", "snes-classic"]

# N/A features by type:
NA_BY_TYPE = {
    "sbc":      ["battery", "analog_sticks", "buttons", "suspend", "rumble"],
    "handheld": ["ethernet"],
    "console":  ["analog_sticks", "ethernet", "battery"],
    "pc":       ["battery", "buttons", "analog_sticks"],
}
```

**Output format:**

```json
[
  {
    "id": "anbernic-rg35xx-plus",
    "title": "Anbernic RG35XX Plus",
    "brand": "Anbernic",
    "type": "handheld",
    "soc_slug": "allwinner-h700",
    "soc_name": "Allwinner H700",
    "cpu_arch": "ARMv8-A",
    "cpu_model": "Cortex-A53",
    "cpu_cores": "4",
    "cpu_clock": "1.5 GHz",
    "gpu_model": "PowerVR GE8300",
    "gpu_driver": "IMG proprietary",
    "gpu_api": "OpenGL ES 3.2",
    "kernel": "4.9 BSP",
    "arch": "aarch64",
    "wiki_url": "https://reglinux.org/wiki/handhelds/anbernic/rg35xx-plus/",
    "image": "/assets/images/anbernic-rg35xx-plus.webp",
    "na_features": ["ethernet"]
  }
]
```

Print warnings for:
- Devices with no SoC match (currently: milk-v-meles TH1520, radxa-nio-12l Genio 1200)
- Devices with type "unknown"
- SoCs missing cpu_arch or gpu_model

---

## Step 2 — D1 Database Schema

### File: `compat/worker/src/db/schema.sql`

```sql
-- Run via: wrangler d1 execute reg-compat --file=schema.sql

CREATE TABLE IF NOT EXISTS devices (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  brand        TEXT NOT NULL,
  type         TEXT NOT NULL CHECK(type IN ('handheld','sbc','console','pc','unknown')),
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

-- For the matrix: latest result per (device, feature)
CREATE VIEW IF NOT EXISTS latest_results AS
SELECT
  tr.device_id,
  tr.feature_id,
  tr.status,
  tr.build_date,
  tr.author,
  tr.notes
FROM test_results tr
INNER JOIN (
  SELECT device_id, feature_id, MAX(build_date) AS max_date
  FROM test_results
  GROUP BY device_id, feature_id
) latest ON tr.device_id = latest.device_id
         AND tr.feature_id = latest.feature_id
         AND tr.build_date = latest.max_date;

CREATE INDEX IF NOT EXISTS idx_results_device     ON test_results(device_id, build_date DESC);
CREATE INDEX IF NOT EXISTS idx_results_feature    ON test_results(feature_id);
CREATE INDEX IF NOT EXISTS idx_results_author     ON test_results(author);
CREATE INDEX IF NOT EXISTS idx_results_build_date ON test_results(build_date DESC);

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
  ('thermal',           'Thermal Mgmt',  'system',        31),
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
```

---

## Step 3 — Cloudflare Worker API

### File: `compat/worker/wrangler.toml`

```toml
name = "reg-compat"
main = "src/index.ts"
compatibility_date = "2024-11-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "reg-compat"
database_id = "REPLACE_WITH_ACTUAL_ID"

[vars]
GITHUB_CLIENT_ID = "REPLACE"
GITHUB_REDIRECT_URI = "https://compat.reglinux.org/api/auth/callback"
CORS_ORIGIN = "https://compat.reglinux.org"

# Secrets (set via wrangler secret put):
# GITHUB_CLIENT_SECRET
# JWT_SECRET
```

### API Routes

#### `GET /api/matrix`

Returns the full matrix for all devices, using the `latest_results` view.

Query params:
- `?type=handheld|sbc|console|pc`
- `?arch=aarch64|armv7|riscv64|x86_64`
- `?brand=Anbernic`

Response:
```json
{
  "devices": [
    {
      "id": "anbernic-rg35xx-plus",
      "title": "Anbernic RG35XX Plus",
      "brand": "Anbernic",
      "type": "handheld",
      "soc_name": "Allwinner H700",
      "arch": "aarch64",
      "kernel": "4.9 BSP",
      "wiki_url": "...",
      "image": "...",
      "score": 72,
      "results": {
        "boot":        {"status": "works",   "build_date": "2025-03-15", "author": "romain"},
        "wifi":        {"status": "partial", "build_date": "2025-03-15", "author": "romain", "notes": "drops after sleep"},
        "bluetooth":   {"status": "broken",  "build_date": "2025-02-01", "author": "bob"},
        "ethernet":    {"status": "na"},
        "gpu_accel":   {"status": "untested"}
      }
    }
  ],
  "features": [
    {"id": "boot", "label": "Boot", "category": "boot"},
    ...
  ],
  "generated_at": "2025-03-18T12:00:00Z"
}
```

Score = `(works * 1.0 + partial * 0.5) / (total - na)` × 100, rounded.

#### `GET /api/device/:id`

Returns device specs + all test history for that device (not just latest).

Response:
```json
{
  "device": { "id": "...", "title": "...", ...all fields },
  "features": [...],
  "latest": { "boot": {"status":"works", ...}, ... },
  "history": [
    {
      "build_date": "2025-03-15",
      "author": "romain",
      "submitted_at": "2025-03-15T20:13:00Z",
      "results": {
        "boot": "works",
        "wifi": "partial",
        ...
      },
      "notes": "global note"
    }
  ]
}
```

#### `POST /api/submit`

Requires `Authorization: Bearer <jwt>` header (JWT issued at OAuth callback).

Body:
```json
{
  "device_id": "anbernic-rg35xx-plus",
  "build_date": "2025-03-15",
  "results": {
    "boot":      "works",
    "display":   "works",
    "wifi":      "partial",
    "bluetooth": "broken",
    "ethernet":  "na",
    "suspend":   "na",
    "gpu_accel": "works"
  },
  "notes": "WiFi drops after suspend. Tested on nightly 2025-03-15."
}
```

Validation:
- `device_id` must exist in devices table
- `build_date` must be ISO date, not in the future, not older than 1 year
- `results` keys must be valid feature IDs
- `status` values must be in `(works, partial, broken, na, untested)`
- `na` is only allowed if feature is in device's `na_features`
- Rate limit: max 10 submissions per author per hour (via D1 count query)

On conflict `(device_id, feature_id, build_date, author)` → UPDATE status + notes.

Response 200:
```json
{"ok": true, "inserted": 21}
```

#### `GET /api/auth/github`

Redirects to GitHub OAuth:
```
https://github.com/login/oauth/authorize?client_id=...&scope=read:user&state=...
```

`state` is a signed random token stored in a cookie (HMAC-SHA256 with JWT_SECRET).

#### `GET /api/auth/callback`

- Validates `state` against cookie
- Exchanges `code` for GitHub access token
- Fetches `GET https://api.github.com/user` → gets `login` (username) + `avatar_url`
- Issues a signed JWT: `{sub: "github:romain", username: "romain", avatar: "...", exp: now+7d}`
- Sets `reg_auth` cookie (HttpOnly, SameSite=Lax, Secure, 7d)
- Redirects to `/submit` or `?redirect` param

JWT secret: `JWT_SECRET` env var (set via `wrangler secret put JWT_SECRET`).

#### `GET /api/auth/me`

Returns current user from JWT cookie:
```json
{"username": "romain", "avatar": "https://avatars.githubusercontent.com/..."}
```
Returns 401 if not authenticated.

### CORS

Allow `https://compat.reglinux.org` and `https://reglinux.org` (for the widget).
OPTIONS preflight must return 200 with correct headers.

---

## Step 4 — Dashboard (Astro)

### `compat/dashboard/astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  site: 'https://compat.reglinux.org',
});
```

### Pages

#### `/` — Global matrix

- On load: `fetch('https://compat.reglinux.org/api/matrix')`
- Filter bar: Type (All / Handheld / SBC / Console / PC) | Arch | Brand | Search
- Table columns: Device | Type | SoC | Arch | Kernel | [feature columns] | Score | Wiki
- Feature columns: one per feature, showing `StatusBadge` with tooltip (date + author)
- Clicking a device name → `/device/:id`
- Clicking a column header → sort
- "Submit a test" button in header → `/submit` (redirects to GitHub auth if not logged in)
- Show logged-in user avatar + username in top right if authenticated

#### `/device/:id` — Device detail

- Hero: device title, image, SoC, arch, kernel, type, wiki link
- Feature grid: 6 categories, each feature shows current status + "as of YYYY-MM-DD by @author"
- Build history table: build_date | author | [status per feature] | notes
- "Submit test for this device" button (pre-selects device in form)

#### `/submit` — Submission form

Requires auth. If not authenticated, redirect to `/api/auth/github?redirect=/submit`.

Form fields:
1. Device selector (searchable dropdown, all 100 devices)
2. Build date (date picker, default today)
3. Feature grid — for each feature not in `na_features`:
   - Toggle: ✅ Works | ⚠️ Partial | ❌ Broken | N/A
   - Default: untested (grey, not submitted)
4. Notes textarea (optional, max 500 chars)
5. Submit button

On submit: `POST /api/submit` with JWT from cookie.
On success: redirect to `/device/:id`.

### StatusBadge component

```tsx
const STATUS = {
  works:    { icon: '✅', label: 'Works',    color: '#22c55e' },
  partial:  { icon: '⚠️', label: 'Partial',  color: '#f59e0b' },
  broken:   { icon: '❌', label: 'Broken',   color: '#ef4444' },
  na:       { icon: '—',  label: 'N/A',      color: '#6b7280' },
  untested: { icon: '?',  label: 'Untested', color: '#d1d5db' },
};
```

Tooltip on hover: `"YYYY-MM-DD by @username — note if any"`.

### CSS variables (from reglinux.org — replicate these)

```css
:root {
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-border: #2a2a2a;
  --color-accent: #e63946;
  --color-text: #f0f0f0;
  --color-muted: #888;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## Step 5 — Embeddable Widget

### `compat/widget/src/widget.ts`

Self-contained, no framework, no dependencies. Output: `widget.js` < 10kb gzipped.

**Usage in MkDocs:**
```html
<div data-reg-compat="anbernic-rg35xx-plus"></div>
<script src="https://compat.reglinux.org/widget.js"></script>
```

**Behavior:**
1. On load, find all `[data-reg-compat]` elements
2. For each, fetch `https://compat.reglinux.org/api/device/:id`
3. Render inline table with feature status grid
4. Show "Submit a test" link → opens compat.reglinux.org/submit?device=:id in new tab
5. Show "Last tested: YYYY-MM-DD" and "View full history →" link

**Rendered HTML structure:**
```html
<div class="reg-compat-widget">
  <div class="reg-compat-header">
    <span class="reg-compat-title">Compatibility — Anbernic RG35XX Plus</span>
    <span class="reg-compat-score">Score: 72%</span>
  </div>
  <div class="reg-compat-grid">
    <!-- one badge per feature, grouped by category -->
  </div>
  <div class="reg-compat-footer">
    <a href="...">View full history</a> · <a href="...">Submit a test</a>
  </div>
</div>
```

Inline all CSS (scoped to `.reg-compat-*` to avoid conflicts). Dark theme matching reglinux.org.

---

## Step 6 — Seed Script

### `compat/scripts/seed_d1.py`

Reads `devices_canonical.json`, generates SQL INSERT statements, runs them via:
```bash
wrangler d1 execute reg-compat --file=seed_devices.sql
```

Skips devices already present (INSERT OR IGNORE).
Prints a summary: N inserted, N skipped, N warnings.

---

## Step 7 — GitHub Actions (CI)

### `.github/workflows/compat-deploy.yml`

```yaml
name: Deploy compat.reglinux.org
on:
  push:
    branches: [main]
    paths: ['compat/**']

jobs:
  deploy-worker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
        working-directory: compat/worker
      - run: npx wrangler deploy
        working-directory: compat/worker
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}

  deploy-dashboard:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci && npm run build
        working-directory: compat/dashboard
      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: reg-compat
          directory: compat/dashboard/dist
```

---

## Implementation order

1. `extract_devices.py` → run it, review output, fix the 2 unmatched SoCs manually
2. `schema.sql` → create D1 database: `wrangler d1 create reg-compat`
3. `seed_d1.py` → seed devices + features
4. Worker API → start with GET /matrix and GET /device/:id (read-only, no auth needed)
5. GitHub OAuth → GET /api/auth/github + /callback + /me
6. POST /api/submit → with auth + validation
7. Dashboard → Matrix page first, then Device detail, then Submit form
8. Widget → last, once API is stable
9. GitHub Actions → wire up on merge

---

## Environment variables & secrets

| Name | Where | How to set |
|---|---|---|
| `GITHUB_CLIENT_ID` | wrangler.toml [vars] | GitHub App → Client ID |
| `GITHUB_CLIENT_SECRET` | Worker secret | `wrangler secret put GITHUB_CLIENT_SECRET` |
| `JWT_SECRET` | Worker secret | `wrangler secret put JWT_SECRET` (32+ random bytes, hex) |
| `CF_API_TOKEN` | GitHub Actions secret | Cloudflare dashboard → API Tokens |
| `CF_ACCOUNT_ID` | GitHub Actions secret | Cloudflare dashboard → Account ID |

GitHub App setup:
- Go to github.com/organizations/REG-Linux/settings/apps → New GitHub App
- Homepage URL: `https://compat.reglinux.org`
- Callback URL: `https://compat.reglinux.org/api/auth/callback`
- Permissions: `read:user` only
- NOT a webhook — uncheck all webhook options

---

## Known issues to fix during implementation

1. `milk-v-meles` — SoC "TH1520" not in socs.yml → add it manually
2. `radxa-nio-12l` — SoC "Genio 1200 (MT8395)" not in socs.yml → add it manually
3. 3 devices with type "unknown" — review and classify manually:
   - Check device ID against known patterns
4. `socs.yml` missing `arch` field for several SoCs — infer from `cpu.arch`:
   - ARMv7-A → armv7
   - ARMv8-A / AArch64 → aarch64
   - RISC-V → riscv64
   - x86 / AMD → x86_64
