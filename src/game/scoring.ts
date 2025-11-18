/**
 * Scoring System - Calculate synergies, combos, and final scores
 *
 * Scoring Components:
 * 1. Base Score - From test case performance (0-100)
 * 2. Synergy Bonuses - Pairwise card relationships (+10-20%)
 * 3. Anti-Synergy Penalties - Conflicting cards (-10-25%)
 * 4. Combo Bonuses - Multi-card achievements (+25-50%)
 */

import type { Card } from '../types/card';
import type { ComboDefinition } from '../types/card';

// ============================================
// SYNERGY CALCULATIONS
// ============================================

/**
 * Calculate synergy bonus between two cards
 * Returns the bonus percentage (e.g., 15 means +15%)
 */
export function calculatePairwiseSynergy(card1: Card, card2: Card): number {
  let bonus = 0;

  // Check if card1 has synergy with card2
  if (card1.synergiesWith?.includes(card2.id)) {
    bonus += card1.synergyBonus || 0;
  }

  // Check if card2 has synergy with card1 (could be asymmetric)
  if (card2.synergiesWith?.includes(card1.id)) {
    bonus += card2.synergyBonus || 0;
  }

  return bonus;
}

/**
 * Calculate anti-synergy penalty between two cards
 * Returns the penalty percentage (e.g., 20 means -20%)
 */
export function calculatePairwiseAntiSynergy(card1: Card, card2: Card): number {
  let penalty = 0;

  // Check if card1 conflicts with card2
  if (card1.antiSynergiesWith?.includes(card2.id)) {
    penalty += card1.antiSynergyPenalty || 0;
  }

  // Check if card2 conflicts with card1
  if (card2.antiSynergiesWith?.includes(card1.id)) {
    penalty += card2.antiSynergyPenalty || 0;
  }

  return penalty;
}

/**
 * Calculate total synergy modifier for a set of cards
 * Returns net modifier as percentage (positive or negative)
 */
export function calculateTotalSynergy(cards: Card[]): {
  totalBonus: number;
  totalPenalty: number;
  netModifier: number;
  synergyPairs: Array<{ card1: string; card2: string; bonus: number }>;
  antiSynergyPairs: Array<{ card1: string; card2: string; penalty: number }>;
} {
  const synergyPairs: Array<{ card1: string; card2: string; bonus: number }> = [];
  const antiSynergyPairs: Array<{ card1: string; card2: string; penalty: number }> = [];
  let totalBonus = 0;
  let totalPenalty = 0;

  // Check all pairs of cards
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const card1 = cards[i];
      const card2 = cards[j];

      // Calculate synergy bonus
      const bonus = calculatePairwiseSynergy(card1, card2);
      if (bonus > 0) {
        synergyPairs.push({
          card1: card1.name,
          card2: card2.name,
          bonus
        });
        totalBonus += bonus;
      }

      // Calculate anti-synergy penalty
      const penalty = calculatePairwiseAntiSynergy(card1, card2);
      if (penalty > 0) {
        antiSynergyPairs.push({
          card1: card1.name,
          card2: card2.name,
          penalty
        });
        totalPenalty += penalty;
      }
    }
  }

  return {
    totalBonus,
    totalPenalty,
    netModifier: totalBonus - totalPenalty,
    synergyPairs,
    antiSynergyPairs
  };
}

// ============================================
// COMBO CALCULATIONS
// ============================================

/**
 * Detect which combos are achieved given a set of placed cards
 */
export function detectAchievedCombos(
  placedCards: Card[],
  availableCombos: ComboDefinition[]
): ComboDefinition[] {
  const placedCardIds = new Set(placedCards.map(c => c.id));

  return availableCombos.filter(combo => {
    return combo.requiredCards.every(requiredId => placedCardIds.has(requiredId));
  });
}

/**
 * Calculate total combo bonus from achieved combos
 */
export function calculateComboBonus(achievedCombos: ComboDefinition[]): number {
  return achievedCombos.reduce((total, combo) => total + combo.bonus, 0);
}

/**
 * Check if adding a card would complete any combo
 */
