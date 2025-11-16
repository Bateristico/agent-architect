/**
 * Centralized Type Definitions
 * Single source of truth for all types in the application
 *
 * Import from this file instead of individual type files:
 * import { Card, Level, GameState } from '@/types';
 */

// Re-export all card types
export * from './card';

// Re-export all game types
export * from './game';

// Re-export all score types
export * from './score';

// Commonly used type aliases for convenience
export type { Card, CardType, CardCollection } from './card';
export type {
  Level,
  Board,
  BoardSlot,
  SlotType,
  TestCase,
  GameSession,
  GameProgress,
  GameState,
  Difficulty,
  PathId,
  LearningPath
} from './game';
export type {
  ScoreBreakdown,
  EvaluationResult,
  TestCaseResult,
  PerformanceMetrics
} from './score';
