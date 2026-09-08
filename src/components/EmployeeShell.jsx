import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar, Tabs } from '../design-system';

const TABS = [
  { value: '/employee/timesheet', label: 'Timesheet' },
  { value: '/employee/skills', label: 'Skills' },
  { value: '/employee/profile', label: 'Profile' },
];

export function EmployeeShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-app)', display: 'flex', flexDirection: 'column' }}>
      <TopBar fixed />
      <div style={{ paddingTop: 80 }}>
        <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-default)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Tabs options={TABS} value={location.pathname} onChange={(v) => navigate(v)} />
          <button
            onClick={() => navigate('/login')}
            style={{ padding: '8px 16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)' }}
          >
            Logout
          </button>
        </div>
        <main style={{ maxWidth: 1040, margin: '0 auto', padding: 32 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
