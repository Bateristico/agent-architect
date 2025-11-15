import type { LevelDefinition } from '../types';

export const level04: LevelDefinition = {
  id: 'level-04',
  number: 4,
  title: 'Semantic Search Introduction',
  difficulty: 'medium',
  learningPath: ['beginner-architect', 'rag-specialist'], // Bridge level

  scenario: `You're upgrading a knowledge base search system. The current keyword search misses too many queries
because users phrase questions differently than the documentation. Time to introduce semantic search!
But when should you use semantic vs keyword? There are tradeoffs to consider.`,

  learningObjectives: [
    'Understand semantic vs keyword search',
    'Learn when each retrieval method excels',
    'Balance accuracy and cost',
    'Recognize the value of the right retrieval strategy'
  ],

  // Introduce semantic search
  availableCards: [
    'context-basic',
    'context-detailed',
    'context-chain-of-thought',
    'model-gpt35',
    'model-claude-haiku',
    'model-gpt4',
    'tool-search', // Keyword
    'tool-database',
    'tool-semantic-search', // NEW: Semantic search
    'framework-sequential',
    'framework-chain-of-thought',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check'
  ],

  energyBudget: 9,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true, // Must use tools - comparing retrieval strategies
    framework: true,
    guardrails: false
  },

  // Test cases designed to show semantic vs keyword
  testCases: [
    {
      id: 'test-01',
      name: 'Exact Match Query',
      input: 'What is the return policy?',
      expectedBehavior: 'Quick lookup of return policy - exact match works fine',
      difficulty: 'easy',
      reasoning: 'Keyword search is perfect here - exact match, fast and cheap'
    },
    {
      id: 'test-02',
      name: 'Paraphrased Query',
      input: 'Can I get my money back if I change my mind about a purchase?',
      expectedBehavior: 'Understand this is about return policy even with different wording',
      difficulty: 'medium',
      reasoning: 'Semantic search shines - understands meaning despite different phrasing'
    },
    {
      id: 'test-03',
      name: 'Synonym-Heavy Query',
      input: 'How do I send back an item I bought?',
      expectedBehavior: 'Recognize synonyms: send back = return, item = product, bought = purchased',
      difficulty: 'medium',
      reasoning: 'Keyword search fails on synonyms, semantic search handles them naturally'
    },
    {
      id: 'test-04',
      name: 'Conceptual Query',
      input: 'What happens if a product arrives damaged?',
      expectedBehavior: 'Connect this to returns/refunds even though "return" not mentioned',
      difficulty: 'medium',
      reasoning: 'Semantic understanding required - conceptually related to return policy'
    },
    {
      id: 'test-05',
      name: 'Multi-Concept Query',
      input: 'I received the wrong color and it also has a defect. What are my options?',
      expectedBehavior: 'Handle multiple issues: wrong item + defect, provide comprehensive answer',
      difficulty: 'hard',
      reasoning: 'Complex query needs semantic understanding + detailed context to handle properly'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 80,
    maxLatency: 4000,
    maxCost: 1.20
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 65,
    star2: 80,
    star3: 90
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [],
    mustNotInclude: [],
    minCards: 4,
    maxCards: 14,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Keyword search works great for exact matches but fails on synonyms and paraphrasing',
    'Semantic search understands meaning but costs more - use it when meaning matters',
    'The first test case is simple - don\'t over-engineer with expensive tools',
    'Tests 2-5 involve paraphrasing, synonyms, and concepts - semantic search excels here',
    'Consider: can you mix both? Use keyword for simple, semantic for complex?'
  ],

  learningPoint: `Retrieval strategy matters as much as the model! Keyword search is fast and cheap for exact matches,
but semantic search is essential when users express ideas in different ways. The key insight: choose your retrieval
method based on how users will phrase their questions. In production, hybrid approaches often work best - keyword
for simple lookups, semantic for complex understanding.`,

  previousLevel: 3 // Must complete Level 3 first
};
