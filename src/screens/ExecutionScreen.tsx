import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { TestCaseResult } from '../components/TestCaseResult';
import { Agent } from '../game/Agent';
import { GameSimulator, type TestCaseResult as ITestCaseResult, type LevelResult } from '../game/GameSimulator';
import type { IBoard, ILevel } from '../game/types';

interface ExecutionScreenProps {
  board: IBoard;
  level: ILevel;
  onComplete: (result: LevelResult) => void;
}

export const ExecutionScreen: React.FC<ExecutionScreenProps> = ({ board, level, onComplete }) => {
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState<ITestCaseResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Create agent from board
    const agent = new Agent(board);

    // Simulate running test cases one by one
    const runTests = async () => {
      for (let i = 0; i < level.testCases.length; i++) {
        // Wait a bit to simulate execution
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

        const testCase = level.testCases[i];
        const evaluation = agent.evaluate(testCase);

        setTestResults((prev) => [...prev, { testCase, evaluation }]);
        setCurrentTest(i + 1);
      }

      // All tests complete - calculate final result
      await new Promise((resolve) => setTimeout(resolve, 500));

      const finalResult = GameSimulator.runLevel(agent, level, board);
      setIsComplete(true);

      // Wait a moment before showing results
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onComplete(finalResult);
    };

    runTests();
  }, [board, level, onComplete]);

  const totalTests = level.testCases.length;
  const progress = (currentTest / totalTests) * 100;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Testing Your Agent
        </h1>
        <p className="text-white/60 text-center">
          Running test cases to evaluate performance...
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 max-w-2xl mx-auto w-full"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">
            Test Cases: {currentTest} / {totalTests}
          </span>
          <span className="text-white/60">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Test Results */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        {testResults.map((result, index) => (
          <TestCaseResult key={index} result={result} index={index} />
        ))}

        {/* Loading indicator for current test */}
        {!isComplete && currentTest < totalTests && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border-2 border-white/20 rounded-lg p-6 flex items-center justify-center gap-3"
          >
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <span className="text-white">
              Running test case {currentTest + 1}...
            </span>
          </motion.div>
        )}

        {/* Completion indicator */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-lg p-6 text-center"
          >
            <div className="text-2xl font-bold text-green-400 mb-2">
              All Tests Complete!
            </div>
            <div className="text-white/80">
              Calculating final score...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
