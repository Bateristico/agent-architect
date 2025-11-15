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
  },

  'tool-hybrid-search': {
    id: 'tool-hybrid-search',
    name: 'Hybrid Search',
    type: 'tool',
    energyCost: 3,
    description: 'Combines keyword and semantic search for best of both worlds.',
    pros: [
      'Best accuracy',
      'Balances precision and recall',
      'Handles diverse queries',
      'Robust performance'
    ],
    cons: [
      'Highest cost',
      'Slower than single method',
      'Complex setup'
    ],
    bestFor: [
      'Production systems',
      'When accuracy is critical',
      'Mixed query types',
      'Best-in-class retrieval'
    ],
    avoidWhen: [
      'Budget constrained',
      'Speed is priority',
      'Simple use cases'
    ],
    unlockLevel: 5
  },

  'tool-web-search': {
    id: 'tool-web-search',
    name: 'Web Search',
    type: 'tool',
    energyCost: 3,
    description: 'Search the web for external knowledge. Variable quality and high latency.',
    pros: [
      'Access to external knowledge',
      'Up-to-date information',
      'Broad coverage',
      'No local data needed'
    ],
    cons: [
      'Very high latency',
      'Variable quality',
      'May retrieve irrelevant info',
      'Expensive'
    ],
    bestFor: [
      'Current events',
      'External knowledge',
      'When local data insufficient',
      'Research tasks'
    ],
    avoidWhen: [
      'Speed required',
      'Budget constrained',
      'Internal data exists',
      'Accuracy critical'
    ],
    unlockLevel: 6
  },

  'tool-code-execution': {
    id: 'tool-code-execution',
    name: 'Code Execution',
    type: 'tool',
    energyCost: 2,
    description: 'Execute code for calculations, data processing, and precise operations.',
    pros: [
      'Perfect accuracy for calculations',
      'Deterministic results',
      'Can process data',
      'No hallucinations'
    ],
    cons: [
      'Requires code generation',
      'Security concerns',
      'Medium latency',
      'Limited to computational tasks'
    ],
    bestFor: [
      'Mathematical calculations',
      'Data processing',
      'Precise operations',
      'When accuracy is critical'
    ],
    avoidWhen: [
      'Simple text responses',
      'No computation needed',
      'Security sensitive environments'
    ],
    unlockLevel: 7
  },

  'tool-mcp-interface': {
    id: 'tool-mcp-interface',
    name: 'MCP Interface',
    type: 'tool',
    energyCost: 3,
    description: 'Model Context Protocol - standardized interface for multiple tools.',
    pros: [
      'Standardized tool interface',
      'Clean integration',
      'Reduces brittleness',
      'Scales well',
      'Tool composition'
    ],
    cons: [
      'Setup complexity',
      'Higher cost',
      'Requires MCP-compatible tools'
    ],
    bestFor: [
      'Multiple tool coordination',
      'Production systems',
      'Long-term maintainability',
      'Tool orchestration'
    ],
    avoidWhen: [
      'Single tool needed',
      'Simple scenarios',
      'Rapid prototyping'
    ],
    unlockLevel: 9
  }
};
