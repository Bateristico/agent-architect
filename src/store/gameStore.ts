import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, PathId } from '../types/game';

interface GameStore extends GameState {
  // Actions
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number, stars: number) => void;
  setCurrentPath: (pathId: PathId | null) => void;
  setCurrentLevel: (levelId: number | null) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  resetProgress: () => void;
}

const initialState: GameState = {
  progress: {
    unlockedLevels: [1], // Level 1 is unlocked by default
    completedLevels: [],
    levelStars: {},
    currentPath: null,
    currentLevel: null,
  },
  settings: {
    soundEnabled: true,
    musicEnabled: false,
  },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Unlock a level
      unlockLevel: (levelId: number) =>
        set((state) => ({
          progress: {
            ...state.progress,
            unlockedLevels: state.progress.unlockedLevels.includes(levelId)
              ? state.progress.unlockedLevels
              : [...state.progress.unlockedLevels, levelId],
          },
        })),

      // Complete a level with stars
      completeLevel: (levelId: number, stars: number) =>
        set((state) => {
          const newCompletedLevels = state.progress.completedLevels.includes(levelId)
            ? state.progress.completedLevels
            : [...state.progress.completedLevels, levelId];

          // Unlock next level (if it exists and isn't already unlocked)
          const nextLevelId = levelId + 1;
          const newUnlockedLevels = state.progress.unlockedLevels.includes(nextLevelId)
            ? state.progress.unlockedLevels
            : [...state.progress.unlockedLevels, nextLevelId];

          return {
            progress: {
              ...state.progress,
              completedLevels: newCompletedLevels,
              unlockedLevels: newUnlockedLevels,
              levelStars: {
                ...state.progress.levelStars,
                [levelId]: Math.max(state.progress.levelStars[levelId] || 0, stars),
              },
            },
          };
        }),

      // Set current path
      setCurrentPath: (pathId: PathId | null) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentPath: pathId,
          },
        })),

      // Set current level
      setCurrentLevel: (levelId: number | null) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentLevel: levelId,
          },
        })),

      // Toggle sound effects
      toggleSound: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            soundEnabled: !state.settings.soundEnabled,
          },
        })),

      // Toggle background music
      toggleMusic: () =>
        set((state) => ({
          settings: {
            ...state.settings,
            musicEnabled: !state.settings.musicEnabled,
          },
        })),

      // Reset all progress
      resetProgress: () => set(initialState),
    }),
    {
      name: 'agent-architect-storage', // localStorage key
    }
  )
);
