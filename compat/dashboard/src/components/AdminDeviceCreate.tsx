import { useState, useEffect } from 'react';
import { fetchAdminSocs, createDevice, type AdminSoC } from '../lib/api';

const DEVICE_TYPES = ['handheld', 'sbc', 'tvbox', 'pc', 'console'];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function AdminDeviceCreate({ onCreated }: { onCreated?: (id: string) => void }) {
  const [socs, setSocs] = useState<AdminSoC[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [idManual, setIdManual] = useState(false);
  const [brand, setBrand] = useState('');
  const [type, setType] = useState('handheld');
  const [socSlug, setSocSlug] = useState('');
  const [socSearch, setSocSearch] = useState('');

  useEffect(() => {
    fetchAdminSocs()
      .then(d => { setSocs(d.socs); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  // Auto-generate ID from title unless manually edited
  useEffect(() => {
    if (!idManual && title) {
      setId(slugify(title));
    }
  }, [title, idManual]);

  const selectedSoc = socs.find(s => s.soc_slug === socSlug);
  const filteredSocs = socSearch
    ? socs.filter(s =>
        s.soc_name?.toLowerCase().includes(socSearch.toLowerCase()) ||
        s.soc_slug.toLowerCase().includes(socSearch.toLowerCase())
      )
    : socs;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !brand || !id) return;
    setSaving(true);
    setError(null);
    try {
      const result = await createDevice({
        id, title, brand, type,
        soc_slug: socSlug || undefined,
      });
      onCreated?.(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Creation failed');
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading SoCs...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
      <h2 style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
        Add Device
      </h2>

      {error && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.15)', borderRadius: 8,
          color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Title */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Title *</span>
          <input value={title} onChange={e => setTitle(e.target.value)} required
            placeholder="e.g. Anbernic RG35XX Plus" style={inputStyle} />
        </label>

        {/* ID */}
        <label style={labelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={labelTextStyle}>ID *</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
              {idManual ? '(manual)' : '(auto from title)'}
            </span>
          </div>
          <input value={id} required
            onChange={e => { setId(e.target.value); setIdManual(true); }}
            placeholder="e.g. anbernic-rg35xx-plus"
            style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }} />
        </label>

        {/* Brand */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Brand *</span>
          <input value={brand} onChange={e => setBrand(e.target.value)} required
            placeholder="e.g. Anbernic" style={inputStyle} />
        </label>

        {/* Type */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>Type *</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {DEVICE_TYPES.map(t => (
              <button key={t} type="button" onClick={() => setType(t)} style={{
                padding: '0.4rem 0.8rem', borderRadius: '999px', cursor: 'pointer',
                border: type === t ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: type === t ? 'rgba(43,176,233,0.15)' : 'transparent',
                color: type === t ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.8rem', fontWeight: 600,
              }}>
                {t}
              </button>
            ))}
          </div>
        </label>

        {/* SoC selector */}
        <label style={labelStyle}>
          <span style={labelTextStyle}>System-on-Chip</span>
          <input value={socSearch} onChange={e => { setSocSearch(e.target.value); setSocSlug(''); }}
            placeholder="Search SoC..." style={inputStyle} />
          {socSearch && !socSlug && (
            <div style={{
              maxHeight: '200px', overflowY: 'auto', border: '1px solid var(--border)',
              borderRadius: '8px', background: 'var(--bg-soft)', marginTop: '4px',
            }}>
              {filteredSocs.length === 0 ? (
                <div style={{ padding: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>No match</div>
              ) : filteredSocs.slice(0, 20).map(s => (
                <button key={s.soc_slug} type="button" onClick={() => { setSocSlug(s.soc_slug); setSocSearch(s.soc_name || s.soc_slug); }}
                  style={{
                    display: 'block', width: '100%', padding: '0.4rem 0.6rem',
                    background: 'transparent', border: 'none', color: 'var(--text)',
                    fontSize: '0.8rem', textAlign: 'left', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <strong>{s.soc_name}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginLeft: '0.5rem' }}>
                    {s.arch} · {s.cpu_model} · {s.gpu_model || 'no GPU'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </label>

        {/* Selected SoC info */}
        {selectedSoc && (
          <div style={{
            padding: '0.75rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', fontSize: '0.8rem',
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0.4rem', color: 'var(--accent)' }}>
              {selectedSoc.soc_name}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.2rem 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Arch:</span><span style={{ color: 'var(--text)' }}>{selectedSoc.arch}</span>
              <span>CPU:</span><span>{selectedSoc.cpu_model} ({selectedSoc.cpu_cores} cores @ {selectedSoc.cpu_clock})</span>
              <span>GPU:</span><span>{selectedSoc.gpu_model || '—'} ({selectedSoc.gpu_driver || '?'})</span>
              <span>Kernel:</span><span>{selectedSoc.kernel || '—'}</span>
            </div>
          </div>
        )}

        {/* Warning if no SoC */}
        {!socSlug && (
          <div style={{
            padding: '0.5rem 0.75rem', background: 'rgba(245,158,11,0.1)', borderRadius: 8,
            color: '#fbbf24', fontSize: '0.8rem',
          }}>
            No SoC selected. Device will have no CPU/GPU/arch data and won't appear in arch filters.
          </div>
        )}

        <button type="submit" disabled={saving || !title || !brand || !id} style={{
          padding: '0.6rem 1.5rem', borderRadius: '999px', border: 'none',
          background: saving ? 'var(--text-muted)' : 'var(--accent)',
          color: '#000', fontSize: '0.9rem', fontWeight: 600,
          cursor: saving ? 'wait' : 'pointer', alignSelf: 'flex-start',
        }}>
          {saving ? 'Creating...' : 'Create Device'}
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '0.3rem',
};

const labelTextStyle: React.CSSProperties = {
  fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.9rem',
};
