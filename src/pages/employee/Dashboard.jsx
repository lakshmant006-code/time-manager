import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CrmShell, TopBarStrip, TopStrip, StatCard, PanelCard, useDashboardEntranceAnimation } from '../../components/CrmShell';
import { Button, Badge } from '../../design-system';
import { MOCK_PROFILE, MOCK_SKILLS, MOCK_TIME_ENTRIES } from '../../mocks/data';

function fmt(s) {
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');
}

export function Dashboard() {
  const navigate = useNavigate();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  useDashboardEntranceAnimation();

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  return (
    <CrmShell role="employee">
      <TopBarStrip role="employee" />
      <TopStrip name={MOCK_PROFILE.name} roleLabel={`Employee · ${MOCK_PROFILE.team}`} status="2 projects assigned this week" />
      <div style={{ display: 'flex', gap: 16, padding: '28px 40px 0' }}>
        <StatCard label="Hours this week" value="32.4" />
        <StatCard label="Assigned projects" value="2" />
        <StatCard label="Skills logged" value={MOCK_SKILLS.length} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '20px 40px 40px' }}>
        <PanelCard title="Current timer" action={running ? <Badge tone="success">Running</Badge> : null}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '12px 0' }}>
            <div style={{ fontSize: 38, fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace', fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(elapsed)}</div>
            {running
              ? <Button variant="destructive" onClick={() => { setRunning(false); setElapsed(0); }}>Stop Timer</Button>
              : <Button onClick={() => setRunning(true)}>Start Timer</Button>}
          </div>
        </PanelCard>
        <PanelCard title="My recent entries" action={<Button size="sm" variant="outline" onClick={() => navigate('/employee/timesheet')}>View all</Button>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MOCK_TIME_ENTRIES.map((e, i) => (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: i < MOCK_TIME_ENTRIES.length - 1 ? '1px solid var(--border-default)' : 'none' }}>
                <div><div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{e.project}</div><div style={{ color: 'var(--text-tertiary)' }}>{e.activity}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace', color: 'var(--text-primary)' }}>{e.duration}</div><div style={{ color: 'var(--text-tertiary)' }}>{e.start}</div></div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>
    </CrmShell>
  );
}
