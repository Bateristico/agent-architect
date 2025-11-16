/**
 * Card Type Definitions
 * Consolidated from game/types.ts, types/game.ts, and content/types.ts
 * Single source of truth for all card-related types
 */

// Card type enum - all possible card categories
export type CardType = 'context' | 'model' | 'tool' | 'framework' | 'guardrail';

// Card interface - represents a single card in the game
export interface Card {
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

// Type guard to check if an object is a valid Card
export function isCard(obj: unknown): obj is Card {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'type' in obj &&
    'energyCost' in obj &&
    typeof (obj as Card).id === 'string' &&
    typeof (obj as Card).name === 'string' &&
    typeof (obj as Card).energyCost === 'number'
  );
}

// Type guard to check if a string is a valid CardType
export function isCardType(type: string): type is CardType {
  return ['context', 'model', 'tool', 'framework', 'guardrail'].includes(type);
}

// Helper type for card collections
export type CardCollection = Record<string, Card>;
