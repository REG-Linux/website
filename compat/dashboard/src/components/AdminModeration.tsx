import { useState, useEffect } from 'react';
import {
  fetchAdminResults, deleteAdminResult, deleteAdminResultsBatch,
  type AdminResult, type AdminResultsResponse,
} from '../lib/api';

const STATUS_COLORS: Record<string, string> = {
  works: '#22c55e', partial: '#f59e0b', broken: '#ef4444', na: '#4b5563', untested: '#374151',
};

export function AdminModeration() {
  const [data, setData] = useState<AdminResultsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deviceFilter, setDeviceFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const PAGE_SIZE = 50;

  function loadResults(offset = 0) {
    setLoading(true);
    setError(null);
    fetchAdminResults({
      device: deviceFilter || undefined,
      author: authorFilter || undefined,
      limit: PAGE_SIZE,
      offset,
    })
      .then(d => { setData(d); setLoading(false); setSelected(new Set()); })
      .catch(err => { setError(err.message); setLoading(false); });
  }

  useEffect(() => { loadResults(0); setPage(0); }, [deviceFilter, authorFilter]);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    loadResults(newPage * PAGE_SIZE);
  }

  function toggleSelect(id: number) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (!data) return;
    if (selected.size === data.results.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.results.map(r => r.id)));
    }
  }

  async function handleDeleteSingle(id: number) {
    if (!confirm('Delete this test result?')) return;
    try {
      await deleteAdminResult(id);
      loadResults(page * PAGE_SIZE);
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async function handleDeleteSelected() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} test result(s)?`)) return;
    setDeleting(true);
    try {
      await deleteAdminResultsBatch(Array.from(selected));
      loadResults(page * PAGE_SIZE);
    } catch (err) {
      alert(`Batch delete failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
    setDeleting(false);
  }

  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
        Test Results {data && <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>({data.total})</span>}
      </h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Filter by device ID..." value={deviceFilter}
          onChange={e => setDeviceFilter(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Filter by author..." value={authorFilter}
          onChange={e => setAuthorFilter(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0.75rem',
          marginBottom: '0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px',
          fontSize: '0.85rem',
        }}>
          <span>{selected.size} selected</span>
          <button onClick={handleDeleteSelected} disabled={deleting} style={{
            padding: '0.3rem 0.8rem', borderRadius: '999px', border: 'none',
            background: '#ef4444', color: '#fff', fontSize: '0.8rem', fontWeight: 600,
            cursor: deleting ? 'wait' : 'pointer',
          }}>
            {deleting ? 'Deleting...' : 'Delete selected'}
          </button>
          <button onClick={() => setSelected(new Set())} style={{
            padding: '0.3rem 0.8rem', borderRadius: '999px', border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer',
          }}>
            Clear
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>
      ) : !data || data.results.length === 0 ? (
        <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>No results found.</div>
      ) : (
        <>
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={thStyle}>
                    <input type="checkbox"
                      checked={selected.size === data.results.length && data.results.length > 0}
                      onChange={toggleSelectAll} />
                  </th>
                  <th style={thStyle}>Device</th>
                  <th style={thStyle}>Feature</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Author</th>
                  <th style={thStyle}>Build</th>
                  <th style={thStyle}>Submitted</th>
                  <th style={thStyle}>Notes</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {data.results.map(r => (
                  <tr key={r.id} style={{
                    borderBottom: '1px solid var(--border)',
                    background: selected.has(r.id) ? 'rgba(239,68,68,0.05)' : 'transparent',
                  }}>
                    <td style={tdStyle}>
                      <input type="checkbox" checked={selected.has(r.id)}
                        onChange={() => toggleSelect(r.id)} />
                    </td>
                    <td style={tdStyle}>
                      <a href={`/device/${r.device_id}`} style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>
                        {r.device_title}
                      </a>
                    </td>
                    <td style={tdStyle}>{r.feature_label}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '0.1rem 0.4rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600,
                        background: `${STATUS_COLORS[r.status]}22`, color: STATUS_COLORS[r.status],
                      }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{r.author}</td>
                    <td style={{ ...tdStyle, fontSize: '0.7rem' }}>{r.build_date}</td>
                    <td style={{ ...tdStyle, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {new Date(r.submitted_at + 'Z').toLocaleDateString()}
                    </td>
                    <td style={{ ...tdStyle, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {r.notes || '—'}
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => handleDeleteSingle(r.id)} title="Delete"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }}>
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.8rem' }}>
              <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}
                style={pageBtnStyle}>Prev</button>
              <span style={{ color: 'var(--text-muted)' }}>
                Page {page + 1} of {totalPages}
              </span>
              <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1}
                style={pageBtnStyle}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '0.4rem 0.7rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.8rem', flex: 1, minWidth: '150px',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '0.4rem 0.5rem', whiteSpace: 'nowrap',
};

const pageBtnStyle: React.CSSProperties = {
  padding: '0.25rem 0.6rem', borderRadius: '6px', border: '1px solid var(--border)',
  background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem',
};
