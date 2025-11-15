import type { CardDefinition } from '../types';

export const toolCards: Record<string, CardDefinition> = {
  'tool-search': {
    id: 'tool-search',
    name: 'Keyword Search',
    type: 'tool',
    energyCost: 1,
    description: 'Basic keyword-based search. Fast but may miss semantic meaning.',
    pros: [
      'Very fast',
      'Low cost',
      'Simple to implement',
      'Good for exact matches'
    ],
    cons: [
      'Misses semantic meaning',
      'Poor with synonyms',
      'Limited recall'
    ],
    bestFor: [
      'Exact keyword matching',
      'Simple lookups',
      'When speed is critical'
    ],
    avoidWhen: [
      'Semantic understanding needed',
      'Complex queries',
      'Synonyms common'
    ],
    unlockLevel: 1
  },

  'tool-database': {
    id: 'tool-database',
    name: 'Customer Database',
    type: 'tool',
    energyCost: 2,
    description: 'Direct access to customer records. Accurate but requires specific queries.',
    pros: [
      'Accurate data',
      'Real-time information',
      'Structured queries',
      'Fast lookups'
    ],
    cons: [
      'Requires precise queries',
      'Limited to database contents',
      'May need multiple calls'
    ],
    bestFor: [
      'Customer-specific queries',
      'Account information',
      'Transaction history',
      'Structured data lookup'
    ],
    avoidWhen: [
      'General knowledge needed',
      'Unstructured queries',
      'No clear entity to look up'
    ],
    unlockLevel: 1
  },

  'tool-semantic-search': {
    id: 'tool-semantic-search',
    name: 'Semantic Search',
    type: 'tool',
    energyCost: 2,
    description: 'Vector-based semantic search. Understands meaning, not just keywords.',
    pros: [
      'Understands meaning',
      'Works with synonyms',
      'Better recall',
      'Handles paraphrasing'
    ],
    cons: [
      'Higher latency',
      'More expensive',
      'Requires embeddings'
    ],
    bestFor: [
      'Complex queries',
      'Semantic understanding',
      'When meaning matters',
      'Synonym handling'
    ],
    avoidWhen: [
      'Simple keyword matching',
      'Speed is critical',
      'Cost-sensitive scenarios'
    ],
    unlockLevel: 3
  }
};
