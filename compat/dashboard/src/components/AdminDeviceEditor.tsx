import { useState, useEffect } from 'react';
import { fetchAdminDevice, updateAdminDevice, fetchMe, type AdminDeviceResponse, type DeviceStatus, type MeResponse } from '../lib/api';

const STATUSES: DeviceStatus[] = ['released', 'testing', 'wip', 'todo'];

const STATUS_COLORS: Record<DeviceStatus, string> = {
  released: '#22c55e',
  testing: '#3b82f6',
  wip: '#f59e0b',
  todo: '#6b7280',
};

export function AdminDeviceEditor() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [data, setData] = useState<AdminDeviceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<DeviceStatus>('todo');

  // Extract device ID from URL
  const deviceId = typeof window !== 'undefined'
    ? window.location.pathname.split('/admin/device/')[1]?.replace(/\/$/, '') || ''
    : '';

  useEffect(() => {
    if (!deviceId || deviceId === '_') return;
    fetchMe().then(setUser);
    fetchAdminDevice(deviceId)
      .then(d => {
        setData(d);
        setTitle(d.overrides.title || d.device.title || '');
        setBrand(d.overrides.brand || d.device.brand || '');
        setImage(d.overrides.image || d.device.image || '');
        setStatus((d.overrides.status || d.device.status || 'todo') as DeviceStatus);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [deviceId]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const fields: Record<string, string> = {};
      if (title !== (data.device.title || '')) fields.title = title;
      if (brand !== (data.device.brand || '')) fields.brand = brand;
      if (image !== (data.device.image || '')) fields.image = image;
      fields.status = status; // always include status
      const result = await updateAdminDevice(deviceId, fields, data.sha);
      setData({ ...data, sha: result.sha, overrides: { ...data.overrides, ...fields } });
      setSuccess('Saved. Changes will deploy in a few minutes.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    }
    setSaving(false);
  }

  if (!deviceId || deviceId === '_') {
    return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>No device selected.</div>;
  }
  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading {deviceId}...</div>;
  if (error === 'not_authenticated') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>
      <a href={`/api/auth/github?redirect=/admin/device/${deviceId}`} style={{ color: 'var(--accent)' }}>Sign in with GitHub</a>
    </div>;
  }
  if (error === 'not_admin') {
    return <div style={{ padding: '2rem', color: '#ef4444' }}>
      Access denied ({user?.username}).
    </div>;
  }
  if (!data) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;

  const d = data.device;

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        {d.image && <img src={d.image.startsWith('http') ? d.image : `https://reglinux.org${d.image}`}
          alt={d.title} style={{ width: 80, height: 60, objectFit: 'contain', borderRadius: 8 }} />}
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>{d.title}</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {deviceId} · {d.type} · {d.soc_name || 'unknown SoC'} · {d.arch || 'unknown arch'}
          </span>
        </div>
      </div>

      {error && !['not_authenticated', 'not_admin'].includes(error) && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.15)', borderRadius: 8,
          color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>
      )}
      {success && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(34,197,94,0.15)', borderRadius: 8,
          color: '#86efac', fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{
                padding: '0.4rem 1rem', borderRadius: '999px', cursor: 'pointer',
                border: status === s ? `2px solid ${STATUS_COLORS[s]}` : '1px solid var(--border)',
                background: status === s ? `${STATUS_COLORS[s]}22` : 'transparent',
                color: status === s ? STATUS_COLORS[s] : 'var(--text-muted)',
                fontSize: '0.8rem', fontWeight: 600,
              }}>
                {s}
              </button>
            ))}
          </div>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Title</span>
          <input value={title} onChange={e => setTitle(e.target.value)} style={{
            padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.9rem',
          }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Brand</span>
          <input value={brand} onChange={e => setBrand(e.target.value)} style={{
            padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.9rem',
          }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Image URL</span>
          <input value={image} onChange={e => setImage(e.target.value)} style={{
            padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
          }} />
        </label>

        <button onClick={handleSave} disabled={saving} style={{
          padding: '0.6rem 1.5rem', borderRadius: '999px', border: 'none',
          background: saving ? 'var(--text-muted)' : 'var(--accent)',
          color: '#000', fontSize: '0.9rem', fontWeight: 600, cursor: saving ? 'wait' : 'pointer',
          alignSelf: 'flex-start',
        }}>
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <strong>Device info (read-only):</strong>
        <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.2rem 1rem' }}>
          <span>SoC:</span><span>{d.soc_name || '—'}</span>
          <span>Arch:</span><span>{d.arch || '—'}</span>
          <span>CPU:</span><span>{d.cpu_model || '—'} ({d.cpu_cores || '?'} cores @ {d.cpu_clock || '?'})</span>
          <span>GPU:</span><span>{d.gpu_model || '—'}</span>
          <span>Display:</span><span>{d.display_size || '—'} {d.display_res || ''}</span>
          <span>RAM:</span><span>{d.ram || '—'}</span>
          <span>WiFi:</span><span>{d.wifi_chip || '—'}</span>
        </div>
      </div>
    </div>
  );
}
