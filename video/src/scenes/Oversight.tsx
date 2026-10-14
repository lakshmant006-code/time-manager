import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Background, Caption } from '../Background';

const row = (frame: number, delay: number) => {
  const p = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return { opacity: p, transform: `translateX(${(1 - p) * -20}px)` };
};

export const Oversight: React.FC = () => {
  const frame = useCurrentFrame();
  const captionOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      <div style={{ position: 'absolute', left: 107, top: 100, width: 700, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 13, padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', fontSize: 11, color: '#aab3e8', marginBottom: 10, ...row(frame, 0) }}>
          <span>PROJECT</span><span>USER</span><span>DURATION</span><span>STATUS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', alignItems: 'center', padding: '10px 0', fontSize: 13, color: '#fff', ...row(frame, 10) }}>
          <span>Riverside Apartments — Phase 2</span><span>J. Smith</span><span>02:14:37</span><span style={{ color: '#4ade80' }}>Active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', alignItems: 'center', padding: '10px 0', fontSize: 13, color: '#fff', ...row(frame, 20) }}>
          <span>Desert Ridge Office Park</span><span>P. Gibbons</span><span>01:45:02</span><span style={{ color: '#4ade80' }}>Active</span>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 107, top: 330, width: 600, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 13, padding: 20, ...row(frame, 55) }}>
        <div style={{ fontSize: 11, color: '#aab3e8', marginBottom: 12 }}>ASSIGNED — SITE SUPERVISOR</div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <span style={{ background: '#1900ff', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>J. Smith</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>P. Gibbons</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>+ Assign employees</span>
        </div>
      </div>

      <Caption opacity={captionOpacity}>See it all. Assign in a click.</Caption>
    </AbsoluteFill>
  );
};
