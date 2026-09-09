import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { Badge } from '../design-system';
import logo from '../assets/logo/ubc-bim-services-logo.png';

const ADMIN_NAV = [
  { path: '/app/dashboard', label: 'Dashboard' },
  { path: '/app/organization', label: 'Organization' },
  { path: '/app/clients', label: 'Clients' },
  { path: '/app/roles', label: 'Roles' },
  { path: '/app/teams', label: 'Teams' },
  { path: '/app/users', label: 'Users' },
  { path: '/app/projects', label: 'Projects' },
  { path: '/app/activities', label: 'Activities' },
  { path: '/app/skills', label: 'Skills' },
  { path: '/app/time-tracking', label: 'Time Tracking' },
  { path: '/app/reports', label: 'Reports', badge: 'New' },
];

const EMPLOYEE_NAV = [
  { path: '/employee/dashboard', label: 'Dashboard' },
  { path: '/employee/timesheet', label: 'Timesheet' },
  { path: '/employee/skills', label: 'Skills' },
  { path: '/employee/profile', label: 'Profile' },
];

export function animateStagger(selector, delay) {
  anime({ targets: selector, opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(delay || 60), duration: 520, easing: 'easeOutCubic' });
}

function CrmSidebarItem({ item, active, onNavigate }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => onNavigate && onNavigate(item.path)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: active ? 600 : 500,
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: active ? 'var(--surface-muted)' : (hover ? 'var(--surface-subtle)' : 'transparent'),
        transition: 'background 150ms,color 150ms',
      }}
    >
      <span>{item.label}</span>
      {item.badge && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--white)', background: 'var(--brand-blue)', borderRadius: 'var(--radius-pill)', padding: '2px 7px' }}>{item.badge}</span>}
    </div>
  );
}

export function CrmShell({ role, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const items = role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--surface-app)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 240, background: 'var(--white)', borderRight: '1px solid var(--border-default)', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '20px 14px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px 20px' }}>
          <img src={logo} alt="UBC BIM" style={{ height: 24, objectFit: 'contain' }} />
        </div>
        <div style={{ background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 10, padding: '12px 14px', marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6 }}>{role === 'admin' ? 'Admin workspace' : 'Employee workspace'}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>UBC BIM Services</div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {items.map((it) => <CrmSidebarItem key={it.path} item={it} active={it.path === location.pathname} onNavigate={(p) => navigate(p)} />)}
        </nav>
        <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: 10 }}>
          <CrmSidebarItem item={{ path: '__logout', label: 'Log out' }} active={false} onNavigate={() => navigate('/login')} />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export function TopBarStrip({ role }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px', borderBottom: '1px solid var(--border-default)', background: 'var(--white)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '8px 16px', fontSize: 13, color: 'var(--text-tertiary)', width: 220 }}>
        Search
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {role === 'admin' && <a href="#" style={{ fontSize: 13, color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none' }}>See pricing</a>}
        <span style={{ position: 'relative', fontSize: 16, color: 'var(--text-secondary)' }}>
          🔔
          <span style={{ position: 'absolute', top: -4, right: -8, background: 'var(--brand-red)', color: '#fff', fontSize: 9, fontWeight: 700, borderRadius: 'var(--radius-pill)', padding: '1px 5px' }}>2</span>
        </span>
        <button style={{ background: 'var(--ink)', color: 'var(--white)', border: 'none', borderRadius: 6, padding: '8px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>+ New</button>
      </div>
    </div>
  );
}

export function TopStrip({ name, roleLabel, status }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '28px 40px 0' }}>
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 6 }}>{today}</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-tight)' }}>Good afternoon, {name}</h1>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{status || roleLabel}</div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card" style={{ opacity: 0, flex: 1, background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 10, padding: '18px 20px', boxShadow: 'var(--shadow-card)' }}>
      <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: 'var(--tracking-tight)' }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function PanelCard({ title, action, children, style }) {
  return (
    <div className="panel-card" style={{ opacity: 0, background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 10, padding: 20, boxShadow: 'var(--shadow-card)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function CreateRow({ icon, label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--border-default)', borderRadius: 8, padding: '12px 14px', cursor: 'pointer', background: hover ? 'var(--surface-subtle)' : 'transparent', transition: 'background 150ms' }}
    >
      <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--brand-blue)' }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>
    </div>
  );
}

export function useDashboardEntranceAnimation() {
  useEffect(() => {
    animateStagger('.stat-card', 70);
    const t = setTimeout(() => animateStagger('.panel-card', 80), 140);
    return () => clearTimeout(t);
  }, []);
}
