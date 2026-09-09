import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, TopStrip, StatCard, PanelCard, CreateRow, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Button, Badge } from '../design-system';
import { MOCK_CLIENTS, MOCK_ADMIN_ACTIVITY } from '../mocks/data';

export function Dashboard() {
  const navigate = useNavigate();
  useDashboardEntranceAnimation();

  const activeClients = MOCK_CLIENTS.filter((c) => c.Client_Status).length;

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <TopStrip name="Sarah" roleLabel="Admin · Default Organization" status={`Managing ${activeClients} clients, 7 open projects`} />
      <div style={{ display: 'flex', gap: 16, padding: '28px 40px 0' }}>
        <StatCard label="Active clients" value={activeClients} />
        <StatCard label="Open projects" value="7" />
        <StatCard label="Hours logged this week" value="184.5" />
        <StatCard label="Pending timesheets" value="2" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: '20px 40px 40px' }}>
        <PanelCard title="Create new">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CreateRow icon="＋" label="Client" onClick={() => navigate('/app/clients/new')} />
            <CreateRow icon="▤" label="Project" onClick={() => navigate('/app/projects')} />
            <CreateRow icon="◔" label="Team" onClick={() => navigate('/app/teams')} />
            <CreateRow icon="☰" label="Role" onClick={() => navigate('/app/roles/new')} />
          </div>
        </PanelCard>
        <PanelCard title="Team activity">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {MOCK_ADMIN_ACTIVITY.map((a, i) => (
              <div key={i} style={{ fontSize: 13, paddingBottom: 12, borderBottom: i < MOCK_ADMIN_ACTIVITY.length - 1 ? '1px solid var(--border-default)' : 'none' }}>
                <div style={{ color: 'var(--text-primary)' }}><strong>{a.who}</strong> {a.what}</div>
                <div style={{ color: 'var(--text-tertiary)', marginTop: 2 }}>{a.when}</div>
              </div>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Clients" action={<Button size="sm" variant="outline" onClick={() => navigate('/app/clients')}>View all</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_CLIENTS.map((c) => (
              <div key={c.Client_ID} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, padding: '8px 0' }}>
                <span style={{ color: 'var(--text-primary)' }}>{c.Client_name}</span>
                <Badge tone={c.Client_Status ? 'success' : 'neutral'}>{c.Client_Status ? 'Active' : 'Inactive'}</Badge>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
