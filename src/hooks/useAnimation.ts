import { useState, useCallback } from 'react';

type AnimationState = 'idle' | 'playing' | 'complete';

interface UseAnimationReturn {
  state: AnimationState;
  play: () => void;
  pause: () => void;
  reset: () => void;
  complete: () => void;
  isPlaying: boolean;
  isIdle: boolean;
  isComplete: boolean;
}

/**
 * useAnimation Hook
 *
 * Manages animation state for coordinating Framer Motion animations.
 *
 * Usage:
 * const animation = useAnimation();
 *
 * <motion.div
 *   animate={animation.isPlaying ? 'show' : 'hidden'}
 *   onAnimationComplete={() => animation.complete()}
 * >
 */
export const useAnimation = (
  initialState: AnimationState = 'idle'
): UseAnimationReturn => {
  const [state, setState] = useState<AnimationState>(initialState);

  const play = useCallback((): void => {
    setState('playing');
  }, []);

  const pause = useCallback((): void => {
    setState('idle');
  }, []);

  const reset = useCallback((): void => {
    setState('idle');
  }, []);

  const complete = useCallback((): void => {
    setState('complete');
  }, []);

  const isPlaying = state === 'playing';
  const isIdle = state === 'idle';
  const isComplete = state === 'complete';

  return {
    state,
    play,
    pause,
    reset,
    complete,
    isPlaying,
    isIdle,
    isComplete,
  };
};
