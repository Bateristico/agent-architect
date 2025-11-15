import { Agent, type EvaluationResult } from './Agent';
import type { ITestCase, ILevel, IBoard } from './types';

export interface TestCaseResult {
  testCase: ITestCase;
  evaluation: EvaluationResult;
}

export interface LevelResult {
  testCaseResults: TestCaseResult[];
  accuracyScore: number; // 0-30
  efficiencyScore: number; // 0-20
  bestPracticesScore: number; // 0-30
  robustnessScore: number; // 0-20
  totalScore: number; // 0-100
  stars: number; // 1-3
  feedback: string[];
}

export class GameSimulator {
  // Run all test cases for an agent
  static runTestCases(agent: Agent, testCases: ITestCase[]): TestCaseResult[] {
    return testCases.map((testCase) => ({
      testCase,
      evaluation: agent.evaluate(testCase),
    }));
  }

  // Run a complete level and calculate scores
  static runLevel(agent: Agent, level: ILevel, board: IBoard): LevelResult {
    // Run all test cases
    const testCaseResults = this.runTestCases(agent, level.testCases);

    // Calculate metrics
    const totalTests = testCaseResults.length;
    const passedTests = testCaseResults.filter((r) => r.evaluation.success).length;
    const accuracyPercentage = (passedTests / totalTests) * 100;

    const avgLatency =
      testCaseResults.reduce((sum, r) => sum + r.evaluation.latency, 0) / totalTests;
    const avgCost =
      testCaseResults.reduce((sum, r) => sum + r.evaluation.cost, 0) / totalTests;

    const feedback: string[] = [];

    // 1. Accuracy Score (0-30 points)
    let accuracyScore = 0;
    if (accuracyPercentage >= level.successCriteria.accuracy) {
      accuracyScore = 30;
      feedback.push(`✓ Excellent accuracy: ${accuracyPercentage.toFixed(0)}%`);
    } else if (accuracyPercentage >= level.successCriteria.accuracy - 10) {
      accuracyScore = 20;
      feedback.push(`✓ Good accuracy: ${accuracyPercentage.toFixed(0)}%`);
    } else if (accuracyPercentage >= level.successCriteria.accuracy - 20) {
      accuracyScore = 10;
      feedback.push(`⚠ Acceptable accuracy: ${accuracyPercentage.toFixed(0)}%`);
    } else {
      accuracyScore = 5;
      feedback.push(`✗ Low accuracy: ${accuracyPercentage.toFixed(0)}% (target: ${level.successCriteria.accuracy}%)`);
    }

    // 2. Efficiency Score (0-20 points) - based on latency and cost
    let efficiencyScore = 10; // Base score

    // Latency check
    if (level.successCriteria.maxLatency) {
      if (avgLatency <= level.successCriteria.maxLatency) {
        efficiencyScore += 5;
        feedback.push(`✓ Fast response time: ${avgLatency.toFixed(0)}ms`);
      } else if (avgLatency <= level.successCriteria.maxLatency * 1.5) {
        efficiencyScore += 2;
        feedback.push(`⚠ Acceptable latency: ${avgLatency.toFixed(0)}ms`);
      } else {
        feedback.push(`✗ Slow response: ${avgLatency.toFixed(0)}ms (target: <${level.successCriteria.maxLatency}ms)`);
      }
    }

    // Cost check
    if (level.successCriteria.maxCost) {
      if (avgCost <= level.successCriteria.maxCost) {
        efficiencyScore += 5;
        feedback.push(`✓ Cost-effective: ${avgCost.toFixed(1)} energy/query`);
      } else if (avgCost <= level.successCriteria.maxCost * 1.5) {
        efficiencyScore += 2;
        feedback.push(`⚠ Acceptable cost: ${avgCost.toFixed(1)} energy/query`);
      } else {
        feedback.push(`✗ Expensive: ${avgCost.toFixed(1)} energy/query (target: <${level.successCriteria.maxCost})`);
      }
    }

    // 3. Best Practices Score (0-30 points)
    let bestPracticesScore = 0;

    // Check if context is appropriate
    const hasContext = board.context.card !== null;
    const hasModel = board.model.card !== null;

    if (hasContext && hasModel) {
      bestPracticesScore += 10;
      feedback.push('✓ Required components configured');
    }

    // Check if optional components are used wisely
    const hasTools = board.tools.card !== null;
    const hasFramework = board.framework.card !== null;
    const hasGuardrails = board.guardrails.card !== null;

    // Tools are good for medium/hard cases
    const hasComplexCases = level.testCases.some(
      (tc) => tc.difficulty === 'medium' || tc.difficulty === 'hard'
    );
    if (hasComplexCases && hasTools) {
      bestPracticesScore += 7;
      feedback.push('✓ Tools added for complex queries');
    } else if (hasComplexCases && !hasTools) {
      feedback.push('⚠ Consider adding tools for complex queries');
    }

    // Framework helps with structure
    if (hasFramework) {
      bestPracticesScore += 7;
      feedback.push('✓ Framework provides structure');
    }

    // Guardrails are important for production
    if (hasGuardrails) {
      bestPracticesScore += 6;
      feedback.push('✓ Guardrails ensure safety');
    } else {
      feedback.push('⚠ Consider adding guardrails for production use');
    }

    // 4. Robustness Score (0-20 points)
    let robustnessScore = 0;

    // Check performance across different difficulty levels
    const easyTests = testCaseResults.filter((r) => r.testCase.difficulty === 'easy');
    const mediumTests = testCaseResults.filter((r) => r.testCase.difficulty === 'medium');
    const hardTests = testCaseResults.filter((r) => r.testCase.difficulty === 'hard');

    const easySuccess = easyTests.length > 0 ? easyTests.filter((r) => r.evaluation.success).length / easyTests.length : 1;
    const mediumSuccess = mediumTests.length > 0 ? mediumTests.filter((r) => r.evaluation.success).length / mediumTests.length : 1;
    const hardSuccess = hardTests.length > 0 ? hardTests.filter((r) => r.evaluation.success).length / hardTests.length : 1;

    robustnessScore += Math.floor(easySuccess * 8);
    robustnessScore += Math.floor(mediumSuccess * 7);
    robustnessScore += Math.floor(hardSuccess * 5);

    if (easySuccess === 1 && mediumSuccess >= 0.5 && hardSuccess >= 0.5) {
      feedback.push('✓ Agent handles diverse cases well');
    } else if (easySuccess < 1) {
      feedback.push('✗ Agent struggles with basic cases');
    } else if (hardSuccess < 0.3) {
      feedback.push('⚠ Agent needs improvement on edge cases');
    }

    // Calculate total score
    const totalScore = accuracyScore + efficiencyScore + bestPracticesScore + robustnessScore;

    // Calculate stars (1-3)
    let stars = 1;
    if (totalScore >= 80) {
      stars = 3;
    } else if (totalScore >= 60) {
      stars = 2;
    }

    return {
      testCaseResults,
      accuracyScore,
      efficiencyScore,
      bestPracticesScore,
      robustnessScore,
      totalScore,
      stars,
      feedback,
    };
  }
}
