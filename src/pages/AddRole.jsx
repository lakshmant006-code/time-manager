import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Badge, Button, Input, Textarea, ToggleSwitch } from '../design-system';
import { MOCK_PERMISSION_MODULES } from '../mocks/data';

export function AddRole() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});

  const toggle = (mod) => setPermissions((p) => ({ ...p, [mod]: !p[mod] }));

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>Add Role</h2>
          <Badge>Admin Only</Badge>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Create a role and choose which modules it can access</p>
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
      </div>
    </AppShell>
  );
}
