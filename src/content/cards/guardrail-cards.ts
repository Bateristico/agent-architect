import type { CardDefinition } from '../types';

export const guardrailCards: Record<string, CardDefinition> = {
  'guardrail-output-validator': {
    id: 'guardrail-output-validator',
    name: 'Output Validator',
    type: 'guardrail',
    energyCost: 1,
    description: 'Validates output format and content before returning to user. Catches malformed responses.',
    pros: [
      'Prevents bad outputs',
      'Ensures format compliance',
      'Catches errors early',
      'Low overhead'
    ],
    cons: [
      'Slight latency increase',
      'May reject valid responses',
      'Needs clear validation rules'
    ],
    bestFor: [
      'Structured outputs',
      'Format validation',
      'Safety-critical applications',
      'Quality assurance'
    ],
    avoidWhen: [
      'Free-form responses',
      'Speed is paramount',
      'Low-stakes scenarios'
    ],
    unlockLevel: 1
  },

  'guardrail-content-filter': {
    id: 'guardrail-content-filter',
    name: 'Content Filter',
    type: 'guardrail',
    energyCost: 1,
    description: 'Filters inappropriate or off-topic content. Ensures responses stay on-brand.',
    pros: [
      'Brand protection',
      'Safety compliance',
      'Topic enforcement',
      'Reputation management'
    ],
    cons: [
      'May be overly restrictive',
      'Adds latency',
      'False positives possible'
    ],
    bestFor: [
      'Customer-facing agents',
      'Brand-sensitive contexts',
      'Regulated industries',
      'Public applications'
    ],
    avoidWhen: [
      'Internal tools',
      'Speed critical',
      'Trusted environments'
    ],
    unlockLevel: 2
  },

  'guardrail-hallucination-check': {
    id: 'guardrail-hallucination-check',
    name: 'Hallucination Guard',
    type: 'guardrail',
    energyCost: 2,
    description: 'Verifies claims against source data. Catches hallucinated information.',
    pros: [
      'Reduces false information',
      'Increases accuracy',
      'Builds trust',
      'Critical for high-stakes'
    ],
    cons: [
      'Higher latency',
      'More expensive',
      'May reject correct answers',
      'Needs source verification'
    ],
    bestFor: [
      'Factual claims',
      'High-stakes decisions',
      'Regulated industries',
      'When accuracy is critical'
    ],
    avoidWhen: [
      'Creative tasks',
      'Opinion-based responses',
      'Speed is critical',
      'Low-stakes scenarios'
    ],
    unlockLevel: 4
  },

  'guardrail-cost-limit': {
    id: 'guardrail-cost-limit',
    name: 'Cost Limiter',
    type: 'guardrail',
    energyCost: 1,
    description: 'Enforces token and cost budgets. Prevents runaway costs.',
    pros: [
      'Prevents cost overruns',
      'Budget enforcement',
      'Predictable costs',
      'Essential for production'
    ],
    cons: [
      'May truncate responses',
      'Can limit functionality',
      'Needs careful tuning'
    ],
    bestFor: [
      'Cost-sensitive scenarios',
      'Production systems',
      'High-volume applications',
      'Budget constraints'
    ],
    avoidWhen: [
      'Cost is not a concern',
      'Quality over efficiency',
      'Prototyping phase'
    ],
    unlockLevel: 8
  },

  'guardrail-cascade-safety': {
    id: 'guardrail-cascade-safety',
    name: 'Cascade Safety',
    type: 'guardrail',
    energyCost: 2,
    description: 'Prevents infinite loops and cascading failures in agentic systems.',
    pros: [
      'Prevents infinite loops',
      'Catches cascading errors',
      'System stability',
      'Critical for agents'
    ],
    cons: [
      'May limit valid iterations',
      'Adds complexity',
      'Requires monitoring'
    ],
    bestFor: [
      'Agentic systems',
      'Tool-using agents',
      'Multi-step reasoning',
      'Production environments'
    ],
    avoidWhen: [
      'Simple sequential flows',
      'No loops possible',
      'Single-shot responses'
    ],
    unlockLevel: 8
  },

  'guardrail-audit-trail': {
    id: 'guardrail-audit-trail',
    name: 'Audit Trail',
    type: 'guardrail',
    energyCost: 1,
    description: 'Logs all decisions and actions for compliance and debugging.',
    pros: [
      'Full traceability',
      'Compliance support',
      'Debugging aid',
      'Accountability'
    ],
    cons: [
      'Storage overhead',
      'Slight latency',
      'Privacy concerns'
    ],
    bestFor: [
      'Regulated industries',
      'Compliance requirements',
      'Debugging complex systems',
      'Audit requirements'
    ],
    avoidWhen: [
      'Privacy-sensitive data',
      'Speed is critical',
      'No compliance needs'
    ],
    unlockLevel: 10
  }
};
