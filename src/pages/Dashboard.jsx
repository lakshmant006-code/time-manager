import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { Button, Card } from '../design-system';

const CARDS = [
  { title: 'Clients', desc: 'Manage your client accounts and registrations.', action: 'Register New Client', path: '/app/clients/new' },
  { title: 'Projects', desc: 'All the projects to be shown', action: 'Register New Project', path: '/app/projects' },
  { title: 'Users', desc: 'All the working users in the company.', action: 'Register New User', path: '/app/users' },
];

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <h2 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px', fontFamily: 'var(--font-display)' }}>User Dashboard</h2>
      <p style={{ color: 'var(--text-secondary)', margin: '0 0 32px', fontFamily: 'var(--font-sans)' }}>Welcome to Time Management user dashboard</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
        {CARDS.map((c) => (
          <Card key={c.title} style={{ padding: 24, borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 8px', fontFamily: 'var(--font-sans)' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontFamily: 'var(--font-sans)' }}>{c.desc}</p>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
              <Button style={{ width: '100%' }} onClick={() => navigate(c.path)}>{c.action}</Button>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
