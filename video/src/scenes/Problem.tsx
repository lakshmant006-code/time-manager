import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Background, Caption } from '../Background';

const Card: React.FC<{
  left?: number; right?: number; top?: number; bottom?: number;
  width: number; rotate: number; delay: number; children: React.ReactNode;
}> = ({ left, right, top, bottom, width, rotate, delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const s = spring({ frame: local, fps, config: { damping: 14, mass: 0.6 } });
  const drift = interpolate(frame, [0, 180], [0, -8]);
  return (
    <div
      style={{
        position: 'absolute', left, right, top, bottom, width,
        background: '#fff', borderRadius: 12,
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        padding: 15, fontFamily: 'Inter, sans-serif',
        transform: `rotate(${rotate}deg) translateY(${(1 - s) * 40 + drift}px) scale(${Math.min(s, 1)})`,
        opacity: Math.min(s, 1),
      }}
    >
      {children}
    </div>
  );
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const captionOpacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      <Card left={95} top={80} width={200} rotate={-7} delay={0}>
        <div style={{ fontSize: 11, color: '#111827', marginBottom: 7 }}>Riverside Apts — Timesheet.pdf</div>
        <div style={{ height: 5, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '62%', height: '100%', background: '#1900ff' }} />
        </div>
      </Card>

      <Card right={80} top={60} width={220} rotate={8} delay={10}>
        <div style={{ fontSize: 10, color: '#374151', marginBottom: 9 }}>Clock in for which project?</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 7, padding: '7px 9px', fontSize: 9, marginBottom: 5, color: '#111827' }}>Desert Ridge Office Park</div>
        <div style={{ border: '1px solid #1900ff', background: '#eef0ff', borderRadius: 7, padding: '7px 9px', fontSize: 9, color: '#1900ff', fontWeight: 500 }}>Riverside Apartments — Phase 2</div>
      </Card>

      <Card left={175} bottom={95} width={195} rotate={7} delay={22}>
        <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 5 }}>TIMER — DESERT RIDGE</div>
        <div style={{ fontSize: 15, fontWeight: 500, color: '#111827', marginBottom: 9 }}>02:14:37 elapsed</div>
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '5px 12px', fontSize: 9 }}>Pause</span>
          <span style={{ background: '#dcfce7', color: '#166534', borderRadius: 999, padding: '5px 12px', fontSize: 9 }}>Stop</span>
        </div>
      </Card>

      <Card right={105} bottom={75} width={190} rotate={-6} delay={32}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 37, height: 37, borderRadius: 999, border: '2px solid #1900ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#212d5c', flexShrink: 0 }}>96%</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>Riverside Crew</div>
            <div style={{ fontSize: 9, color: '#9ca3af' }}>On-time this week</div>
          </div>
        </div>
      </Card>

      <Caption opacity={captionOpacity}>Hours. Scattered everywhere.</Caption>
    </AbsoluteFill>
  );
};
