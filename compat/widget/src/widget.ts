/**
 * REG-Linux Compatibility Widget
 *
 * Standalone, zero-dependency embeddable widget.
 * Adapts to the host page's MkDocs Material theme when available,
 * falls back to its own dark theme for standalone use.
 *
 * Usage:
 *   <div data-reg-compat="anbernic-rg35xx-plus"></div>
 *   <script src="https://compat.reglinux.org/widget.js"></script>
 */

const API = (window.location.hostname === 'localhost')
  ? 'http://localhost:8787'
  : 'https://compat.reglinux.org';
const DASHBOARD = (window.location.hostname === 'localhost')
  ? 'http://localhost:4321'
  : 'https://compat.reglinux.org';

interface ResultEntry {
  status: string;
  build_date?: string;
  author?: string;
  notes?: string;
}

interface Feature {
  id: string;
  label: string;
  category: string;
}

interface Device {
  id: string;
  title: string;
  brand: string;
  type: string;
  soc_name: string | null;
  cpu_model: string | null;
  cpu_cores: string | null;
  cpu_clock: string | null;
  gpu_model: string | null;
  gpu_driver: string | null;
  gpu_api: string | null;
  kernel: string | null;
  arch: string | null;
  display_size: string | null;
  display_res: string | null;
  ram: string | null;
  storage: string | null;
  wifi_chip: string | null;
  bt_chip: string | null;
  has_fan: number | null;
  compositor: string | null;
  na_features: string;
}

interface DeviceResponse {
  device: Device;
  features: Feature[];
  latest: Record<string, ResultEntry>;
  history: Array<{ build_date: string }>;
}

const STATUS: Record<string, { icon: string; label: string; color: string }> = {
  works:    { icon: '\u2705', label: 'Works',    color: '#22c55e' },
  partial:  { icon: '\u26A0\uFE0F', label: 'Partial',  color: '#f59e0b' },
  broken:   { icon: '\u274C', label: 'Broken',   color: '#ef4444' },
  na:       { icon: '\u2014', label: 'N/A',      color: '#6b7280' },
  untested: { icon: '\u00B7', label: 'Untested', color: '#374151' },
};

const CATEGORY_ORDER = ['boot', 'display', 'connectivity', 'system', 'controls', 'gpu'];
const CATEGORY_LABELS: Record<string, string> = {
  boot: 'Boot', display: 'Display', connectivity: 'Connectivity',
  system: 'System', controls: 'Controls', gpu: 'GPU',
};

function computeScore(latest: Record<string, ResultEntry>, naFeatures: Set<string>, featureIds: string[]): number {
  let works = 0, partial = 0, naCount = 0;
  for (const fid of featureIds) {
    const status = latest[fid]?.status ?? (naFeatures.has(fid) ? 'na' : 'untested');
    if (status === 'works') works++;
    else if (status === 'partial') partial++;
    else if (status === 'na') naCount++;
  }
  const denom = featureIds.length - naCount;
  return denom > 0 ? Math.round(((works + partial * 0.5) / denom) * 100) : 0;
}

function el(tag: string, attrs?: Record<string, string>, ...children: (string | HTMLElement)[]): HTMLElement {
  const e = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  for (const c of children) {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  }
  return e;
}

function scoreColor(score: number): string {
  if (score >= 70) return '#22c55e';
  if (score >= 40) return '#f59e0b';
  if (score > 0) return '#ef4444';
  return '#374151';
}

