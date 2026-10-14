import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Background, Caption } from '../Background';

const GlowCard: React.FC<{ left: number; top: number; width: number; rotate: number; delay: number; z: number; children: React.ReactNode }> = ({ left, top, width, rotate, delay, z, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.5 } });
  return (
    <div style={{
      position: 'absolute', left, top, width, zIndex: z,
      background: '#fff', borderRadius: 11,
      boxShadow: '0 0 0 1.5px #1900ff, 0 0 40px rgba(25,0,255,0.45), 0 20px 50px rgba(0,0,0,0.55)',
      padding: 15, fontFamily: 'Inter, sans-serif',
      transform: `rotate(${rotate}deg) scale(${Math.min(s, 1)})`,
      opacity: Math.min(s, 1),
    }}>
      {children}
    </div>
  );
};

export const Collage: React.FC = () => {
  const frame = useCurrentFrame();
  const captionOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      <GlowCard left={173} top={127} width={200} rotate={-6} delay={0} z={3}>
        <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 8 }}>CLIENTS</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#111827', marginBottom: 6 }}><span>Acme Steel Corp</span><span style={{ color: '#166534' }}>Active</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#111827' }}><span>Initech Builders</span><span style={{ color: '#166534' }}>Active</span></div>
      </GlowCard>

      <GlowCard left={373} top={73} width={173} rotate={5} delay={10} z={2}>
        <div style={{ fontSize: 9, color: '#111827', marginBottom: 7 }}>Riverside Apts — Timesheet.pdf</div>
        <div style={{ height: 4, background: '#f3f4f6', borderRadius: 999 }}><div style={{ width: '62%', height: '100%', background: '#1900ff' }} /></div>
      </GlowCard>

      <GlowCard left={553} top={173} width={240} rotate={-4} delay={20} z={4}>
        <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 8 }}>ASSIGNED — SITE SUPERVISOR</div>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ background: '#1900ff', color: '#fff', borderRadius: 999, padding: '4px 9px', fontSize: 9 }}>J. Smith</span>
          <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '4px 9px', fontSize: 9 }}>+ Assign</span>
        </div>
      </GlowCard>

      <GlowCard left={787} top={93} width={187} rotate={8} delay={30} z={2}>
        <div style={{ fontSize: 9, color: '#374151', marginBottom: 7 }}>Clock in for which project?</div>
        <div style={{ border: '1px solid #1900ff', background: '#eef0ff', borderRadius: 6, padding: '6px 8px', fontSize: 8, color: '#1900ff', fontWeight: 500 }}>Riverside Apartments — Phase 2</div>
      </GlowCard>

      <GlowCard left={373} top={287} width={307} rotate={3} delay={40} z={5}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', fontSize: 8, color: '#9ca3af', marginBottom: 7 }}><span>PROJECT</span><span>DURATION</span><span>STATUS</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 60px', fontSize: 9, color: '#111827' }}><span>Desert Ridge Office Park</span><span>01:45:02</span><span style={{ color: '#16a34a' }}>Active</span></div>
      </GlowCard>

      <GlowCard left={693} top={280} width={180} rotate={-7} delay={50} z={2}>
        <div style={{ fontSize: 8, color: '#9ca3af', marginBottom: 4 }}>TIMER — DESERT RIDGE</div>
        <div style={{ fontSize: 17, fontWeight: 500, color: '#111827' }}>02:14:37</div>
      </GlowCard>

      <GlowCard left={253} top={313} width={167} rotate={6} delay={60} z={3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 33, height: 33, borderRadius: 999, border: '2px solid #1900ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#212d5c', flexShrink: 0 }}>96%</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: '#111827' }}>Riverside Crew</div>
        </div>
      </GlowCard>

      <Caption opacity={captionOpacity}>Projects. People. Time. All in one app.</Caption>
    </AbsoluteFill>
  );
};
