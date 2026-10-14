import React from 'react';
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import { Background, Kinetic } from '../Background';
import { Rings, GhostWord } from '../Decor';
import { ease } from '../motion';

export const Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const logoP = ease(frame, [0, 16], [0, 1]);
  const pulse = 1 + Math.sin(frame * 0.07) * 0.03 * logoP;
  const pillP = ease(frame, [14, 26], [0, 1]);
  const ctaP = ease(frame, [26, 38], [0, 1]);
  const tagsP = ease(frame, [42, 54], [0, 1]);

  return (
    <AbsoluteFill>
      <Background />
      <GhostWord text="SUMMER" left={-20} bottom={-50} size={200} />
      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', opacity: logoP * 0.5 }}>
        <Rings frame={frame} />
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: `translate(-50%,-50%) scale(${(0.6 + logoP * 0.4) * pulse})`, opacity: logoP, filter: `drop-shadow(0 0 ${40 * pulse}px rgba(25,0,255,0.5))` }}>
        <Img src={staticFile('logo-dark.png')} style={{ width: 280 }} />
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: `translate(-50%, ${70 + (1 - pillP) * 10}px)`, opacity: pillP, filter: `blur(${(1 - pillP) * 6}px)`, background: 'rgba(255,255,255,0.95)', color: '#212d5c', fontSize: 18, fontWeight: 600, borderRadius: 999, padding: '10px 24px', whiteSpace: 'nowrap' }}>
        Built for UBC BIM Services
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: `translate(-50%, ${135 + (1 - ctaP) * 10}px) scale(${0.92 + ctaP * 0.08})`, opacity: ctaP, background: '#1900ff', color: '#fff', fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 22, fontWeight: 600, borderRadius: 11, padding: '15px 42px', boxShadow: `0 0 ${36 * pulse}px rgba(25,0,255,0.6)` }}>
        Get a Demo
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: '42%', transform: `translate(-50%, 195px)`,
        opacity: tagsP, display: 'flex', gap: 10,
      }}>
        {['Time Tracking', 'Projects', 'Teams'].map((t) => (
          <span key={t} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 999, padding: '6px 14px', fontSize: 12 }}>{t}</span>
        ))}
      </div>

      <Kinetic text="Summer. Get a demo." start={42} accent="demo." size={30} center />
    </AbsoluteFill>
  );
};
