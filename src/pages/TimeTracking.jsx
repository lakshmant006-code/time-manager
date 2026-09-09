import { useEffect, useState } from 'react';
import { CrmShell, TopBarStrip, PageHeader, PanelCard, useDashboardEntranceAnimation } from '../components/CrmShell';
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
  useDashboardEntranceAnimation();

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  return (
    <CrmShell role="admin">
      <TopBarStrip role="admin" />
      <PageHeader
        title="Time Tracking"
        subtitle="Track your time on projects and activities"
        action={running ? (
          <>
            <div style={{ fontSize: 20, fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace', background: 'var(--surface-muted)', padding: '8px 16px', borderRadius: 6 }}>{fmt(elapsed)}</div>
            <Button variant="destructive" onClick={() => { setRunning(false); setElapsed(0); }}>Stop Timer</Button>
          </>
        ) : <Button onClick={() => setDialogOpen(true)}>Start Timer</Button>}
      />
      <div style={{ padding: '20px 40px 40px' }}>
        <PanelCard title="Recent time entries">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {entries.map((e) => (
              <div key={e.id} style={{ background: 'var(--surface-subtle)', padding: 16, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div style={{ fontWeight: 500 }}>{e.project}</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{e.activity}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{e.duration}</div><div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{e.start}</div></div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)} title="Start New Timer"
        footer={<><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={() => { setDialogOpen(false); setRunning(true); setElapsed(0); }}>Start Timer</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Client</label><Select defaultValue=""><option value="">Select Client</option>{MOCK_CLIENTS.map((c) => <option key={c.Client_ID}>{c.Client_name}</option>)}</Select></div>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Project</label><Select defaultValue=""><option value="">Select Project</option><option>Riverside Apartments — Phase 2</option></Select></div>
          <div><label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Activity</label><Select defaultValue=""><option value="">Select Activity</option><option>Panel Layout (Vertex BD)</option></Select></div>
        </div>
      </Modal>
    </CrmShell>
  );
}
