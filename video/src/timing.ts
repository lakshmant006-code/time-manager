export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;

// Seconds -> frames, 30fps, 40s total = 1200 frames.
export const BEATS = {
  problem: { start: 0, duration: 180 }, // 0:00-0:06
  turn: { start: 180, duration: 120 }, // 0:06-0:10
  hero: { start: 300, duration: 150 }, // 0:10-0:15
  collage: { start: 450, duration: 210 }, // 0:15-0:22
  clockIn: { start: 660, duration: 150 }, // 0:22-0:27
  oversight: { start: 810, duration: 180 }, // 0:27-0:33
  lockup: { start: 990, duration: 210 }, // 0:33-0:40
} as const;

export const TOTAL_DURATION = 1200;

export const COLORS = {
  bg: '#05070f',
  white: '#ffffff',
  periwinkle: '#aab3e8',
  accent: '#1900ff',
  navy: '#151c3a',
};
