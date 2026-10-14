import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Particles } from './Particles';
import { ease } from './motion';

export const Background: React.FC<{ variant?: 'void' | 'light' }> = ({ variant = 'void' }) => {
  const frame = useCurrentFrame();
  if (variant === 'light') {
    return <AbsoluteFill style={{ background: '#f8f9fa' }} />;
  }
  const drift = Math.sin(frame * 0.012) * 18;
  return (
    <AbsoluteFill style={{ background: '#05070f', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 900, height: 900, left: -200 + drift * 0.3, top: -250, borderRadius: '50%', filter: 'blur(80px)', background: '#151c3a', opacity: 0.9 }} />
      <div style={{ position: 'absolute', width: 700, height: 700, right: -150, top: 200 - drift * 0.4, borderRadius: '50%', filter: 'blur(80px)', background: '#1900ff', opacity: 0.18 }} />
      <div style={{ position: 'absolute', width: 600, height: 600, left: 400 + drift * 0.2, bottom: -200, borderRadius: '50%', filter: 'blur(80px)', background: '#aab3e8', opacity: 0.1 }} />
      <Particles />
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>
      </svg>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'overlay', filter: 'url(#grain)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.5) 100%)' }} />
    </AbsoluteFill>
  );
};

/** Word-by-word blur-to-sharp kinetic reveal, with an optional accent word in brand blue. */
export const Kinetic: React.FC<{ text: string; start: number; accent?: string; size?: number; center?: boolean }> = ({ text, start, accent, size = 34, center }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  return (
    <div style={{
      position: 'absolute', left: 48, right: 48, bottom: 27,
      fontFamily: "'Avant Gothic','Inter',sans-serif", fontWeight: 600, fontSize: size,
      lineHeight: 1.15, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em',
      justifyContent: center ? 'center' : 'flex-start',
    }}>
      {words.map((w, i) => {
        const wStart = start + i * 4;
        const p = ease(frame, [wStart, wStart + 16], [0, 1]);
        const isAccent = accent && w.replace(/[.,]/g, '') === accent.replace(/[.,]/g, '');
        return (
          <span key={i} style={{
            display: 'inline-block',
            color: isAccent ? '#1900ff' : '#fff',
            textShadow: isAccent ? '0 0 24px rgba(25,0,255,0.7), 0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.55)',
            opacity: p,
            filter: `blur(${(1 - p) * 5}px)`,
            transform: `translateY(${(1 - p) * 14}px)`,
          }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};
