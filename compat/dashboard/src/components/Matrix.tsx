import { useState, useEffect, useMemo } from 'react';
import type { MatrixResponse, MatrixDevice, Feature, Status, MeResponse } from '../lib/api';
import { fetchMatrix, fetchMe } from '../lib/api';
import { StatusBadge } from './StatusBadge';

const STATUS_RANK: Record<Status, number> = { works: 0, partial: 1, broken: 2, untested: 3, na: 4 };

export function Matrix() {
  const [data, setData] = useState<MatrixResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<MeResponse | null>(null);

  const [typeFilter, setTypeFilter] = useState('');
  const [archFilter, setArchFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchMatrix().then(setData).catch(e => setError(e.message)).finally(() => setLoading(false));
    fetchMe().then(setUser);
  }, []);

  const brands = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.devices.map(d => d.brand))].sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase();
    return data.devices
      .filter(d => !typeFilter || d.type === typeFilter)
      .filter(d => !archFilter || d.arch === archFilter)
      .filter(d => !brandFilter || d.brand === brandFilter)
      .filter(d => !q || d.title.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q) || (d.soc_name ?? '').toLowerCase().includes(q))
      .sort((a, b) => {
        let va: string | number, vb: string | number;
        if (sortKey === 'title') { va = a.title.toLowerCase(); vb = b.title.toLowerCase(); }
        else if (sortKey === 'score') { va = a.score; vb = b.score; }
        else { va = STATUS_RANK[a.results[sortKey]?.status ?? 'untested']; vb = STATUS_RANK[b.results[sortKey]?.status ?? 'untested']; }
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
  }, [data, typeFilter, archFilter, brandFilter, search, sortKey, sortDir]);

  function handleSort(key: string) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  const features: Feature[] = data?.features ?? [];
  const arrow = (key: string) => sortKey === key ? (sortDir === 'asc' ? ' \u25B4' : ' \u25BE') : '';

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Loading compatibility data...</div>
      <div style={{ fontSize: '0.85rem' }}>186 devices across 52 SoCs</div>
    </div>
  );

  if (error) return (
    <div className="card" style={{ textAlign: 'center', padding: '2rem', maxWidth: 500, margin: '2rem auto' }}>
      <div style={{ color: 'var(--status-broken)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Failed to load matrix</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{error}</div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', margin: '0 0 0.25rem', fontFamily: 'var(--font-heading)' }}>
          Hardware Compatibility
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
          {filtered.length} device{filtered.length !== 1 ? 's' : ''} &middot; {features.length} features tested &middot; Updated {data?.generated_at ? new Date(data.generated_at).toLocaleDateString() : ''}
        </p>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem',
        alignItems: 'center', padding: '0.75rem 1rem',
        background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
      }}>
        <input
          type="text"
          placeholder="Search devices..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={inputStyle}>
          <option value="">All types</option>
          <option value="handheld">Handheld</option>
          <option value="sbc">SBC</option>
          <option value="tvbox">TV Box</option>
          <option value="console">Console</option>
          <option value="pc">PC</option>
        </select>
        <select value={archFilter} onChange={e => setArchFilter(e.target.value)} style={inputStyle}>
          <option value="">All archs</option>
          <option value="aarch64">AArch64</option>
          <option value="armv7">ARMv7</option>
          <option value="riscv64">RISC-V 64</option>
          <option value="x86_64">x86_64</option>
        </select>
        <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} style={inputStyle}>
          <option value="">All brands</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <img src={user.avatar} alt="" width={24} height={24} style={{ borderRadius: '50%' }} />
              @{user.username}
            </span>
          ) : (
            <a href="https://compat.reglinux.org/api/auth/github" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sign in</a>
          )}
          <a href="/submit" className="btn btn-primary" style={{ textDecoration: 'none' }}>Submit a test</a>
        </div>
      </div>

      {/* Table */}
      {data && (
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <table style={{ borderCollapse: 'collapse', width: 'max-content', minWidth: '100%', fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <Th sticky onClick={() => handleSort('title')}>Device{arrow('title')}</Th>
                <Th>Type</Th>
                <Th>SoC</Th>
                <Th>Arch</Th>
                {features.map(f => (
                  <Th key={f.id} vertical onClick={() => handleSort(f.id)}>
                    {f.label}{arrow(f.id)}
                  </Th>
                ))}
                <Th onClick={() => handleSort('score')}>Score{arrow('score')}</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((device, i) => (
                <tr key={device.id} style={{
                  borderBottom: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                }}>
                  <Td sticky>
                    <a href={`/device/${device.id}`} style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{device.title}</a>
                  </Td>
                  <Td><TypeBadge type={device.type} /></Td>
                  <Td mono>{device.soc_name ?? '\u2014'}</Td>
                  <Td mono>{device.arch ?? '\u2014'}</Td>
                  {features.map(f => (
                    <Td key={f.id} center>
                      <StatusBadge
                        status={device.results[f.id]?.status ?? 'untested'}
                        buildDate={device.results[f.id]?.build_date}
                        author={device.results[f.id]?.author}
                        notes={device.results[f.id]?.notes}
                        size="sm"
                      />
                    </Td>
                  ))}
                  <Td mono>
                    <ScorePill score={device.score} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Sub-components ---

function ScorePill({ score }: { score: number }) {
  const color = score >= 70 ? 'var(--status-works)' : score >= 40 ? 'var(--status-partial)' : score > 0 ? 'var(--status-broken)' : 'var(--status-untested)';
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.1rem 0.5rem',
      borderRadius: 999,
      fontSize: '0.75rem',
      fontWeight: 600,
      color,
      background: `${color}18`,
      minWidth: 38,
      textAlign: 'center',
    }}>
      {score > 0 ? `${score}%` : '\u2014'}
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
      fontSize: '0.7rem',
      padding: '0.1rem 0.4rem',
      borderRadius: 999,
      color,
      background: `${color}18`,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      whiteSpace: 'nowrap',
    }}>
      {type === 'tvbox' ? 'TV Box' : type}
    </span>
  );
}

function Th({ children, sticky, vertical, onClick }: {
  children: React.ReactNode; sticky?: boolean; vertical?: boolean; onClick?: () => void;
}) {
  const style: React.CSSProperties = {
    padding: '0.5rem 0.6rem',
    textAlign: 'left',
    background: 'var(--bg-soft)',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    ...(sticky ? { position: 'sticky' as const, left: 0, zIndex: 2 } : {}),
    ...(vertical ? { writingMode: 'vertical-rl' as const, transform: 'rotate(180deg)', padding: '0.6rem 0.2rem', textAlign: 'center' as const, maxWidth: '2rem' } : {}),
  };
  return <th style={style} onClick={onClick}>{children}</th>;
}

function Td({ children, sticky, mono, center }: {
  children: React.ReactNode; sticky?: boolean; mono?: boolean; center?: boolean;
}) {
  const style: React.CSSProperties = {
    padding: '0.35rem 0.6rem',
    whiteSpace: 'nowrap',
    ...(sticky ? { position: 'sticky' as const, left: 0, background: 'var(--bg)', zIndex: 1 } : {}),
    ...(mono ? { fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' } : {}),
    ...(center ? { textAlign: 'center' as const } : {}),
  };
  return <td style={style}>{children}</td>;
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.4rem 0.75rem',
  borderRadius: 999,
  fontSize: '0.85rem',
  outline: 'none',
  minWidth: 120,
};
