import { useState, useEffect, useRef } from 'react';
import { fetchAdminDevices, fetchMe, patchDeviceStatus, bulkUpdateStatus, type AdminDevice, type DeviceStatus, type MeResponse } from '../lib/api';

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

const ALL_STATUSES: DeviceStatus[] = ['released', 'testing', 'wip', 'todo'];

export function AdminDeviceList() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [devices, setDevices] = useState<AdminDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Inline status editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [patchingId, setPatchingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Bulk selection
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkUpdating, setBulkUpdating] = useState(false);

  useEffect(() => {
    fetchMe().then(setUser);
    fetchAdminDevices()
      .then(data => { setDevices(data.devices); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEditingId(null);
      }
    }
    if (editingId) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [editingId]);

  async function handleStatusChange(deviceId: string, newStatus: DeviceStatus) {
    setEditingId(null);
    setPatchingId(deviceId);
    try {
      await patchDeviceStatus(deviceId, newStatus);
      setDevices(prev => prev.map(d =>
        d.id === deviceId ? { ...d, status: newStatus } : d
      ));
    } catch (err) {
      alert(`Failed to update status: ${err instanceof Error ? err.message : 'unknown error'}`);
    }
    setPatchingId(null);
  }

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll(filteredIds: string[]) {
    if (selected.size === filteredIds.length && filteredIds.every(id => selected.has(id))) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredIds));
    }
  }

  async function handleBulkStatus(newStatus: DeviceStatus) {
    if (selected.size === 0) return;
    if (!confirm(`Set ${selected.size} device(s) to "${newStatus}"?`)) return;
    setBulkUpdating(true);
    try {
      await bulkUpdateStatus(Array.from(selected), newStatus);
      setDevices(prev => prev.map(d =>
        selected.has(d.id) ? { ...d, status: newStatus } : d
      ));
      setSelected(new Set());
    } catch (err) {
      alert(`Bulk update failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
    setBulkUpdating(false);
  }

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
  const filteredIds = filtered.map(d => d.id);

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
          <button key={s} onClick={() => { setStatusFilter(s); setSelected(new Set()); }} style={{
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
          <button key={t} onClick={() => { setTypeFilter(t); setSelected(new Set()); }} style={{
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
        value={search} onChange={e => { setSearch(e.target.value); setSelected(new Set()); }}
        style={{
          width: '100%', padding: '0.5rem 0.75rem', marginBottom: '1rem',
          background: 'var(--bg-soft)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.85rem',
        }}
      />

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem',
          marginBottom: '0.75rem', background: 'rgba(43,176,233,0.1)', borderRadius: '8px',
          fontSize: '0.8rem', flexWrap: 'wrap',
        }}>
          <span style={{ fontWeight: 600 }}>{selected.size} selected</span>
          <span style={{ color: 'var(--text-muted)' }}>Set to:</span>
          {ALL_STATUSES.map(s => (
            <button key={s} onClick={() => handleBulkStatus(s)} disabled={bulkUpdating} style={{
              padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600,
              border: `1px solid ${STATUS_COLORS[s]}44`, background: `${STATUS_COLORS[s]}15`,
              color: STATUS_COLORS[s], cursor: bulkUpdating ? 'wait' : 'pointer',
            }}>
              {STATUS_LABELS[s]}
            </button>
          ))}
          <button onClick={() => setSelected(new Set())} style={{
            padding: '0.2rem 0.6rem', borderRadius: '999px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-muted)', fontSize: '0.7rem', cursor: 'pointer',
            marginLeft: 'auto',
          }}>
            Clear
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <input type="checkbox"
          checked={filteredIds.length > 0 && filteredIds.every(id => selected.has(id))}
          onChange={() => toggleSelectAll(filteredIds)}
          style={{ cursor: 'pointer' }}
        />
        <span>{filtered.length} device{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {filtered.map(d => (
          <div key={d.id} style={{
            display: 'grid', gridTemplateColumns: 'auto 1fr auto auto',
            gap: '0.5rem', alignItems: 'center',
            padding: '0.5rem 0.75rem',
            background: selected.has(d.id) ? 'rgba(43,176,233,0.06)' : 'var(--card)',
            borderRadius: '6px',
            fontSize: '0.85rem', transition: 'background 0.1s',
          }}
            onMouseEnter={e => { if (!selected.has(d.id)) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = selected.has(d.id) ? 'rgba(43,176,233,0.06)' : 'var(--card)'; }}
          >
            <input type="checkbox" checked={selected.has(d.id)}
              onChange={() => toggleSelect(d.id)} style={{ cursor: 'pointer' }} />
            <a href={`/admin/device/${d.id}`} style={{
              textDecoration: 'none', color: 'var(--text)', overflow: 'hidden',
            }}>
              <strong>{d.title}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
                {d.brand} · {d.type}
              </span>
            </a>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {d.soc_name || '—'}
            </span>
            {/* Inline status badge — click to edit */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => { e.stopPropagation(); setEditingId(editingId === d.id ? null : d.id); }}
                disabled={patchingId === d.id}
                style={{
                  padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600,
                  background: `${STATUS_COLORS[d.status]}22`, color: STATUS_COLORS[d.status],
                  border: `1px solid ${STATUS_COLORS[d.status]}44`,
                  cursor: patchingId === d.id ? 'wait' : 'pointer',
                  opacity: patchingId === d.id ? 0.5 : 1,
                  transition: 'border-color 0.15s',
                }}
                title="Click to change status"
              >
                {patchingId === d.id ? '...' : STATUS_LABELS[d.status]}
              </button>
              {editingId === d.id && (
                <div ref={dropdownRef} style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: '4px',
                  background: 'var(--bg-soft)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '4px', zIndex: 20,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                  display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '100px',
                }}>
                  {ALL_STATUSES.map(s => (
                    <button key={s}
                      onClick={(e) => { e.stopPropagation(); handleStatusChange(d.id, s); }}
                      style={{
                        padding: '0.35rem 0.6rem', borderRadius: '6px', border: 'none',
                        background: d.status === s ? `${STATUS_COLORS[s]}22` : 'transparent',
                        color: STATUS_COLORS[s], fontSize: '0.75rem', fontWeight: 600,
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${STATUS_COLORS[s]}15`)}
                      onMouseLeave={e => (e.currentTarget.style.background = d.status === s ? `${STATUS_COLORS[s]}22` : 'transparent')}
                    >
                      {d.status === s ? `• ${STATUS_LABELS[s]}` : STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
