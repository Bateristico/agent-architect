/**
 * Array Utilities
 * Helper functions for array manipulation
 */

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Group array items by key
 * @param array - Array to group
 * @param getKey - Function to get grouping key
 * @returns Object with grouped items
 */
export function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = getKey(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

/**
 * Get unique items from array
 * @param array - Array with potential duplicates
 * @param getKey - Optional function to get uniqueness key
 * @returns Array with unique items
 */
export function uniqueBy<T, K>(
  array: T[],
  getKey?: (item: T) => K
): T[] {
  if (!getKey) {
    return [...new Set(array)];
  }

  const seen = new Set<K>();
  return array.filter(item => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Chunk array into smaller arrays
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Get random item from array
 * @param array - Array to pick from
 * @returns Random item, or undefined if array is empty
 */
export function randomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get random items from array (without duplicates)
 * @param array - Array to pick from
 * @param count - Number of items to pick
 * @returns Array of random items
 */
export function randomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Sort array of objects by property
 * @param array - Array to sort
 * @param getKey - Function to get sort key
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[],
  getKey: (item: T) => number | string,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aKey = getKey(a);
    const bKey = getKey(b);
    const comparison = aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
    return order === 'asc' ? comparison : -comparison;
  });
}

/**
 * Remove item from array by value
 * @param array - Array to modify
 * @param item - Item to remove
 * @returns New array without the item
 */
export function removeItem<T>(array: T[], item: T): T[] {
  return array.filter(i => i !== item);
}

/**
 * Remove item from array by index
 * @param array - Array to modify
 * @param index - Index to remove
 * @returns New array without the item at index
 */
export function removeAt<T>(array: T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
