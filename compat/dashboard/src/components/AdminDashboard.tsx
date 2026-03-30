import { useState, useEffect } from 'react';
import { fetchAdminStats, type AdminStatsResponse } from '../lib/api';

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminStats()
      .then(data => { setStats(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading stats...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;
  if (!stats) return null;

  const coveragePct = stats.total_devices > 0
    ? Math.round((stats.tested_devices / stats.total_devices) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
        <StatCard label="Total Devices" value={stats.total_devices} />
        <StatCard label="Tested" value={stats.tested_devices} accent="#22c55e"
          sub={`${coveragePct}%`} />
        <StatCard label="Untested" value={stats.untested_devices}
          accent={stats.untested_devices > 0 ? '#f59e0b' : '#22c55e'} />
        <StatCard label="Stale (>90d)" value={stats.stale_devices.length}
          accent={stats.stale_devices.length > 0 ? '#ef4444' : '#22c55e'} />
        <StatCard label="Last 24h" value={stats.recent_24h} accent="#3b82f6" />
        <StatCard label="Last 7d" value={stats.recent_7d} accent="#3b82f6" />
      </div>

      {/* Coverage by type */}
      <Section title="Coverage by Type">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {stats.coverage_by_type.map(t => (
            <CoverageBar key={t.type} label={t.type} tested={t.tested} total={t.total} />
          ))}
        </div>
      </Section>

      {/* Coverage by feature */}
      <Section title="Coverage by Feature">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.4rem' }}>
          {stats.coverage_by_feature.map(f => (
            <CoverageBar key={f.id} label={f.label} tested={f.tested} total={f.total} compact />
          ))}
        </div>
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Recent submissions */}
        <Section title="Recent Submissions">
          {stats.recent_submissions.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No submissions yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {stats.recent_submissions.map((s, i) => (
                <a key={i} href={`/device/${s.device_id}`} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  gap: '0.5rem', alignItems: 'center',
                  padding: '0.4rem 0.6rem', borderRadius: '6px',
                  textDecoration: 'none', color: 'var(--text)', fontSize: '0.8rem',
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <strong>{s.device_title}</strong>
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                    {s.author} · {s.feature_count}f
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                    {timeAgo(s.submitted_at)}
                  </span>
                </a>
              ))}
            </div>
          )}
        </Section>

        {/* Top testers + Stale devices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Section title="Top Testers">
            {stats.top_testers.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No testers yet</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {stats.top_testers.map((t, i) => (
                  <div key={t.author} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.35rem 0.6rem', fontSize: '0.8rem',
                  }}>
                    <span style={{ color: 'var(--text-muted)', width: '1.2rem', textAlign: 'right', fontSize: '0.7rem' }}>
                      {i + 1}.
                    </span>
                    <span style={{ flex: 1 }}>{t.author}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
                      {t.devices}d · {t.results}r
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Stale Devices (>90 days)">
            {stats.stale_devices.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#22c55e' }}>All tested devices are fresh</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {stats.stale_devices.map(d => (
                  <a key={d.id} href={`/admin/device/${d.id}`} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.35rem 0.6rem', borderRadius: '6px',
                    textDecoration: 'none', color: 'var(--text)', fontSize: '0.8rem',
                    transition: 'background 0.1s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {d.title}
                    </span>
                    <span style={{ color: '#ef4444', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      {d.last_tested}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatCard({ label, value, accent, sub }: {
  label: string; value: number; accent?: string; sub?: string;
}) {
  return (
    <div style={{
      padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
      background: 'var(--card)', border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
        <span style={{
          fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
          color: accent ?? 'var(--text)',
        }}>
          {value}
        </span>
        {sub && <span style={{ fontSize: '0.85rem', color: accent ?? 'var(--text-muted)' }}>{sub}</span>}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        margin: '0 0 0.6rem', fontFamily: 'var(--font-heading)',
        fontSize: '0.95rem', fontWeight: 600,
      }}>{title}</h3>
      {children}
    </div>
  );
}

function CoverageBar({ label, tested, total, compact }: {
  label: string; tested: number; total: number; compact?: boolean;
}) {
  const pct = total > 0 ? Math.round((tested / total) * 100) : 0;
  const color = pct >= 75 ? '#22c55e' : pct >= 40 ? '#f59e0b' : pct > 0 ? '#ef4444' : '#374151';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{
        fontSize: compact ? '0.75rem' : '0.8rem', color: 'var(--text-muted)',
        width: compact ? '85px' : '70px', flexShrink: 0,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: compact ? 6 : 8, borderRadius: 999,
        background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', borderRadius: 999,
          background: color, transition: 'width 0.4s ease',
          minWidth: pct > 0 ? '2px' : 0,
        }} />
      </div>
      <span style={{
        fontSize: compact ? '0.65rem' : '0.7rem', fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)', width: '3.5rem', textAlign: 'right', flexShrink: 0,
      }}>
        {tested}/{total}
      </span>
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr + (dateStr.includes('Z') ? '' : 'Z')).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(then).toLocaleDateString();
}
