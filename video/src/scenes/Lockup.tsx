import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { Background } from '../Background';

export const Lockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoS = spring({ frame, fps, config: { damping: 16 } });
  const pillP = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaP = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionP = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: `translate(-50%,-50%) scale(${Math.min(logoS, 1)})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Img src={staticFile('logo-dark.png')} style={{ width: 280, filter: 'drop-shadow(0 0 40px rgba(25,0,255,0.5))', marginBottom: 26 }} />
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, 70px)', opacity: pillP, background: 'rgba(255,255,255,0.95)', color: '#212d5c', fontSize: 18, fontWeight: 600, borderRadius: 999, padding: '10px 24px', whiteSpace: 'nowrap' }}>
        Built for UBC BIM Services
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, 135px)', opacity: ctaP, background: '#1900ff', color: '#fff', fontFamily: "'Avant Gothic','Inter',sans-serif", fontSize: 22, fontWeight: 600, borderRadius: 11, padding: '15px 42px', boxShadow: '0 0 36px rgba(25,0,255,0.6)' }}>
        Get a Demo
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 60, textAlign: 'center', opacity: captionP, fontFamily: "'Avant Gothic','Inter',sans-serif", fontWeight: 600, fontSize: 30, color: '#fff' }}>
        Summer. <span style={{ color: '#1900ff', textShadow: '0 0 24px rgba(25,0,255,0.7)' }}>Get a demo.</span>
      </div>
    </AbsoluteFill>
  );
};
