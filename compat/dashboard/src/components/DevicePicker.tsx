import { useState, useRef, useEffect } from 'react';
import type { MatrixDevice } from '../lib/api';

const TYPE_COLORS: Record<string, string> = {
  handheld: '#2bb0e9', sbc: '#a78bfa', tvbox: '#f59e0b', console: '#22c55e', pc: '#f472b6', unknown: '#6b7280',
};

const TYPE_LABELS: Record<string, string> = {
  handheld: 'Handheld', sbc: 'SBC', tvbox: 'TV Box', console: 'Console', pc: 'PC', unknown: 'Other',
};

interface Props {
  devices: MatrixDevice[];
  value: string;
  onChange: (deviceId: string) => void;
}

export function DevicePicker({ devices, value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = devices.find(d => d.id === value);

  const q = query.toLowerCase();
  const filtered = devices.filter(d => {
    if (activeType && d.type !== activeType) return false;
    if (!q) return true;
    return d.title.toLowerCase().includes(q)
      || d.brand.toLowerCase().includes(q)
      || d.id.includes(q)
      || (d.soc_name ?? '').toLowerCase().includes(q);
  });

  // Group by type
  const types = ['handheld', 'sbc', 'tvbox', 'console', 'pc', 'unknown'];
  const typeCounts = new Map<string, number>();
  for (const d of devices) {
    typeCounts.set(d.type, (typeCounts.get(d.type) ?? 0) + 1);
  }

  function selectDevice(id: string) {
    onChange(id);
    setOpen(false);
    setQuery('');
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', maxWidth: 500 }}>
      {/* Selected device display / search input */}
      {!open && selected ? (
        <button
          type="button"
          onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
          style={{
            ...inputBoxStyle,
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            cursor: 'pointer', textAlign: 'left', width: '100%',
          }}
        >
          <TypeDot type={selected.type} />
          <span style={{ fontWeight: 500 }}>{selected.title}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
            {selected.soc_name ?? selected.arch ?? ''}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Change</span>
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search by name, brand, SoC..."
          style={{ ...inputBoxStyle, width: '100%' }}
        />
      )}

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          marginTop: 4, maxHeight: 420, overflowY: 'auto',
          background: 'var(--bg-soft)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow)',
          zIndex: 100,
        }}>
          {/* Type filter tabs */}
          <div style={{
            display: 'flex', gap: '0.25rem', padding: '0.5rem 0.75rem',
            borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
          }}>
            <TypeTab label="All" count={devices.length} active={!activeType} onClick={() => setActiveType('')} />
            {types.map(t => {
              const count = typeCounts.get(t) ?? 0;
              if (count === 0) return null;
              return (
                <TypeTab
                  key={t}
                  label={TYPE_LABELS[t] ?? t}
                  count={count}
                  active={activeType === t}
                  color={TYPE_COLORS[t]}
                  onClick={() => setActiveType(activeType === t ? '' : t)}
                />
              );
            })}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No devices found
            </div>
          ) : (
            <div style={{ padding: '0.25rem 0' }}>
              {filtered.slice(0, 50).map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => selectDevice(d.id)}
                  style={{
                    ...itemStyle,
                    background: d.id === value ? 'rgba(43, 176, 233, 0.08)' : 'transparent',
                  }}
                >
                  <TypeDot type={d.type} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.85rem' }}>
                      {highlightMatch(d.title, q)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
                      <span>{d.brand}</span>
                      {d.soc_name && <span>{d.soc_name}</span>}
                      {d.arch && <span style={{ fontFamily: 'var(--font-mono)' }}>{d.arch}</span>}
                    </div>
                  </div>
                  {d.score > 0 && (
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
                      color: d.score >= 70 ? 'var(--status-works)' : d.score >= 40 ? 'var(--status-partial)' : 'var(--status-broken)',
                    }}>
                      {d.score}%
                    </span>
                  )}
                </button>
              ))}
              {filtered.length > 50 && (
                <div style={{ padding: '0.5rem 1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>
                  +{filtered.length - 50} more — refine your search
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TypeDot({ type }: { type: string }) {
  return (
    <span style={{
      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
      background: TYPE_COLORS[type] ?? TYPE_COLORS.unknown,
    }} />
  );
}

function TypeTab({ label, count, active, color, onClick }: {
  label: string; count: number; active: boolean; color?: string; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        border: '1px solid',
        borderColor: active ? (color ?? 'var(--accent)') : 'transparent',
        borderRadius: 999,
        padding: '0.2rem 0.5rem',
        fontSize: '0.72rem',
        color: active ? 'var(--text)' : 'var(--text-muted)',
        cursor: 'pointer',
        fontWeight: 500,
      }}
    >
      {label} <span style={{ opacity: 0.6 }}>{count}</span>
    </button>
  );
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

const inputBoxStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.6rem 0.9rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
};

const itemStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.6rem',
  width: '100%', padding: '0.5rem 0.75rem',
  border: 'none', cursor: 'pointer', color: 'var(--text)',
  fontFamily: 'inherit', textAlign: 'left',
};
