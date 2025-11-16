import { useCallback } from 'react';

type SoundType =
  | 'cardPlace'
  | 'cardRemove'
  | 'buttonClick'
  | 'success'
  | 'error'
  | 'combo'
  | 'levelComplete';

interface UseSoundReturn {
  play: (soundType: SoundType) => void;
  stop: (soundType: SoundType) => void;
  stopAll: () => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
}

/**
 * useSound Hook (Placeholder)
 *
 * Future implementation for sound effects management.
 * Currently returns no-op functions.
 *
 * Usage:
 * const { play, stop } = useSound();
 * play('cardPlace');
 * play('success');
 */
export const useSound = (): UseSoundReturn => {
  const play = useCallback((soundType: SoundType): void => {
    // TODO: Implement sound playing
    console.log(`[Sound] Playing: ${soundType}`);
  }, []);

  const stop = useCallback((soundType: SoundType): void => {
    // TODO: Implement sound stopping
    console.log(`[Sound] Stopping: ${soundType}`);
  }, []);

  const stopAll = useCallback((): void => {
    // TODO: Implement stop all sounds
    console.log('[Sound] Stopping all sounds');
  }, []);

  const setVolume = useCallback((volume: number): void => {
    // TODO: Implement volume control (0-1)
    console.log(`[Sound] Setting volume: ${volume}`);
  }, []);

  const mute = useCallback((): void => {
    // TODO: Implement mute
    console.log('[Sound] Muting');
  }, []);

  const unmute = useCallback((): void => {
    // TODO: Implement unmute
    console.log('[Sound] Unmuting');
  }, []);

  return {
    play,
    stop,
    stopAll,
    setVolume,
    mute,
    unmute,
  };
};
