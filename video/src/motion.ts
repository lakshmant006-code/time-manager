import { Easing, interpolate } from 'remotion';

// A premium "expo-out" curve — fast start, long smooth settle. Used everywhere
// instead of linear/spring defaults so motion reads as directed, not bouncy.
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

export const ease = (frame: number, range: [number, number], output: [number, number], curve = easeOut) =>
  interpolate(frame, range, output, { easing: curve, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// Deterministic PRNG (mulberry32) — same output every render, per the no-unseeded-randomness rule.
export const seeded = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Camera "settle" applied at the start of every beat: a quick ease-in-out push-in.
export const cameraPush = (frame: number) => ease(frame, [0, 14], [1.045, 1], easeInOut);

// Formats a count-up number, preserving one decimal when the target has one.
export const countTo = (frame: number, range: [number, number], target: number) => {
  const v = ease(frame, range, [0, target]);
  return target % 1 !== 0 ? v.toFixed(1) : String(Math.round(v));
};
