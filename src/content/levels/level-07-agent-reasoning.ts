import type { LevelDefinition } from '../types';

export const level07: LevelDefinition = {
  id: 'level-07',
  number: 7,
  title: 'Agent Reasoning',
  difficulty: 'hard',
  learningPath: ['agentic-developer'], // Agentic path starts focusing here

  scenario: `You're building an AI agent that handles complex customer issues. The challenge: customers
don't give you all the information upfront. The agent needs to REASON about what's missing, ASK clarifying
questions, TAKE ACTIONS, and ITERATE. Welcome to true agentic AI - this isn't just answering questions,
it's autonomous problem-solving!`,

  learningObjectives: [
    'Understand agentic reasoning patterns',
    'Learn when reasoning frameworks help',
    'Master tool-using behavior',
    'Handle multi-turn interactions'
  ],

  // Focus on reasoning frameworks
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
    'tool-code-execution', // NEW: Code execution for calculations
    'framework-sequential',
    'framework-chain-of-thought',
    'framework-react', // Key: ReAct for agent reasoning
    'guardrail-output-validator',
    'guardrail-content-filter',
    'guardrail-hallucination-check'
  ],

  energyBudget: 13,

  // Required slots
  requiredSlots: {
    context: true,
    model: true,
    tools: false,
    framework: true, // Framework is critical
    guardrails: false
  },

  // Test cases requiring reasoning
  testCases: [
    {
      id: 'test-01',
      name: 'Simple Math Problem',
      input: 'If I buy 3 items at $29.99 each, what\'s the total?',
      expectedBehavior: 'Calculate: 3 × $29.99 = $89.97',
      difficulty: 'easy',
      reasoning: 'Chain-of-thought or code execution - needs step-by-step calculation'
    },
    {
      id: 'test-02',
      name: 'Multi-Step Logic',
      input: 'I have a 20% discount code. What\'s my total for 3 items at $29.99 each?',
      expectedBehavior: 'Step 1: 3 × $29.99 = $89.97, Step 2: Apply 20% discount = $71.98',
      difficulty: 'medium',
      reasoning: 'Multi-step reasoning required - ReAct or Chain-of-Thought framework helps'
    },
    {
      id: 'test-03',
      name: 'Information Gathering',
      input: 'I want to return an item but I don\'t remember my order number.',
      expectedBehavior: 'Ask for alternative info: email, name, date of purchase to look up order',
      difficulty: 'medium',
      reasoning: 'Agent needs to recognize missing info and ask clarifying questions'
    },
    {
      id: 'test-04',
      name: 'Complex Investigation',
      input: 'My account shows a charge but I never received a confirmation email. What happened?',
      expectedBehavior: 'Step 1: Check account for charge. Step 2: Check email logs. Step 3: Determine issue and suggest fix',
      difficulty: 'hard',
      reasoning: 'Multi-step investigation - ReAct framework excels at this reasoning pattern'
    },
    {
      id: 'test-05',
      name: 'Ambiguous Request with Tool Use',
      input: 'Something is wrong with my subscription but I\'m not sure what.',
      expectedBehavior: 'Ask what symptoms, check subscription status, identify issue, propose solution',
      difficulty: 'hard',
      reasoning: 'Vague input needs systematic investigation - agent must reason through the process'
    }
  ],

  // Success criteria
  successCriteria: {
    accuracy: 85,
    maxLatency: 5000,
    maxCost: 2.50
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
    minCards: 3,
    maxCards: 16,
    hasValidSolution: true
  },

  // Hints
  hints: [
    'Test 1-2: Math problems benefit from chain-of-thought or code execution',
    'ReAct framework is designed for multi-step reasoning and tool use',
    'Tests 3-5: Agent needs to reason about what information is missing',
    'GPT-4 or strong models handle complex reasoning better than lightweight models',
    'Detailed context helps the agent understand its role and reasoning process'
  ],

  learningPoint: `True agentic behavior isn't just retrieving information - it's REASONING about problems,
identifying what's missing, taking actions, and iterating toward solutions. The ReAct framework (Reasoning + Acting)
is purpose-built for this. It allows agents to think step-by-step, use tools intelligently, and handle complex
multi-turn interactions. This is where AI goes from "smart search" to "autonomous assistant".`,

  previousLevel: 6 // Must complete Level 6 first (overlaps with RAG path)
};
