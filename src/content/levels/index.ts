import { level01 } from './level-01-faq-bot';
import { level02 } from './level-02-customer-support';
import { level03 } from './level-03-context-engineering';
import { level04 } from './level-04-semantic-search';
import { level05 } from './level-05-rag-optimization';
import { level06 } from './level-06-multi-source-retrieval';
import { level07 } from './level-07-agent-reasoning';
import { level08 } from './level-08-multi-step-troubleshooting';
import { level09 } from './level-09-tool-orchestration';
import { level10 } from './level-10-mcp-integration';
import { level11 } from './level-11-cost-optimization';
import { level12 } from './level-12-enterprise-scale';
import type { LevelDefinition } from '../types';

// Export all levels
export const allLevels: Record<string, LevelDefinition> = {
  'level-01': level01,
  'level-02': level02,
  'level-03': level03,
  'level-04': level04,
  'level-05': level05,
  'level-06': level06,
  'level-07': level07,
  'level-08': level08,
  'level-09': level09,
  'level-10': level10,
  'level-11': level11,
  'level-12': level12,
};

// Export individual levels
export {
  level01,
  level02,
  level03,
  level04,
  level05,
  level06,
  level07,
  level08,
  level09,
  level10,
  level11,
  level12
};

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
