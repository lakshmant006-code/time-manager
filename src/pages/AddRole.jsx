import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Badge, Button, Input, Textarea, ToggleSwitch } from '../design-system';
import { MOCK_PERMISSION_MODULES } from '../mocks/data';

export function AddRole() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useDashboardEntranceAnimation();

  const toggle = (mod) => setPermissions((p) => ({ ...p, [mod]: !p[mod] }));

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader title="Add Role" subtitle="Create a role and choose which modules it can access" action={<Badge>Admin Only</Badge>} />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title="Role details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>Role Name*</label>
                <Input placeholder="e.g. Project Manager" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>Description</label>
                <Textarea rows={3} placeholder="What does this role do?" />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Module Access</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MOCK_PERMISSION_MODULES.map((mod) => (
                  <div key={mod} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderRadius: 8, background: 'var(--surface-subtle)' }}>
                    <span>{mod}</span>
                    <ToggleSwitch checked={!!permissions[mod]} onChange={() => toggle(mod)} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
              <Button variant="outline" onClick={() => navigate('/app/roles')}>Cancel</Button>
              <Button onClick={() => navigate('/app/roles')}>Create Role</Button>
            </div>
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
