import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Input, Textarea, Button, ToggleSwitch, Badge } from '../design-system';

function Field({ label, children, span }) {
  return (
    <div style={{ gridColumn: span ? 'span 2' : undefined }}>
      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4, fontFamily: 'var(--font-sans)' }}>{label}</label>
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px', fontFamily: 'var(--font-sans)' }}>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>{children}</div>
    </div>
  );
}

export function RegisterClient() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Register New Client</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Organization ID: #1</p>
          </div>
          <Badge>Admin Only</Badge>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Add a new client to the system</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Section title="Basic Information">
            <Field label="Client ID* (auto-generated)"><Input value="CL004" disabled style={{ fontFamily: 'monospace' }} /></Field>
            <Field label="Client Name*"><Input placeholder="Enter client name" /></Field>
            <Field label="Description" span><Textarea rows={3} placeholder="Enter client description" /></Field>
          </Section>
          <Section title="Address Information">
            <Field label="Street Address 1*" span><Input /></Field>
            <Field label="City*"><Input /></Field>
            <Field label="State*"><Input /></Field>
            <Field label="Country*"><Input /></Field>
            <Field label="ZIP Code*"><Input /></Field>
          </Section>
          <Section title="Contact Information">
            <Field label="Contact Name"><Input /></Field>
            <Field label="Phone Number"><Input type="tel" /></Field>
            <Field label="Website"><Input type="url" /></Field>
          </Section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Client Status</span>
            <ToggleSwitch checked={status} onChange={setStatus} />
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{status ? 'Active' : 'Inactive'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
            <Button variant="outline" onClick={() => navigate('/app/clients')}>Cancel</Button>
            <Button onClick={() => navigate('/app/clients')}>Register Client</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
