import { useState, useCallback, useEffect } from 'react';
import { getLevelByNumber } from '../content';
import { useGameStore } from '../store/gameStore';
import type { Level } from '../types';

interface UseLevelReturn {
  currentLevel: Level | null;
  levelNumber: number;
  isLoading: boolean;
  error: string | null;
  nextLevel: () => void;
  previousLevel: () => void;
  goToLevel: (levelNumber: number) => void;
  completeCurrentLevel: (score: number, stars: number) => void;
  isLastLevel: boolean;
  isFirstLevel: boolean;
}

/**
 * useLevel Hook
 *
 * Manages level loading, progression, and completion.
 *
 * Usage:
 * const {
 *   currentLevel,
 *   nextLevel,
 *   completeCurrentLevel
 * } = useLevel();
 */
export const useLevel = (): UseLevelReturn => {
  const { progress, setCurrentLevel, completeLevel } = useGameStore();
  const [levelData, setLevelData] = useState<Level | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const levelNumber = progress.currentLevel || 1;

  // Load level data whenever level number changes
  useEffect(() => {
    const loadLevel = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = getLevelByNumber(levelNumber);
        if (!data) {
          throw new Error(`Level ${levelNumber} not found`);
        }
        setLevelData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load level');
        setLevelData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevel();
  }, [levelNumber]);

  // Navigate to next level
  const nextLevel = useCallback((): void => {
    const nextLevelNumber = levelNumber + 1;
    setCurrentLevel(nextLevelNumber);
  }, [levelNumber, setCurrentLevel]);

  // Navigate to previous level
  const previousLevel = useCallback((): void => {
    const prevLevelNumber = Math.max(1, levelNumber - 1);
    setCurrentLevel(prevLevelNumber);
  }, [levelNumber, setCurrentLevel]);

  // Go to specific level
  const goToLevel = useCallback(
    (targetLevel: number): void => {
      if (targetLevel >= 1) {
        setCurrentLevel(targetLevel);
      }
    },
    [setCurrentLevel]
  );

  // Complete current level
  const completeCurrentLevel = useCallback(
    (stars: number): void => {
      completeLevel(levelNumber, stars);
    },
    [levelNumber, completeLevel]
  );

  // Check if this is the last level (assuming max 20 levels)
  const isLastLevel = levelNumber >= 20;
  const isFirstLevel = levelNumber === 1;

  return {
    currentLevel: levelData,
    levelNumber,
    isLoading,
    error,
    nextLevel,
    previousLevel,
    goToLevel,
    completeCurrentLevel,
    isLastLevel,
    isFirstLevel,
  };
};