export function wouldCompleteCombo(
  cardToAdd: Card,
  currentCards: Card[],
  availableCombos: ComboDefinition[]
): ComboDefinition | null {
  const currentCardIds = new Set(currentCards.map(c => c.id));
  const futureCardIds = new Set([...currentCardIds, cardToAdd.id]);

  for (const combo of availableCombos) {
    const wasIncomplete = !combo.requiredCards.every(id => currentCardIds.has(id));
    const willBeComplete = combo.requiredCards.every(id => futureCardIds.has(id));

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
  placedCards: Card[],
  combo: ComboDefinition
): {
  complete: number;
  total: number;
  percentage: number;
  missing: string[];
  hasAll: Card[];
} {
  const placedCardIds = new Set(placedCards.map(c => c.id));
  const missing = combo.requiredCards.filter(id => !placedCardIds.has(id));
  const hasAll = placedCards.filter(c => combo.requiredCards.includes(c.id));
  const complete = combo.requiredCards.length - missing.length;
  const total = combo.requiredCards.length;

  return {
    complete,
    total,
    percentage: Math.round((complete / total) * 100),
    missing,
    hasAll
  };
}

// ============================================
// FINAL SCORE CALCULATION
// ============================================

export interface ScoreBreakdown {
  baseScore: number;           // Base score from test performance (0-100)
  synergyBonus: number;        // Total synergy bonus percentage
  antiSynergyPenalty: number;  // Total anti-synergy penalty percentage
  comboBonus: number;          // Total combo bonus percentage
  finalScore: number;          // Final calculated score
  stars: number;               // Star rating (1-3)

  // Detailed breakdown
  synergyDetails: {
    totalBonus: number;
    totalPenalty: number;
    netModifier: number;
    synergyPairs: Array<{ card1: string; card2: string; bonus: number }>;
    antiSynergyPairs: Array<{ card1: string; card2: string; penalty: number }>;
  };
  comboDetails: {
    achievedCombos: ComboDefinition[];
    totalBonus: number;
  };
}

/**
 * Calculate final score with all bonuses and penalties
 *
 * Formula:
 * finalScore = baseScore * (1 + (synergyBonus - antiSynergyPenalty + comboBonus) / 100)
 *
 * Example:
 * - Base score: 80
 * - Synergy bonus: +15%
 * - Anti-synergy penalty: -10%
 * - Combo bonus: +25%
 * - Net modifier: +30%
 * - Final score: 80 * 1.30 = 104 (capped at 100)
 */
export function calculateFinalScore(
  baseScore: number,
  placedCards: Card[],
  availableCombos: ComboDefinition[] = [],
  scoringThresholds: { star1: number; star2: number; star3: number }
): ScoreBreakdown {
  // Calculate synergy modifiers
  const synergyDetails = calculateTotalSynergy(placedCards);

  // Calculate combo bonuses
  const achievedCombos = detectAchievedCombos(placedCards, availableCombos);
  const comboBonus = calculateComboBonus(achievedCombos);

  // Calculate final score
  const totalModifier = (synergyDetails.netModifier + comboBonus) / 100;
  const finalScore = Math.min(100, Math.max(0, baseScore * (1 + totalModifier)));

  // Determine star rating
  let stars = 0;
  if (finalScore >= scoringThresholds.star3) stars = 3;
  else if (finalScore >= scoringThresholds.star2) stars = 2;
  else if (finalScore >= scoringThresholds.star1) stars = 1;

  return {
    baseScore,
    synergyBonus: synergyDetails.totalBonus,
    antiSynergyPenalty: synergyDetails.totalPenalty,
    comboBonus,
    finalScore: Math.round(finalScore),
    stars,
    synergyDetails,
    comboDetails: {
      achievedCombos,
      totalBonus: comboBonus
    }
  };
}

/**
 * Format score breakdown for display
 */
export function formatScoreBreakdown(breakdown: ScoreBreakdown): string {
  const lines = [
    `Base Score: ${breakdown.baseScore}/100`,
    '',
    'Modifiers:',
  ];

  // Synergies
  if (breakdown.synergyBonus > 0) {
    lines.push(`  ✓ Synergy Bonus: +${breakdown.synergyBonus}%`);
    breakdown.synergyDetails.synergyPairs.forEach(pair => {
      lines.push(`    • ${pair.card1} + ${pair.card2}: +${pair.bonus}%`);
    });
  }

  // Anti-synergies
  if (breakdown.antiSynergyPenalty > 0) {
    lines.push(`  ✗ Anti-Synergy Penalty: -${breakdown.antiSynergyPenalty}%`);
    breakdown.synergyDetails.antiSynergyPairs.forEach(pair => {
      lines.push(`    • ${pair.card1} ⚠ ${pair.card2}: -${pair.penalty}%`);
    });
  }

  // Combos
  if (breakdown.comboDetails.achievedCombos.length > 0) {
    lines.push(`  ★ Combo Bonuses: +${breakdown.comboBonus}%`);
    breakdown.comboDetails.achievedCombos.forEach(combo => {
      lines.push(`    • ${combo.name}: +${combo.bonus}%`);
    });
  }

  lines.push('');
  lines.push(`Final Score: ${breakdown.finalScore}/100 (${'★'.repeat(breakdown.stars)}${'☆'.repeat(3 - breakdown.stars)})`);

  return lines.join('\n');
}

/**
 * Calculate energy efficiency score
 * Rewards achieving high scores with lower energy usage
 */
export function calculateEnergyEfficiency(
  finalScore: number,
  energyUsed: number,
  energyBudget: number
): {
  efficiency: number;
  rating: 'Excellent' | 'Good' | 'Average' | 'Poor';
  bonus: number;
} {
  const scorePerEnergy = finalScore / energyUsed;
  const energyUtilization = energyUsed / energyBudget;

  // Efficiency bonus: reward high scores with low energy
  let efficiency = scorePerEnergy * (1 - energyUtilization * 0.5);

  let rating: 'Excellent' | 'Good' | 'Average' | 'Poor';
  let bonus = 0;

  if (efficiency >= 25) {
    rating = 'Excellent';
    bonus = 10;
  } else if (efficiency >= 18) {
    rating = 'Good';
    bonus = 5;
  } else if (efficiency >= 12) {
    rating = 'Average';
    bonus = 0;
  } else {
    rating = 'Poor';
    bonus = -5;
  }

  return { efficiency: Math.round(efficiency), rating, bonus };
}
