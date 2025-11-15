import { contextCards } from './context-cards';
import { modelCards } from './model-cards';
import { toolCards } from './tool-cards';
import { frameworkCards } from './framework-cards';
import { guardrailCards } from './guardrail-cards';
import type { CardDefinition } from '../types';

// Merge all card definitions
export const allCards: Record<string, CardDefinition> = {
  ...contextCards,
  ...modelCards,
  ...toolCards,
  ...frameworkCards,
  ...guardrailCards
};

// Export individual categories for convenience
export {
  contextCards,
  modelCards,
  toolCards,
  frameworkCards,
  guardrailCards
};
