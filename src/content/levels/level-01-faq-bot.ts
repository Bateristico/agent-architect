import type { LevelDefinition } from '../types';

export const level01: LevelDefinition = {
  id: 'level-01',
  number: 1,
  title: 'Customer FAQ Bot',
  difficulty: 'easy',
  learningPath: ['beginner-architect'],

  scenario: `Build an AI agent to answer frequently asked customer questions.
Your agent should provide accurate information about business hours, policies, and common procedures.
Keep it simple - this is a straightforward FAQ scenario.`,

  learningObjectives: [
    'Understand the basics of context engineering',
    'Learn when simple solutions are appropriate',
    'Recognize the tradeoff between cost and capability',
    'See how model selection impacts performance'
  ],

  // Starting cards for Level 1
  availableCards: [
    'context-basic',
    'context-detailed',
    'model-gpt35',
    'model-claude-haiku',
    'tool-search',
    'framework-sequential',
    'guardrail-output-validator'
  ],

  energyBudget: 5,

  // Required slots
  requiredSlots: {
    context: true,    // Must place a context card
    model: true,      // Must place a model card
    tools: false,     // Optional
    framework: true,  // Must place a framework card
    guardrails: false // Optional
  },

  // Test cases for Level 1
  testCases: [
    {
      id: 'test-01',
      name: 'Simple FAQ Query',
      input: 'What are your business hours?',
      expectedBehavior: 'Provide accurate business hours from knowledge base',
      difficulty: 'easy',
      reasoning: 'Direct FAQ question - should succeed with any reasonable configuration'
    },
    {
      id: 'test-02',
      name: 'Policy Question',
      input: 'What is your return policy?',
      expectedBehavior: 'Clearly explain the return policy and process',
      difficulty: 'easy',
      reasoning: 'Another straightforward FAQ - should work with basic setup'
    },
    {
      id: 'test-03',
      name: 'Password Reset',
      input: 'I forgot my password, how do I reset it?',
      expectedBehavior: 'Provide step-by-step password reset instructions',
      difficulty: 'medium',
      reasoning: 'Slightly more complex - needs clear instructions. Benefits from detailed context.'
    },
    {
      id: 'test-04',
      name: 'Comparative Question',
      input: 'Is your product better than your competitor\'s?',
      expectedBehavior: 'Provide neutral information or politely deflect',
      difficulty: 'hard',
      reasoning: 'Edge case - needs guardrails to handle appropriately. Without guardrails, may hallucinate or make inappropriate claims.'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 75, // 75% of test cases must pass
    maxLatency: 3000, // 3 seconds max
    maxCost: 0.50 // 50 cents max per query
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 60,  // Basic pass
    star2: 75,  // Good performance
    star3: 90   // Excellent - best practices followed
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [], // No specific requirements
    mustNotInclude: [], // No forbidden cards
    minCards: 3, // At least context + model + framework
    maxCards: 7, // All available cards
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Start simple - this is a basic FAQ scenario',
    'Basic context is often enough for straightforward questions',
    'Fast, cheap models work well for simple queries',
    'Consider adding a guardrail for the competitive question',
    'You don\'t need tools for this level - the knowledge is in the context'
  ],

  learningPoint: `Context engineering matters even for simple tasks. While basic prompts work for straightforward FAQs,
detailed context and guardrails help handle edge cases. The best solution balances cost, speed, and accuracy -
you don't always need the most powerful (and expensive) components.`,

  previousLevel: undefined // First level, no prerequisite
};
