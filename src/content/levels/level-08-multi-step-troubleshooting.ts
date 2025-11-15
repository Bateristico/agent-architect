import type { LevelDefinition } from '../types';

export const level08: LevelDefinition = {
  id: 'level-08',
  number: 8,
  title: 'Multi-Step Troubleshooting',
  difficulty: 'hard',
  learningPath: ['agentic-developer', 'production-engineer'], // Bridge to production

  scenario: `Advanced technical support scenario: customers report vague problems ("it's not working"),
and you need to systematically troubleshoot. This requires:
1. Understanding the symptom
2. Forming hypotheses
3. Testing each hypothesis with tools
4. Synthesizing findings
5. Proposing solutions

This is where agents prove their worth!`,

  learningObjectives: [
    'Master systematic troubleshooting',
    'Coordinate multiple diagnostic tools',
    'Handle failure cases and retry logic',
    'Build robust multi-step agents'
  ],

  // All tools available
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
    'tool-web-search',
    'tool-code-execution',
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check',
    'guardrail-cost-limit', // NEW: Important for complex agents
    'guardrail-cascade-safety' // NEW: Prevents infinite loops
  ],

  energyBudget: 14,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: false // But highly recommended!
  },

  // Test cases requiring systematic troubleshooting
  testCases: [
    {
      id: 'test-01',
      name: 'Clear Error Message',
      input: 'I\'m getting error: "Invalid API key". How do I fix this?',
      expectedBehavior: 'Recognize clear error, provide direct fix: check API key validity, regenerate if needed',
      difficulty: 'easy',
      reasoning: 'Clear error message - straightforward diagnosis and solution'
    },
    {
      id: 'test-02',
      name: 'Vague Performance Issue',
      input: 'The app is really slow today. What\'s wrong?',
      expectedBehavior: 'Ask: which feature? Check: server status, user load, recent changes',
      difficulty: 'medium',
      reasoning: 'Vague symptom needs systematic investigation to narrow down root cause'
    },
    {
      id: 'test-03',
      name: 'Intermittent Problem',
      input: 'Sometimes my API calls work, sometimes they fail with timeout. Why?',
      expectedBehavior: 'Check: rate limits, network issues, server load patterns, timeout settings',
      difficulty: 'hard',
      reasoning: 'Intermittent = hard to diagnose. Needs multiple checks and correlation'
    },
    {
      id: 'test-04',
      name: 'Multiple Possible Causes',
      input: 'Users can\'t log in. Some see "invalid password", others see "account locked".',
      expectedBehavior: 'Recognize multiple issues: 1) Password resets needed, 2) Account security triggers. Diagnose both.',
      difficulty: 'hard',
      reasoning: 'Multiple simultaneous issues require parallel investigation'
    },
    {
      id: 'test-05',
      name: 'Complex System Failure',
      input: 'After deploying our update, 30% of API calls are failing but the rest work fine.',
      expectedBehavior: 'Systematic diagnosis: Check deployment, config changes, affected endpoints, error logs, rollback options',
      difficulty: 'hard',
      reasoning: 'Production incident - needs careful systematic approach across multiple data sources'
    }
  ],

  // Success criteria - difficult level
  successCriteria: {
    accuracy: 80,
    maxLatency: 6000,
    maxCost: 3.00
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 70,
    star2: 80,
    star3: 90
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [],
    mustNotInclude: [],
    minCards: 5,
    maxCards: 18,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'ReAct framework is essential for multi-step troubleshooting',
    'Detailed context with troubleshooting methodology helps agent structure its approach',
    'Tests 2-5: Need database, logs, and search to gather diagnostic data',
    'Cascade safety guardrail prevents agent from getting stuck in loops',
    'Cost limiter protects against expensive runaway investigations'
  ],

  learningPoint: `Troubleshooting is where agentic AI shines. Unlike simple Q&A, troubleshooting requires:
forming hypotheses, testing them systematically, correlating findings, and synthesizing solutions. The ReAct
framework combined with multiple diagnostic tools creates a powerful troubleshooting system. But remember:
guardrails matter! Cascade safety prevents infinite loops, and cost limiters prevent expensive runaway agents.
Production agents need BOTH capability AND safety.`,

  previousLevel: 7 // Must complete Level 7 first
};
