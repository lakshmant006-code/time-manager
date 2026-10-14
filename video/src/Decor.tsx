import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ease } from './motion';

/** Big low-opacity background wordmark, cheap (no filters). */
export const GhostWord: React.FC<{ text: string; left?: number; right?: number; top?: number; bottom?: number; size?: number }> = ({ text, left, right, top, bottom, size = 160 }) => (
  <div style={{
    position: 'absolute', left, right, top, bottom,
    fontFamily: "'Avant Gothic','Inter',sans-serif", fontWeight: 600, fontSize: size,
    color: 'rgba(255,255,255,0.05)', whiteSpace: 'nowrap', lineHeight: 1,
  }}>
    {text}
  </div>
);

/** Thin diagonal light beams sweeping across the frame — cheap gradient bars, no blur. */
export const LightStreaks: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame() - delay;
  const sweep = ease(frame, [0, 70], [-300, 1600]);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.35 }}>
      {[0, 60, 120].map((offset, i) => (
        <div key={i} style={{
          position: 'absolute', top: -200, bottom: -200, width: 2,
          left: sweep + offset,
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.6), transparent)',
          transform: 'rotate(18deg)',
        }} />
      ))}
    </div>
  );
};

/** Concentric pulsing rings behind a focal point — cheap borders, no filters. */
export const Rings: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    {[0, 1, 2].map((i) => {
      const p = ((frame - i * 20) % 120) / 120;
      const size = 300 + p * 500;
      return (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: '50%', width: size, height: size,
          marginLeft: -size / 2, marginTop: -size / 2, borderRadius: '50%',
          border: '1.5px solid rgba(25,0,255,0.4)', opacity: 1 - p,
        }} />
      );
    })}
  </>
);
