import React from 'react';
import { useCurrentFrame } from 'remotion';
import { seeded } from './motion';

const rand = seeded(42);
const DOTS = Array.from({ length: 30 }).map(() => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 1 + rand() * 2,
  speed: 0.15 + rand() * 0.3,
  phase: rand() * Math.PI * 2,
  opacity: 0.15 + rand() * 0.35,
}));

export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {DOTS.map((d, i) => {
        const drift = Math.sin(frame * 0.015 * d.speed + d.phase) * 10;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y + drift * 0.05}%`,
              width: d.size,
              height: d.size,
              borderRadius: '50%',
              background: '#fff',
              opacity: d.opacity,
              transform: `translateX(${drift}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
