export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;

// Seconds -> frames, 30fps. Trimmed ~15% from the 40s cut for a faster pace / quicker cuts.
export const BEATS = {
  problem: { start: 0, duration: 150 }, // 5.0s
  turn: { start: 150, duration: 105 }, // 3.5s
  hero: { start: 255, duration: 135 }, // 4.5s
  collage: { start: 390, duration: 180 }, // 6.0s
  clockIn: { start: 570, duration: 135 }, // 4.5s
  oversight: { start: 705, duration: 150 }, // 5.0s
  lockup: { start: 855, duration: 165 }, // 5.5s
} as const;

export const TOTAL_DURATION = 1020; // 34.0s

export const COLORS = {
  bg: '#05070f',
  white: '#ffffff',
  periwinkle: '#aab3e8',
  accent: '#1900ff',
  navy: '#151c3a',
};
