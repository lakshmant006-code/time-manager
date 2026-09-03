import { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Button, Modal, Select } from '../design-system';
import { MOCK_CLIENTS, MOCK_TIME_ENTRIES } from '../mocks/data';

function fmt(s) {
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');
}

export function TimeTracking() {
  const [entries] = useState(MOCK_TIME_ENTRIES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  return (
    <AppShell>
      <div style={{ background: '#fff', borderRadius: 8, padding: 32, boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-sans)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-display)', margin: 0 }}>Time Tracking</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>Track your time on projects and activities</p>
          </div>
          {running ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 24, fontFamily: 'monospace', background: 'var(--surface-muted)', padding: '8px 16px', borderRadius: 6 }}>{fmt(elapsed)}</div>
              <Button variant="destructive" onClick={() => { setRunning(false); setElapsed(0); }}>Stop Timer</Button>
            </div>
          ) : <Button onClick={() => setDialogOpen(true)}>Start Timer</Button>}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 16px' }}>Recent Time Entries</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {entries.map((e) => (
            <div key={e.id} style={{ background: 'var(--surface-subtle)', padding: 16, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><div style={{ fontWeight: 500 }}>{e.project}</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{e.activity}</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'monospace' }}>{e.duration}</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{e.start}</div></div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title="Start New Timer"
        footer={<><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => { setDialogOpen(false); setRunning(true); setElapsed(0); }}>Start Timer</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Client</label><Select defaultValue=""><option value="">Select Client</option>{MOCK_CLIENTS.map((c) => <option key={c.Client_ID}>{c.Client_name}</option>)}</Select></div>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Project</label><Select defaultValue=""><option value="">Select Project</option><option>Riverside Apartments — Phase 2</option></Select></div>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Activity</label><Select defaultValue=""><option value="">Select Activity</option><option>Panel Layout (Vertex BD)</option></Select></div>
        </div>
      </Modal>
    </AppShell>
  );
}
