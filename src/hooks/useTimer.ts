/**
 * useTimer Hook
 * Manages countdown/countup timer functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { formatTime } from '../utils/format';

export interface UseTimerResult {
  seconds: number;
  isRunning: boolean;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setTime: (seconds: number) => void;
}

export function useTimer(initialSeconds: number = 0, countdown: boolean = false): UseTimerResult {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setSeconds(prev => {
        if (countdown) {
          if (prev <= 0) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, countdown]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const setTime = useCallback((newSeconds: number) => {
    setSeconds(newSeconds);
  }, []);

  return {
    seconds,
    isRunning,
    formattedTime: formatTime(seconds),
    start,
    pause,
    resume,
    reset,
    setTime,
  };
}
