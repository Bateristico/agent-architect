/**
 * Validation Utilities
 * Helper functions for input validation and game rule checking
 */

import type { Board, Card, RequiredSlots } from '../types';

/**
 * Check if player can afford a card
 * @param card - Card to check
 * @param energyRemaining - Current energy available
 * @returns True if player can afford the card
 */
export function canAffordCard(card: Card, energyRemaining: number): boolean {
  return card.energyCost <= energyRemaining;
}

/**
 * Check if board meets minimum requirements
 * @param board - Current board state
 * @param requiredSlots - Required slots configuration
 * @returns True if all required slots are filled
 */
export function meetsRequiredSlots(board: Board, requiredSlots: RequiredSlots): boolean {
  return (
    (!requiredSlots.context || board.context.card !== null) &&
    (!requiredSlots.model || board.model.card !== null) &&
    (!requiredSlots.tools || board.tools.card !== null) &&
    (!requiredSlots.framework || board.framework.card !== null) &&
    (!requiredSlots.guardrails || board.guardrails.card !== null)
  );
}

/**
 * Check if board is complete (all slots filled)
 * @param board - Current board state
 * @returns True if all slots are filled
 */
export function isBoardComplete(board: Board): boolean {
  return (
    board.context.card !== null &&
    board.model.card !== null &&
    board.tools.card !== null &&
    board.framework.card !== null &&
    board.guardrails.card !== null
  );
}

/**
 * Count filled slots on board
 * @param board - Current board state
 * @returns Number of filled slots (0-5)
 */
export function countFilledSlots(board: Board): number {
  let count = 0;
  if (board.context.card) count++;
  if (board.model.card) count++;
  if (board.tools.card) count++;
  if (board.framework.card) count++;
  if (board.guardrails.card) count++;
  return count;
}

/**
 * Calculate total energy used on board
 * @param board - Current board state
 * @returns Total energy cost of cards on board
 */
export function calculateEnergyUsed(board: Board): number {
  let total = 0;
  if (board.context.card) total += board.context.card.energyCost;
  if (board.model.card) total += board.model.card.energyCost;
  if (board.tools.card) total += board.tools.card.energyCost;
  if (board.framework.card) total += board.framework.card.energyCost;
  if (board.guardrails.card) total += board.guardrails.card.energyCost;
  return total;
}

/**
 * Validate level number is within range
 * @param levelNumber - Level number to check
 * @param minLevel - Minimum level (default: 1)
 * @param maxLevel - Maximum level (default: 12)
 * @returns True if level is valid
 */
export function isValidLevel(levelNumber: number, minLevel = 1, maxLevel = 12): boolean {
  return Number.isInteger(levelNumber) && levelNumber >= minLevel && levelNumber <= maxLevel;
}

/**
 * Check if score meets star threshold
 * @param score - Current score
 * @param threshold - Threshold to check
 * @returns True if score meets or exceeds threshold
 */
export function meetsThreshold(score: number, threshold: number): boolean {
  return score >= threshold;
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Check if value is within range
 * @param value - Value to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if value is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
