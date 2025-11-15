// Card Types
export type CardType = 'context' | 'model' | 'tool' | 'framework' | 'guardrail' | 'energy';

export interface ICard {
  id: string;
  name: string;
  type: CardType;
  energyCost: number;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  avoidWhen: string[];
}

// Test Case Types
export interface ITestCase {
  id: string;
  input: string;
  expectedBehavior: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Level Types
export interface ILevel {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenario: string;
  successCriteria: {
    accuracy: number;  // percentage
    maxLatency?: number; // milliseconds
    maxCost?: number;   // energy units
  };
  startingHand: string[]; // card IDs
  energyBudget: number;
  testCases: ITestCase[];
}

// Board State Types
export interface IBoardSlot {
  type: 'context' | 'model' | 'tools' | 'framework' | 'guardrails';
  card: ICard | null;
  required: boolean;
}

export interface IBoard {
  context: IBoardSlot;
  model: IBoardSlot;
  tools: IBoardSlot;
  framework: IBoardSlot;
  guardrails: IBoardSlot;
}

// Game Session Types
export interface IGameSession {
  levelId: number;
  hand: ICard[];
  board: IBoard;
  energyRemaining: number;
  energyBudget: number;
}
