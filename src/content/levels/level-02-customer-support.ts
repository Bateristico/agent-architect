import type { LevelDefinition } from '../types';

export const level02: LevelDefinition = {
  id: 'level-02',
  number: 2,
  title: 'Customer Support Bot',
  difficulty: 'medium',
  learningPath: ['beginner-architect'],

  scenario: `Your FAQ bot was successful! Now build a more capable customer support agent.
This agent needs to handle more complex queries including account-specific questions and
troubleshooting scenarios. You'll need to think about data access and better context.`,

  learningObjectives: [
    'Learn when to add data sources (tools)',
    'Understand the value of detailed context for complex queries',
    'See how model selection impacts accuracy',
    'Balance cost vs capability tradeoffs'
  ],

  // Level 2 introduces tools and more card options
  availableCards: [
    'context-basic',
    'context-detailed',
    'model-gpt35',
    'model-claude-haiku',
    'model-gpt4', // Introduce GPT-4 as option
    'tool-search',
    'tool-database', // Key addition for customer data
    'framework-sequential',
    'framework-chain-of-thought', // Introduce CoT
    'guardrail-output-validator',
    'guardrail-content-filter' // New guardrail option
  ],

  energyBudget: 7, // Slightly more energy

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: false,     // Still optional but helpful
    framework: true,
    guardrails: false
  },

  // Test cases for Level 2
  testCases: [
    {
      id: 'test-01',
      name: 'Simple Status Check',
      input: 'Where is my order?',
      expectedBehavior: 'Ask for order number and provide tracking information',
      difficulty: 'easy',
      reasoning: 'Straightforward query - should work with basic setup'
    },
    {
      id: 'test-02',
      name: 'Account Balance Query',
      input: 'What is my current account balance?',
      expectedBehavior: 'Access customer database and provide accurate balance',
      difficulty: 'medium',
      reasoning: 'Needs database access - tool is critical here'
    },
    {
      id: 'test-03',
      name: 'Billing Dispute',
      input: 'I was charged twice for the same order. Why?',
      expectedBehavior: 'Look up transaction history, identify duplicate charge, explain and offer resolution',
      difficulty: 'medium',
      reasoning: 'Requires database lookup and empathetic response'
    },
    {
      id: 'test-04',
      name: 'Complex Troubleshooting',
      input: 'My account was locked after I tried to reset my password three times.',
      expectedBehavior: 'Understand the security policy, check account status, provide clear unlock instructions',
      difficulty: 'hard',
      reasoning: 'Complex scenario requiring context about policies and account access'
    },
    {
      id: 'test-05',
      name: 'Sensitive Information Request',
      input: 'Can you tell me my password?',
      expectedBehavior: 'Politely decline and offer password reset instead',
      difficulty: 'hard',
      reasoning: 'Security edge case - needs guardrails to handle appropriately'
    }
  ],

  // Success criteria - slightly stricter
  successCriteria: {
    accuracy: 80, // 80% of test cases must pass
    maxLatency: 4000, // 4 seconds (more complex queries)
    maxCost: 0.80 // 80 cents
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 65,  // Basic pass
    star2: 78,  // Good performance
    star3: 90   // Excellent - best practices followed
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [], // No strict requirements, but database tool highly recommended
    mustNotInclude: [],
    minCards: 3,
    maxCards: 11,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Customer-specific queries need data access - consider the database tool',
    'Detailed context helps with complex scenarios',
    'Content filter guardrail protects against inappropriate information disclosure',
    'GPT-4 can handle complex reasoning but costs more - is it worth it?',
    'Chain-of-Thought framework helps with multi-step troubleshooting'
  ],

  learningPoint: `Data access transforms a simple chatbot into a useful assistant. The database tool
is essential for account-specific queries. Also notice how guardrails become more important as scenarios
get sensitive - the password request shows why content filtering matters in production systems.`,

  previousLevel: 1 // Must complete Level 1 first
};
