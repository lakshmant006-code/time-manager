import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { CommandPalette } from './CommandPalette';
import {
  IconActivity, IconBarChart, IconBell, IconBriefcase, IconBuilding, IconChevronDown, IconClock,
  IconFolder, IconHome, IconLayers, IconPlus, IconSearch, IconSidebar, IconSliders, IconStar, IconSun, IconUser,
} from './icons';
import logo from '../assets/logo/summer-mark.svg';

const ADMIN_NAV = {
  primary: [{ path: '/app/dashboard', label: 'Home', icon: IconHome }],
  groups: [
    {
      label: 'Workspace',
      items: [
        { path: '/app/organization', label: 'Organization', icon: IconBuilding },
        { path: '/app/clients', label: 'Clients', icon: IconBriefcase },
        { path: '/app/projects', label: 'Projects', icon: IconFolder },
        { path: '/app/activities', label: 'Activities', icon: IconActivity },
        { path: '/app/skills', label: 'Skills', icon: IconStar },
        { path: '/app/time-tracking', label: 'Time Tracking', icon: IconClock },
        { path: '/app/reports', label: 'Reports', icon: IconBarChart, badge: 'New' },
      ],
    },
    {
      label: 'People',
      colored: true,
      items: [
        { path: '/app/users', label: 'Employees', color: 'var(--brand-blue)' },
        { path: '/app/teams', label: 'Teams', color: '#a855f7' },
        { path: '/app/roles', label: 'Roles', color: '#22c55e' },
      ],
    },
  ],
};

const EMPLOYEE_NAV = {
  primary: [{ path: '/employee/dashboard', label: 'Home', icon: IconHome }],
  groups: [
    {
      label: 'Workspace',
      items: [
        { path: '/employee/timesheet', label: 'Timesheet', icon: IconClock },
        { path: '/employee/skills', label: 'Skills', icon: IconStar },
        { path: '/employee/profile', label: 'Profile', icon: IconUser },
      ],
    },
  ],
};

export function animateStagger(selector, delay) {
  anime({ targets: selector, opacity: [0, 1], translateY: [16, 0], delay: anime.stagger(delay || 60), duration: 520, easing: 'easeOutCubic' });
}

