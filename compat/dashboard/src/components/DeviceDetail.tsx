import { useState, useEffect } from 'react';
import type { DeviceResponse, Feature, ResultEntry, Status } from '../lib/api';
import { fetchDevice } from '../lib/api';
import { StatusBadge, STATUS_META } from './StatusBadge';

interface Props {
  deviceId: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  boot: 'Boot', display: 'Display', connectivity: 'Connectivity',
  system: 'System', controls: 'Controls', gpu: 'GPU',
};

export function DeviceDetail({ deviceId }: Props) {
  const [data, setData] = useState<DeviceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevice(deviceId).then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
  }, [deviceId]);

  if (loading) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>Loading device data...</p>;
  if (error) return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem', maxWidth: 500, margin: '2rem auto' }}>
      <div style={{ color: 'var(--status-broken)', marginBottom: '0.5rem' }}>Error: {error}</div>
    </div>
  );
  if (!data) return <p>Device not found.</p>;

  const { device, features, latest, history } = data;

  const grouped = new Map<string, Feature[]>();
  for (const f of features) {
    const list = grouped.get(f.category) ?? [];
    list.push(f);
    grouped.set(f.category, list);
  }

  // Compute score
  let works = 0, partial = 0, naCount = 0;
  for (const fid of features.map(f => f.id)) {
    const s = latest[fid]?.status ?? 'untested';
    if (s === 'works') works++;
    else if (s === 'partial') partial++;
    else if (s === 'na') naCount++;
  }
  const denom = features.length - naCount;
  const score = denom > 0 ? Math.round(((works + partial * 0.5) / denom) * 100) : 0;

  const specs = [
    device.display_size && device.display_res && { label: 'Display', value: `${device.display_size} ${device.display_res}` },
    device.ram && { label: 'RAM', value: device.ram },
    device.storage && { label: 'Storage', value: device.storage },
    device.wifi_chip && { label: 'WiFi Chip', value: device.wifi_chip },
    device.compositor && { label: 'Compositor', value: device.compositor },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div>
      {/* Hero */}
      <div style={{
        display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap',
        padding: '1.5rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
      }}>
        {device.image && !device.image.includes('placeholder') && (
          <img src={device.image} alt={device.title} style={{
            width: 140, borderRadius: 'var(--radius-sm)', background: 'var(--card)',
            border: '1px solid var(--border)',
          }} />
        )}
        <div style={{ flex: 1, minWidth: 250 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)' }}>{device.title}</h1>
            <TypeBadge type={device.type} />
            <ScorePill score={score} />
          </div>

          {/* SoC / CPU / GPU row */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            {device.soc_name && <Spec label="SoC" value={device.soc_name} />}
            {device.cpu_model && <Spec label="CPU" value={`${device.cpu_model}${device.cpu_cores ? ` (${device.cpu_cores})` : ''}${device.cpu_clock ? ` @ ${device.cpu_clock}` : ''}`} />}
            {device.arch && <Spec label="Arch" value={device.arch} mono />}
            {device.kernel && <Spec label="Kernel" value={device.kernel} mono />}
          </div>

          {device.gpu_model && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <Spec label="GPU" value={`${device.gpu_model}${device.gpu_driver ? ` (${device.gpu_driver})` : ''}${device.gpu_api ? ` \u2014 ${device.gpu_api}` : ''}`} />
            </div>
          )}

          {/* Extra specs */}
          {specs.length > 0 && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              {specs.map(s => <Spec key={s.label} label={s.label} value={s.value} />)}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
            <a href={`/submit?device=${device.id}`} className="btn btn-accent">Submit test for this device</a>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Feature Status</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {[...grouped.entries()].map(([category, feats]) => (
          <div key={category} className="card" style={{ padding: '1rem' }}>
            <h3 style={{
              fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0 0 0.75rem',
              textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)',
            }}>
              {CATEGORY_LABELS[category] ?? category}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {feats.map(f => {
                const r: ResultEntry = latest[f.id] ?? { status: 'untested' as Status };
                const meta = STATUS_META[r.status] ?? STATUS_META.untested;
                return (
                  <div key={f.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.35rem 0.5rem', borderRadius: 8,
                    borderLeft: `3px solid ${meta.color}`,
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    <StatusBadge status={r.status} size="md" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>{f.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {r.build_date ? `${r.build_date} by @${r.author}` : r.status === 'na' ? 'Not applicable' : 'Untested'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Install notes */}
      {device.install_notes && (
        <>
          <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem', fontFamily: 'var(--font-heading)' }}>Installation</h2>
          <div className="card" style={{ padding: '1.25rem 1.5rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            {device.install_notes.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <br key={i} />;
              if (trimmed.startsWith('### ')) return <h3 key={i} style={{ fontSize: '0.95rem', color: 'var(--text)', margin: '0.75rem 0 0.25rem', fontFamily: 'var(--font-heading)' }}>{trimmed.slice(4)}</h3>;
              if (trimmed.startsWith('- ')) return <li key={i} style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}>{trimmed.slice(2)}</li>;
              return <p key={i} style={{ margin: '0.3rem 0' }}>{trimmed}</p>;
            })}
          </div>
        </>
      )}

      {/* Regressions */}
      {history.length >= 2 && (() => {
        const regressions = detectRegressions(history, features);
        if (regressions.length === 0) return null;
        return (
          <>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem', fontFamily: 'var(--font-heading)', color: 'var(--status-broken)' }}>
              Regressions Detected
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
              {regressions.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)',
                }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{r.featureLabel}</span>
                  <StatusBadge status={r.prevStatus} size="sm" />
                  <span style={{ color: 'var(--text-muted)' }}>{'\u2192'}</span>
                  <StatusBadge status={r.newStatus} size="sm" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                    {r.prevDate} {'\u2192'} {r.newDate}
                  </span>
                </div>
              ))}
            </div>
          </>
        );
      })()}

      {/* History */}
      <h2 style={{ fontSize: '1.1rem', margin: '0 0 1rem', fontFamily: 'var(--font-heading)' }}>Test History</h2>
      {history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No test results yet. <a href={`/submit?device=${device.id}`}>Be the first to submit one.</a>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <table style={{ borderCollapse: 'collapse', width: 'max-content', minWidth: '100%', fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Author</th>
                {features.map(f => <th key={f.id} style={{ ...thStyle, writingMode: 'vertical-rl', transform: 'rotate(180deg)', maxWidth: '2rem', textAlign: 'center' }}>{f.label}</th>)}
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => {
                const prevEntry = i < history.length - 1 ? history[i + 1] : null;
                return (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                }}>
                  <td style={tdStyle} className="mono">{h.build_date}</td>
                  <td style={tdStyle}>{h.author ? `@${h.author}` : '\u2014'}</td>
                  {features.map(f => {
                    const status = h.results[f.id] as Status | undefined;
                    const prevStatus = prevEntry?.results[f.id] as Status | undefined;
                    const regressed = status && prevStatus && isWorse(status, prevStatus);
                    const improved = status && prevStatus && isWorse(prevStatus, status);
                    return (
                      <td key={f.id} style={{
                        ...tdStyle, textAlign: 'center',
                        background: regressed ? 'rgba(239,68,68,0.08)' : improved ? 'rgba(34,197,94,0.06)' : undefined,
                      }}>
                        {status ? <StatusBadge status={status} size="sm" /> : ''}
                        {regressed && <span title="Regression" style={{ fontSize: '0.6rem' }}>{'\u25BC'}</span>}
                        {improved && <span title="Improved" style={{ fontSize: '0.6rem', color: 'var(--status-works)' }}>{'\u25B2'}</span>}
                      </td>
                    );
                  })}
                  <td style={{ ...tdStyle, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-muted)' }}>
                    {h.notes || '\u2014'}
                  </td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Sub-components ---

function Spec({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <span>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label} </span>
      <span style={{ color: 'var(--text)', fontFamily: mono ? 'var(--font-mono)' : undefined, fontSize: mono ? '0.8rem' : undefined }}>{value}</span>
    </span>
  );
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 70 ? 'var(--status-works)' : score >= 40 ? 'var(--status-partial)' : score > 0 ? 'var(--status-broken)' : 'var(--status-untested)';
  return (
    <span style={{
      padding: '0.15rem 0.6rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
      color, background: `${color}18`,
    }}>
      {score > 0 ? `${score}%` : 'Untested'}
    </span>
  );
}

const TYPE_COLORS: Record<string, string> = {
  handheld: '#2bb0e9', sbc: '#a78bfa', tvbox: '#f59e0b', console: '#22c55e', pc: '#f472b6', unknown: '#6b7280',
};

function TypeBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? TYPE_COLORS.unknown;
  return (
    <span style={{
      fontSize: '0.72rem', padding: '0.1rem 0.5rem', borderRadius: 999,
      color, background: `${color}18`, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.03em',
    }}>
      {type === 'tvbox' ? 'TV Box' : type}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  padding: '0.5rem 0.6rem', textAlign: 'left', background: 'var(--bg-soft)',
  borderBottom: '1px solid var(--border)', fontSize: '0.72rem',
  color: 'var(--text-muted)', fontWeight: 600, fontFamily: 'var(--font-heading)',
  letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '0.35rem 0.6rem', whiteSpace: 'nowrap',
};

// --- Regression detection ---

const STATUS_RANK: Record<string, number> = { works: 0, partial: 1, broken: 2, na: 3, untested: 3 };

function isWorse(newStatus: string, oldStatus: string): boolean {
  return (STATUS_RANK[newStatus] ?? 3) > (STATUS_RANK[oldStatus] ?? 3);
}

interface Regression {
  featureId: string;
  featureLabel: string;
  prevStatus: Status;
  newStatus: Status;
  prevDate: string;
  newDate: string;
}

function detectRegressions(history: Array<{ build_date: string; results: Record<string, string> }>, features: Feature[]): Regression[] {
  if (history.length < 2) return [];

  const regressions: Regression[] = [];
  const newest = history[0];
  const previous = history[1];

  const featureMap = new Map(features.map(f => [f.id, f.label]));

  for (const [fid, newStatus] of Object.entries(newest.results)) {
    const prevStatus = previous.results[fid];
    if (prevStatus && isWorse(newStatus, prevStatus)) {
      regressions.push({
        featureId: fid,
        featureLabel: featureMap.get(fid) ?? fid,
        prevStatus: prevStatus as Status,
        newStatus: newStatus as Status,
        prevDate: previous.build_date,
        newDate: newest.build_date,
      });
    }
  }

  return regressions;
}
