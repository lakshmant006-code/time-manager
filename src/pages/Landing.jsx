import { useNavigate } from 'react-router-dom';
import { Button, Badge, StatusDot } from '../design-system';
import logo from '../assets/logo/ubc-bim-services-logo.png';
import heroImage from '../assets/hero-lgsf-frame.jpg';

function Nav() {
  const navigate = useNavigate();
  const links = ['Home', 'Features', 'Time Tracking', 'Company'];
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 16, padding: '24px 48px', position: 'relative', zIndex: 2 }}>
      <img src={logo} alt="UBC BIM" style={{ height: 30, objectFit: 'contain' }} />
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        {links.map((l, i) => (
          <a key={l} href="#" style={{ color: i === 0 ? 'var(--brand-navy)' : 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>Sign In</a>
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
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '8px 18px', fontSize: 'var(--text-xs)', color: 'var(--brand-navy)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-medium)', marginBottom: 32, boxShadow: 'var(--shadow-card)' }}>
        Built for UBC BIM Services
      </div>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px, 5vw, 52px)', lineHeight: 'var(--leading-tight)', color: 'var(--brand-navy)', margin: '0 auto 20px', maxWidth: 760, letterSpacing: 'var(--tracking-tight)', fontWeight: 'var(--font-bold)' }}>
        Manage Projects Smarter and <span style={{ color: 'var(--text-tertiary)' }}>Track Time Efficiently</span>
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', margin: '0 auto 36px', maxWidth: 560 }}>
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

const STEPS = [
  { n: '01', title: 'Set clear objectives', desc: 'Define specific, measurable goals for every project so crews know exactly what "done" looks like.' },
  { n: '02', title: 'Break work into tasks', desc: 'Split each project into activities your team can estimate and complete in a few hours or days, not weeks.' },
  { n: '03', title: 'Schedule with buffers', desc: 'Sequence dependent tasks and add time reserves at hand-offs and high-risk activities to protect deadlines.' },
  { n: '04', title: 'Track and adjust', desc: 'Compare logged hours against the plan, spot slipping tasks early, and rebalance work before it becomes a delay.' },
];

function HowItWorks() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 'var(--font-bold)', color: 'var(--brand-navy)', margin: '0 0 8px' }}>A Simple Process for Staying On Schedule</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
          Four steps take a project from a rough plan to a schedule your whole team can trust.
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {STEPS.map((s) => (
          <div key={s.n} style={{ flex: '1 1 220px', background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--text-tertiary)', marginBottom: 12 }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--text-primary)', marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{s.desc}</div>
          </div>
        ))}
      </div>
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
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 'var(--font-bold)', color: 'var(--brand-navy)', margin: 0 }}>Everything Your Team Needs</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', maxWidth: 340, margin: 0 }}>From scheduling to payroll, Time Management gives crews the tools to track work efficiently.</p>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <FeatureCard title="Role-Based Access" desc="HR and Admin controls keep sensitive data locked down." />
        <FeatureCard title="Team Collaboration" desc="Assign projects, manage skills, and track activity together." large />
        <FeatureCard title="Live Timers" desc="Start, pause, and log hours in real time." />
        <FeatureCard title="Client Management" desc="Register clients and link projects to their work." />
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <FeatureCard title="Task & Dependency Scheduling" desc="Sequence work so everyone sees what's blocking what, before it costs a deadline." />
        <FeatureCard title="At-Risk Task Alerts" desc="Get flagged when a task's actual hours are running past plan, while there's still time to react." />
        <FeatureCard title="Cross-Team Visibility" desc="One shared timeline for field, office, and management — no more chasing status updates." />
      </div>
    </div>
  );
}

function CrossTeamSection() {
  const items = [
    { title: 'Shared terminology', desc: 'Every crew and department uses the same project phases, task types, and status labels.' },
    { title: 'Centralized visibility', desc: 'Dependencies between teams are mapped in one place instead of scattered across email and chat.' },
    { title: 'Clear ownership', desc: 'Every task has one person accountable, so nothing falls through the cracks between hand-offs.' },
  ];
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 80px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ background: 'var(--surface-subtle)', borderRadius: 'var(--radius-xl)', padding: '40px 32px', display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {items.map((it) => (
          <div key={it.title} style={{ flex: '1 1 220px' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--brand-navy)', marginBottom: 6 }}>{it.title}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaSection() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto 64px', padding: '0 24px', position: 'relative', zIndex: 2 }}>
      <div style={{ background: 'var(--brand-navy)', borderRadius: 'var(--radius-xl)', padding: '48px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 'var(--font-bold)', color: 'var(--white)', margin: '0 0 12px' }}>Keep every project on schedule</h2>
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
      <div style={{ backgroundImage: `linear-gradient(180deg, rgba(10,20,50,.15) 0%, rgba(246,248,252,.6) 70%, var(--surface-app) 100%), url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center top', paddingBottom: 140, position: 'relative' }}>
        <Nav />
        <Hero />
      </div>
      <div style={{ marginTop: -40, padding: '0 24px' }}>
        <AppPreview />
        <StatsBar />
      </div>
      <HowItWorks />
      <FeaturesSection />
      <CrossTeamSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
