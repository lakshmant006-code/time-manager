import { useState } from 'react';
import { EmployeeShell } from '../../components/EmployeeShell';
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

  const update = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }));

  return (
    <EmployeeShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>Profile</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>Your account details</p>
          </div>
          {editing
            ? <Button onClick={() => setEditing(false)}>Save</Button>
            : <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Field label="Full Name"><Input value={profile.name} disabled={!editing} onChange={update('name')} /></Field>
          <Field label="Email"><Input type="email" value={profile.email} disabled={!editing} onChange={update('email')} /></Field>
          <Field label="Phone"><Input type="tel" value={profile.phone} disabled={!editing} onChange={update('phone')} /></Field>
          <Field label="Title"><Input value={profile.title} disabled={!editing} onChange={update('title')} /></Field>
          <Field label="Team"><Input value={profile.team} disabled /></Field>
          <Field label="Start Date"><Input value={profile.startDate} disabled /></Field>
        </div>
      </div>
    </EmployeeShell>
  );
}
