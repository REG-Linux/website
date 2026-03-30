import { useState, useEffect } from 'react';
import { fetchAdminTokens, revokeAdminToken, type AdminToken } from '../lib/api';

export function AdminTokens() {
  const [tokens, setTokens] = useState<AdminToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'revoked'>('all');
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminTokens()
      .then(d => { setTokens(d.tokens); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  async function handleRevoke(token: string) {
    if (!confirm('Revoke this token? Associated test results will be purged on the next daily cleanup.')) return;
    setRevoking(token);
    try {
      await revokeAdminToken(token);
      setTokens(prev => prev.map(t => t.token === token ? { ...t, revoked: 1 } : t));
    } catch (err) {
      alert(`Revoke failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
    setRevoking(null);
  }

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading tokens...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;

  const filtered = tokens.filter(t => {
    if (filter === 'active') return !t.revoked;
    if (filter === 'revoked') return !!t.revoked;
    return true;
  });

  const activeCount = tokens.filter(t => !t.revoked).length;
  const revokedCount = tokens.filter(t => !!t.revoked).length;

  return (
    <div>
      <h2 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
        Device Tokens
        <span style={{ color: 'var(--text-muted)', fontSize: '1rem', marginLeft: '0.5rem' }}>
          ({activeCount} active, {revokedCount} revoked)
        </span>
      </h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['all', 'active', 'revoked'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '0.25rem 0.7rem', borderRadius: '999px', border: '1px solid var(--border)',
            background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: filter === f ? 'var(--text)' : 'var(--text-muted)',
            fontSize: '0.75rem', cursor: 'pointer',
          }}>
            {f === 'all' ? `All (${tokens.length})` : f === 'active' ? `Active (${activeCount})` : `Revoked (${revokedCount})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>No tokens found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {filtered.map(t => (
            <div key={t.token} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto auto',
              gap: '0.75rem', alignItems: 'center',
              padding: '0.6rem 0.75rem', borderRadius: '8px',
              background: t.revoked ? 'rgba(239,68,68,0.05)' : 'var(--card)',
              border: '1px solid var(--border)',
              opacity: t.revoked ? 0.6 : 1,
              fontSize: '0.8rem',
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {t.device_title || t.device_id}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  uuid: {t.system_uuid.slice(0, 8)}... · {t.reg_version || 'unknown version'}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <div>{t.result_count} results</div>
                <div>{t.last_used ? `last: ${new Date(t.last_used + 'Z').toLocaleDateString()}` : 'never used'}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {new Date(t.created_at + 'Z').toLocaleDateString()}
              </div>
              <div>
                {t.revoked ? (
                  <span style={{
                    padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600,
                    background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                  }}>
                    Revoked
                  </span>
                ) : (
                  <button onClick={() => handleRevoke(t.token)} disabled={revoking === t.token}
                    style={{
                      padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 600,
                      border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444',
                      cursor: revoking === t.token ? 'wait' : 'pointer',
                    }}>
                    {revoking === t.token ? '...' : 'Revoke'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
