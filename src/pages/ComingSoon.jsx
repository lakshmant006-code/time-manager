import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
import { EmptyState } from '../design-system';

export function ComingSoon({ title }) {
  useDashboardEntranceAnimation();

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader title={title} />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title={title}>
          <EmptyState>This section is coming soon.</EmptyState>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
