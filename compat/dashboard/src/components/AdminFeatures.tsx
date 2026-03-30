import { useState, useEffect } from 'react';
import {
  fetchAdminFeatures, createAdminFeature, updateAdminFeature, deleteAdminFeature,
  type AdminFeature,
} from '../lib/api';

const CATEGORIES = ['boot', 'display', 'connectivity', 'system', 'controls', 'gpu'];

const CATEGORY_COLORS: Record<string, string> = {
  boot: '#3b82f6', display: '#8b5cf6', connectivity: '#06b6d4',
  system: '#f59e0b', controls: '#22c55e', gpu: '#ef4444',
};

export function AdminFeatures() {
  const [features, setFeatures] = useState<AdminFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editOrder, setEditOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  // New feature form
  const [showAdd, setShowAdd] = useState(false);
  const [newId, setNewId] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newCategory, setNewCategory] = useState('boot');
  const [newOrder, setNewOrder] = useState(0);

  useEffect(() => {
    fetchAdminFeatures()
      .then(d => { setFeatures(d.features); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  function startEdit(f: AdminFeature) {
    setEditingId(f.id);
    setEditLabel(f.label);
    setEditCategory(f.category);
    setEditOrder(f.sort_order);
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    setSaving(true);
    try {
      await updateAdminFeature(editingId, { label: editLabel, category: editCategory, sort_order: editOrder });
      setFeatures(prev => prev.map(f =>
        f.id === editingId ? { ...f, label: editLabel, category: editCategory, sort_order: editOrder } : f
      ).sort((a, b) => a.sort_order - b.sort_order));
      setEditingId(null);
    } catch (err) {
      alert(`Update failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete feature "${id}"? This only works if no test results reference it.`)) return;
    try {
      await deleteAdminFeature(id);
      setFeatures(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert(`${err instanceof Error ? err.message : 'Delete failed'}`);
    }
  }

  async function handleAdd() {
    if (!newId || !newLabel) return;
    setSaving(true);
    try {
      await createAdminFeature({ id: newId, label: newLabel, category: newCategory, sort_order: newOrder });
      setFeatures(prev => [...prev, { id: newId, label: newLabel, category: newCategory, sort_order: newOrder }]
        .sort((a, b) => a.sort_order - b.sort_order));
      setShowAdd(false);
      setNewId(''); setNewLabel(''); setNewCategory('boot'); setNewOrder(0);
    } catch (err) {
      alert(`Create failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
    setSaving(false);
  }

  if (loading) return <div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading features...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#ef4444' }}>Error: {error}</div>;

  // Group by category
  const grouped = new Map<string, AdminFeature[]>();
  for (const f of features) {
    const list = grouped.get(f.category) ?? [];
    list.push(f);
    grouped.set(f.category, list);
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
          Features ({features.length})
        </h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          padding: '0.3rem 0.8rem', borderRadius: '999px', border: '1px solid var(--accent)',
          background: 'transparent', color: 'var(--accent)', fontSize: '0.8rem', cursor: 'pointer',
        }}>
          {showAdd ? 'Cancel' : '+ Add Feature'}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: '0.5rem',
          marginBottom: '1.5rem', padding: '0.75rem', background: 'var(--card)',
          borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
          alignItems: 'end',
        }}>
          <label style={labelStyle}>
            <span>ID</span>
            <input value={newId} onChange={e => setNewId(e.target.value)} placeholder="snake_case"
              style={fieldInputStyle} />
          </label>
          <label style={labelStyle}>
            <span>Label</span>
            <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Display Name"
              style={fieldInputStyle} />
          </label>
          <label style={labelStyle}>
            <span>Category</span>
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={fieldInputStyle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label style={labelStyle}>
            <span>Order</span>
            <input type="number" value={newOrder} onChange={e => setNewOrder(parseInt(e.target.value) || 0)}
              style={{ ...fieldInputStyle, width: '60px' }} />
          </label>
          <button onClick={handleAdd} disabled={saving || !newId || !newLabel} style={{
            padding: '0.4rem 1rem', borderRadius: '999px', border: 'none',
            background: 'var(--accent)', color: '#000', fontSize: '0.8rem', fontWeight: 600,
            cursor: saving ? 'wait' : 'pointer', alignSelf: 'end',
          }}>
            Add
          </button>
        </div>
      )}

      {/* Feature list grouped by category */}
      {CATEGORIES.map(cat => {
        const items = grouped.get(cat);
        if (!items || items.length === 0) return null;
        const color = CATEGORY_COLORS[cat] ?? 'var(--text-muted)';

        return (
          <div key={cat} style={{ marginBottom: '1.25rem' }}>
            <h3 style={{
              margin: '0 0 0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-heading)',
              color, textTransform: 'capitalize',
            }}>
              {cat}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {items.map(f => (
                <div key={f.id} style={{
                  display: 'grid', gridTemplateColumns: editingId === f.id ? '1fr 1fr auto auto auto' : '80px 1fr auto auto',
                  gap: '0.5rem', alignItems: 'center',
                  padding: '0.4rem 0.6rem', borderRadius: '6px',
                  background: editingId === f.id ? 'rgba(255,255,255,0.04)' : 'var(--card)',
                  fontSize: '0.8rem',
                }}>
                  {editingId === f.id ? (
                    <>
                      <input value={editLabel} onChange={e => setEditLabel(e.target.value)}
                        style={fieldInputStyle} />
                      <select value={editCategory} onChange={e => setEditCategory(e.target.value)}
                        style={fieldInputStyle}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input type="number" value={editOrder} onChange={e => setEditOrder(parseInt(e.target.value) || 0)}
                        style={{ ...fieldInputStyle, width: '55px' }} />
                      <button onClick={handleSaveEdit} disabled={saving} style={actionBtnStyle('#22c55e')}>
                        Save
                      </button>
                      <button onClick={() => setEditingId(null)} style={actionBtnStyle('var(--text-muted)')}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        #{f.sort_order}
                      </span>
                      <div>
                        <strong>{f.label}</strong>
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          {f.id}
                        </span>
                      </div>
                      <button onClick={() => startEdit(f)} style={actionBtnStyle('var(--accent)')}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(f.id)} style={actionBtnStyle('#ef4444')}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '0.2rem',
  fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600,
};

const fieldInputStyle: React.CSSProperties = {
  padding: '0.35rem 0.5rem', background: 'var(--bg-soft)', border: '1px solid var(--border)',
  borderRadius: '6px', color: 'var(--text)', fontSize: '0.8rem',
};

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    padding: '0.2rem 0.5rem', borderRadius: '6px', border: 'none',
    background: 'transparent', color, fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer',
  };
}
