/**
 * Scoring Type Definitions
 * Covers all scoring, evaluation, and test result types
 */

// Score breakdown by category
export interface ScoreBreakdown {
  accuracy: number;      // 0-30 points
  efficiency: number;    // 0-20 points
  bestPractices: number; // 0-30 points
  robustness: number;    // 0-20 points
  total: number;         // 0-100 points
}

// Individual test case result
export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  feedback: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Complete evaluation result
export interface EvaluationResult {
  passed: boolean;
  score: ScoreBreakdown;
  stars: number; // 0-3
  feedback: string[];
  testResults: TestCaseResult[];
  timeElapsed?: number; // seconds
  energyUsed?: number;
}

// Performance metrics
export interface PerformanceMetrics {
  latency: number;       // milliseconds
  cost: number;          // dollar amount or energy units
  accuracy: number;      // percentage (0-100)
  passRate: number;      // percentage of tests passed (0-100)
}

// Star rating thresholds
export interface StarThresholds {
  star1: number; // Minimum score for 1 star
  star2: number; // Minimum score for 2 stars
  star3: number; // Minimum score for 3 stars
}

// Helper function to calculate star rating from score
export function calculateStars(score: number, thresholds: StarThresholds): 0 | 1 | 2 | 3 {
  if (score >= thresholds.star3) return 3;
  if (score >= thresholds.star2) return 2;
  if (score >= thresholds.star1) return 1;
  return 0;
}

// Helper function to check if evaluation passed
export function evaluationPassed(result: EvaluationResult): boolean {
  return result.passed && result.stars >= 1;
}

// Helper function to calculate pass rate
export function calculatePassRate(results: TestCaseResult[]): number {
  if (results.length === 0) return 0;
  const passed = results.filter(r => r.passed).length;
  return (passed / results.length) * 100;
}
