import type { CardDefinition } from '../types';

export const modelCards: Record<string, CardDefinition> = {
  'model-gpt35': {
    id: 'model-gpt35',
    name: 'GPT-3.5 Turbo',
    type: 'model',
    energyCost: 1,
    description: 'Fast, cost-effective model for straightforward tasks. Good balance of speed and capability.',
    pros: [
      'Very fast response time',
      'Low cost per query',
      'Good for simple tasks',
      'High throughput'
    ],
    cons: [
      'Limited reasoning ability',
      'May struggle with complex logic',
      'Lower accuracy on edge cases'
    ],
    bestFor: [
      'FAQ responses',
      'Simple classification',
      'High-volume applications',
      'Cost-sensitive scenarios'
    ],
    avoidWhen: [
      'Complex reasoning required',
      'High accuracy critical',
      'Nuanced understanding needed'
    ],
    unlockLevel: 1
  },

  'model-gpt4': {
    id: 'model-gpt4',
    name: 'GPT-4',
    type: 'model',
    energyCost: 3,
    description: 'Most capable model with superior reasoning and accuracy. Higher cost and slower.',
    pros: [
      'Excellent reasoning ability',
      'High accuracy',
      'Better edge case handling',
      'Superior at complex tasks',
      'More reliable outputs'
    ],
    cons: [
      'Higher cost',
      'Slower response time',
      'Overkill for simple queries'
    ],
    bestFor: [
      'Complex problem-solving',
      'High-stakes decisions',
      'Nuanced understanding',
      'Multi-step reasoning',
      'When accuracy is paramount'
    ],
    avoidWhen: [
      'Simple FAQ queries',
      'Cost is primary concern',
      'Speed is critical',
      'High-volume simple requests'
    ],
    unlockLevel: 2
  },

  'model-claude-haiku': {
    id: 'model-claude-haiku',
    name: 'Claude Haiku',
    type: 'model',
    energyCost: 1,
    description: 'Lightning-fast model optimized for speed. Best for simple, high-volume tasks.',
    pros: [
      'Extremely fast',
      'Very low cost',
      'Great for simple tasks',
      'Excellent throughput'
    ],
    cons: [
      'Limited capabilities',
      'Not for complex reasoning',
      'May miss nuances'
    ],
    bestFor: [
      'Quick responses',
      'Simple queries',
      'High-volume scenarios',
      'When speed matters most'
    ],
    avoidWhen: [
      'Complex reasoning needed',
      'Accuracy is critical',
      'Nuanced understanding required'
    ],
    unlockLevel: 1
  }
};
