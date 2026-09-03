import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar, Sidebar } from '../design-system';
import { NAV_ITEMS } from '../mocks/data';
import logo from '../assets/logo/ubc-bim-services-logo.png';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '16px 0', fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
      <p style={{ margin: 0 }}>Contact Support</p>
      <p style={{ margin: 0 }}>2026 Time Management. All rights reserved.</p>
    </footer>
  );
}

export function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-app)', display: 'flex', flexDirection: 'column' }}>
      <TopBar fixed />
      <div style={{ display: 'flex', flex: 1, paddingTop: 80 }}>
        <div style={{ position: 'fixed', left: 0, top: 80, bottom: 0, width: 256, overflowY: 'auto', borderRight: '1px solid var(--border-default)' }}>
          <Sidebar
            logoSrc={logo}
            orgName="Default Organization"
            orgId={1}
            items={NAV_ITEMS}
            activePath={location.pathname}
            onNavigate={(path) => navigate(path)}
            onLogout={() => navigate('/login')}
            style={{ height: '100%' }}
          />
        </div>
        <main style={{ marginLeft: 256, flex: 1, padding: 32, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
