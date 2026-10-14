import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Background, Caption } from '../Background';

export const ClockIn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardS = spring({ frame, fps, config: { damping: 15 } });
  const timerS = spring({ frame: frame - 35, fps, config: { damping: 15 } });
  const captionOpacity = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const secs = 37 + Math.floor(frame / fps);
  const timeStr = `02:14:${String(secs % 60).padStart(2, '0')}`;

  return (
    <AbsoluteFill>
      <Background />

      <div style={{
        position: 'absolute', left: 93, top: 95, width: 413, background: '#fff', borderRadius: 17,
        padding: 26, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', fontFamily: 'Inter, sans-serif',
        transform: `scale(${Math.min(cardS, 1)})`, opacity: Math.min(cardS, 1), transformOrigin: 'top left',
      }}>
        <div style={{ color: '#374151', fontSize: 17, marginBottom: 15 }}>Clock in for which project?</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#111827', marginBottom: 9 }}>Desert Ridge Office Park</div>
        <div style={{ border: '2px solid #1900ff', background: '#eef0ff', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#1900ff', fontWeight: 600, marginBottom: 9 }}>Riverside Apartments — Phase 2</div>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 9, padding: '13px 16px', fontSize: 16, color: '#111827' }}>Shop Drawing Review</div>
      </div>

      <div style={{
        position: 'absolute', right: 147, bottom: 127, width: 373, background: '#fff', borderRadius: 17,
        padding: 29, boxShadow: '0 20px 50px rgba(0,0,0,0.45)', fontFamily: 'Inter, sans-serif',
        transform: `scale(${Math.min(timerS, 1)})`, opacity: Math.min(timerS, 1), transformOrigin: 'bottom right',
      }}>
        <div style={{ color: '#6b7280', fontSize: 14, letterSpacing: 1, marginBottom: 11 }}>TIMER — RIVERSIDE APARTMENTS</div>
        <div style={{ fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 48, fontWeight: 600, color: '#111827', marginBottom: 17 }}>{timeStr}</div>
        <div style={{ display: 'flex', gap: 11 }}>
          <span style={{ background: '#f3f4f6', color: '#374151', borderRadius: 999, padding: '8px 19px', fontSize: 14 }}>Pause</span>
          <span style={{ background: '#dcfce7', color: '#166534', borderRadius: 999, padding: '8px 19px', fontSize: 14 }}>Stop</span>
        </div>
      </div>

      <Caption opacity={captionOpacity}>Clock in. Timer runs itself.</Caption>
    </AbsoluteFill>
  );
};
