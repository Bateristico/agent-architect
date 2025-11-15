import { level01 } from './level-01-faq-bot';
import { level02 } from './level-02-customer-support';
import { level03 } from './level-03-context-engineering';
import type { LevelDefinition } from '../types';

// Export all levels
export const allLevels: Record<string, LevelDefinition> = {
  'level-01': level01,
  'level-02': level02,
  'level-03': level03,
  // More levels will be added here in future iterations
};

// Export individual levels
export { level01, level02, level03 };

// Helper function to get level by number
export function getLevelByNumber(levelNumber: number): LevelDefinition | undefined {
  return Object.values(allLevels).find(level => level.number === levelNumber);
}

// Helper function to get levels by path
export function getLevelsByPath(pathId: string): LevelDefinition[] {
  return Object.values(allLevels)
    .filter(level => level.learningPath.includes(pathId as any))
    .sort((a, b) => a.number - b.number);
}
