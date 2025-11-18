import type { ComboDefinition } from '../types/card';

/**
 * Combo System - Multi-card achievements with significant bonuses
 *
 * Combos are discovered when the player places ALL required cards in a level.
 * They provide larger bonuses than individual synergies and stack with them.
 *
 * Design Philosophy:
 * - Early combos (Level 1-3): Simple 3-card combos teaching synergy concepts
 * - Mid-game combos (Level 4-7): 4-card combos requiring strategic thinking
 * - Late-game combos (Level 8+): 5-card combos showcasing mastery
 */

export const combos: Record<string, ComboDefinition> = {
  'speed-demon': {
    requiredCards: [
      'context-basic',
      'model-claude-haiku',
      'framework-sequential'
    ],
    name: 'Speed Demon',
    description: 'Optimized for lightning-fast responses. Minimal overhead, maximum throughput.',
    bonus: 25,
    unlockLevel: 1
  },

  'efficient-worker': {
    requiredCards: [
      'context-basic',
      'model-gpt35',
      'framework-sequential',
      'tool-search'
    ],
    name: 'Efficient Worker',
    description: 'Balanced approach combining speed and capability for everyday tasks.',
    bonus: 30,
    unlockLevel: 1
  },

  'quality-focus': {
    requiredCards: [
      'context-detailed',
      'model-gpt35',
      'framework-sequential',
      'tool-database'
    ],
    name: 'Quality Focus',
    description: 'Emphasizes accuracy and edge case handling without breaking the budget.',
    bonus: 30,
    unlockLevel: 1
  },

  'semantic-master': {
    requiredCards: [
      'context-detailed',
      'model-gpt4',
      'tool-semantic-search',
      'framework-chain-of-thought'
    ],
    name: 'Semantic Master',
    description: 'Deep understanding through semantic search and structured reasoning.',
    bonus: 35,
    unlockLevel: 3
  },

  'thoughtful-retrieval': {
    requiredCards: [
      'context-chain-of-thought',
      'model-gpt4',
      'tool-hybrid-search',
      'framework-chain-of-thought'
    ],
    name: 'Thoughtful Retrieval',
    description: 'Maximum accuracy combining best-in-class search with transparent reasoning.',
    bonus: 40,
    unlockLevel: 5
  },

  'agentic-powerhouse': {
    requiredCards: [
      'context-chain-of-thought',
      'model-gpt4',
      'tool-code-execution',
      'framework-react',
      'tool-mcp-interface'
    ],
    name: 'Agentic Powerhouse',
    description: 'Full autonomous agent capability with multi-step reasoning and tool orchestration.',
    bonus: 50,
    unlockLevel: 7
  },

  'mcp-orchestrator': {
    requiredCards: [
      'context-detailed',
      'model-gpt4',
      'tool-mcp-interface',
      'framework-react',
      'tool-web-search'
    ],
    name: 'MCP Orchestrator',
    description: 'Sophisticated tool coordination using Model Context Protocol for complex tasks.',
    bonus: 45,
    unlockLevel: 9
  },

  'perfect-balance': {
    requiredCards: [
      'context-detailed',
      'model-gpt4',
      'tool-hybrid-search',
      'framework-react',
      'guardrail-output-validator'
    ],
    name: 'Perfect Balance',
    description: 'Masterful combination of power, accuracy, safety, and intelligent reasoning.',
    bonus: 50,
    unlockLevel: 10
  }
};

/**
 * Get all combos available for a specific level
 */
export function getCombosForLevel(levelNumber: number): ComboDefinition[] {
  return Object.values(combos).filter(
    combo => combo.unlockLevel !== undefined && combo.unlockLevel <= levelNumber
  );
}

/**
 * Detect which combos are achieved given a set of placed card IDs
 */
export function detectAchievedCombos(
  placedCardIds: string[],
  availableCombos: ComboDefinition[]
): ComboDefinition[] {
  return availableCombos.filter(combo => {
    return combo.requiredCards.every(requiredCard =>
      placedCardIds.includes(requiredCard)
    );
  });
}

/**
 * Calculate total combo bonus from achieved combos
 */
export function calculateComboBonus(achievedCombos: ComboDefinition[]): number {
  return achievedCombos.reduce((total, combo) => total + combo.bonus, 0);
}

/**
 * Check if placing a card would complete any combo
 */
export function wouldCompleteCombo(
  cardId: string,
  currentlyPlacedCardIds: string[],
  availableCombos: ComboDefinition[]
): ComboDefinition | null {
  const futureCardIds = [...currentlyPlacedCardIds, cardId];

  for (const combo of availableCombos) {
    const wasIncomplete = !combo.requiredCards.every(rc =>
      currentlyPlacedCardIds.includes(rc)
    );
    const willBeComplete = combo.requiredCards.every(rc =>
      futureCardIds.includes(rc)
    );

    if (wasIncomplete && willBeComplete) {
      return combo;
    }
  }

  return null;
}

/**
 * Get progress towards completing a combo
 */
export function getComboProgress(
  placedCardIds: string[],
  combo: ComboDefinition
): { complete: number; total: number; missing: string[] } {
  const total = combo.requiredCards.length;
  const placedSet = new Set(placedCardIds);
  const missing = combo.requiredCards.filter(card => !placedSet.has(card));
  const complete = total - missing.length;

  return { complete, total, missing };
}
