import { AppShell } from '../components/AppShell';
import { EmptyState } from '../design-system';

export function ComingSoon({ title }) {
  return (
    <AppShell>
      <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px', fontFamily: 'var(--font-sans)' }}>{title}</h2>
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-card)' }}>
        <EmptyState>This section is coming soon.</EmptyState>
      </div>
    </AppShell>
  );
}
