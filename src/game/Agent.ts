import type { ICard, ITestCase, IBoard } from './types';

export interface EvaluationResult {
  success: boolean;
  reason: string;
  cost: number;
  latency: number;
  reasoning: string[];
}

export class Agent {
  context: ICard | null;
  model: ICard | null;
  tools: ICard | null;
  framework: ICard | null;
  guardrails: ICard | null;

  constructor(board: IBoard) {
    this.context = board.context.card;
    this.model = board.model.card;
    this.tools = board.tools.card;
    this.framework = board.framework.card;
    this.guardrails = board.guardrails.card;
  }

  evaluate(testCase: ITestCase): EvaluationResult {
    const reasoning: string[] = [];
    let success = false;
    let reason = '';
    let cost = 0;
    let latency = 0;

    // Calculate base cost and latency from cards
    if (this.context) cost += this.context.energyCost;
    if (this.model) {
      cost += this.model.energyCost;
      // Model affects latency
      if (this.model.id === 'model-gpt4') {
        latency += 1500;
      } else if (this.model.id === 'model-gpt35') {
        latency += 800;
      } else {
        latency += 1000;
      }
    }
    if (this.tools) cost += this.tools.energyCost;
    if (this.framework) cost += this.framework.energyCost;
    if (this.guardrails) cost += this.guardrails.energyCost;

    // Validation: must have required components
    if (!this.context || !this.model) {
      return {
        success: false,
        reason: 'Missing required components (Context and Model)',
        cost: 0,
        latency: 0,
        reasoning: ['Agent configuration incomplete - context and model are required'],
      };
    }

    reasoning.push(`Using ${this.model.name} with ${this.context.name}`);

    // Evaluate based on test case difficulty and agent configuration
    const difficulty = testCase.difficulty;

    // Easy cases: should mostly succeed with basic setup
    if (difficulty === 'easy') {
      reasoning.push('Test case is straightforward');

      if (this.context.id === 'context-basic' || this.context.id === 'context-detailed') {
        reasoning.push('Context is appropriate for simple queries');
        success = true;
        reason = 'Agent handled the query correctly with appropriate context';
      } else {
        reasoning.push('Context might be overkill but works');
        success = true;
        reason = 'Agent handled the query, though simpler context would suffice';
      }
    }

    // Medium cases: need better components
    else if (difficulty === 'medium') {
      reasoning.push('Test case requires more sophisticated handling');

      // Check for data access needs (Level 2+)
      const needsDataAccess = testCase.input?.toLowerCase().includes('account') ||
                             testCase.input?.toLowerCase().includes('balance') ||
                             testCase.input?.toLowerCase().includes('order') ||
                             testCase.input?.toLowerCase().includes('transaction');

      if (needsDataAccess && !this.tools) {
        reasoning.push('Query requires data access but no tools available');
        success = false;
        reason = 'Customer data queries need database tool for accuracy';
      } else if (this.context.id === 'context-basic') {
        reasoning.push('Basic context insufficient for nuanced query');
        // Can sometimes succeed with tools
        if (this.tools) {
          success = Math.random() > 0.4; // 60% success with tools
          reason = success
            ? 'Tools helped compensate for basic context'
            : 'Query needed better context in addition to tools';
        } else {
          success = false;
          reason = 'Query too complex for basic context - needs more detailed instructions';
        }
      } else if (this.context.id === 'context-detailed' || this.context.id === 'context-chain-of-thought') {
        reasoning.push('Good context helps with complexity');

        // Check if tools would help
        if (this.tools) {
          reasoning.push(`${this.tools.name} provides additional capability`);
          success = true;
          reason = 'Agent handled complex query with strong context and tools';
          latency += 300; // Tools add latency
        } else {
          // Can still succeed with good context alone for some cases
          success = Math.random() > 0.3; // 70% success rate
          reason = success
            ? 'Agent handled query with strong context'
            : 'Query would benefit from tool support';
        }
      }
    }

    // Hard cases: need optimal setup or guardrails
    else if (difficulty === 'hard') {
      reasoning.push('Test case is challenging - likely an edge case or sensitive query');

      // Check for specific edge cases
      const isCompetitiveQuery = testCase.input?.toLowerCase().includes('competitor') ||
                                 testCase.input?.toLowerCase().includes('better than');
      const isSensitiveInfoRequest = testCase.input?.toLowerCase().includes('password') ||
                                     testCase.input?.toLowerCase().includes('credit card') ||
                                     testCase.input?.toLowerCase().includes('ssn');
      const isSecurityIssue = testCase.input?.toLowerCase().includes('locked') ||
                             testCase.input?.toLowerCase().includes('security') ||
                             testCase.input?.toLowerCase().includes('breach');

      if (isCompetitiveQuery || isSensitiveInfoRequest) {
        const queryType = isSensitiveInfoRequest ? 'sensitive information request' : 'competitive/comparison query';
        reasoning.push(`Detected ${queryType} - needs careful handling`);

        // Guardrails are critical for these types of questions
        if (this.guardrails) {
          reasoning.push(`${this.guardrails.name} ensures appropriate response`);
          success = true;
          reason = `Agent handled ${queryType} appropriately with guardrails`;
        } else {
          reasoning.push(`No guardrails - risk of ${isSensitiveInfoRequest ? 'security breach' : 'inappropriate claims'}`);
          // Without guardrails, even good models might fail
          success = this.model.id === 'model-gpt4' && Math.random() > 0.5;
          reason = success
            ? 'Model handled query carefully, but guardrails would be safer'
            : `Query needed guardrails to prevent ${isSensitiveInfoRequest ? 'information disclosure' : 'inappropriate claims'}`;
        }
      } else if (isSecurityIssue) {
        // Security issues need detailed context and ideally tools for checking status
        reasoning.push('Security-related query needs comprehensive handling');

        if (this.context.id !== 'context-detailed' && this.context.id !== 'context-chain-of-thought') {
          reasoning.push('Insufficient context for security scenario');
          success = false;
          reason = 'Security issues require detailed context with clear policies';
        } else {
          reasoning.push('Detailed context provides security policy guidance');

          if (this.tools) {
            reasoning.push(`${this.tools.name} can check account status`);
            success = true;
            reason = 'Agent handled security issue with proper context and tools';
            latency += 400;
          } else {
            success = Math.random() > 0.4; // 60% without tools
            reason = success
              ? 'Agent handled security scenario with strong context'
              : 'Security cases benefit from tools for status verification';
          }
        }
      } else {
        // Other hard cases - need detailed context
        if (this.context.id !== 'context-detailed') {
          reasoning.push('Insufficient context for complex edge case');
          success = false;
          reason = 'Edge case requires comprehensive context';
        } else {
          reasoning.push('Detailed context provides good foundation');

          // Need tools for hard cases
          if (!this.tools) {
            // Without tools, can still succeed with good setup
            success = Math.random() > 0.4; // 60% success rate
            reason = success
              ? 'Agent handled edge case with strong context'
              : 'Hard cases benefit from tool support';
          } else {
            reasoning.push(`${this.tools.name} enables sophisticated handling`);
            latency += 500; // Complex operations take longer

            // Check for framework - helps with hard cases
            if (this.framework) {
              reasoning.push(`${this.framework.name} provides structure`);
              success = true;
              reason = 'Agent successfully handled edge case with proper architecture';
              latency += 200; // Framework adds slight latency
            } else {
              // Can still succeed but less likely
              success = Math.random() > 0.5; // 50% success rate
              reason = success
                ? 'Agent handled edge case, though framework would improve reliability'
                : 'Edge case needed framework for consistent handling';
            }
          }
        }
      }
    }

    // Guardrails check - affects reliability but adds latency
    if (this.guardrails) {
      reasoning.push(`${this.guardrails.name} ensures safe responses`);
      latency += 150;
      // Guardrails can catch edge cases that would otherwise fail
      if (!success && Math.random() > 0.3) {
        success = true;
        reason = 'Guardrails caught potential issue and ensured correct response';
        reasoning.push('Guardrails prevented failure');
      }
    }

    // Model quality affects success rate
    if (this.model.id === 'model-gpt4' && !success) {
      // GPT-4 can sometimes salvage situations
      if (Math.random() > 0.6) {
        success = true;
        reason = 'Advanced model compensated for suboptimal configuration';
        reasoning.push('Model capability helped overcome limitations');
      }
    }

    return {
      success,
      reason,
      cost,
      latency,
      reasoning,
    };
  }

  // Calculate total cost of the agent
  getTotalCost(): number {
    let cost = 0;
    if (this.context) cost += this.context.energyCost;
    if (this.model) cost += this.model.energyCost;
    if (this.tools) cost += this.tools.energyCost;
    if (this.framework) cost += this.framework.energyCost;
    if (this.guardrails) cost += this.guardrails.energyCost;
    return cost;
  }

  // Get agent summary for display
  getSummary(): string {
    const parts: string[] = [];
    if (this.context) parts.push(this.context.name);
    if (this.model) parts.push(this.model.name);
    if (this.tools) parts.push(this.tools.name);
    if (this.framework) parts.push(this.framework.name);
    if (this.guardrails) parts.push(this.guardrails.name);
    return parts.join(' + ');
  }
}
