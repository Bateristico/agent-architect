/**
 * Formatting Utilities
 * Helper functions for formatting scores, time, numbers, etc.
 */

/**
 * Format seconds into MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted string like "02:45"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format score with thousands separator
 * @param score - Numeric score
 * @returns Formatted string like "1,234"
 */
export function formatScore(score: number): string {
  return score.toLocaleString();
}

/**
 * Format percentage with optional decimal places
 * @param value - Numeric value (0-100)
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted string like "85%" or "85.5%"
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format currency/cost
 * @param amount - Numeric amount
 * @returns Formatted string like "$12.50"
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Format energy cost
 * @param cost - Energy cost value
 * @returns Formatted string with energy emoji
 */
export function formatEnergy(cost: number): string {
  return `⚡ ${cost}`;
}

/**
 * Format star rating
 * @param stars - Number of stars (0-3)
 * @returns String of star emojis
 */
export function formatStars(stars: number): string {
  const fullStars = '⭐'.repeat(Math.min(Math.max(0, stars), 3));
  const emptyStars = '☆'.repeat(Math.max(0, 3 - stars));
  return fullStars + emptyStars;
}

/**
 * Format large numbers with K, M suffixes
 * @param num - Numeric value
 * @returns Formatted string like "1.2K" or "3.5M"
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format latency in milliseconds
 * @param ms - Latency in milliseconds
 * @returns Formatted string like "250ms" or "1.2s"
 */
export function formatLatency(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  return `${Math.round(ms)}ms`;
}

/**
 * Pluralize a word based on count
 * @param count - Count value
 * @param singular - Singular form of word
 * @param plural - Plural form (optional, defaults to singular + 's')
 * @returns Pluralized string like "1 card" or "5 cards"
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || `${singular}s`);
  return `${count} ${word}`;
}
