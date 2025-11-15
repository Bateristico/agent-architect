import type { LevelDefinition } from '../types';

export const level05: LevelDefinition = {
  id: 'level-05',
  number: 5,
  title: 'RAG Optimization',
  difficulty: 'hard',
  learningPath: ['rag-specialist', 'agentic-developer'], // Overlapping level

  scenario: `You're building a technical documentation assistant. The challenge: documentation has precise
technical terms (favor keyword) BUT users ask questions in natural language (favor semantic). How do you
handle both? Welcome to the world of hybrid search and RAG optimization!`,

  learningObjectives: [
    'Master hybrid retrieval strategies',
    'Balance precision and recall',
    'Understand when to combine retrieval methods',
    'Optimize retrieval for different query types'
  ],

  // Introduce hybrid search
  availableCards: [
    'context-basic',
    'context-detailed',
    'context-chain-of-thought',
    'model-gpt35',
    'model-claude-haiku',
    'model-gpt4',
    'tool-search', // Keyword
    'tool-database',
    'tool-semantic-search', // Semantic
    'tool-hybrid-search', // NEW: Hybrid search
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react', // NEW: ReAct framework
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check'
  ],

  energyBudget: 11,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: false
  },

  // Test cases that need hybrid approach
  testCases: [
    {
      id: 'test-01',
      name: 'Exact API Name Query',
      input: 'How do I use the createUser API?',
      expectedBehavior: 'Find exact API documentation for createUser',
      difficulty: 'easy',
      reasoning: 'Exact technical term - keyword search excels'
    },
    {
      id: 'test-02',
      name: 'Conceptual Query with Technical Term',
      input: 'What\'s the best way to add a new person to the system?',
      expectedBehavior: 'Understand this relates to createUser API despite different wording',
      difficulty: 'medium',
      reasoning: 'Mix of concept (add person) and domain (system) - hybrid search handles both'
    },
    {
      id: 'test-03',
      name: 'Error Code Lookup',
      input: 'I\'m getting error AUTH_401. What does it mean?',
      expectedBehavior: 'Find exact error code documentation',
      difficulty: 'medium',
      reasoning: 'Exact technical identifier - keyword precision critical'
    },
    {
      id: 'test-04',
      name: 'Natural Language Problem',
      input: 'Why can\'t my users log in after I changed the authentication settings?',
      expectedBehavior: 'Connect symptoms to auth configuration docs, troubleshoot the issue',
      difficulty: 'hard',
      reasoning: 'Complex troubleshooting - needs semantic understanding + technical precision'
    },
    {
      id: 'test-05',
      name: 'Mixed Technical and Conceptual',
      input: 'The JWT token expires too quickly. How do I configure a longer session?',
      expectedBehavior: 'Find JWT config docs AND session management best practices',
      difficulty: 'hard',
      reasoning: 'Technical terms (JWT) + concepts (session) - hybrid search finds all relevant docs'
    }
  ],

  // Success criteria - tighter than Level 4
  successCriteria: {
    accuracy: 85,
    maxLatency: 4500,
    maxCost: 1.50
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 70,
    star2: 85,
    star3: 95
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
    'Test 1 & 3 have exact technical terms - keyword search is perfect',
    'Tests 2, 4, 5 mix natural language and technical terms - hybrid search excels',
    'Hybrid search costs more but handles ALL query types reliably',
    'Consider: detailed context helps the model understand technical docs',
    'ReAct framework can help with troubleshooting queries (test 4)'
  ],

  learningPoint: `Hybrid search is the production-grade answer to retrieval. It combines keyword precision for
technical terms with semantic understanding for natural language. Yes, it costs more - but the reliability and
accuracy gains are worth it for technical documentation and production systems. The key: don't optimize for the
easiest case; optimize for the hardest case your users will encounter.`,

  previousLevel: 4 // Must complete Level 4 first
};
