import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, TabCounterPills, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Button, DataTable, Input, Badge, ToggleSwitch } from '../design-system';
import { MOCK_CLIENTS } from '../mocks/data';

export function ClientsList() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  useDashboardEntranceAnimation();

  const toggle = (id) => setClients((cs) => cs.map((c) => (c.Client_ID === id ? { ...c, Client_Status: !c.Client_Status } : c)));
  const remove = (id) => { setClients((cs) => cs.filter((c) => c.Client_ID !== id)); setConfirmId(null); };

  const byTab = useMemo(() => {
    if (tab === 'active') return clients.filter((c) => c.Client_Status);
    if (tab === 'inactive') return clients.filter((c) => !c.Client_Status);
    return clients;
  }, [clients, tab]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter((c) => c.Client_name.toLowerCase().includes(q) || c.Client_Contact_name.toLowerCase().includes(q) || c.Client_ID.toLowerCase().includes(q));
  }, [byTab, search]);

  const tabs = [
    { key: 'all', label: 'All', count: clients.length },
    { key: 'active', label: 'Active', count: clients.filter((c) => c.Client_Status).length },
    { key: 'inactive', label: 'Inactive', count: clients.filter((c) => !c.Client_Status).length },
  ];

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader
        title="Clients"
        action={<><Badge>HR Only</Badge><Button variant="primary" onClick={() => navigate('/app/clients/new')}>+ Add Client</Button></>}
      />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard>
          <TabCounterPills tabs={tabs} value={tab} onChange={setTab} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <div style={{ maxWidth: 280, width: '100%' }}>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, contact, or ID" />
            </div>
          </div>
          <DataTable
            rowKey="Client_ID"
            columns={[
              { key: 'Client_ID', label: 'Client ID', width: '0.8fr' },
              { key: 'Client_name', label: 'Company Name', width: '1.4fr' },
              { key: 'Client_Contact_name', label: 'Contact', width: '1fr' },
              { key: 'address', label: 'Address', width: '2fr' },
              { key: 'status', label: 'Status', width: '0.8fr' },
              { key: 'actions', label: 'Actions', width: '1.4fr', align: 'right' },
            ]}
            rows={filtered}
            emptyMessage={search ? `No clients match "${search}".` : 'No clients found. Click "Add Client" to create one.'}
            renderCell={(row, key) => {
              if (key === 'status') return <ToggleSwitch checked={row.Client_Status} onChange={() => toggle(row.Client_ID)} />;
              if (key === 'actions') return confirmId === row.Client_ID ? (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button size="sm" variant="destructive" onClick={() => remove(row.Client_ID)}>Confirm</Button>
                  <Button size="sm" variant="secondary" onClick={() => setConfirmId(null)}>Cancel</Button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Button size="sm" onClick={() => navigate(`/app/clients/${row.Client_ID}`)}>View</Button>
                  <Button size="sm" onClick={() => setConfirmId(row.Client_ID)}>Delete</Button>
                </div>
              );
              return row[key];
            }}
          />
        </PanelCard>
      </div>
    </CrmShell>
  );
}
