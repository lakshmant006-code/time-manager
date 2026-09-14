import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
import { FilterBar } from '../components/FilterBar';
import { Badge, Button, EmptyState, Tabs } from '../design-system';
import { MOCK_EMPLOYEES, MOCK_PERMISSION_MODULES, MOCK_ROLES, MOCK_ROLE_USERS } from '../mocks/data';

const TABS = [
  { value: 'permissions', label: 'Permissions' },
  { value: 'users', label: 'Assigned Users' },
];

const ASSIGNEE_FIELDS = [
  {
    id: 'employee',
    label: 'Employees',
    operators: [{ value: 'is_any', label: 'is any of', multi: true }],
    options: MOCK_EMPLOYEES.map((e) => ({ value: e.id, label: `${e.name} · ${e.team}` })),
  },
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

  const initialAssignedIds = useMemo(() => {
    const seeded = MOCK_ROLE_USERS[role.id] || [];
    return MOCK_EMPLOYEES.filter((e) => seeded.some((u) => u.email === e.email)).map((e) => e.id);
  }, [role.id]);

  const [assignFilters, setAssignFilters] = useState([
    { id: 'role-assignees', field: 'employee', operator: 'is_any', values: initialAssignedIds },
  ]);
  const assignedIds = assignFilters[0]?.values ?? [];
  const assignedEmployees = MOCK_EMPLOYEES.filter((e) => assignedIds.includes(e.id));

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
            <div>
              <div style={{ marginBottom: 16 }}>
                <FilterBar fields={ASSIGNEE_FIELDS} value={assignFilters} onChange={setAssignFilters} addLabel="Employees" emptyLabel="Assign employees" aria-label="Assign employees to this role" />
              </div>
              {assignedEmployees.length === 0 ? <EmptyState>No employees assigned to this role yet.</EmptyState> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {assignedEmployees.map((e) => (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderRadius: 8, background: 'var(--surface-subtle)' }}>
                      <span style={{ fontWeight: 500 }}>{e.name}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{e.email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
            <Button variant="outline" onClick={() => navigate('/app/roles')}>Back to Roles</Button>
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
