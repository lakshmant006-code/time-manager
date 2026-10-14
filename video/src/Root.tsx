import React from 'react';
import { Composition } from 'remotion';
import { Movie } from './Movie';
import { FPS, WIDTH, HEIGHT, TOTAL_DURATION } from './timing';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Animatic"
        component={Movie}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
