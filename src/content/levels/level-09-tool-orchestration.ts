import type { LevelDefinition } from '../types';

export const level09: LevelDefinition = {
  id: 'level-09',
  number: 9,
  title: 'Tool Orchestration',
  difficulty: 'hard',
  learningPath: ['agentic-developer', 'production-engineer'], // Bridge level

  scenario: `You're integrating with multiple third-party AI services - each with different interfaces,
error handling, and quirks. Without standardization, your code becomes a brittle mess of if-statements
and error handlers. Enter MCP (Model Context Protocol) - a standardized way to integrate tools.
This level teaches the value of abstractions and clean architecture.`,

  learningObjectives: [
    'Understand tool standardization benefits',
    'Learn when abstractions add value',
    'Master clean tool integration patterns',
    'Recognize brittleness in direct tool integration'
  ],

  // MCP Interface available
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
    'tool-mcp-interface', // KEY: MCP for standardized tool access
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react',
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check',
    'guardrail-cost-limit',
    'guardrail-cascade-safety'
  ],

  energyBudget: 15,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: false
  },

  // Test cases showing tool coordination
  testCases: [
    {
      id: 'test-01',
      name: 'Single Tool Task',
      input: 'Look up customer #12345 account status',
      expectedBehavior: 'Use database tool to fetch account status',
      difficulty: 'easy',
      reasoning: 'Single tool - MCP or direct access both work fine'
    },
    {
      id: 'test-02',
      name: 'Sequential Tool Use',
      input: 'Find customer #12345, check their order history, and summarize their activity',
      expectedBehavior: 'DB lookup → Order history query → Summarization',
      difficulty: 'medium',
      reasoning: 'Sequential tool use - MCP makes this cleaner but not strictly required'
    },
    {
      id: 'test-03',
      name: 'Tool Failure Handling',
      input: 'Get customer #99999 (doesn\'t exist) order status',
      expectedBehavior: 'Gracefully handle "customer not found" error without cascading failure',
      difficulty: 'medium',
      reasoning: 'Error handling matters - MCP standardizes error responses'
    },
    {
      id: 'test-04',
      name: 'Parallel Tool Coordination',
      input: 'I need account info from DB, product details from search, and pricing from calculator',
      expectedBehavior: 'Coordinate multiple tools, handle failures gracefully, synthesize results',
      difficulty: 'hard',
      reasoning: 'Multiple tools in parallel - MCP\'s standardized interface prevents brittle code'
    },
    {
      id: 'test-05',
      name: 'Complex Tool Chain with Fallbacks',
      input: 'Look up customer issue in KB. If not found, search web. If still unclear, escalate to human.',
      expectedBehavior: 'KB search → (if fails) web search → (if fails) escalation pathway',
      difficulty: 'hard',
      reasoning: 'Tool chaining with fallbacks - MCP makes this pattern clean and maintainable'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 85,
    maxLatency: 5500,
    maxCost: 3.00
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
    minCards: 5,
    maxCards: 19,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Tests 1-2: MCP helps but isn\'t strictly necessary for simple cases',
    'Test 3: Error handling is where MCP\'s standardization shines',
    'Tests 4-5: Complex tool coordination benefits massively from MCP',
    'ReAct framework + MCP = robust tool orchestration',
    'Cascade safety guardrail is critical when tools can fail'
  ],

  learningPoint: `Tool orchestration is where system design separates amateurs from professionals. Direct tool
integration works for prototypes but becomes brittle at scale. MCP provides a standardized interface that:
1) Simplifies error handling, 2) Enables tool composition, 3) Reduces coupling, 4) Improves maintainability.
Yes, it adds abstraction overhead - but that overhead pays dividends in production. The lesson: invest in
clean architecture early, especially when tools can fail or change.`,

  previousLevel: 8 // Must complete Level 8 first
};
