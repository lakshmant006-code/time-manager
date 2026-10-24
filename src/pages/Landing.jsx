import { useNavigate } from 'react-router-dom';
import { Button, Badge, StatusDot } from '../design-system';
import { ShaderBackground } from '../components/ShaderBackground';
import logo from '../assets/logo/logo-dark.png';

function Nav() {
  const navigate = useNavigate();
  const links = ['Home', 'Features', 'Time Tracking', 'Company'];
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 16, padding: '24px 48px', position: 'relative', zIndex: 2 }}>
      <img src={logo} alt="Summer" style={{ height: 30, objectFit: 'contain' }} />
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {links.map((l, i) => (
          <a key={l} href="#" style={{ color: '#000', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: '#000', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>Sign In</a>
        <Button variant="default" onClick={() => navigate('/login')}>Get a Demo</Button>
      </div>
    </nav>
  );
}

function FloatCard({ style, children }) {
  return (
    <div className="tm-float-card" style={{ position: 'absolute', background: 'var(--white)', border: '1px solid rgba(25,0,255,.4)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 14, fontFamily: 'var(--font-sans)', zIndex: 3, ...style }}>
      {children}
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="tm-hero" style={{ textAlign: 'center', padding: '56px 24px 0', position: 'relative', zIndex: 2, minHeight: 520 }}>
      <FloatCard style={{ top: 20, left: 20, width: 190, transform: 'rotate(-4deg)' }}>
        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-medium)', color: 'var(--text-primary)', marginBottom: 8 }}>Riverside Apts — Timesheet.pdf</div>
        <div style={{ height: 6, background: 'var(--surface-muted)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
          <div style={{ width: '62%', height: '100%', background: 'var(--brand-blue)' }} />
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 8 }}>Syncing 24 entries…</div>
      </FloatCard>
      <FloatCard style={{ top: 10, right: 20, width: 210, transform: 'rotate(3deg)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 10 }}>Clock in for which project?</div>
        <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '8px 10px', fontSize: 'var(--text-xs)', marginBottom: 6 }}>Desert Ridge Office Park</div>
        <div style={{ border: '1px solid var(--brand-blue)', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-md)', padding: '8px 10px', fontSize: 'var(--text-xs)', color: 'var(--brand-blue)', fontWeight: 'var(--font-medium)', marginBottom: 6 }}>Riverside Apartments — Phase 2</div>
        <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '8px 10px', fontSize: 'var(--text-xs)' }}>Shop Drawing Review</div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 8 }}>Source: Active Projects</div>
      </FloatCard>
      <FloatCard style={{ bottom: 20, left: 10, width: 190, transform: 'rotate(3deg)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 6 }}>TIMER — DESERT RIDGE</div>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--text-primary)', marginBottom: 10 }}>02:14:37 elapsed</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge tone="neutral">Pause</Badge>
          <Badge tone="success">Stop</Badge>
        </div>
      </FloatCard>
      <FloatCard style={{ bottom: 30, right: 10, width: 180, display: 'flex', alignItems: 'center', gap: 12, transform: 'rotate(-3deg)' }}>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-pill)', border: '3px solid var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--brand-navy)' }}>96%</div>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)' }}>Riverside Crew</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>On-time this week</div>
        </div>
      </FloatCard>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '8px 18px', fontSize: 'var(--text-xs)', color: '#000', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', marginBottom: 32, boxShadow: 'var(--shadow-card)' }}>
        Built for UBC BIM Services
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 'var(--leading-tight)', color: '#000', margin: '0 auto 20px', maxWidth: 760, letterSpacing: 'var(--tracking-tight)', fontWeight: 'var(--font-semibold)' }}>
        Manage Projects Smarter and <span style={{ color: '#000' }}>Track Time Efficiently</span>
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', color: '#000', margin: '0 auto 36px', maxWidth: 560 }}>
        Plan projects, log hours, and manage your teams from one place — built for light-gauge steel framing crews.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 64, position: 'relative', zIndex: 3, flexWrap: 'wrap' }}>
        <Button size="lg" onClick={() => navigate('/login')}>Get a Demo</Button>
        <Button size="lg" variant="outline" onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{ flex: '1 1 140px', background: accent, borderRadius: 'var(--radius-lg)', padding: '14px 18px' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

function AppPreview() {
  const rows = [
    { project: 'Riverside Apartments — Phase 2', user: 'J. Smith', hours: '02:14:37', status: 'Active' },
    { project: 'Desert Ridge Office Park', user: 'P. Gibbons', hours: '01:45:02', status: 'Active' },
    { project: 'Shop Drawing Review — Globex', user: 'H. Scorpio', hours: '00:52:11', status: 'Paused' },
  ];
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-default)', overflow: 'hidden', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusDot status="connected" label="Time Tracking" />
        </div>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Sep 3, 2026</span>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: '20px 24px 0' }}>
        <StatCard label="Active projects" value="12" accent="var(--surface-subtle)" />
        <StatCard label="Hours logged this week" value="184.5" accent="var(--surface-subtle)" />
        <StatCard label="Active users" value="26" accent="var(--surface-subtle)" />
      </div>
      <div style={{ padding: '20px 24px 24px', overflowX: 'auto' }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 100px', padding: '10px 12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 'var(--font-medium)' }}>
            <span>Project</span><span>User</span><span>Duration</span><span>Status</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px 100px', alignItems: 'center', padding: '12px', borderRadius: 'var(--radius-md)', background: i % 2 ? 'var(--surface-muted)' : 'transparent', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
              <span>{r.project}</span><span style={{ color: 'var(--text-secondary)' }}>{r.user}</span><span>{r.hours}</span>
              <Badge tone={r.status === 'Active' ? 'success' : 'neutral'}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { v: '5,700+', l: 'Hours tracked monthly' },
    { v: '10.5K+', l: 'Timesheets processed' },
    { v: '40%', l: 'Faster payroll review' },
  ];
  return (
    <div style={{ maxWidth: 1040, margin: '64px auto', background: 'var(--brand-blue)', borderRadius: 'var(--radius-xl)', display: 'flex', flexWrap: 'wrap', padding: '28px 40px', gap: 24, position: 'relative', zIndex: 2 }}>
      {stats.map((s) => (
        <div key={s.l} style={{ flex: '1 1 160px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 'var(--font-bold)', color: 'var(--white)' }}>{s.v}</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,.8)' }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

const mono = { fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)' };

function Panel({ title, children }) {
  return (
    <div style={{ flex: '1 1 340px', background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', padding: 20, ...mono }}>
      <div style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-medium)', marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '9px 12px', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', marginBottom: 6, color: 'var(--text-primary)' }}>
      <span>{left}</span>{right}
    </div>
  );
}

function TemplatePanel() {
  return (
    <Panel title="TEMPLATE — Residential Framing Package">
      <Row left="Shop drawings" right={<Badge tone="neutral">40 h</Badge>} />
      <Row left="Panel layout & takeoff" right={<Badge tone="neutral">24 h</Badge>} />
      <Row left="QA / coordination review" right={<Badge tone="neutral">12 h</Badge>} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, color: 'var(--text-secondary)' }}>
        <span>Estimate: 76 h</span><span style={{ color: 'var(--brand-blue)', fontWeight: 'var(--font-medium)' }}>Create project →</span>
      </div>
    </Panel>
  );
}

function PlanPanel() {
  const bars = [
    { name: 'Shop drawings', left: '0%', w: '45%', pct: '70%' },
    { name: 'Panel layout', left: '30%', w: '40%', pct: '35%' },
    { name: 'QA review', left: '65%', w: '30%', pct: '0%' },
  ];
  return (
    <Panel title="GANTT — planned vs. logged hours">
      {bars.map((b) => (
        <div key={b.name} style={{ marginBottom: 12 }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>{b.name}</div>
          <div style={{ position: 'relative', height: 10, background: 'var(--surface-muted)', borderRadius: 'var(--radius-pill)' }}>
            <div style={{ position: 'absolute', left: b.left, width: b.w, height: '100%', background: 'rgba(25,0,255,.2)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
              <div style={{ width: b.pct, height: '100%', background: 'var(--brand-blue)' }} />
            </div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8 }}>
        <Badge tone="neutral">To do</Badge><Badge tone="success">In progress</Badge><Badge tone="neutral">Done</Badge>
      </div>
    </Panel>
  );
}

function ClientPanel() {
  return (
    <Panel title="CLIENT PORTAL — Riverside Apartments">
      <Row left="RFI #14 — Stair core framing" right={<Badge tone="success">Answered</Badge>} />
      <Row left="Issue — Level 3 revised drawings" right={<Badge tone="neutral">Open</Badge>} />
      <Row left="Files — Rev C shop drawings.pdf" right={<span style={{ color: 'var(--text-tertiary)' }}>Shared</span>} />
      <Row left="Project info sheet" right={<span style={{ color: 'var(--text-tertiary)' }}>Updated</span>} />
    </Panel>
  );
}

function ReportPanel() {
  return (
    <Panel title="DAILY PROGRESS REPORT — Today">
      <Row left="Shop drawings · J. Smith" right={<span>5.5 h</span>} />
      <Row left="Panel layout · P. Gibbons" right={<span>6.0 h</span>} />
      <div style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>"Level 2 panels issued for review. Waiting on stair core RFI."</div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '4px 12px' }}>
        <StatusDot status="connected" label="Synced to Zoho" />
      </div>
    </Panel>
  );
}

function Shot({ src, alt }) {
  return (
    <div style={{ flex: '1 1 340px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', background: 'var(--surface-card)' }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </div>
  );
}

// Set `img` on a workflow (import the screenshot above) to show it in place of the mock panel.
const WORKFLOWS = [
  { title: 'Start from a template, not a blank page', desc: 'Build project templates with tasks and hour estimates once. Spin up a new project in a click, with the plan and budget already in place.', Visual: TemplatePanel },
  { title: 'Plan on Kanban and Gantt, track against the estimate', desc: 'Work moves across the board while the timeline shows logged hours against plan, so slipping tasks surface early.', Visual: PlanPanel },
  { title: 'Keep clients in the loop', desc: 'Clients get a portal for RFIs, issues, files and project info sheets. No more chasing answers across email.', Visual: ClientPanel },
  { title: 'Daily progress reports, synced to Zoho', desc: 'Hours and progress notes roll up into a daily report and flow into Zoho, the tools your team already uses.', Visual: ReportPanel },
];

function Workflows() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', margin: '0 0 8px' }}>How Projects Run in Time Management</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
          From template to client delivery, in one place.
        </p>
      </div>
      {WORKFLOWS.map(({ title, desc, Visual, img }, i) => (
        <div key={title} style={{ display: 'flex', flexWrap: 'wrap', flexDirection: i % 2 ? 'row-reverse' : 'row', alignItems: 'center', gap: 32, marginBottom: 40 }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--brand-blue)', marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', marginBottom: 10 }}>{title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{desc}</div>
          </div>
          {img ? <Shot src={img} alt={title} /> : <Visual />}
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ title, desc, large }) {
  return (
    <div style={{ flex: '1 1 200px', background: large ? 'var(--brand-navy)' : 'var(--white)', border: large ? 'none' : '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 24, minHeight: large ? 220 : 160, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: large ? 'var(--white)' : 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
      {desc && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: large ? 'rgba(255,255,255,.75)' : 'var(--text-secondary)' }}>{desc}</div>}
    </div>
  );
}

function FeaturesSection() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, gap: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', margin: 0 }}>Everything Your Team Needs</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 340, margin: 0 }}>Projects, time, clients and integrations, in one place.</p>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <FeatureCard title="Project Templates" desc="Reusable task lists with hour estimates. Start every project with the plan already built." large />
        <FeatureCard title="Time Against Tasks" desc="Live timers and timesheets tied to tasks, compared with the estimate." />
        <FeatureCard title="Kanban & Gantt" desc="Move work across the board and see the schedule on the timeline." />
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <FeatureCard title="Client Portal" desc="RFIs, issues, files and info sheets shared with your clients." />
        <FeatureCard title="Daily Progress Reports" desc="Hours and notes rolled up into a report every day." />
        <FeatureCard title="Zoho Integration" desc="Sync with Zoho, the tools your team already uses." />
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <FeatureCard title="Team & Client Management" desc="Register clients, link their projects, and manage your team." />
        <FeatureCard title="Role-Based Access" desc="HR and Admin controls keep sensitive data locked down." />
        <FeatureCard title="At-Risk Task Alerts" desc="Get flagged when actual hours run past plan, while there is still time to react." />
      </div>
    </div>
  );
}

const ROADMAP = [
  { tag: 'Planning', title: 'Capacity planning', desc: 'Weekly and monthly views of who has room, against what is committed.' },
  { tag: 'Daily work', title: 'Prioritisation & daily scrum', desc: 'Daily task views, prioritisation, and project reviews in one rhythm.' },
  { tag: 'Integrations', title: 'Move over easily', desc: 'Import from JIRA and Zoho Projects, and connect more of your tools.' },
];

function RoadmapSection() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-xl)', padding: '40px 32px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', margin: '0 0 8px' }}>What's Next</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '0 0 28px', maxWidth: 480 }}>Where Time Management is heading.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {ROADMAP.map((r) => (
            <div key={r.title} style={{ flex: '1 1 220px' }}>
              <Badge tone="neutral">{r.tag} · Coming soon</Badge>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', margin: '12px 0 6px' }}>{r.title}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaSection() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 64px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ background: 'var(--brand-navy)', borderRadius: 'var(--radius-xl)', padding: '48px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 'var(--font-semibold)', color: 'var(--white)', margin: '0 0 12px' }}>Keep every project on schedule</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'rgba(255,255,255,.75)', margin: '0 auto 28px', maxWidth: 480 }}>
          See how Time Management helps your crews plan, track, and deliver on time.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
          <Button size="lg" onClick={() => navigate('/login')}>Get a Demo</Button>
          <Button size="lg" variant="outline" style={{ background: 'transparent', color: 'var(--white)', border: '1px solid rgba(255,255,255,.4)' }} onClick={() => navigate('/login')}>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ height: 130, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-sans)', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', gap: 32 }}>
        <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--gray-600)' }}>Privacy Policy</span>
        <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--gray-600)' }}>Terms of Service</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 300, color: 'var(--gray-600)' }}>2026 Time Management. All rights reserved @ubc bim.</div>
    </div>
  );
}

export function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-app)', fontFamily: 'var(--font-sans)' }}>
      <style>{'@media (max-width: 860px) { .tm-float-card { display: none !important; } .tm-hero { min-height: 0 !important; } }'}</style>
      <div style={{ paddingBottom: 140, position: 'relative', overflow: 'hidden' }}>
        <ShaderBackground style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(10,20,50,.05) 0%, rgba(246,248,252,.3) 80%, var(--surface-app) 100%)', pointerEvents: 'none' }} />
        <Nav />
        <Hero />
      </div>
      <div style={{ marginTop: -40, padding: '0 24px' }}>
        <AppPreview />
        <StatsBar />
      </div>
      <Workflows />
      <FeaturesSection />
      <RoadmapSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
