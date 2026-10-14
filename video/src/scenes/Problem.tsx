import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background, Kinetic } from '../Background';
import { GhostWord } from '../Decor';
import { ease, cameraPush } from '../motion';

const Card: React.FC<{
  left?: number; right?: number; top?: number; bottom?: number;
  width: number; rotate: number; delay: number; children: React.ReactNode;
}> = ({ left, right, top, bottom, width, rotate, delay, children }) => {
  const frame = useCurrentFrame();
  const local = frame - delay;
  const p = ease(local, [0, 22], [0, 1]);
  const drift = Math.sin(frame * 0.02 + delay) * 6;
  return (
    <div
      style={{
        position: 'absolute', left, right, top, bottom, width,
        background: '#fff', borderRadius: 12,
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        padding: 15, fontFamily: 'Inter, sans-serif',
        transform: `rotate(${rotate}deg) translateY(${(1 - p) * 50 + drift}px) scale(${0.85 + p * 0.15})`,
        opacity: p,
        filter: `blur(${(1 - p) * 8}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const push = cameraPush(frame);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Background />
      <GhostWord text="TIME" left={-10} bottom={-50} size={220} />

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

      <Card left={430} top={270} width={175} rotate={-4} delay={44}>
        <div style={{ fontSize: 9, color: '#991b1b', fontWeight: 600, marginBottom: 4 }}>⚠ 2 overdue timesheets</div>
        <div style={{ fontSize: 8, color: '#9ca3af' }}>Flagged 3h ago</div>
      </Card>

      <Card left={740} top={330} width={185} rotate={5} delay={52}>
        <div style={{ fontSize: 9, color: '#9ca3af', marginBottom: 7 }}>TEAM</div>
        <div style={{ display: 'flex', gap: -4 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: '#1900ff', border: '2px solid #fff', marginRight: -6 }} />
          <div style={{ width: 20, height: 20, borderRadius: 999, background: '#a855f7', border: '2px solid #fff', marginRight: -6 }} />
          <div style={{ width: 20, height: 20, borderRadius: 999, background: '#22c55e', border: '2px solid #fff' }} />
        </div>
      </Card>

      <Kinetic text="Hours. Scattered everywhere." start={65} accent="Scattered" />
    </AbsoluteFill>
  );
};
