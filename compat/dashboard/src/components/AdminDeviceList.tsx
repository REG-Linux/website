import { useState, useEffect } from 'react';
import { fetchAdminDevices, fetchMe, type AdminDevice, type DeviceStatus, type MeResponse } from '../lib/api';

const STATUS_COLORS: Record<DeviceStatus, string> = {
  released: '#22c55e',
  testing: '#3b82f6',
  wip: '#f59e0b',
  todo: '#6b7280',
};

const STATUS_LABELS: Record<DeviceStatus, string> = {
  released: 'Released',
  testing: 'Testing',
  wip: 'WIP',
  todo: 'Planned',
};

export function AdminDeviceList() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [devices, setDevices] = useState<AdminDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchMe().then(setUser);
    fetchAdminDevices()
      .then(data => { setDevices(data.devices); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>;
  if (error === 'not_authenticated') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Sign in to access admin.</p>
      <a href="/api/auth/github?redirect=/admin" style={{ color: 'var(--accent)' }}>Sign in with GitHub</a>
    </div>;
  }
  if (error === 'not_admin') {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>
      Access denied. Your GitHub account ({user?.username}) is not in the admin list.
    </div>;
  }
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;

  const q = search.toLowerCase();
  const filtered = devices.filter(d => {
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    if (typeFilter !== 'all' && d.type !== typeFilter) return false;
    if (q && !d.title.toLowerCase().includes(q) && !d.brand.toLowerCase().includes(q) && !d.id.includes(q)) return false;
    return true;
  });

  const statusCounts = devices.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
          Devices ({devices.length})
        </h2>
        {user && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Signed in as {user.username}</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {(['all', 'released', 'testing', 'wip', 'todo'] as const).map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: '0.25rem 0.7rem', borderRadius: '999px', border: '1px solid var(--border)',
            background: statusFilter === s ? (s === 'all' ? 'var(--accent)' : STATUS_COLORS[s]) : 'transparent',
            color: statusFilter === s ? '#000' : 'var(--text-muted)',
            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
          }}>
            {s === 'all' ? 'All' : STATUS_LABELS[s]} {s === 'all' ? '' : `(${statusCounts[s] || 0})`}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['all', 'handheld', 'sbc', 'tvbox', 'pc', 'console'].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} style={{
            padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid var(--border)',
            background: typeFilter === t ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: typeFilter === t ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.7rem', cursor: 'pointer',
          }}>
            {t === 'all' ? 'All types' : t}
          </button>
        ))}
      </div>

      <input
        type="text" placeholder="Search by name, brand, or ID..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '0.5rem 0.75rem', marginBottom: '1rem',
          background: 'var(--bg-soft)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.85rem',
        }}
      />

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        {filtered.length} device{filtered.length !== 1 ? 's' : ''}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {filtered.map(d => (
          <a key={d.id} href={`/admin/device/${d.id}`} style={{
            display: 'grid', gridTemplateColumns: '1fr auto auto',
            gap: '0.5rem', alignItems: 'center',
            padding: '0.5rem 0.75rem',
            background: 'var(--card)', borderRadius: '6px',
            textDecoration: 'none', color: 'var(--text)',
            fontSize: '0.85rem', transition: 'background 0.1s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
          >
            <div>
              <strong>{d.title}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                {d.brand} · {d.type}
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {d.soc_name || '—'}
            </span>
            <span style={{
              padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600,
              background: `${STATUS_COLORS[d.status]}22`, color: STATUS_COLORS[d.status],
            }}>
              {STATUS_LABELS[d.status]}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
