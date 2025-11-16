/**
 * Calculation Utilities
 * Helper functions for game calculations, scoring, and statistics
 */

import type { TestCaseResult, StarThresholds } from '../types';

/**
 * Calculate pass rate from test results
 * @param results - Array of test case results
 * @returns Pass rate as percentage (0-100)
 */
export function calculatePassRate(results: TestCaseResult[]): number {
  if (results.length === 0) return 0;
  const passed = results.filter(r => r.passed).length;
  return (passed / results.length) * 100;
}

/**
 * Calculate star rating from score
 * @param score - Total score (0-100)
 * @param thresholds - Star thresholds
 * @returns Star rating (0-3)
 */
export function calculateStars(score: number, thresholds: StarThresholds): 0 | 1 | 2 | 3 {
  if (score >= thresholds.star3) return 3;
  if (score >= thresholds.star2) return 2;
  if (score >= thresholds.star1) return 1;
  return 0;
}

/**
 * Calculate energy remaining after card placement
 * @param currentEnergy - Current energy available
 * @param cardCost - Cost of card being placed
 * @param replacedCardCost - Cost of card being replaced (if any)
 * @returns New energy remaining
 */
export function calculateEnergyChange(
  currentEnergy: number,
  cardCost: number,
  replacedCardCost = 0
): number {
  return currentEnergy - cardCost + replacedCardCost;
}

/**
 * Calculate accuracy percentage
 * @param passed - Number of tests passed
 * @param total - Total number of tests
 * @returns Accuracy as percentage (0-100)
 */
export function calculateAccuracy(passed: number, total: number): number {
  if (total === 0) return 0;
  return (passed / total) * 100;
}

/**
 * Calculate score from multiple components
 * @param accuracy - Accuracy score (0-30)
 * @param efficiency - Efficiency score (0-20)
 * @param bestPractices - Best practices score (0-30)
 * @param robustness - Robustness score (0-20)
 * @returns Total score (0-100)
 */
export function calculateTotalScore(
  accuracy: number,
  efficiency: number,
  bestPractices: number,
  robustness: number
): number {
  return Math.min(100, accuracy + efficiency + bestPractices + robustness);
}

/**
 * Interpolate between two values
 * @param start - Start value
 * @param end - End value
 * @param progress - Progress (0-1)
 * @returns Interpolated value
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Clamp value between min and max
 * @param value - Value to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate average from array of numbers
 * @param values - Array of numeric values
 * @returns Average value, or 0 if array is empty
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculate percentage
 * @param part - Part value
 * @param total - Total value
 * @returns Percentage (0-100)
 */
export function percentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

/**
 * Round to specified decimal places
 * @param value - Value to round
 * @param decimals - Number of decimal places
 * @returns Rounded value
 */
export function roundTo(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}
