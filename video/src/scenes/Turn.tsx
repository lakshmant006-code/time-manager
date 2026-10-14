import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { Background } from '../Background';

const ghost = (fromX: number, fromY: number, rotate: number, frame: number, duration: number) => {
  const p = interpolate(frame, [0, duration], [0, 1], { extrapolateRight: 'clamp' });
  const x = interpolate(p, [0, 1], [fromX, 0]);
  const y = interpolate(p, [0, 1], [fromY, 0]);
  const scale = interpolate(p, [0, 1], [0.6, 0.15]);
  const opacity = interpolate(p, [0, 0.7, 1], [0.5, 0.3, 0]);
  return { transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`, opacity };
};

export const Turn: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = 120;

  const logoP = interpolate(frame, [20, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const logoScale = interpolate(logoP, [0, 1], [0.5, 1]);
  const glowP = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Background />

      <div style={{ position: 'absolute', left: '50%', top: '50%', width: 700 * glowP, height: 350 * glowP, transform: 'translate(-50%,-50%)', borderRadius: '350px 350px 0 0', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 70%)', filter: 'blur(6px)' }} />

      <div style={{ position: 'absolute', left: '38%', top: '38%', width: 140, height: 95, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', ...ghost(-120, -90, -10, frame, duration) }} />
      <div style={{ position: 'absolute', left: '62%', top: '38%', width: 155, height: 100, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', ...ghost(120, -80, 9, frame, duration) }} />
      <div style={{ position: 'absolute', left: '40%', top: '62%', width: 130, height: 90, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', ...ghost(-90, 100, 7, frame, duration) }} />
      <div style={{ position: 'absolute', left: '60%', top: '62%', width: 120, height: 85, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', ...ghost(100, 110, -6, frame, duration) }} />

      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) scale(${logoScale})`, opacity: logoP, filter: 'drop-shadow(0 0 40px rgba(25,0,255,0.45))' }}>
        <Img src={staticFile('logo-dark.png')} style={{ width: 320 }} />
      </div>
    </AbsoluteFill>
  );
};
