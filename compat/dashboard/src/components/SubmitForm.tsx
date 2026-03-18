import { useState, useEffect } from 'react';
import type { MatrixDevice, Feature, Status, MeResponse, DeviceResponse, ResultEntry } from '../lib/api';
import { fetchMatrix, fetchDevice, fetchMe, submitResults } from '../lib/api';
import { StatusBadge, STATUS_META } from './StatusBadge';
import { DevicePicker } from './DevicePicker';

const CATEGORY_LABELS: Record<string, string> = {
  boot: 'Boot', display: 'Display', connectivity: 'Connectivity',
  system: 'System', controls: 'Controls', gpu: 'GPU',
};

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SubmitForm() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [allDevices, setAllDevices] = useState<MatrixDevice[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);

  const [selectedDevice, setSelectedDevice] = useState(() =>
    typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('device') ?? '') : '',
  );
  const [deviceDetail, setDeviceDetail] = useState<DeviceResponse | null>(null);
  const [buildDate, setBuildDate] = useState(todayISO);
  const [results, setResults] = useState<Record<string, Status>>({});
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    fetchMe().then(u => {
      setUser(u);
      setAuthChecked(true);
      if (!u) {
        if (selectedDevice) sessionStorage.setItem('reg_compat_device', selectedDevice);
        window.location.href = 'https://compat.reglinux.org/api/auth/github?redirect=/submit';
      }
    });
  }, []);

  // Restore device from session storage after auth redirect
  useEffect(() => {
    if (authChecked && user && !selectedDevice) {
      const stored = sessionStorage.getItem('reg_compat_device');
      if (stored) {
        setSelectedDevice(stored);
        sessionStorage.removeItem('reg_compat_device');
      }
    }
  }, [authChecked, user]);

  // Fetch device list
  useEffect(() => {
    fetchMatrix().then(d => {
      setAllDevices(d.devices);
      setFeatures(d.features);
    });
  }, []);

  // Fetch device detail when selection changes
  useEffect(() => {
    if (!selectedDevice) { setDeviceDetail(null); return; }
    fetchDevice(selectedDevice).then(setDeviceDetail).catch(() => setDeviceDetail(null));
  }, [selectedDevice]);

  // Reset results when device changes
  useEffect(() => { setResults({}); }, [selectedDevice]);

  if (!authChecked) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>Checking authentication...</p>;
  if (!user) return <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '3rem 0' }}>Redirecting to GitHub...</p>;

  const naFeatures = new Set<string>(
    deviceDetail ? JSON.parse(deviceDetail.device.na_features || '[]') : [],
  );

  // Get previous results for context
  const prevResults: Record<string, ResultEntry> = deviceDetail?.latest ?? {};

  // Group features by category
  const grouped = new Map<string, Feature[]>();
  for (const f of features) {
    const list = grouped.get(f.category) ?? [];
    list.push(f);
    grouped.set(f.category, list);
  }

  function setFeatureStatus(featureId: string, status: Status) {
    setResults(prev => ({ ...prev, [featureId]: status }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const toSubmit: Record<string, Status> = {};
    for (const [fid, s] of Object.entries(results)) {
      if (s !== 'untested') toSubmit[fid] = s;
    }
    for (const fid of naFeatures) {
      toSubmit[fid] = 'na';
    }

    if (Object.keys(toSubmit).length === 0) {
      setSubmitError('Mark at least one feature before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await submitResults({ device_id: selectedDevice, build_date: buildDate, results: toSubmit, notes });
      window.location.href = `/device/${selectedDevice}`;
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed');
      setSubmitting(false);
    }
  }

  // Count how many features have been set
  const setCount = Object.values(results).filter(s => s !== 'untested').length;
  const totalTestable = features.filter(f => !naFeatures.has(f.id)).length;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700 }}>
      {/* User badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem',
        padding: '0.6rem 1rem', background: 'var(--bg-soft)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)', fontSize: '0.9rem',
      }}>
        <img src={user.avatar} alt="" width={28} height={28} style={{ borderRadius: '50%' }} />
        Submitting as <strong>@{user.username}</strong>
      </div>

      {/* Device selector */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={labelStyle}>Device</label>
        <DevicePicker devices={allDevices} value={selectedDevice} onChange={setSelectedDevice} />
      </div>

      {/* Build date */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Build Date</label>
        <input
          type="date"
          value={buildDate}
          onChange={e => setBuildDate(e.target.value)}
          max={todayISO()}
          style={dateInputStyle}
        />
      </div>

      {/* Feature toggles */}
      {selectedDevice && features.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <label style={{ ...labelStyle, margin: 0 }}>Feature Status</label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {setCount}/{totalTestable} tested
            </span>
          </div>

          {[...grouped.entries()].map(([category, feats]) => (
            <div key={category} style={{
              marginBottom: '0.75rem', background: 'var(--bg-soft)',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '0.5rem 0.75rem', fontSize: '0.72rem', fontFamily: 'var(--font-heading)',
                color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em',
                fontWeight: 600, borderBottom: '1px solid var(--border)',
              }}>
                {CATEGORY_LABELS[category] ?? category}
              </div>
              {feats.map(f => {
                const isNa = naFeatures.has(f.id);
                const current = results[f.id] ?? 'untested';
                const prev = prevResults[f.id];
                const prevStatus = prev?.status;

                if (isNa) {
                  return (
                    <div key={f.id} style={{ ...rowStyle, opacity: 0.5 }}>
                      <span style={{ width: 110, fontSize: '0.85rem', flexShrink: 0 }}>{f.label}</span>
                      <span style={{ color: 'var(--status-na)', fontSize: '0.8rem' }}>{'\u2014'} N/A</span>
                    </div>
                  );
                }

                return (
                  <div key={f.id} style={rowStyle}>
                    <div style={{ width: 110, flexShrink: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{f.label}</div>
                      {/* Show previous status for context */}
                      {prevStatus && prevStatus !== 'untested' && prevStatus !== 'na' && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          was <StatusBadge status={prevStatus} size="sm" />
                          {prev?.build_date && <span>{prev.build_date}</span>}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                      {(['works', 'partial', 'broken'] as Status[]).map(s => {
                        const active = current === s;
                        const meta = STATUS_META[s];
                        // Highlight regression: new status is worse than previous
                        const isRegression = active && prevStatus && isWorse(s, prevStatus);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFeatureStatus(f.id, active ? 'untested' : s)}
                            style={{
                              ...toggleBtnStyle,
                              borderColor: active ? meta.color : 'var(--border)',
                              background: active ? `${meta.color}18` : 'transparent',
                              color: active ? meta.color : 'var(--text-muted)',
                              fontWeight: active ? 600 : 400,
                              boxShadow: isRegression ? `0 0 8px ${meta.color}40` : 'none',
                            }}
                          >
                            {meta.icon} {meta.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <label style={labelStyle}>Notes (optional, max 500 chars)</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="Any observations, issues, or details..."
          style={{ ...dateInputStyle, resize: 'vertical', width: '100%' }}
        />
      </div>

      {submitError && (
        <div style={{
          padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: 'var(--radius-sm)',
          background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)',
          color: 'var(--status-broken)', fontSize: '0.85rem',
        }}>
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !selectedDevice || setCount === 0}
        className="btn btn-primary"
        style={{
          padding: '0.7rem 2rem', fontSize: '0.95rem',
          opacity: (submitting || !selectedDevice || setCount === 0) ? 0.5 : 1,
          width: '100%',
        }}
      >
        {submitting ? 'Submitting...' : `Submit ${setCount} Result${setCount !== 1 ? 's' : ''}`}
      </button>
    </form>
  );
}

/** Returns true if newStatus is worse than oldStatus */
function isWorse(newStatus: Status, oldStatus: Status): boolean {
  const rank: Record<Status, number> = { works: 0, partial: 1, broken: 2, na: 3, untested: 3 };
  return rank[newStatus] > rank[oldStatus];
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem',
  color: 'var(--text-muted)', fontFamily: 'var(--font-heading)',
  textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600,
};

const dateInputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.6rem 0.9rem',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  maxWidth: 250,
};

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)',
};

const toggleBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text-muted)',
  padding: '0.3rem 0.65rem',
  borderRadius: 999,
  fontSize: '0.8rem',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
};