function renderWidget(container: HTMLElement, data: DeviceResponse): void {
  const { device, features, latest, history } = data;
  const naFeatures = new Set<string>(JSON.parse(device.na_features || '[]'));
  const featureIds = features.map(f => f.id);
  const score = computeScore(latest, naFeatures, featureIds);
  const lastDate = history.length > 0 ? history[0].build_date : null;

  // Group features by category
  const grouped = new Map<string, Feature[]>();
  for (const f of features) {
    const list = grouped.get(f.category) ?? [];
    list.push(f);
    grouped.set(f.category, list);
  }

  const rawAttr = container.getAttribute('data-reg-compat') ?? '';
  const showSpecs = rawAttr.includes(':specs');

  const widget = el('div', { class: 'reg-compat-widget' });

  // Header with score bar
  const header = el('div', { class: 'reg-compat-header' });
  header.appendChild(el('span', { class: 'reg-compat-title' }, 'Hardware & Compatibility'));

  const scoreEl = el('span', { class: 'reg-compat-score' });
  if (score > 0) {
    const barOuter = el('span', { class: 'reg-compat-bar' });
    const barInner = el('span', { class: 'reg-compat-bar-fill' });
    barInner.style.width = `${score}%`;
    barInner.style.background = scoreColor(score);
    barOuter.appendChild(barInner);
    scoreEl.appendChild(barOuter);
    scoreEl.appendChild(document.createTextNode(`${score}%`));
  } else {
    scoreEl.appendChild(document.createTextNode('No tests yet'));
  }
  header.appendChild(scoreEl);
  widget.appendChild(header);

  // Hardware specs section
  if (showSpecs) {
    const specs = el('div', { class: 'reg-compat-specs' });

    const specRows: [string, string][] = [];
    if (device.soc_name) specRows.push(['SoC', device.soc_name]);
    if (device.cpu_model) {
      let cpu = device.cpu_model;
      if (device.cpu_cores) cpu += ` (${device.cpu_cores} cores)`;
      if (device.cpu_clock) cpu += ` @ ${device.cpu_clock}`;
      specRows.push(['CPU', cpu]);
    }
    if (device.gpu_model) {
      let gpu = device.gpu_model;
      if (device.gpu_driver) gpu += ` (${device.gpu_driver})`;
      specRows.push(['GPU', gpu]);
    }
    if (device.gpu_api) specRows.push(['Graphics API', device.gpu_api]);
    if (device.display_size || device.display_res) {
      specRows.push(['Display', [device.display_size, device.display_res].filter(Boolean).join(' ')]);
    }
    if (device.ram) specRows.push(['RAM', device.ram]);
    if (device.storage) specRows.push(['Storage', device.storage]);
    if (device.kernel) specRows.push(['Kernel', `Linux ${device.kernel}`]);
    if (device.arch) specRows.push(['Architecture', device.arch]);
    if (device.compositor) specRows.push(['Compositor', device.compositor]);
    if (device.wifi_chip) specRows.push(['WiFi/BT Chip', device.wifi_chip]);
    if (device.has_fan) specRows.push(['Cooling', 'Active (fan)']);

    const specTable = el('table', { class: 'reg-compat-specs-table' });
    for (const [label, value] of specRows) {
      const row = el('tr');
      row.appendChild(el('td', { class: 'reg-compat-spec-label' }, label));
      row.appendChild(el('td', { class: 'reg-compat-spec-value' }, value));
      specTable.appendChild(row);
    }
    specs.appendChild(specTable);
    widget.appendChild(specs);
  }

  // Feature grid — compact table layout
  const table = el('table', { class: 'reg-compat-table' });
  for (const cat of CATEGORY_ORDER) {
    const feats = grouped.get(cat);
    if (!feats) continue;

    // Category header row
    const catRow = el('tr', { class: 'reg-compat-cat-row' });
    catRow.appendChild(el('td', { colspan: '2', class: 'reg-compat-cat-label' }, CATEGORY_LABELS[cat] ?? cat));
    table.appendChild(catRow);

    // Feature rows
    for (const f of feats) {
      const r = latest[f.id];
      const status = r?.status ?? (naFeatures.has(f.id) ? 'na' : 'untested');
      const meta = STATUS[status] ?? STATUS.untested;

      let tooltip = `${f.label}: ${meta.label}`;
      if (r?.build_date && r?.author) {
        tooltip += ` (${r.build_date} by @${r.author})`;
        if (r.notes) tooltip += ` \u2014 ${r.notes}`;
      }

      const row = el('tr', { class: 'reg-compat-feat-row', title: tooltip });
      row.appendChild(el('td', { class: 'reg-compat-feat-name' }, f.label));

      const statusCell = el('td', { class: `reg-compat-feat-status reg-compat-s-${status}` });
      statusCell.appendChild(el('span', { class: 'reg-compat-icon' }, meta.icon));
      statusCell.appendChild(document.createTextNode(meta.label));
      row.appendChild(statusCell);

      table.appendChild(row);
    }
  }
  widget.appendChild(table);

  // Footer
  const footer = el('div', { class: 'reg-compat-footer' });
  if (lastDate) {
    footer.appendChild(el('span', { class: 'reg-compat-date' }, `Last tested ${lastDate}`));
    footer.appendChild(document.createTextNode(' \u00B7 '));
  }
  footer.appendChild(el('a', { href: `${DASHBOARD}/device/${device.id}`, target: '_blank', rel: 'noopener' }, 'Full history \u2192'));
  footer.appendChild(document.createTextNode(' \u00B7 '));
  footer.appendChild(el('a', { href: `${DASHBOARD}/submit?device=${device.id}`, target: '_blank', rel: 'noopener' }, 'Submit a test'));
  widget.appendChild(footer);

  container.innerHTML = '';
  container.appendChild(widget);
}

function renderError(container: HTMLElement, deviceId: string, message: string): void {
  container.innerHTML = '';
  container.appendChild(el('div', { class: 'reg-compat-widget' },
    el('div', { class: 'reg-compat-header' },
      el('span', { class: 'reg-compat-title' }, `Compatibility \u2014 ${deviceId}`),
    ),
    el('div', { class: 'reg-compat-error' }, message),
  ));
}

