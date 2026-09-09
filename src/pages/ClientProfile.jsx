import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Badge, Button, DataTable, EmptyState, Tabs } from '../design-system';
import { MOCK_CLIENTS, MOCK_CLIENT_INVOICES, MOCK_CLIENT_PROJECTS } from '../mocks/data';

const TABS = [
  { value: 'contact', label: 'Contact' },
  { value: 'projects', label: 'Projects' },
  { value: 'invoices', label: 'Invoices' },
];

function ContactTab({ client }) {
  const rows = [
    ['Contact Name', client.Client_Contact_name],
    ['Phone', client.Client_Phone],
    ['Email', client.Client_Email],
    ['Website', client.Client_Website],
    ['Address', client.address],
    ['Description', client.Client_Dscr],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: 'flex', gap: 16, borderBottom: '1px solid var(--border-default)', paddingBottom: 12 }}>
          <div style={{ width: 160, color: 'var(--text-secondary)', fontSize: 14 }}>{label}</div>
          <div style={{ fontSize: 14 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}

function ProjectsTab({ projects }) {
  if (!projects.length) return <EmptyState>No projects linked to this client yet.</EmptyState>;
  return (
    <DataTable
      rowKey="id"
      columns={[
        { key: 'name', label: 'Project', width: '2fr' },
        { key: 'status', label: 'Status', width: '1fr' },
        { key: 'hours', label: 'Hours Logged', width: '1fr', align: 'right' },
      ]}
      rows={projects}
      renderCell={(row, key) => {
        if (key === 'status') return <Badge tone={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge>;
        return row[key];
      }}
    />
  );
}

function InvoicesTab({ invoices }) {
  if (!invoices.length) return <EmptyState>No invoices on file for this client yet.</EmptyState>;
  return (
    <DataTable
      rowKey="id"
      columns={[
        { key: 'id', label: 'Invoice', width: '1fr' },
        { key: 'date', label: 'Date', width: '1fr' },
        { key: 'amount', label: 'Amount', width: '1fr', align: 'right' },
        { key: 'status', label: 'Status', width: '1fr', align: 'right' },
      ]}
      rows={invoices}
      renderCell={(row, key) => {
        if (key === 'status') return <Badge tone={row.status === 'Paid' ? 'success' : 'neutral'}>{row.status}</Badge>;
        return row[key];
      }}
    />
  );
}

export function ClientProfile() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('contact');
  const client = MOCK_CLIENTS.find((c) => c.Client_ID === clientId);
  useDashboardEntranceAnimation();

  if (!client) {
    return (
      <CrmShell role="admin">
        <TopBarStrip role="admin" />
        <PageHeader title="Client not found" />
        <div style={{ padding: '20px 40px 40px' }}>
          <PanelCard title="Client not found">
            <EmptyState>Client "{clientId}" was not found.</EmptyState>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button variant="outline" onClick={() => navigate('/app/clients')}>Back to Clients</Button>
            </div>
          </PanelCard>
        </div>
      </CrmShell>
    );
  }

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader
        title={client.Client_name}
        subtitle={`Client ID: ${client.Client_ID}`}
        action={<Badge tone={client.Client_Status ? 'success' : 'neutral'}>{client.Client_Status ? 'Active' : 'Inactive'}</Badge>}
      />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title={client.Client_name}>
          <Tabs options={TABS} value={tab} onChange={setTab} style={{ margin: '0 0 24px' }} />
          {tab === 'contact' && <ContactTab client={client} />}
          {tab === 'projects' && <ProjectsTab projects={MOCK_CLIENT_PROJECTS[client.Client_ID] || []} />}
          {tab === 'invoices' && <InvoicesTab invoices={MOCK_CLIENT_INVOICES[client.Client_ID] || []} />}
          <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
            <Button variant="outline" onClick={() => navigate('/app/clients')}>Back to Clients</Button>
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
