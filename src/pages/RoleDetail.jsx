import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Badge, Button, EmptyState, Tabs } from '../design-system';
import { MOCK_PERMISSION_MODULES, MOCK_ROLES, MOCK_ROLE_USERS } from '../mocks/data';

const TABS = [
  { value: 'permissions', label: 'Permissions' },
  { value: 'users', label: 'Assigned Users' },
];

export function RoleDetail() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('permissions');
  const role = MOCK_ROLES.find((r) => r.id === roleId);

  if (!role) {
    return (
      <AppShell>
        <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-card)' }}>
          <EmptyState>Role "{roleId}" was not found.</EmptyState>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button variant="outline" onClick={() => navigate('/app/roles')}>Back to Roles</Button>
          </div>
        </div>
      </AppShell>
    );
  }

  const users = MOCK_ROLE_USERS[role.id] || [];

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-sans)' }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>{role.name}</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{role.description}</p>
        </div>
        <Tabs options={TABS} value={tab} onChange={setTab} style={{ margin: '24px 0' }} />
        {tab === 'permissions' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MOCK_PERMISSION_MODULES.map((mod) => {
              const granted = role.permissions.includes(mod);
              return (
                <div key={mod} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderRadius: 8, background: 'var(--surface-subtle)' }}>
                  <span>{mod}</span>
                  <Badge tone={granted ? 'success' : 'neutral'}>{granted ? 'Granted' : 'No access'}</Badge>
                </div>
              );
            })}
          </div>
        )}
        {tab === 'users' && (
          users.length === 0 ? <EmptyState>No users hold this role yet.</EmptyState> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {users.map((u) => (
                <div key={u.email} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderRadius: 8, background: 'var(--surface-subtle)' }}>
                  <span style={{ fontWeight: 500 }}>{u.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{u.email}</span>
                </div>
              ))}
            </div>
          )
        )}
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
          <Button variant="outline" onClick={() => navigate('/app/roles')}>Back to Roles</Button>
        </div>
      </div>
    </AppShell>
  );
}