function renderLoading(container: HTMLElement): void {
  container.innerHTML = '';
  container.appendChild(el('div', { class: 'reg-compat-widget reg-compat-loading' },
    el('div', { class: 'reg-compat-header' },
      el('span', { class: 'reg-compat-title' }, 'Loading compatibility data\u2026'),
    ),
  ));
}

function injectStyles(): void {
  if (document.getElementById('reg-compat-styles')) return;

  // Use CSS vars from MkDocs Material theme if available, else fall back
  const css = `
.reg-compat-widget {
  background: var(--reg-bg-soft, var(--md-code-bg-color, #0c101c));
  border: 1px solid var(--reg-border, var(--md-border-color, rgba(255,255,255,0.08)));
  border-radius: 12px;
  padding: 0;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--reg-text, var(--md-default-fg-color, #f4f6fb));
  overflow: hidden;
  max-width: 100%;
  margin: 1.5rem 0;
}
.reg-compat-loading {
  padding: 1rem 1.25rem;
  opacity: 0.6;
}
.reg-compat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--reg-border, rgba(255,255,255,0.08));
  background: var(--reg-bg, var(--md-default-bg-color, #05060a));
}
.reg-compat-title {
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--reg-text-muted, var(--md-default-fg-color--light, #b2bed1));
}
.reg-compat-score {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--reg-text, #f4f6fb);
}
.reg-compat-bar {
  display: inline-block;
  width: 60px;
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  overflow: hidden;
}
.reg-compat-bar-fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s;
}
.reg-compat-specs {
  border-bottom: 1px solid var(--reg-border, rgba(255,255,255,0.08));
}
.reg-compat-specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.reg-compat-spec-label {
  padding: 0.25rem 0.5rem 0.25rem 1.25rem;
  color: var(--reg-text-muted, var(--md-default-fg-color--light, #b2bed1));
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  width: 110px;
}
.reg-compat-spec-value {
  padding: 0.25rem 1.25rem 0.25rem 0.5rem;
  color: var(--reg-text, #f4f6fb);
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
  font-size: 0.8rem;
}
.reg-compat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.reg-compat-cat-row td {
  padding: 0.5rem 1.25rem 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--reg-text-muted, var(--md-default-fg-color--light, #b2bed1));
  border-top: 1px solid var(--reg-border, rgba(255,255,255,0.08));
}
.reg-compat-cat-row:first-child td {
  border-top: none;
}
.reg-compat-feat-row {
  cursor: default;
}
.reg-compat-feat-row:hover {
  background: rgba(255,255,255,0.03);
}
.reg-compat-feat-name {
  padding: 0.2rem 0.5rem 0.2rem 1.25rem;
  color: var(--reg-text, #f4f6fb);
}
.reg-compat-feat-status {
  padding: 0.2rem 1.25rem 0.2rem 0.5rem;
  text-align: right;
  white-space: nowrap;
  font-size: 0.78rem;
}
.reg-compat-icon {
  margin-right: 0.3rem;
}
.reg-compat-s-works { color: #22c55e; }
.reg-compat-s-partial { color: #f59e0b; }
.reg-compat-s-broken { color: #ef4444; }
.reg-compat-s-na { color: #6b7280; }
.reg-compat-s-untested { color: #374151; }
.reg-compat-footer {
  padding: 0.6rem 1.25rem;
  font-size: 0.78rem;
  color: var(--reg-text-muted, var(--md-default-fg-color--light, #b2bed1));
  border-top: 1px solid var(--reg-border, rgba(255,255,255,0.08));
  background: var(--reg-bg, var(--md-default-bg-color, #05060a));
}
.reg-compat-footer a {
  color: var(--reg-accent, var(--md-accent-fg-color, #2bb0e9));
  text-decoration: none;
}
.reg-compat-footer a:hover {
  text-decoration: underline;
}
.reg-compat-date {
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
}
.reg-compat-error {
  padding: 1rem 1.25rem;
  color: #ef4444;
}
`;

  const style = document.createElement('style');
  style.id = 'reg-compat-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

async function initWidget(container: HTMLElement): Promise<void> {
  const rawAttr = container.getAttribute('data-reg-compat');
  if (!rawAttr) return;

  // Strip flags like ":specs" from the device ID
  const deviceId = rawAttr.split(':')[0];

  renderLoading(container);

  try {
    const res = await fetch(`${API}/api/device/${encodeURIComponent(deviceId)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: DeviceResponse = await res.json();
    renderWidget(container, data);
  } catch {
    renderError(container, deviceId, 'Could not load compatibility data.');
  }
}

function init(): void {
  injectStyles();
  const containers = document.querySelectorAll<HTMLElement>('[data-reg-compat]');
  containers.forEach(c => initWidget(c));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
