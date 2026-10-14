import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { Caption } from '../Background';

const StatCard: React.FC<{ label: string; value: string; accent?: boolean; delay: number; frame: number }> = ({ label, value, accent, delay, frame }) => {
  const p = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{
      flex: 1, background: '#fff', border: accent ? '2px solid #1900ff' : '1px solid #e5e7eb',
      borderRadius: 12, padding: 20, opacity: p, transform: `translateY(${(1 - p) * 16}px)`,
      boxShadow: accent ? '0 0 0 4px rgba(25,0,255,0.08)' : 'none',
    }}>
      <div style={{ color: '#6b7280', fontSize: 13, marginBottom: 9 }}>{label}</div>
      <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 34, fontWeight: 600, color: accent ? '#1900ff' : '#111827' }}>{value}</div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOut = interpolate(frame, [0, 20], [1, 0], { extrapolateRight: 'clamp' });
  const dashIn = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sidebarX = interpolate(dashIn, [0, 1], [-220, 0]);
  const captionOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#f8f9fa' }}>
      <AbsoluteFill style={{ opacity: logoOut, background: '#05070f', alignItems: 'center', justifyContent: 'center' }}>
        <Img src={staticFile('logo-dark.png')} style={{ width: 320 }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: dashIn }}>
        <div style={{ position: 'absolute', left: sidebarX, top: 0, bottom: 0, width: 220, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '28px 20px' }}>
          <Img src={staticFile('logo-dark.png')} style={{ height: 30, marginBottom: 26 }} />
          <div style={{ background: '#000', color: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Home</div>
          <div style={{ color: '#9ca3af', fontSize: 10, fontWeight: 600, letterSpacing: 1, marginBottom: 10 }}>WORKSPACE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: '#374151', fontSize: 14 }}>
            <div>Clients</div><div>Projects</div><div>Time Tracking</div>
          </div>
        </div>

        <div style={{ position: 'absolute', left: 250, right: 48, top: 48 }}>
          <div style={{ fontSize: 15, color: '#6b7280', marginBottom: 6 }}>Monday, September 14, 2026</div>
          <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontWeight: 600, fontSize: 34, color: '#111827', marginBottom: 28 }}>Good afternoon, Sarah</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <StatCard label="Active clients" value="2" delay={40} frame={frame} />
            <StatCard label="Open projects" value="7" delay={52} frame={frame} />
            <StatCard label="Hours logged this week" value="184.5" accent delay={64} frame={frame} />
            <StatCard label="Pending timesheets" value="2" delay={76} frame={frame} />
          </div>
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: 'linear-gradient(0deg, rgba(5,7,15,0.85), rgba(5,7,15,0))' }} />
      <Caption opacity={captionOpacity}>One place for every hour, every project.</Caption>
    </AbsoluteFill>
  );
};
