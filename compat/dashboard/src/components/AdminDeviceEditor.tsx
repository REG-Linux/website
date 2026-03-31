import { useState, useEffect, useRef } from 'react';
import {
  fetchAdminDevice, updateAdminDevice, fetchMe, fetchDeviceNotes, updateDeviceNotes, uploadDeviceImage,
  type AdminDeviceResponse, type DeviceStatus, type MeResponse, type DeviceNotesData,
} from '../lib/api';

const STATUSES: DeviceStatus[] = ['released', 'testing', 'wip', 'todo'];

const STATUS_COLORS: Record<DeviceStatus, string> = {
  released: '#22c55e',
  testing: '#3b82f6',
  wip: '#f59e0b',
  todo: '#6b7280',
};

interface FieldDef {
  key: string;
  label: string;
  placeholder?: string;
  mono?: boolean;
}

const EDITABLE_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Title' },
  { key: 'brand', label: 'Brand' },
  { key: 'image', label: 'Image URL', mono: true },
  { key: 'display_size', label: 'Display Size', placeholder: 'e.g. 3.5 inch' },
  { key: 'display_res', label: 'Display Resolution', placeholder: 'e.g. 640x480' },
  { key: 'ram', label: 'RAM', placeholder: 'e.g. 1 GB LPDDR4' },
  { key: 'storage', label: 'Storage', placeholder: 'e.g. SD only' },
  { key: 'compositor', label: 'Compositor', placeholder: 'e.g. Sway' },
];

