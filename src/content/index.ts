// Main content export file
import { allCards } from './cards';
import { allLevels, getLevelByNumber, getLevelsByPath } from './levels';
import type { GameContent } from './types';

// Export all content as a single object
export const gameContent: GameContent = {
  cards: allCards,
  levels: allLevels
};

// Export individual collections
export { allCards, allLevels };

// Export helper functions
export { getLevelByNumber, getLevelsByPath };

// Export types
export type * from './types';
