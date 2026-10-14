import React from 'react';
import { Series } from 'remotion';
import { BEATS } from './timing';
import { Problem } from './scenes/Problem';
import { Turn } from './scenes/Turn';
import { Hero } from './scenes/Hero';
import { Collage } from './scenes/Collage';
import { ClockIn } from './scenes/ClockIn';
import { Oversight } from './scenes/Oversight';
import { Lockup } from './scenes/Lockup';

export const Movie: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={BEATS.problem.duration}><Problem /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.turn.duration}><Turn /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.hero.duration}><Hero /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.collage.duration}><Collage /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.clockIn.duration}><ClockIn /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.oversight.duration}><Oversight /></Series.Sequence>
      <Series.Sequence durationInFrames={BEATS.lockup.duration}><Lockup /></Series.Sequence>
    </Series>
  );
};