export function AdminDeviceEditor() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [data, setData] = useState<AdminDeviceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields — stored as a flat Record
  const [fields, setFields] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<DeviceStatus>('todo');

  // Image upload
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Device notes
  const [notes, setNotes] = useState<DeviceNotesData>({});
  const [notesSha, setNotesSha] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSuccess, setNotesSuccess] = useState<string | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);

  // Extract device ID from URL
  const deviceId = typeof window !== 'undefined'
    ? window.location.pathname.split('/admin/device/')[1]?.replace(/\/$/, '') || ''
    : '';

  useEffect(() => {
    if (!deviceId || deviceId === '_') return;
    fetchMe().then(setUser);
    fetchDeviceNotes(deviceId)
      .then(d => { setNotes(d.notes); setNotesSha(d.sha); })
      .catch(() => {}); // Notes may not exist
    fetchAdminDevice(deviceId)
      .then(d => {
        setData(d);
        // Initialize fields: override value > device value > empty
        const init: Record<string, string> = {};
        for (const f of EDITABLE_FIELDS) {
          init[f.key] = d.overrides[f.key]
            || (d.device as unknown as Record<string, string>)[f.key]
            || '';
        }
        setFields(init);
        setStatus((d.overrides.status || d.device.status || 'todo') as DeviceStatus);
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [deviceId]);

  function setField(key: string, value: string) {
    setFields(prev => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const changes: Record<string, string> = {};

      // Compare each field against the base device value
      for (const f of EDITABLE_FIELDS) {
        const baseValue = (data.device as unknown as Record<string, string>)[f.key] || '';
        if (fields[f.key] !== baseValue) {
          changes[f.key] = fields[f.key];
        }
      }

      // Always include status
      changes.status = status;

      const result = await updateAdminDevice(deviceId, changes, data.sha);
      setData({ ...data, sha: result.sha, overrides: { ...data.overrides, ...changes } });
      setSuccess('Saved. Changes will deploy in a few minutes.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    }
    setSaving(false);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      // Resize + convert to WebP on the client
      const base64 = await processImage(file, 400, 300);
      const ext = base64.startsWith('data:image/webp') ? 'webp' : 'png';
      const result = await uploadDeviceImage(deviceId, base64, `${deviceId}.${ext}`);
      // Update the image field
      setField('image', result.image_url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageUpload(file);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    e.target.value = ''; // Reset so same file can be re-selected
  }

  async function handleSaveNotes() {
    setSavingNotes(true);
    setNotesError(null);
    setNotesSuccess(null);
    try {
      const result = await updateDeviceNotes(deviceId, notes, notesSha);
      setNotesSha(result.sha);
      setNotesSuccess('Notes saved.');
    } catch (err) {
      setNotesError(err instanceof Error ? err.message : 'Save failed');
    }
    setSavingNotes(false);
  }

  function setNoteField(key: keyof DeviceNotesData, value: string) {
    setNotes(prev => ({ ...prev, [key]: value }));
  }

  function setNoteList(key: 'field_notes' | 'known_limits' | 'compatibility_checks', value: string) {
    // Split by newlines, trim, filter empties
    const items = value.split('\n').map(s => s.trim()).filter(Boolean);
    setNotes(prev => ({ ...prev, [key]: items }));
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

  // Detect which fields have been overridden
  const isOverridden = (key: string): boolean => {
    const baseValue = (d as unknown as Record<string, string>)[key] || '';
    return fields[key] !== baseValue;
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      {/* Header */}
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

      {/* Messages */}
      {error && !['not_authenticated', 'not_admin'].includes(error) && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.15)', borderRadius: 8,
          color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>
      )}
      {success && (
        <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(34,197,94,0.15)', borderRadius: 8,
          color: '#86efac', fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Status selector */}
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

        {/* Editable text fields */}
        {EDITABLE_FIELDS.map(f => (
          <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{f.label}</span>
              {isOverridden(f.key) && (
                <span style={{
                  fontSize: '0.6rem', padding: '0.1rem 0.4rem', borderRadius: '999px',
                  background: 'rgba(43,176,233,0.15)', color: 'var(--accent)',
                }}>
                  modified
                </span>
              )}
            </div>
            <input
              value={fields[f.key] || ''}
              onChange={e => setField(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                padding: '0.5rem 0.75rem', background: 'var(--bg-soft)',
                border: isOverridden(f.key) ? '1px solid rgba(43,176,233,0.3)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', color: 'var(--text)',
                fontSize: f.mono ? '0.85rem' : '0.9rem',
                fontFamily: f.mono ? 'var(--font-mono)' : 'inherit',
              }}
            />
            {/* Image upload widget for the image field */}
            {f.key === 'image' && (
              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  marginTop: '0.25rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                  border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.02)',
                  textAlign: 'center', cursor: uploading ? 'wait' : 'pointer',
                  fontSize: '0.8rem', color: 'var(--text-muted)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(43,176,233,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <input ref={fileInputRef} type="file" accept="image/*"
                  onChange={handleFileSelect} style={{ display: 'none' }} />
                {uploading ? (
                  <span>Uploading & converting to WebP...</span>
                ) : (
                  <span>Drop image here or click to upload (auto-resized to WebP)</span>
                )}
              </div>
            )}
            {f.key === 'image' && uploadError && (
              <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>{uploadError}</div>
            )}
          </label>
        ))}

        <button onClick={handleSave} disabled={saving} style={{
          padding: '0.6rem 1.5rem', borderRadius: '999px', border: 'none',
          background: saving ? 'var(--text-muted)' : 'var(--accent)',
          color: '#000', fontSize: '0.9rem', fontWeight: 600, cursor: saving ? 'wait' : 'pointer',
          alignSelf: 'flex-start',
        }}>
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {/* Device Notes */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 0.75rem', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
          Device Notes
        </h3>

        {notesError && (
          <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.15)', borderRadius: 8,
            color: '#fca5a5', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{notesError}</div>
        )}
        {notesSuccess && (
          <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(34,197,94,0.15)', borderRadius: 8,
            color: '#86efac', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{notesSuccess}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { key: 'meta_description' as const, label: 'Meta Description', rows: 2 },
            { key: 'summary' as const, label: 'Summary', rows: 2 },
            { key: 'best_for' as const, label: 'Best For', rows: 2 },
          ].map(f => (
            <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{f.label}</span>
              <textarea
                value={notes[f.key] || ''}
                onChange={e => setNoteField(f.key, e.target.value)}
                rows={f.rows}
                style={{
                  padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.85rem',
                  resize: 'vertical', fontFamily: 'inherit',
                }}
              />
            </label>
          ))}

          {[
            { key: 'field_notes' as const, label: 'Field Notes (one per line)' },
            { key: 'known_limits' as const, label: 'Known Limits (one per line)' },
            { key: 'compatibility_checks' as const, label: 'Compatibility Checks (one per line)' },
          ].map(f => (
            <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{f.label}</span>
              <textarea
                value={(notes[f.key] ?? []).join('\n')}
                onChange={e => setNoteList(f.key, e.target.value)}
                rows={3}
                style={{
                  padding: '0.5rem 0.75rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontSize: '0.85rem',
                  resize: 'vertical', fontFamily: 'inherit',
                }}
              />
            </label>
          ))}

          <button onClick={handleSaveNotes} disabled={savingNotes} style={{
            padding: '0.6rem 1.5rem', borderRadius: '999px', border: 'none',
            background: savingNotes ? 'var(--text-muted)' : '#22c55e',
            color: '#000', fontSize: '0.9rem', fontWeight: 600, cursor: savingNotes ? 'wait' : 'pointer',
            alignSelf: 'flex-start',
          }}>
            {savingNotes ? 'Saving notes...' : 'Save notes'}
          </button>
        </div>
      </div>

      {/* Read-only device info */}
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--card)', borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <strong>Device info (read-only):</strong>
        <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.2rem 1rem' }}>
          <span>SoC:</span><span>{d.soc_name || '—'}</span>
          <span>Arch:</span><span>{d.arch || '—'}</span>
          <span>CPU:</span><span>{d.cpu_model || '—'} ({d.cpu_cores || '?'} cores @ {d.cpu_clock || '?'})</span>
          <span>GPU:</span><span>{d.gpu_model || '—'} ({d.gpu_driver || '?'})</span>
          <span>GPU API:</span><span>{d.gpu_api || '—'}</span>
          <span>Kernel:</span><span>{d.kernel || '—'}</span>
          <span>WiFi:</span><span>{d.wifi_chip || '—'}</span>
          <span>BT:</span><span>{d.bt_chip || '—'}</span>
          <span>Fan:</span><span>{d.has_fan ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );
}

/** Resize image to fit within maxW x maxH and convert to WebP base64 (data URI). */
function processImage(file: File, maxW: number, maxH: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Use FileReader instead of createObjectURL for broader compatibility
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name} (${file.type}, ${file.size} bytes)`));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxW || height > maxH) {
          const scale = Math.min(maxW / width, maxH / height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('No canvas context')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        // Try WebP first, fall back to PNG if browser doesn't support WebP encoding
        let output = canvas.toDataURL('image/webp', 0.85);
        if (!output.startsWith('data:image/webp')) {
          output = canvas.toDataURL('image/png');
        }
        resolve(output);
      };
      img.onerror = () => reject(new Error(`Browser cannot decode image: ${file.name} (${file.type}). Try PNG or JPG.`));
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
