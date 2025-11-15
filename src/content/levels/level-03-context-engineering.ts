import type { LevelDefinition } from '../types';

export const level03: LevelDefinition = {
  id: 'level-03',
  number: 3,
  title: 'Context Engineering Challenge',
  difficulty: 'medium',
  learningPath: ['beginner-architect', 'rag-specialist'], // Part of two paths!

  scenario: `You've learned the basics. Now face the context engineering challenge!
This level tests your ability to choose the RIGHT context for the situation. Should you use
basic prompts to save cost? Or invest in detailed context for better accuracy? There's no single
right answer - it depends on the use case.`,

  learningObjectives: [
    'Master context engineering tradeoffs',
    'Learn when simple beats complex',
    'Understand cost vs accuracy balance',
    'Recognize the value of examples and reasoning'
  ],

  // Full card selection available
  availableCards: [
    'context-basic',
    'context-detailed',
    'context-chain-of-thought', // New CoT context option
    'model-gpt35',
    'model-claude-haiku',
    'model-gpt4',
    'tool-search',
    'tool-database',
    'tool-semantic-search', // Introduce semantic search
    'framework-sequential',
    'framework-chain-of-thought',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check' // New: hallucination detection
  ],

  energyBudget: 8, // More flexibility

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: false,
    framework: true,
    guardrails: false
  },

  // Test cases designed to test context choices
  testCases: [
    {
      id: 'test-01',
      name: 'High-Volume Simple Query',
      input: 'What are your hours?',
      expectedBehavior: 'Quick, accurate response - optimize for speed and cost',
      difficulty: 'easy',
      reasoning: 'Basic context is perfect here - detailed would be overkill and waste money'
    },
    {
      id: 'test-02',
      name: 'Policy Interpretation',
      input: 'Do you accept returns after 30 days if the item is defective?',
      expectedBehavior: 'Nuanced understanding of return policy with edge case handling',
      difficulty: 'medium',
      reasoning: 'Needs detailed context to handle the conditional logic correctly'
    },
    {
      id: 'test-03',
      name: 'Multi-Step Calculation',
      input: 'If I buy 3 items at $29.99 each with a 15% discount code, what\'s my total with tax?',
      expectedBehavior: 'Break down calculation step-by-step and show reasoning',
      difficulty: 'medium',
      reasoning: 'Chain-of-thought context/framework shines here for transparent math'
    },
    {
      id: 'test-04',
      name: 'Ambiguous Technical Issue',
      input: 'My account isn\'t working right. Sometimes it logs me out randomly.',
      expectedBehavior: 'Ask clarifying questions, check account logs, provide systematic troubleshooting',
      difficulty: 'hard',
      reasoning: 'Vague problem needs detailed context and systematic reasoning'
    },
    {
      id: 'test-05',
      name: 'Fact-Checking Challenge',
      input: 'I heard your company had a data breach last month. Is my information safe?',
      expectedBehavior: 'Verify claim against records, provide accurate factual response without hallucinating',
      difficulty: 'hard',
      reasoning: 'Critical that agent doesn\'t hallucinate - needs hallucination guard and careful context'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 80,
    maxLatency: 4500,
    maxCost: 1.00 // Allow some flexibility for optimal choices
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 65,
    star2: 80,
    star3: 92 // High bar for 3 stars - need optimal context choices
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [],
    mustNotInclude: [],
    minCards: 3,
    maxCards: 13,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Not every query needs detailed context - simple queries work better with basic prompts',
    'Math and reasoning tasks benefit from chain-of-thought approaches',
    'The data breach question is a trap - hallucination guard prevents making up incidents',
    'Consider cost: basic context is 1 energy, detailed is 2, CoT is 2',
    'Sometimes the "best" model isn\'t necessary - match capability to task complexity'
  ],

  learningPoint: `Context engineering is about making deliberate choices. Basic context for simple queries
keeps costs low. Detailed context for complex scenarios improves accuracy. Chain-of-thought for reasoning
tasks provides transparency. The key insight: there's no universal "best" context - choose based on the
specific use case, balancing cost, speed, and accuracy.`,

  previousLevel: 2 // Must complete Level 2 first
};
