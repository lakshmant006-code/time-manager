import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background, Kinetic } from '../Background';
import { GhostWord } from '../Decor';
import { ease, cameraPush } from '../motion';

export const ClockIn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const push = cameraPush(frame);
  const cardP = ease(frame, [0, 14], [0, 1]);
  const timerP = ease(frame, [20, 32], [0, 1]);
  const badgeP = ease(frame, [28, 38], [0, 1]);

  const secs = 37 + Math.floor(frame / fps);
  const timeStr = `02:14:${String(secs % 60).padStart(2, '0')}`;
  const pulse = 1 + Math.sin(frame * 0.3) * 0.015;

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Background />
      <GhostWord text="CLOCK IN" left={-10} top={-30} size={140} />

      <div style={{
        position: 'absolute', left: 530, top: 480, width: 230, background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: 18, fontFamily: 'Inter, sans-serif',
        opacity: ease(frame, [45, 57], [0, 1]), transform: `translateY(${(1 - ease(frame, [45, 57], [0, 1])) * 18}px)`,
      }}>
        <div style={{ color: '#aab3e8', fontSize: 10, marginBottom: 6 }}>TODAY</div>
        <div style={{ color: '#fff', fontSize: 13 }}>3 crews clocked in</div>
      </div>

      <div style={{
        position: 'absolute', left: 93, top: 95, width: 413, background: '#fff', borderRadius: 17,
        padding: 26, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', fontFamily: 'Inter, sans-serif',
        transform: `translateY(${(1 - cardP) * 24}px) scale(${0.9 + cardP * 0.1})`, opacity: cardP,
        filter: `blur(${(1 - cardP) * 6}px)`, transformOrigin: 'top left',
      }}>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 15 }}>Clock in for which project?</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#111827', marginBottom: 9 }}>Desert Ridge Office Park</div>
        <div style={{ border: '2px solid #1900ff', background: '#eef0ff', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#1900ff', fontWeight: 600, marginBottom: 9 }}>Riverside Apartments — Phase 2</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#111827' }}>Shop Drawing Review</div>
      </div>

      <div style={{
        position: 'absolute', right: 147, bottom: 127, width: 373, background: '#fff', borderRadius: 17,
        padding: 29, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', fontFamily: 'Inter, sans-serif',
        transform: `translateY(${(1 - timerP) * 24}px) scale(${(0.9 + timerP * 0.1) * pulse})`, opacity: timerP,
        filter: `blur(${(1 - timerP) * 6}px)`, transformOrigin: 'bottom right',
      }}>
        <div style={{ color: '#6b7280', fontSize: 14, letterSpacing: 1, marginBottom: 11 }}>TIMER — RIVERSIDE APARTMENTS</div>
        <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 48, fontWeight: 600, color: '#111827', marginBottom: 17 }}>{timeStr}</div>
        <div style={{ display: 'flex', gap: 11 }}>
          <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '8px 19px', fontSize: 14 }}>Pause</span>
          <span style={{ background: '#dcfce7', color: '#166534', borderRadius: 999, padding: '8px 19px', fontSize: 14 }}>Stop</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 93, top: 440, width: 180, background: 'rgba(34,197,94,0.12)',
        border: '1px solid rgba(74,222,128,0.5)', borderRadius: 999, padding: '7px 14px', fontFamily: 'Inter, sans-serif',
        opacity: badgeP, transform: `translateY(${(1 - badgeP) * 10}px)`,
      }}>
        <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 600 }}>✓ Location verified</div>
      </div>

      <Kinetic text="Clock in. Timer runs itself." start={78} accent="itself." />
    </AbsoluteFill>
  );
};
