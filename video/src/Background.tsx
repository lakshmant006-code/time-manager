import React from 'react';
import { AbsoluteFill } from 'remotion';

export const Background: React.FC<{ variant?: 'void' | 'light' }> = ({ variant = 'void' }) => {
  if (variant === 'light') {
    return <AbsoluteFill style={{ background: '#f8f9fa' }} />;
  }
  return (
    <AbsoluteFill style={{ background: '#05070f', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 900, height: 900, left: -200, top: -250, borderRadius: '50%', filter: 'blur(120px)', background: '#151c3a', opacity: 0.9 }} />
      <div style={{ position: 'absolute', width: 700, height: 700, right: -150, top: 200, borderRadius: '50%', filter: 'blur(120px)', background: '#1900ff', opacity: 0.18 }} />
      <div style={{ position: 'absolute', width: 600, height: 600, left: 400, bottom: -200, borderRadius: '50%', filter: 'blur(120px)', background: '#aab3e8', opacity: 0.1 }} />
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0" />
        </filter>
      </svg>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'overlay', filter: 'url(#grain)' }} />
    </AbsoluteFill>
  );
};

export const Caption: React.FC<{ children: React.ReactNode; opacity?: number; accent?: boolean }> = ({ children, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: 48,
      right: 48,
      bottom: 27,
      fontFamily: "'Avant Gothic','Inter',sans-serif",
      fontWeight: 600,
      color: '#fff',
      fontSize: 34,
      lineHeight: 1.15,
      textShadow: '0 4px 24px rgba(0,0,0,0.55)',
      opacity,
    }}
  >
    {children}
  </div>
);
