/**
 * Game State Type Definitions
 * Consolidated from game/types.ts, types/game.ts, and content/types.ts
 * Covers board state, levels, test cases, scoring, and game progress
 */

import type { Card, CardType } from './card';

// ============================================
// DIFFICULTY & PATH TYPES
// ============================================

export type Difficulty = 'easy' | 'medium' | 'hard';
export type PathId = 'beginner-architect' | 'rag-specialist' | 'agentic-developer' | 'production-engineer';

// ============================================
// BOARD & SLOT TYPES
// ============================================

// Board slot type - matches card types but uses specific naming
export type SlotType = 'context' | 'model' | 'tools' | 'framework' | 'guardrails';

// Board slot interface
export interface BoardSlot {
  type: SlotType;
  card: Card | null;
  required: boolean;
}

// Complete board state with all 5 slots
export interface Board {
  context: BoardSlot;
  model: BoardSlot;
  tools: BoardSlot;
  framework: BoardSlot;
  guardrails: BoardSlot;
}

// ============================================
// TEST CASE TYPES
// ============================================

export interface TestCase {
  id: string;
  name?: string;
  input: string;
  expectedBehavior: string;
  difficulty: Difficulty;
  reasoning?: string; // Optional: explains what makes this test pass/fail
}

// ============================================
// LEVEL TYPES
// ============================================

// Success criteria for a level
export interface SuccessCriteria {
  accuracy: number;       // Percentage (0-100)
  maxLatency?: number;    // Milliseconds
  maxCost?: number;       // Dollar amount or energy units
}

// Scoring thresholds for star ratings
export interface ScoringThresholds {
  star1: number; // Minimum score for 1 star (e.g., 33)
  star2: number; // Minimum score for 2 stars (e.g., 67)
  star3: number; // Minimum score for 3 stars (e.g., 85)
}

// Solution constraints for validation
export interface SolutionConstraints {
  mustInclude?: string[];     // Card IDs that must be present
  mustNotInclude?: string[];  // Card IDs that must not be present
  minCards?: number;
  maxCards?: number;
  hasValidSolution: boolean;  // Whether puzzle is solvable
}

// Required slots configuration
export interface RequiredSlots {
  context: boolean;
  model: boolean;
  tools: boolean;
  framework: boolean;
  guardrails: boolean;
}

// Complete level definition
export interface Level {
  id: string;
  number: number; // 1-12
  title: string;
  difficulty: Difficulty;
  learningPath: PathId[]; // Can belong to multiple paths

  // Scenario
  scenario: string;
  learningObjectives: string[];

  // Cards & Resources
  availableCards: string[]; // Card IDs
  energyBudget: number;

  // Board configuration
  requiredSlots: RequiredSlots;

  // Test cases
  testCases: TestCase[];

  // Success criteria
  successCriteria: SuccessCriteria;

  // Scoring
  scoringThresholds: ScoringThresholds;

  // Solution validation
  solutionConstraints: SolutionConstraints;

  // Hints and feedback
  hints: string[];
  learningPoint: string;

  // Unlock requirements
  previousLevel?: number; // Required level to unlock this one
}

// ============================================
// GAME SESSION TYPES
// ============================================

export interface GameSession {
  levelId: number;
  hand: Card[];
  board: Board;
  energyRemaining: number;
  energyBudget: number;
}

// ============================================
// LEARNING PATH TYPES
// ============================================

export interface LearningPath {
  id: PathId;
  name: string;
  description: string;
  icon: string;
  color: string;
  levels: number[];
}

// ============================================
// GAME PROGRESS TYPES
// ============================================

export interface GameProgress {
  unlockedLevels: number[];
  completedLevels: number[];
  levelStars: Record<number, number>; // levelId -> stars (0-3)
  currentPath: PathId | null;
  currentLevel: number | null;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface GameState {
  progress: GameProgress;
  settings: GameSettings;
}

// ============================================
// SCORING & EVALUATION TYPES
// ============================================

export interface ScoreBreakdown {
  accuracy: number;      // 0-30 points
  efficiency: number;    // 0-20 points
  bestPractices: number; // 0-30 points
  robustness: number;    // 0-20 points
  total: number;         // 0-100 points
}

export interface EvaluationResult {
  passed: boolean;
  score: ScoreBreakdown;
  stars: number; // 0-3
  feedback: string[];
  testResults: TestCaseResult[];
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  feedback: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type StarRating = 0 | 1 | 2 | 3;

// Helper to get slot type from card type
export function cardTypeToSlotType(cardType: CardType): SlotType {
  if (cardType === 'tool') return 'tools';
  if (cardType === 'guardrail') return 'guardrails';
  return cardType as SlotType;
}

// Helper to check if a slot is filled
export function isSlotFilled(slot: BoardSlot): boolean {
  return slot.card !== null;
}

// Helper to check if board meets required slots
export function meetsRequiredSlots(board: Board, requiredSlots: RequiredSlots): boolean {
  return (
    (!requiredSlots.context || isSlotFilled(board.context)) &&
    (!requiredSlots.model || isSlotFilled(board.model)) &&
    (!requiredSlots.tools || isSlotFilled(board.tools)) &&
    (!requiredSlots.framework || isSlotFilled(board.framework)) &&
    (!requiredSlots.guardrails || isSlotFilled(board.guardrails))
  );
}
