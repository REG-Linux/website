import type { Status } from '../lib/api';

const STATUS_META: Record<Status, { icon: string; label: string; color: string }> = {
  works:    { icon: '\u2705', label: 'Works',    color: 'var(--status-works)' },
  partial:  { icon: '\u26A0\uFE0F', label: 'Partial',  color: 'var(--status-partial)' },
  broken:   { icon: '\u274C', label: 'Broken',   color: 'var(--status-broken)' },
  na:       { icon: '\u2014', label: 'N/A',      color: 'var(--status-na)' },
  untested: { icon: '\u00B7', label: 'Untested', color: 'var(--status-untested)' },
};

export { STATUS_META };

interface Props {
  status: Status;
  buildDate?: string;
  author?: string;
  notes?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, buildDate, author, notes, size = 'sm' }: Props) {
  const meta = STATUS_META[status] ?? STATUS_META.untested;

  let tooltip = meta.label;
  if (buildDate && author) {
    tooltip = `${buildDate} by @${author}`;
    if (notes) tooltip += ` \u2014 ${notes}`;
  }

  const fontSize = size === 'sm' ? '0.85rem' : '1.2rem';

  return (
    <span
      title={tooltip}
      aria-label={meta.label}
      style={{ color: meta.color, fontSize, cursor: 'default', whiteSpace: 'nowrap' }}
    >
      {meta.icon}
    </span>
  );
}
