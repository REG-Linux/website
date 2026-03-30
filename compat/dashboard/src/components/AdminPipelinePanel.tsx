import { useState, useEffect, useRef } from 'react';
import { runPipeline, fetchAdminRuns, type WorkflowRun } from '../lib/api';

const PIPELINES = [
  { id: 'sync-devices', label: 'Sync Devices', desc: 'Pull new devices from REG-Linux repo' },
  { id: 'deploy-site', label: 'Rebuild Site', desc: 'Jekyll + MkDocs + GitHub Pages' },
  { id: 'deploy-compat', label: 'Rebuild Compat', desc: 'Worker + Dashboard + Wiki' },
  { id: 'refresh-downloads', label: 'Refresh Downloads', desc: 'Update download links from releases' },
];

const STATUS_ICONS: Record<string, string> = {
  completed: '●',
  in_progress: '◐',
  queued: '○',
  failure: '●',
};

const STATUS_COLORS: Record<string, string> = {
  success: '#22c55e',
  failure: '#ef4444',
  cancelled: '#6b7280',
  in_progress: '#f59e0b',
  queued: '#3b82f6',
};

export function AdminPipelinePanel() {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [running, setRunning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function refreshRuns() {
    fetchAdminRuns().then(data => setRuns(data.runs)).catch(() => {});
  }

  useEffect(() => {
    refreshRuns();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Auto-poll: when any run is in_progress or queued, poll every 5s
  useEffect(() => {
    const hasActive = runs.some(r => r.status === 'in_progress' || r.status === 'queued');
    if (hasActive) {
      if (!pollRef.current) {
        pollRef.current = setInterval(refreshRuns, 5000);
      }
    } else {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
  }, [runs]);

  async function handleRun(pipelineId: string) {
    setRunning(pipelineId);
    setError(null);
    setSuccess(null);
    try {
      await runPipeline(pipelineId);
      setSuccess(`${pipelineId} triggered`);
      // Start polling immediately
      setTimeout(refreshRuns, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    }
    setRunning(null);
  }

  // Find last successful deploy timestamp
  const lastDeploy = runs.find(r => r.conclusion === 'success');

  return (
    <div style={{ position: 'sticky', top: '4rem' }}>
      <h3 style={{ margin: '0 0 0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>Pipelines</h3>

      {lastDeploy && (
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Last success: {new Date(lastDeploy.created_at).toLocaleString()}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {PIPELINES.map(p => (
          <button key={p.id} onClick={() => handleRun(p.id)} disabled={running !== null}
            style={{
              padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)', background: 'var(--card)',
              color: 'var(--text)', cursor: running ? 'wait' : 'pointer',
              textAlign: 'left', fontSize: '0.8rem', opacity: running && running !== p.id ? 0.5 : 1,
            }}>
            <div style={{ fontWeight: 600 }}>{p.label}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.desc}</div>
          </button>
        ))}
      </div>

      {error && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginBottom: '0.5rem' }}>{error}</div>}
      {success && <div style={{ fontSize: '0.75rem', color: '#22c55e', marginBottom: '0.5rem' }}>{success}</div>}

      <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
        Recent Runs
        {runs.some(r => r.status === 'in_progress' || r.status === 'queued') && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', color: '#f59e0b' }}>
            (auto-refreshing)
          </span>
        )}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {runs.length === 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No runs found</span>}
        {runs.map(r => {
          const color = STATUS_COLORS[r.conclusion || r.status] || 'var(--text-muted)';
          const icon = STATUS_ICONS[r.conclusion === 'success' ? 'completed' : r.status] || '○';
          const isActive = r.status === 'in_progress' || r.status === 'queued';
          return (
            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.3rem 0.5rem', borderRadius: '4px',
                textDecoration: 'none', color: 'var(--text)', fontSize: '0.75rem',
              }}>
              <span style={{
                color, fontFamily: 'var(--font-mono)',
                animation: isActive ? 'pulse 1.5s ease-in-out infinite' : 'none',
              }}>
                {icon}
              </span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.name}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </a>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
