import React from 'react';
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import { Kinetic } from '../Background';
import { LightStreaks } from '../Decor';
import { ease, countTo, cameraPush } from '../motion';

const StatCard: React.FC<{ label: string; value: number; accent?: boolean; delay: number; frame: number }> = ({ label, value, accent, delay, frame }) => {
  const p = ease(frame, [delay, delay + 18], [0, 1]);
  return (
    <div style={{
      flex: 1, background: '#fff', border: accent ? '2px solid #1900ff' : '1px solid #e5e7eb',
      borderRadius: 12, padding: 20, opacity: p, transform: `translateY(${(1 - p) * 20}px) scale(${0.92 + p * 0.08})`,
      boxShadow: accent ? '0 0 0 4px rgba(25,0,255,0.08)' : 'none',
    }}>
      <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 9 }}>{label}</div>
      <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 34, fontWeight: 600, color: accent ? '#1900ff' : '#111827' }}>
        {countTo(frame, [delay, delay + 28], value)}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const push = cameraPush(frame);
  const logoOut = ease(frame, [0, 20], [1, 0]);
  const dashIn = ease(frame, [10, 38], [0, 1]);
  const sidebarX = ease(frame, [10, 40], [-220, 0]);
  const sidebarBlur = (1 - ease(frame, [10, 35], [0, 1])) * 6;

  return (
    <AbsoluteFill style={{ background: '#f8f9fa', transform: `scale(${push})` }}>
      <AbsoluteFill style={{ opacity: logoOut, background: '#05070f', alignItems: 'center', justifyContent: 'center' }}>
        <LightStreaks />
        <Img src={staticFile('logo-dark.png')} style={{ width: 320 }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: dashIn }}>
        <div style={{ position: 'absolute', left: sidebarX, top: 0, bottom: 0, width: 220, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '28px 20px', filter: `blur(${sidebarBlur}px)` }}>
          <Img src={staticFile('logo-dark.png')} style={{ height: 30, marginBottom: 26 }} />
          <div style={{ background: '#000', color: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Home</div>
          <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 600, letterSpacing: 1, marginBottom: 10 }}>WORKSPACE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#374151', fontSize: 14 }}>
            <div>Clients</div><div>Projects</div><div>Time Tracking</div>
          </div>
        </div>

        <div style={{ position: 'absolute', left: 250, right: 48, top: 48 }}>
          <div style={{ fontSize: 15, color: '#6b7280', marginBottom: 6, opacity: ease(frame, [20, 35], [0, 1]) }}>Monday, September 14, 2026</div>
          <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontWeight: 600, fontSize: 34, color: '#111827', marginBottom: 28, opacity: ease(frame, [25, 42], [0, 1]), transform: `translateY(${(1 - ease(frame, [25, 42], [0, 1])) * 12}px)` }}>Good afternoon, Sarah</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <StatCard label="Active clients" value={2} delay={42} frame={frame} />
            <StatCard label="Open projects" value={7} delay={54} frame={frame} />
            <StatCard label="Hours logged this week" value={184.5} accent delay={66} frame={frame} />
            <StatCard label="Pending timesheets" value={2} delay={78} frame={frame} />
          </div>

          <div style={{ display: 'flex', gap: 16, marginTop: 16, opacity: ease(frame, [92, 112], [0, 1]), transform: `translateY(${(1 - ease(frame, [92, 112], [0, 1])) * 16}px)` }}>
            <div style={{ flex: 1.3, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', marginBottom: 10 }}>Team activity</div>
              <div style={{ fontSize: 11, color: '#374151', marginBottom: 6 }}><b>J. Smith</b> clocked in on Riverside Apts</div>
              <div style={{ fontSize: 11, color: '#374151' }}><b>P. Gibbons</b> submitted a timesheet</div>
            </div>
            <div style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#111827', marginBottom: 10 }}>Clients</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#374151' }}><span>Acme Steel Corp</span><span style={{ color: '#16a34a' }}>Active</span></div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: 'linear-gradient(0deg, rgba(5,7,15,0.85), rgba(5,7,15,0))' }} />
      <Kinetic text="One place for every hour, every project." start={112} accent="hour" />
    </AbsoluteFill>
  );
};