function NavRow({ label, icon: Icon, color, badge, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
        fontSize: 13.5, fontFamily: 'var(--font-sans)', fontWeight: active ? 600 : 500,
        color: active ? '#fff' : 'var(--text-secondary)',
        background: active ? 'var(--ink)' : hover ? 'var(--surface-subtle)' : 'transparent',
        transition: 'background 150ms,color 150ms',
      }}
    >
      {color ? (
        <span style={{ width: 16, height: 16, borderRadius: 5, background: color, flexShrink: 0 }} />
      ) : Icon ? (
        <Icon style={{ color: active ? '#fff' : 'var(--text-tertiary)', flexShrink: 0 }} />
      ) : null}
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      {badge && (
        <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: active ? 'rgba(255,255,255,0.25)' : 'var(--brand-blue)', borderRadius: 'var(--radius-pill)', padding: '2px 7px' }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function SectionHeader({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', marginTop: 4 }}>
      <IconChevronDown style={{ color: 'var(--text-tertiary)', width: 12, height: 12 }} />
      <span style={{ flex: 1, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>{label}</span>
      <IconPlus style={{ color: 'var(--text-tertiary)', width: 12, height: 12 }} />
    </div>
  );
}

const PaletteContext = createContext(() => {});

export function CrmShell({ role, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const nav = role === 'admin' ? ADMIN_NAV : EMPLOYEE_NAV;
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--surface-app)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 248, background: 'var(--white)', borderRight: '1px solid var(--border-default)', flexShrink: 0, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 14px 10px' }}>
          <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconLayers style={{ width: 14, height: 14 }} />
          </span>
          <img src={logo} alt="Summer" style={{ height: 30, objectFit: 'contain', flex: '0 0 auto' }} />
          <IconSidebar style={{ color: 'var(--text-tertiary)', cursor: 'pointer', flexShrink: 0 }} />
        </div>

        <div style={{ padding: '0 14px 10px' }}>
          <button
            onClick={() => setPaletteOpen(true)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-subtle)', border: '1px solid var(--border-default)',
              borderRadius: 8, padding: '7px 10px', cursor: 'pointer', fontFamily: 'var(--font-sans)',
            }}
          >
            <IconSearch style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 13, color: 'var(--text-tertiary)' }}>Search</span>
            <kbd style={{ fontSize: 10, color: 'var(--text-tertiary)', border: '1px solid var(--border-default)', borderRadius: 4, padding: '1px 5px', background: 'var(--white)' }}>⌘K</kbd>
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {nav.primary.map((it) => (
            <NavRow key={it.path} label={it.label} icon={it.icon} active={it.path === location.pathname} onClick={() => navigate(it.path)} />
          ))}
          {nav.groups.map((g) => (
            <div key={g.label} style={{ marginTop: 6 }}>
              <SectionHeader label={g.label} />
              {g.items.map((it) => (
                <NavRow
                  key={it.path}
                  label={it.label}
                  icon={g.colored ? undefined : it.icon}
                  color={g.colored ? it.color : undefined}
                  badge={it.badge}
                  active={it.path === location.pathname}
                  onClick={() => navigate(it.path)}
                />
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: '0 14px 14px' }}>
          <div style={{ background: 'linear-gradient(135deg,var(--surface-subtle),var(--surface-muted))', border: '1px solid var(--border-default)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Getting started</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginBottom: 10, lineHeight: 1.4 }}>Tips for setting up clients, roles, and your team.</div>
            <button style={{ width: '100%', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 0', fontSize: 12.5, fontWeight: 600, fontFamily: 'var(--font-sans)', cursor: 'pointer' }}>
              View guide
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderTop: '1px solid var(--border-default)', paddingTop: 10 }}>
            <span title="Theme" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
              <IconSun />
            </span>
            <span
              title="Log out"
              onClick={() => navigate('/login')}
              style={{ width: 30, height: 30, borderRadius: 'var(--radius-pill)', background: 'var(--brand-navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
            >
              {role === 'admin' ? 'A' : 'E'}
            </span>
            <span title="Preferences" style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
              <IconSliders />
            </span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <PaletteContext.Provider value={() => setPaletteOpen(true)}>
          {children}
        </PaletteContext.Provider>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} role={role} />
    </div>
  );
}

export function TopBarStrip({ role }) {
  const openPalette = useContext(PaletteContext);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 40px', borderBottom: '1px solid var(--border-default)', background: 'var(--white)' }}>
      <button
        onClick={openPalette}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-subtle)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '8px 16px', fontSize: 13, color: 'var(--text-tertiary)', width: 220, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
      >
        <IconSearch style={{ flexShrink: 0 }} />
        Search…
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {role === 'admin' && <a href="#" style={{ fontSize: 13, color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'none' }}>See pricing</a>}
        <span style={{ position: 'relative', display: 'flex', color: 'var(--text-secondary)' }}>
          <IconBell />
          <span style={{ position: 'absolute', top: -5, right: -7, background: 'var(--brand-red)', color: '#fff', fontSize: 9, fontWeight: 700, borderRadius: 'var(--radius-pill)', padding: '1px 5px' }}>2</span>
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

export function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '28px 40px 0', gap: 16, flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: 'var(--tracking-tight)' }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>{subtitle}</div>}
      </div>
      {action && <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{action}</div>}
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
      {(title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function TabCounterPills({ tabs, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-default)', paddingBottom: 12, marginBottom: 16 }}>
      {tabs.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: active ? 600 : 500,
              color: active ? 'var(--text-primary)' : 'var(--text-tertiary)', padding: '4px 2px',
              borderBottom: active ? '2px solid var(--text-primary)' : '2px solid transparent',
            }}
          >
            {t.label}
            <span style={{ fontSize: 11, fontWeight: 600, background: active ? 'var(--surface-muted)' : 'var(--surface-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '1px 7px' }}>
              {t.count}
            </span>
          </button>
        );
      })}
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
