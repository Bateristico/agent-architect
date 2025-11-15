import type { CardDefinition } from '../types';

export const frameworkCards: Record<string, CardDefinition> = {
  'framework-sequential': {
    id: 'framework-sequential',
    name: 'Direct Response',
    type: 'framework',
    energyCost: 1,
    description: 'Simple sequential processing. Input → Process → Output. No complex reasoning.',
    pros: [
      'Fast execution',
      'Low latency',
      'Simple to debug',
      'Predictable behavior'
    ],
    cons: [
      'No multi-step reasoning',
      'Cannot use tools effectively',
      'Limited problem-solving'
    ],
    bestFor: [
      'Simple Q&A',
      'Direct responses',
      'FAQ scenarios',
      'When speed matters'
    ],
    avoidWhen: [
      'Complex reasoning needed',
      'Tool coordination required',
      'Multi-step problems'
    ],
    unlockLevel: 1
  },

  'framework-react': {
    id: 'framework-react',
    name: 'ReAct Framework',
    type: 'framework',
    energyCost: 3,
    description: 'Reasoning + Acting framework. Agent reasons, takes actions, observes results iteratively.',
    pros: [
      'Multi-step reasoning',
      'Effective tool use',
      'Can handle complex tasks',
      'Self-correcting'
    ],
    cons: [
      'Higher latency',
      'More expensive',
      'Can loop unnecessarily',
      'Overkill for simple tasks'
    ],
    bestFor: [
      'Complex problem-solving',
      'Tool orchestration',
      'Multi-step tasks',
      'When reasoning matters'
    ],
    avoidWhen: [
      'Simple queries',
      'Speed is critical',
      'Cost-sensitive scenarios',
      'No tools needed'
    ],
    unlockLevel: 5
  },

  'framework-chain-of-thought': {
    id: 'framework-chain-of-thought',
    name: 'Chain-of-Thought',
    type: 'framework',
    energyCost: 2,
    description: 'Step-by-step reasoning framework. Shows thinking process before answering.',
    pros: [
      'Transparent reasoning',
      'Better accuracy on logic',
      'Easier to debug',
      'Reduces hallucinations'
    ],
    cons: [
      'Slower than direct',
      'More tokens',
      'Not needed for simple tasks'
    ],
    bestFor: [
      'Logic problems',
      'Math or calculations',
      'Troubleshooting',
      'When transparency needed'
    ],
    avoidWhen: [
      'Simple FAQ',
      'Speed critical',
      'Straightforward queries'
    ],
    unlockLevel: 2
  }
};
