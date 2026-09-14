import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconActivity, IconBarChart, IconBriefcase, IconBuilding, IconClock, IconFolder,
  IconSearch, IconShield, IconSparkle, IconStar, IconUser, IconUsers,
} from './icons';

const ADMIN_ACTIONS = [{ id: 'new-client', label: 'Add new client', icon: IconSparkle, path: '/app/clients/new' }];

const ADMIN_NAV_COMMANDS = [
  { id: 'nav-dashboard', label: 'Go to Dashboard', icon: IconBuilding, path: '/app/dashboard' },
  { id: 'nav-clients', label: 'Go to Clients', icon: IconBriefcase, path: '/app/clients' },
  { id: 'nav-projects', label: 'Go to Projects', icon: IconFolder, path: '/app/projects' },
  { id: 'nav-users', label: 'Go to Employees', icon: IconUser, path: '/app/users' },
  { id: 'nav-teams', label: 'Go to Teams', icon: IconUsers, path: '/app/teams' },
  { id: 'nav-roles', label: 'Go to Roles', icon: IconShield, path: '/app/roles' },
  { id: 'nav-activities', label: 'Go to Activities', icon: IconActivity, path: '/app/activities' },
  { id: 'nav-skills', label: 'Go to Skills', icon: IconStar, path: '/app/skills' },
  { id: 'nav-time', label: 'Go to Time Tracking', icon: IconClock, path: '/app/time-tracking' },
  { id: 'nav-reports', label: 'Go to Reports', icon: IconBarChart, path: '/app/reports' },
];

const EMPLOYEE_ACTIONS = [{ id: 'new-skill', label: 'Add a skill', icon: IconSparkle, path: '/employee/skills' }];

const EMPLOYEE_NAV_COMMANDS = [
  { id: 'nav-dashboard', label: 'Go to Dashboard', icon: IconBuilding, path: '/employee/dashboard' },
  { id: 'nav-timesheet', label: 'Go to Timesheet', icon: IconClock, path: '/employee/timesheet' },
  { id: 'nav-skills', label: 'Go to Skills', icon: IconStar, path: '/employee/skills' },
  { id: 'nav-profile', label: 'Go to Profile', icon: IconUser, path: '/employee/profile' },
];

const RECENT_LABEL = { admin: ['Clients', 'Roles'], employee: ['Timesheet', 'Skills'] };

export function CommandPalette({ open, onClose, role }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const actions = role === 'admin' ? ADMIN_ACTIONS : EMPLOYEE_ACTIONS;
  const navCommands = role === 'admin' ? ADMIN_NAV_COMMANDS : EMPLOYEE_NAV_COMMANDS;
  const recentLabels = RECENT_LABEL[role] || [];

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const recent = navCommands.filter((c) => recentLabels.some((l) => c.label.includes(l)));
    const rest = navCommands.filter((c) => !recentLabels.some((l) => c.label.includes(l)));
    if (!q) return { actions, recent, quick: rest };
    const match = (c) => c.label.toLowerCase().includes(q);
    return { actions: actions.filter(match), recent: recent.filter(match), quick: rest.filter(match) };
  }, [query, actions, navCommands, recentLabels]);

  const flat = [...filtered.actions, ...filtered.recent, ...filtered.quick];

  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, flat.length - 1)));
  }, [flat.length]);

  if (!open) return null;

  const run = (cmd) => {
    if (!cmd) return;
    navigate(cmd.path);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(flat[active]);
    }
  };

  let idx = -1;
  const Row = ({ cmd }) => {
    idx += 1;
    const i = idx;
    const Icon = cmd.icon;
    const isActive = i === active;
    return (
      <div
        onMouseEnter={() => setActive(i)}
        onClick={() => run(cmd)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
          background: isActive ? 'var(--surface-muted)' : 'transparent', fontSize: 14, color: 'var(--text-primary)',
        }}
      >
        <Icon style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
        {cmd.label}
      </div>
    );
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,15,20,0.45)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh', zIndex: 100 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        style={{ width: 560, maxWidth: '92vw', maxHeight: '70vh', display: 'flex', flexDirection: 'column', background: 'var(--white)', borderRadius: 14, boxShadow: '0 24px 60px rgba(0,0,0,0.3)', overflow: 'hidden', fontFamily: 'var(--font-sans)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border-default)' }}>
          <IconSearch style={{ color: 'var(--text-tertiary)', width: 18, height: 18, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything…"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 16, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', background: 'transparent' }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {filtered.actions.length > 0 && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ padding: '6px 12px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Actions</div>
              {filtered.actions.map((c) => <Row key={c.id} cmd={c} />)}
            </div>
          )}
          {filtered.recent.length > 0 && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ padding: '6px 12px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Recent</div>
              {filtered.recent.map((c) => <Row key={c.id} cmd={c} />)}
            </div>
          )}
          {filtered.quick.length > 0 && (
            <div>
              <div style={{ padding: '6px 12px', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>Quick actions</div>
              {filtered.quick.map((c) => <Row key={c.id} cmd={c} />)}
            </div>
          )}
          {flat.length === 0 && (
            <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: 13, color: 'var(--text-tertiary)' }}>No matches for "{query}"</div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 16px', borderTop: '1px solid var(--border-default)', background: 'var(--surface-subtle)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--text-tertiary)' }}>
            <Kbd>↑</Kbd><Kbd>↓</Kbd> to navigate
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--text-tertiary)' }}>
            <Kbd>↵</Kbd> to select
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
            <Kbd>esc</Kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }) {
  return (
    <kbd style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, padding: '0 4px', borderRadius: 4, border: '1px solid var(--border-default)', background: 'var(--white)', fontSize: 10.5, fontFamily: 'var(--font-sans)' }}>
      {children}
    </kbd>
  );
}
