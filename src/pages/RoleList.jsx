import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Badge, Button, DataTable, Input } from '../design-system';
import { MOCK_ROLES, MOCK_ROLE_USERS } from '../mocks/data';

export function RoleList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return MOCK_ROLES;
    return MOCK_ROLES.filter((r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }, [search]);

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, fontFamily: 'var(--font-sans)', flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>Manage Roles</h2>
          <Button onClick={() => navigate('/app/roles/new')}>Add Role</Button>
        </div>
        <div style={{ marginBottom: 16, maxWidth: 320 }}>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles" />
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
      </div>
    </AppShell>
  );
}
