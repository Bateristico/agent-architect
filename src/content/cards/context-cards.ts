import type { CardDefinition } from '../types';

export const contextCards: Record<string, CardDefinition> = {
  'context-basic': {
    id: 'context-basic',
    name: 'Basic System Prompt',
    type: 'context',
    energyCost: 1,
    description: 'Simple system prompt with basic instructions. Fast and cheap but lacks detail.',
    pros: [
      'Very low energy cost',
      'Fast to process',
      'Good for simple queries'
    ],
    cons: [
      'Limited accuracy on complex queries',
      'May miss edge cases',
      'No examples provided'
    ],
    bestFor: [
      'FAQ-style questions',
      'Simple, straightforward queries',
      'High-volume, low-complexity scenarios'
    ],
    avoidWhen: [
      'Nuanced questions expected',
      'Edge cases common',
      'High accuracy required'
    ],
    unlockLevel: 1
  },

  'context-detailed': {
    id: 'context-detailed',
    name: 'Detailed Context',
    type: 'context',
    energyCost: 2,
    description: 'Comprehensive system prompt with examples and edge case handling.',
    pros: [
      'Higher accuracy',
      'Better edge case handling',
      'Includes few-shot examples',
      'Clear guidelines'
    ],
    cons: [
      'Higher energy cost',
      'Slightly slower',
      'More tokens used'
    ],
    bestFor: [
      'Complex queries',
      'Edge cases expected',
      'High-stakes scenarios',
      'Nuanced understanding needed'
    ],
    avoidWhen: [
      'Simple FAQ queries',
      'Cost is primary concern',
      'High-volume simple requests'
    ],
    unlockLevel: 1
  },

  'context-chain-of-thought': {
    id: 'context-chain-of-thought',
    name: 'Chain-of-Thought Prompt',
    type: 'context',
    energyCost: 2,
    description: 'Instructs model to show reasoning step-by-step before answering.',
    pros: [
      'Explicit reasoning visible',
      'Better for complex logic',
      'Reduces hallucinations',
      'Helps with debugging'
    ],
    cons: [
      'Higher latency',
      'More tokens consumed',
      'Overkill for simple queries'
    ],
    bestFor: [
      'Multi-step reasoning',
      'Complex problem-solving',
      'Troubleshooting scenarios',
      'When transparency matters'
    ],
    avoidWhen: [
      'Simple direct answers needed',
      'Latency is critical',
      'Cost-sensitive applications'
    ],
    unlockLevel: 3
  }
};
