import { useState, useCallback } from 'react';
import type { Board, Card, Level } from '../types';

interface UseGameStateReturn {
  board: Board;
  energyRemaining: number;
  placeCard: (card: Card) => boolean;
  removeCard: (slotType: keyof Board) => void;
  reset: () => void;
  canPlaceCard: (card: Card) => boolean;
  isSlotFilled: (slotType: keyof Board) => boolean;
  getScore: () => number;
}

/**
 * useGameState Hook
 *
 * Manages game board state, card placement, energy tracking, and score calculation.
 *
 * Usage:
 * const {
 *   board,
 *   energyRemaining,
 *   placeCard,
 *   removeCard,
 *   reset
 * } = useGameState(levelData);
 */
export const useGameState = (level: Level): UseGameStateReturn => {
  const [board, setBoard] = useState<Board>({
    context: {
      type: 'context',
      card: null,
      required: level.requiredSlots.context,
    },
    model: { type: 'model', card: null, required: level.requiredSlots.model },
    tools: { type: 'tools', card: null, required: level.requiredSlots.tools },
    framework: {
      type: 'framework',
      card: null,
      required: level.requiredSlots.framework,
    },
    guardrails: {
      type: 'guardrails',
      card: null,
      required: level.requiredSlots.guardrails,
    },
  });

  const [energyRemaining, setEnergyRemaining] = useState(level.energyBudget);

  // Check if card can be placed (enough energy)
  const canPlaceCard = useCallback(
    (card: Card): boolean => {
      return card.energyCost <= energyRemaining;
    },
    [energyRemaining]
  );

  // Check if slot is filled
  const isSlotFilled = useCallback(
    (slotType: keyof Board): boolean => {
      return board[slotType].card !== null;
    },
    [board]
  );

  // Place card on board
  const placeCard = useCallback(
    (card: Card): boolean => {
      if (!canPlaceCard(card)) {
        return false; // Not enough energy
      }

      // Map card type to board slot
      const slotMap: Record<string, keyof Board> = {
        context: 'context',
        model: 'model',
        tool: 'tools',
        framework: 'framework',
        guardrail: 'guardrails',
      };

      const slotType = slotMap[card.type];
      if (!slotType) {
        return false; // Invalid card type
      }

      const slot = board[slotType];

      // Calculate energy change
      let energyChange = -card.energyCost;
      if (slot.card) {
        energyChange += slot.card.energyCost; // Return energy from replaced card
      }

      // Update board and energy
      setBoard({
        ...board,
        [slotType]: { ...slot, card },
      });
      setEnergyRemaining((prev) => prev + energyChange);

      return true;
    },
    [board, canPlaceCard]
  );

  // Remove card from board
  const removeCard = useCallback(
    (slotType: keyof Board): void => {
      const slot = board[slotType];
      if (!slot.card) return;

      // Return energy
      setEnergyRemaining((prev) => prev + slot.card!.energyCost);

      // Clear slot
      setBoard({
        ...board,
        [slotType]: { ...slot, card: null },
      });
    },
    [board]
  );

  // Reset board to initial state
  const reset = useCallback((): void => {
    setBoard({
      context: {
        type: 'context',
        card: null,
        required: level.requiredSlots.context,
      },
      model: { type: 'model', card: null, required: level.requiredSlots.model },
      tools: { type: 'tools', card: null, required: level.requiredSlots.tools },
      framework: {
        type: 'framework',
        card: null,
        required: level.requiredSlots.framework,
      },
      guardrails: {
        type: 'guardrails',
        card: null,
        required: level.requiredSlots.guardrails,
      },
    });
    setEnergyRemaining(level.energyBudget);
  }, [level]);

  // Calculate current score (basic implementation)
  const getScore = useCallback((): number => {
    let score = 0;

    // Add base points for each card
    Object.values(board).forEach((slot) => {
      if (slot.card) {
        score += 50; // Base points per card
      }
    });

    // Add combo bonuses
    if (board.context.card && board.model.card) {
      score += 25; // Synergy combo
    }
    if (board.model.card && board.tools.card) {
      score += 30; // Integration combo
    }
    if (board.tools.card && board.guardrails.card) {
      score += 15; // Security combo
    }

    return score;
  }, [board]);

  return {
    board,
    energyRemaining,
    placeCard,
    removeCard,
    reset,
    canPlaceCard,
    isSlotFilled,
    getScore,
  };
};
