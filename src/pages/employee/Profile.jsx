import { useState } from 'react';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../../components/CrmShell';
import { Button, Input } from '../../design-system';
import { MOCK_PROFILE } from '../../mocks/data';

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4, fontFamily: 'var(--font-sans)' }}>{label}</label>
      {children}
    </div>
  );
}

export function Profile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_PROFILE);
  useDashboardEntranceAnimation();

  const update = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));

  return (
    <CrmShell role="employee">
      <TopBarStrip role="employee" />
      <PageHeader
        title="Profile"
        subtitle="Your account details"
        action={editing
          ? <Button onClick={() => setEditing(false)}>Save</Button>
          : <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>}
      />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title="Account details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <Field label="Full Name"><Input value={profile.name} disabled={!editing} onChange={update('name')} /></Field>
            <Field label="Email"><Input type="email" value={profile.email} disabled={!editing} onChange={update('email')} /></Field>
            <Field label="Phone"><Input type="tel" value={profile.phone} disabled={!editing} onChange={update('phone')} /></Field>
            <Field label="Title"><Input value={profile.title} disabled={!editing} onChange={update('title')} /></Field>
            <Field label="Team"><Input value={profile.team} disabled /></Field>
            <Field label="Start Date"><Input value={profile.startDate} disabled /></Field>
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
