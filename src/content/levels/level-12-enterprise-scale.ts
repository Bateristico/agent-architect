import type { LevelDefinition } from '../types';

export const level12: LevelDefinition = {
  id: 'level-12',
  number: 12,
  title: 'Enterprise-Scale System',
  difficulty: 'hard',
  learningPath: ['production-engineer'], // Final boss level

  scenario: `The final challenge: Build a complete enterprise customer support system. Requirements:
- Handle billing, technical, and general inquiries
- Maintain 90%+ accuracy across all types
- Stay under budget ($2.50/query average)
- Sub-5s response time
- Full audit trail for compliance
- Graceful error handling

This is where everything comes together. You'll need optimal card choices, smart architecture,
and production-grade guardrails. Welcome to the final exam!`,

  learningObjectives: [
    'Integrate all previous concepts',
    'Design enterprise-grade systems',
    'Balance competing constraints',
    'Master the art of AI system architecture'
  ],

  // Full toolbox available
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
    'guardrail-cost-limit',
    'guardrail-cascade-safety',
    'guardrail-audit-trail'
  ],

  energyBudget: 18, // Generous but need to use wisely

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: true,
    framework: true,
    guardrails: true // Multiple guardrails recommended
  },

  // Comprehensive test suite
  testCases: [
    {
      id: 'test-01',
      name: 'Simple Billing Question',
      input: 'When will my next bill be charged?',
      expectedBehavior: 'Check account, provide next billing date - fast and accurate',
      difficulty: 'easy',
      reasoning: 'Straightforward DB lookup - optimize for speed and cost'
    },
    {
      id: 'test-02',
      name: 'Technical Troubleshooting',
      input: 'The API returns 500 errors when I try to update user records. Help!',
      expectedBehavior: 'Check API status, guide troubleshooting, provide solution or escalation',
      difficulty: 'medium',
      reasoning: 'Technical issue needs docs + systematic approach'
    },
    {
      id: 'test-03',
      name: 'Complex Billing Dispute',
      input: 'I was charged twice last month and the refund still hasn\'t appeared. This is unacceptable!',
      expectedBehavior: 'Check billing history, verify refund status, provide timeline, empathetic handling',
      difficulty: 'hard',
      reasoning: 'Multi-step investigation + customer service tone + accuracy required'
    },
    {
      id: 'test-04',
      name: 'Security-Sensitive Request',
      input: 'I forgot my password. Can you tell me what it was?',
      expectedBehavior: 'Refuse to share password, offer password reset process instead',
      difficulty: 'medium',
      reasoning: 'Security guardrails critical - must refuse appropriately'
    },
    {
      id: 'test-05',
      name: 'Multi-Domain Complex Query',
      input: 'I\'m on Enterprise plan, using the API heavily, and seeing timeouts. How do I optimize performance and will this affect my bill?',
      expectedBehavior: 'Address: 1) Technical performance, 2) API optimization, 3) Billing impact, 4) Plan details',
      difficulty: 'hard',
      reasoning: 'Hardest case: multiple domains (technical + billing + account) + optimization advice'
    },
    {
      id: 'test-06',
      name: 'Compliance Audit Scenario',
      input: 'We need a full record of all AI interactions with customer #12345 for SOC2 audit.',
      expectedBehavior: 'Use audit trail to provide complete interaction log with timestamps',
      difficulty: 'hard',
      reasoning: 'Enterprise requirement - audit trail guardrail is essential for this'
    },
    {
      id: 'test-07',
      name: 'Cost-Sensitive High-Volume',
      input: 'Process 100 "check order status" queries efficiently',
      expectedBehavior: 'Batch process with optimized model/tool selection for cost efficiency',
      difficulty: 'medium',
      reasoning: 'Volume scenario - cost optimization critical at scale'
    }
  ],

  // Success criteria - enterprise grade
  successCriteria: {
    accuracy: 90,
    maxLatency: 5000,
    maxCost: 2.50
  },

  // Scoring thresholds - highest bar
  scoringThresholds: {
    star1: 75,
    star2: 90,
    star3: 97 // Extremely difficult - need near-perfect design
  },

  // Solution constraints
  solutionConstraints: {
    mustInclude: [], // Player chooses the best approach
    mustNotInclude: [],
    minCards: 6,
    maxCards: 21,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'You need multi-source data: DB for accounts, search for docs, code for calculations',
    'Smart model routing: Haiku for simple, GPT-3.5 for medium, GPT-4 only when critical',
    'MCP standardizes multi-tool coordination - essential at this complexity',
    'Audit trail is required for test 6 - enterprise compliance demands it',
    'Cost limiter + cascade safety prevent expensive failures',
    'ReAct framework handles the complex multi-step scenarios best',
    'Detailed context with role instructions helps quality across diverse query types'
  ],

  learningPoint: `Congratulations! You've designed an enterprise-grade AI system. The key insights from this journey:

1. **Context Engineering**: The foundation - garbage in, garbage out
2. **Model Selection**: Use the cheapest model that meets requirements
3. **Retrieval Strategy**: Semantic for understanding, keyword for precision, hybrid for production
4. **Agentic Reasoning**: ReAct framework for complex multi-step scenarios
5. **Tool Orchestration**: MCP for clean, maintainable multi-service integration
6. **Guardrails**: Not optional - they're essential for production systems
7. **Cost Optimization**: Engineer for efficiency, not just capability
8. **System Thinking**: Balance competing constraints - no single "best" answer

Real AI system design is about tradeoffs. You've mastered the art of making intelligent tradeoffs that
deliver business value. This is the skill that separates AI engineers from AI enthusiasts. Well done!`,

  previousLevel: 11 // Must complete Level 11 first
};
