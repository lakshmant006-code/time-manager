import React from 'react';
import { AbsoluteFill, useCurrentFrame, Img, staticFile } from 'remotion';
import { Background } from '../Background';
import { Rings } from '../Decor';
import { ease, cameraPush } from '../motion';

const ghost = (fromX: number, fromY: number, rotate: number, frame: number, duration: number) => {
  const p = ease(frame, [0, duration], [0, 1]);
  const x = fromX * (1 - p);
  const y = fromY * (1 - p);
  const scale = 0.6 - p * 0.45;
  const opacity = ease(frame, [0, duration], [0.5, 0]);
  return { transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`, opacity };
};

export const Turn: React.FC = () => {
  const frame = useCurrentFrame();
  const push = cameraPush(frame);
  const duration = 110;

  const logoP = ease(frame, [25, 75], [0, 1]);
  const logoScale = 0.5 + logoP * 0.5;
  const glowP = ease(frame, [0, 85], [0, 1]);
  const pulse = 1 + Math.sin(frame * 0.09) * 0.04 * logoP;

  return (
    <AbsoluteFill style={{ transform: `scale(${push})` }}>
      <Background />
      <div style={{ opacity: glowP * 0.6 }}><Rings frame={frame} /></div>

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 700 * glowP * pulse, height: 350 * glowP * pulse,
        transform: 'translate(-50%,-50%)', borderRadius: '350px 350px 0 0',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 70%)',
        filter: 'blur(6px)',
      }} />

      <div style={{ position: 'absolute', left: '38%', top: '38%', width: 140, height: 95, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(-120, -90, -10, frame, duration) }} />
      <div style={{ position: 'absolute', left: '62%', top: '38%', width: 155, height: 100, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(120, -80, 9, frame, duration) }} />
      <div style={{ position: 'absolute', left: '40%', top: '62%', width: 130, height: 90, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(-90, 100, 7, frame, duration) }} />
      <div style={{ position: 'absolute', left: '60%', top: '62%', width: 120, height: 85, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(100, 110, -6, frame, duration) }} />
      <div style={{ position: 'absolute', left: '22%', top: '50%', width: 90, height: 70, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(-180, 10, 12, frame, duration) }} />
      <div style={{ position: 'absolute', left: '78%', top: '50%', width: 100, height: 75, background: '#fff', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'blur(2px)', ...ghost(170, -10, -11, frame, duration) }} />

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) scale(${logoScale * pulse})`,
        opacity: logoP, filter: `drop-shadow(0 0 ${40 * pulse}px rgba(25,0,255,0.5))`,
      }}>
        <Img src={staticFile('logo-dark.png')} style={{ width: 320 }} />
      </div>
    </AbsoluteFill>
  );
};
