import type { LevelDefinition } from '../types';

export const level11: LevelDefinition = {
  id: 'level-11',
  number: 11,
  title: 'Cost Optimization',
  difficulty: 'hard',
  learningPath: ['production-engineer'], // Production focus

  scenario: `CFO's challenge: "Our AI costs are $50k/month! Optimize without sacrificing quality."
Welcome to the hardest constraint in production AI: balancing cost, performance, and accuracy. You can't
just throw GPT-4 at everything. You need smart routing, caching strategies, and efficient designs.
This level tests your ability to maximize value under strict budget constraints.`,

  learningObjectives: [
    'Master cost-conscious AI design',
    'Learn smart model routing strategies',
    'Optimize retrieval and token usage',
    'Balance quality and efficiency'
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
    'tool-mcp-interface',
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check',
    'guardrail-cost-limit', // CRITICAL: Enforce budget
    'guardrail-cascade-safety',
    'guardrail-audit-trail'
  ],

  energyBudget: 10, // TIGHT budget - forces optimization

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: false,
    framework: true,
    guardrails: true // Cost limiter is essential
  },

  // Test cases with cost pressure
  testCases: [
    {
      id: 'test-01',
      name: 'Simple FAQ (High Volume)',
      input: 'What are your business hours?',
      expectedBehavior: 'Fast, cheap answer - don\'t over-engineer',
      difficulty: 'easy',
      reasoning: 'Simple query → lightweight model + basic context = optimal cost/quality'
    },
    {
      id: 'test-02',
      name: 'Medium Complexity Query',
      input: 'Can I return an item after 30 days if it\'s defective?',
      expectedBehavior: 'Accurate answer to policy edge case',
      difficulty: 'medium',
      reasoning: 'Needs accuracy but not GPT-4 - GPT-3.5 with good context works'
    },
    {
      id: 'test-03',
      name: 'Complex But Cacheable',
      input: 'Explain your refund policy in detail',
      expectedBehavior: 'Detailed answer - but this should be cached for repeat queries',
      difficulty: 'medium',
      reasoning: 'Complex response, but static content should be cached to save costs'
    },
    {
      id: 'test-04',
      name: 'Requires Strong Reasoning',
      input: 'I bought item A with discount code X, then returned item B. How much refund do I get?',
      expectedBehavior: 'Complex calculation - needs reasoning but must stay under budget',
      difficulty: 'hard',
      reasoning: 'Needs GPT-4 OR code execution - choose cost-effective reasoning method'
    },
    {
      id: 'test-05',
      name: 'Batch Processing Scenario',
      input: 'Process 50 customer queries about order status',
      expectedBehavior: 'Use lightweight model + database, avoid expensive models/searches',
      difficulty: 'hard',
      reasoning: 'High volume = cost multiplier. Optimize per-query cost aggressively'
    }
  ],

  // Success criteria - cost is the primary constraint
  successCriteria: {
    accuracy: 80, // Slight accuracy trade-off acceptable
    maxLatency: 4000,
    maxCost: 0.80 // VERY tight cost budget
  },

  // Scoring thresholds - cost weighted heavily
  scoringThresholds: {
    star1: 65,
    star2: 80,
    star3: 92 // Hard to get 3 stars - need perfect cost optimization
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: ['guardrail-cost-limit'], // Cost limiter required
    mustNotInclude: [],
    minCards: 4,
    maxCards: 20,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Test 1: Basic context + lightweight model (Haiku) = cheapest solution',
    'Tests 2-3: GPT-3.5 is the sweet spot - good enough + much cheaper than GPT-4',
    'Test 4: Code execution is cheaper than GPT-4 for math!',
    'Test 5: Keyword search + database + lightweight model = optimal for high volume',
    'Energy budget is tight - every energy point matters!'
  ],

  learningPoint: `Cost optimization is WHERE AI engineering separates from AI prototyping. The key insights:
1) Use the cheapest model that meets requirements (not the best model available)
2) Code execution is free compared to GPT-4 reasoning
3) Keyword search is 10x cheaper than semantic search
4) Basic context is often good enough
5) Batch operations must use lightweight models

In production, cost per query matters as much as accuracy. A 95% accurate system that costs $5/query loses
to a 90% accurate system that costs $0.10/query. The real skill: maximizing value within budget constraints.`,

  previousLevel: 10 // Must complete Level 10 first
};
