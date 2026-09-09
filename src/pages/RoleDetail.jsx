import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
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
  useDashboardEntranceAnimation();

  if (!role) {
    return (
      <CrmShell role="admin">
        <TopBarStrip role="admin" />
        <PageHeader title="Role not found" />
        <div style={{ padding: '20px 40px 40px' }}>
          <PanelCard title="Role not found">
            <EmptyState>Role "{roleId}" was not found.</EmptyState>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button variant="outline" onClick={() => navigate('/app/roles')}>Back to Roles</Button>
            </div>
          </PanelCard>
        </div>
      </CrmShell>
    );
  }

  const users = MOCK_ROLE_USERS[role.id] || [];

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader title={role.name} subtitle={role.description} />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title={role.name}>
          <Tabs options={TABS} value={tab} onChange={setTab} style={{ margin: '0 0 24px' }} />
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
        </PanelCard>
      </div>
    </CrmShell>
  );
}
