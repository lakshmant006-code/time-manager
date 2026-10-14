import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Background, Kinetic } from '../Background';
import { GhostWord } from '../Decor';
import { ease, cameraPush } from '../motion';

const row = (frame: number, delay: number) => {
  const p = ease(frame, [delay, delay + 18], [0, 1]);
  return { opacity: p, transform: `translateX(${(1 - p) * -26}px)`, filter: `blur(${(1 - p) * 5}px)` };
};

export const Oversight: React.FC = () => {
  const frame = useCurrentFrame();
  const push = cameraPush(frame);

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Background />
      <GhostWord text="SEE ALL" right={-10} bottom={-40} size={130} />

      <div style={{ position: 'absolute', left: 107, top: 90, width: 700, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 13, padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', fontSize: 11, color: '#aab3e8', marginBottom: 10, ...row(frame, 0) }}>
          <span>PROJECT</span><span>USER</span><span>DURATION</span><span>STATUS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', alignItems: 'center', padding: '8px 0', fontSize: 13, color: '#fff', ...row(frame, 10) }}>
          <span>Riverside Apartments — Phase 2</span><span>J. Smith</span><span>02:14:37</span><span style={{ color: '#4ade80' }}>Active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', alignItems: 'center', padding: '8px 0', fontSize: 13, color: '#fff', ...row(frame, 20) }}>
          <span>Desert Ridge Office Park</span><span>P. Gibbons</span><span>01:45:02</span><span style={{ color: '#4ade80' }}>Active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 90px 90px', alignItems: 'center', padding: '8px 0', fontSize: 13, color: '#fff', ...row(frame, 30) }}>
          <span>Shop Drawing Review</span><span>H. Scorpio</span><span>00:52:11</span><span style={{ color: '#fbbf24' }}>Paused</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 840, top: 90, width: 220, background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 13, padding: 18, ...row(frame, 40),
      }}>
        <div style={{ color: '#aab3e8', fontSize: 10, marginBottom: 6 }}>HOURS THIS WEEK</div>
        <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 28, fontWeight: 600, color: '#fff' }}>184.5</div>
      </div>

      <div style={{ position: 'absolute', left: 107, top: 330, width: 600, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 13, padding: 20, ...row(frame, 55) }}>
        <div style={{ fontSize: 11, color: '#aab3e8', marginBottom: 12 }}>ASSIGNED — SITE SUPERVISOR</div>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          <span style={{ background: '#1900ff', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>J. Smith</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>P. Gibbons</span>
          <span style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 999, padding: '7px 16px', fontSize: 13 }}>+ Assign employees</span>
        </div>
      </div>

      <Kinetic text="See it all. Assign in a click." start={130} accent="Assign" />
    </AbsoluteFill>
  );
};
