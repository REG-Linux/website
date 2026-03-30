import { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { AdminDeviceList } from './AdminDeviceList';
import { AdminModeration } from './AdminModeration';
import { AdminTokens } from './AdminTokens';
import { AdminFeatures } from './AdminFeatures';
import { AdminDeviceCreate } from './AdminDeviceCreate';

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'devices', label: 'Devices' },
  { id: 'add-device', label: '+ Add Device' },
  { id: 'moderation', label: 'Moderation' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'features', label: 'Features' },
] as const;

type TabId = typeof TABS[number]['id'];

export function AdminTabs() {
  const [active, setActive] = useState<TabId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1) as TabId;
      if (TABS.some(t => t.id === hash)) return hash;
    }
    return 'dashboard';
  });

  useEffect(() => {
    window.location.hash = active;
  }, [active]);

  function handleDeviceCreated(id: string) {
    // Navigate to the new device's editor
    window.location.href = `/admin/device/${id}`;
  }

  return (
    <div>
      <div style={{
        display: 'flex', gap: '0.25rem', marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border)', paddingBottom: '0',
        overflowX: 'auto',
      }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)} style={{
            padding: '0.5rem 1.2rem',
            border: 'none',
            borderBottom: active === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
            background: 'transparent',
            color: active === tab.id
              ? (tab.id === 'add-device' ? '#22c55e' : 'var(--text)')
              : 'var(--text-muted)',
            fontSize: '0.9rem',
            fontWeight: active === tab.id ? 600 : 400,
            fontFamily: 'var(--font-heading)',
            cursor: 'pointer',
            transition: 'color 0.15s, border-color 0.15s',
            whiteSpace: 'nowrap',
          }}>
            {tab.label}
          </button>
        ))}
      </div>
      {active === 'dashboard' && <AdminDashboard />}
      {active === 'devices' && <AdminDeviceList />}
      {active === 'add-device' && <AdminDeviceCreate onCreated={handleDeviceCreated} />}
      {active === 'moderation' && <AdminModeration />}
      {active === 'tokens' && <AdminTokens />}
      {active === 'features' && <AdminFeatures />}
    </div>
  );
}
