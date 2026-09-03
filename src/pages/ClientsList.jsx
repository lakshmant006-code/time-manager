import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Button, DataTable, StatusDot, Badge, ToggleSwitch } from '../design-system';
import { MOCK_CLIENTS } from '../mocks/data';

export function ClientsList() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [confirmId, setConfirmId] = useState(null);

  const toggle = (id) => setClients((cs) => cs.map((c) => (c.Client_ID === id ? { ...c, Client_Status: !c.Client_Status } : c)));
  const remove = (id) => { setClients((cs) => cs.filter((c) => c.Client_ID !== id)); setConfirmId(null); };

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, fontFamily: 'var(--font-sans)' }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>List of Clients</h2>
            <StatusDot status="connected" />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Badge>HR Only</Badge>
            <Button onClick={() => navigate('/app/clients/new')}>Add Client</Button>
          </div>
        </div>
        <DataTable
          rowKey="Client_ID"
          emptyMessage='No clients found. Click "Add Client" to create one.'
          columns={[
            { key: 'Client_ID', label: 'Client ID', width: '0.8fr' },
            { key: 'Client_name', label: 'Company Name', width: '1.4fr' },
            { key: 'Client_Contact_name', label: 'Contact', width: '1fr' },
            { key: 'address', label: 'Address', width: '2fr' },
            { key: 'status', label: 'Status', width: '0.8fr' },
            { key: 'actions', label: 'Actions', width: '1.4fr', align: 'right' },
          ]}
          rows={clients}
          renderCell={(row, key) => {
            if (key === 'status') return <ToggleSwitch checked={row.Client_Status} onChange={() => toggle(row.Client_ID)} />;
            if (key === 'actions') return confirmId === row.Client_ID ? (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button size="sm" variant="destructive" onClick={() => remove(row.Client_ID)}>Confirm</Button>
                <Button size="sm" variant="secondary" onClick={() => setConfirmId(null)}>Cancel</Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <Button size="sm">Edit</Button>
                <Button size="sm" onClick={() => setConfirmId(row.Client_ID)}>Delete</Button>
              </div>
            );
            return row[key];
          }}
        />
      </div>
    </AppShell>
  );
}
