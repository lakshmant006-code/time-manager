import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, TabCounterPills, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Badge, Button, DataTable, Input } from '../design-system';
import { MOCK_ROLES, MOCK_ROLE_USERS } from '../mocks/data';

export function RoleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  useDashboardEntranceAnimation();

  const hasUsers = (r) => (MOCK_ROLE_USERS[r.id] || []).length > 0;

  const byTab = useMemo(() => {
    if (tab === 'assigned') return MOCK_ROLES.filter(hasUsers);
    if (tab === 'unassigned') return MOCK_ROLES.filter((r) => !hasUsers(r));
    return MOCK_ROLES;
  }, [tab]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return byTab;
    return byTab.filter((r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }, [byTab, search]);

  const tabs = [
    { key: 'all', label: 'All', count: MOCK_ROLES.length },
    { key: 'assigned', label: 'Assigned', count: MOCK_ROLES.filter(hasUsers).length },
    { key: 'unassigned', label: 'Unassigned', count: MOCK_ROLES.filter((r) => !hasUsers(r)).length },
  ];

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader title="Roles" action={<Button variant="primary" onClick={() => navigate('/app/roles/new')}>+ Add Role</Button>} />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard>
          <TabCounterPills tabs={tabs} value={tab} onChange={setTab} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <div style={{ maxWidth: 280, width: '100%' }}>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles" />
            </div>
          </div>
          <DataTable
            rowKey="id"
            emptyMessage={search ? `No roles match "${search}".` : 'No roles yet.'}
            columns={[
              { key: 'name', label: 'Role', width: '1fr' },
              { key: 'description', label: 'Description', width: '2fr' },
              { key: 'permissions', label: 'Modules', width: '0.8fr' },
              { key: 'users', label: 'Assigned Users', width: '0.8fr' },
              { key: 'actions', label: 'Actions', width: '0.8fr', align: 'right' },
            ]}
            rows={filtered}
            renderCell={(row, key) => {
              if (key === 'permissions') return <Badge>{row.permissions.length}</Badge>;
              if (key === 'users') return <Badge tone="success">{(MOCK_ROLE_USERS[row.id] || []).length}</Badge>;
              if (key === 'actions') return <Button size="sm" onClick={() => navigate(`/app/roles/${row.id}`)}>View</Button>;
              return row[key];
            }}
          />
        </PanelCard>
      </div>
    </CrmShell>
  );
}
