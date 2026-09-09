import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
import { Input, Textarea, Button, ToggleSwitch, Badge, Tabs } from '../design-system';

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

function BulkUpload({ onCancel, onUploaded }) {
  const [fileName, setFileName] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
        Upload a CSV with columns: <code>Client_name, Client_Contact_name, Client_Phone, Client_Email, address</code>.
        Moving an existing client base over from a spreadsheet or another CRM? This is the fastest path.
      </p>
      <label
        style={{
          border: '2px dashed var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 40,
          textAlign: 'center', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 14,
        }}
      >
        <input
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
        />
        {fileName ? <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{fileName}</span> : 'Click to choose a CSV file, or drag one here'}
      </label>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button disabled={!fileName} onClick={onUploaded}>Upload Clients</Button>
      </div>
    </div>
  );
}

export function RegisterClient() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [mode, setMode] = useState('manual');
  useDashboardEntranceAnimation();

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader title="Add Client" subtitle="Organization ID: #1" action={<Badge>Admin Only</Badge>} />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title="Client details">
          <p style={{ color: 'var(--text-secondary)', marginTop: 0, marginBottom: 24 }}>Add a new client manually, or bring over a whole client base at once</p>
          <Tabs
            options={[{ value: 'manual', label: 'Manual' }, { value: 'bulk', label: 'Bulk Upload' }]}
            value={mode}
            onChange={setMode}
            style={{ marginBottom: 32 }}
          />
          {mode === 'bulk' ? (
            <BulkUpload onCancel={() => navigate('/app/clients')} onUploaded={() => navigate('/app/clients')} />
          ) : (
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
          )}
        </PanelCard>
      </div>
    </CrmShell>
  );
}
