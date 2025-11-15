import type { LevelDefinition } from '../types';

export const level06: LevelDefinition = {
  id: 'level-06',
  number: 6,
  title: 'Multi-Source Retrieval',
  difficulty: 'hard',
  learningPath: ['rag-specialist', 'agentic-developer'], // Overlapping level

  scenario: `Real-world scenario: customers ask questions that require data from multiple sources -
internal docs, customer database, AND sometimes external web knowledge. A single retrieval tool won't cut it.
You need to orchestrate multiple data sources intelligently. Enter: multi-source retrieval!`,

  learningObjectives: [
    'Coordinate multiple data sources',
    'Learn when to query which source',
    'Handle conflicting information',
    'Optimize multi-source retrieval costs'
  ],

  // Multiple retrieval tools available
  availableCards: [
    'context-basic',
    'context-detailed',
    'context-chain-of-thought',
    'model-gpt35',
    'model-claude-haiku',
    'model-gpt4',
    'tool-search',
    'tool-database',
    'tool-semantic-search',
    'tool-hybrid-search',
    'tool-web-search', // NEW: Web search for external knowledge
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check'
  ],

  energyBudget: 12,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: false
  },

  // Test cases requiring multi-source data
  testCases: [
    {
      id: 'test-01',
      name: 'Internal Policy Question',
      input: 'What is our refund policy for enterprise customers?',
      expectedBehavior: 'Check internal docs for enterprise-specific refund policy',
      difficulty: 'easy',
      reasoning: 'Internal-only data - docs are sufficient, no external data needed'
    },
    {
      id: 'test-02',
      name: 'Customer-Specific Query',
      input: 'Has account #12345 ever requested a refund before?',
      expectedBehavior: 'Query customer database for account history',
      difficulty: 'medium',
      reasoning: 'Needs customer DB access - can\'t answer from docs alone'
    },
    {
      id: 'test-03',
      name: 'Policy + Customer Data',
      input: 'Is customer #12345 eligible for a refund based on our policy?',
      expectedBehavior: 'Check BOTH policy docs AND customer data, then determine eligibility',
      difficulty: 'hard',
      reasoning: 'Multi-source: needs policy (docs) + account status (DB) to answer correctly'
    },
    {
      id: 'test-04',
      name: 'External Knowledge Needed',
      input: 'A customer is asking about GDPR data deletion rights. What should I tell them?',
      expectedBehavior: 'Internal policy + external GDPR regulations to provide complete answer',
      difficulty: 'hard',
      reasoning: 'Needs internal policy (docs) + external regulations (web) - multi-source critical'
    },
    {
      id: 'test-05',
      name: 'Complex Multi-Source Investigation',
      input: 'Customer #12345 claims they never received a refund we said we processed. Investigate.',
      expectedBehavior: 'Check: customer account, transaction history, refund policy, processing status',
      difficulty: 'hard',
      reasoning: 'Most complex - needs DB for multiple lookups + policy context to resolve properly'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 85,
    maxLatency: 5000, // Multiple sources = higher latency acceptable
    maxCost: 2.00
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 70,
    star2: 85,
    star3: 93
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [],
    mustNotInclude: [],
    minCards: 4,
    maxCards: 16,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Test 1: Internal docs only - semantic/hybrid search works',
    'Test 2: Customer-specific - database tool is essential',
    'Tests 3-5: Multiple sources needed - agent framework helps orchestrate',
    'Web search is expensive and slow - only use when external knowledge truly needed',
    'ReAct framework excels at multi-step, multi-source tasks'
  ],

  learningPoint: `Real applications rarely have all data in one place. Multi-source retrieval is essential,
but it's expensive. The key insight: use an agentic framework (like ReAct) to intelligently decide WHICH sources
to query and WHEN. Don't blindly query everything - that's slow and costly. Instead, let the agent reason about
what information it needs and where to find it. This is the foundation of intelligent system design.`,

  previousLevel: 5 // Must complete Level 5 first
};
