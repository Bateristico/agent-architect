// Content Type Definitions for AgentCraft
// This file defines the structure of levels and cards

export type CardType = 'context' | 'model' | 'tool' | 'framework' | 'guardrail';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type PathId = 'beginner-architect' | 'rag-specialist' | 'agentic-developer' | 'production-engineer';

// Card Definition
export interface CardDefinition {
  id: string;
  name: string;
  type: CardType;
  energyCost: number;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  avoidWhen: string[];
  unlockLevel?: number; // Optional: if undefined, available from start
}

// Test Case Definition
export interface TestCaseDefinition {
  id: string;
  name: string;
  input: string;
  expectedBehavior: string;
  difficulty: Difficulty;
  reasoning?: string; // Optional: explains what makes this test pass/fail
}

// Success Criteria
export interface SuccessCriteria {
  accuracy: number; // Percentage (0-100)
  maxLatency?: number; // Milliseconds
  maxCost?: number; // Dollar amount
}

// Scoring Thresholds
export interface ScoringThresholds {
  star1: number; // Minimum score for 1 star
  star2: number; // Minimum score for 2 stars
  star3: number; // Minimum score for 3 stars
}

// Solution Constraints
export interface SolutionConstraints {
  mustInclude?: string[]; // Card IDs that must be present
  mustNotInclude?: string[]; // Card IDs that must not be present
  minCards?: number;
  maxCards?: number;
  hasValidSolution: boolean; // Whether puzzle is solvable
}

// Level Definition
export interface LevelDefinition {
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

  // Board slots (which are required)
  requiredSlots: {
    context: boolean;
    model: boolean;
    tools: boolean;
    framework: boolean;
    guardrails: boolean;
  };

  // Test cases
  testCases: TestCaseDefinition[];

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

// All content exports
export interface GameContent {
  cards: Record<string, CardDefinition>;
  levels: Record<string, LevelDefinition>;
}
