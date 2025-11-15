import type { LevelDefinition } from '../types';

export const level10: LevelDefinition = {
  id: 'level-10',
  number: 10,
  title: 'MCP Integration',
  difficulty: 'hard',
  learningPath: ['production-engineer'], // Production path focus

  scenario: `Production reality check: You're integrating with Stripe, Slack, S sendGrid, customer DB,
analytics, and 5 other services. Each has unique auth, rate limits, and error codes. Managing this directly
is a nightmare. MCP standardizes everything. This level shows why standards matter at scale and how to
build maintainable systems.`,

  learningObjectives: [
    'Master Model Context Protocol (MCP)',
    'Build scalable tool integrations',
    'Handle enterprise-scale complexity',
    'Design for long-term maintainability'
  ],

  // Full production stack
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
    'tool-mcp-interface', // CRITICAL for this level
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check',
    'guardrail-cost-limit',
    'guardrail-cascade-safety',
    'guardrail-audit-trail' // NEW: For compliance
  ],

  energyBudget: 16,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: true // Guardrails becoming essential at this scale
  },

  // Enterprise-scale test cases
  testCases: [
    {
      id: 'test-01',
      name: 'Simple Integration',
      input: 'Send a welcome email to customer@example.com',
      expectedBehavior: 'Use MCP to call email service with proper parameters',
      difficulty: 'easy',
      reasoning: 'Basic MCP usage - standardized interface makes this clean'
    },
    {
      id: 'test-02',
      name: 'Multi-Service Workflow',
      input: 'Customer #12345 upgraded to Pro. Update DB, charge card, send confirmation, notify team.',
      expectedBehavior: 'Orchestrate: DB update → Payment → Email → Slack notification',
      difficulty: 'medium',
      reasoning: 'Multi-service coordination - MCP standardizes all tool calls'
    },
    {
      id: 'test-03',
      name: 'Error Recovery',
      input: 'Process order, but payment service is down. What happens?',
      expectedBehavior: 'Detect payment failure, don\'t finalize order, notify user, log for retry',
      difficulty: 'hard',
      reasoning: 'Error handling critical - MCP provides standardized error responses'
    },
    {
      id: 'test-04',
      name: 'Rate Limit Handling',
      input: 'Send notifications to 100 customers about service update',
      expectedBehavior: 'Respect rate limits, batch requests, handle throttling gracefully',
      difficulty: 'hard',
      reasoning: 'Production constraints - MCP abstracts rate limiting complexity'
    },
    {
      id: 'test-05',
      name: 'Complex Enterprise Flow',
      input: 'Customer reports billing issue. Investigate charges, check payment history, verify account, process refund if valid.',
      expectedBehavior: 'Multi-step investigation using 4+ tools, proper error handling, audit trail',
      difficulty: 'hard',
      reasoning: 'Full enterprise workflow - MCP + guardrails + agents = maintainable system'
    }
  ],

  // Success criteria - production grade
  successCriteria: {
    accuracy: 85,
    maxLatency: 6000,
    maxCost: 3.50
  },

  // Scoring thresholds
  scoringThresholds: {
    star1: 70,
    star2: 85,
    star3: 95
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: ['tool-mcp-interface'], // MCP required
    mustNotInclude: [],
    minCards: 6,
    maxCards: 20,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'MCP is required for this level - it\'s the only way to handle this complexity',
    'Audit trail guardrail is important for enterprise compliance',
    'Cascade safety prevents failures from cascading across services',
    'ReAct framework + MCP = robust multi-service orchestration',
    'Cost limiter protects against expensive service call runaway'
  ],

  learningPoint: `MCP isn't just about convenience - it's about building systems that scale and maintain.
When you're coordinating 10+ services, each with unique quirks, a standardized interface is the difference
between maintainable code and technical debt. MCP provides: 1) Consistent error handling, 2) Standard auth
patterns, 3) Rate limit abstractions, 4) Uniform logging, 5) Easy service swapping. The upfront cost of
MCP integration pays back exponentially as your system grows. This is production-grade architecture.`,

  previousLevel: 9 // Must complete Level 9 first
};
