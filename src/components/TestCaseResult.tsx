import { motion } from 'framer-motion';
import { CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';
import type { TestCaseResult as ITestCaseResult } from '../game/GameSimulator';

interface TestCaseResultProps {
  result: ITestCaseResult;
  index: number;
}

export const TestCaseResult: React.FC<TestCaseResultProps> = ({ result, index }) => {
  const { testCase, evaluation } = result;
  const isSuccess = evaluation.success;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        bg-white/10 backdrop-blur-sm border-2 rounded-lg p-4 mb-4
        ${isSuccess ? 'border-green-400/50' : 'border-red-400/50'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isSuccess ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className={`font-bold ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
              {isSuccess ? 'PASSED' : 'FAILED'}
            </span>
            <span className="text-white/60 text-sm">
              ({testCase.difficulty.toUpperCase()})
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex gap-3 text-sm">
          <div className="flex items-center gap-1 text-yellow-300">
            <DollarSign className="w-4 h-4" />
            <span>{evaluation.cost.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-300">
            <Clock className="w-4 h-4" />
            <span>{evaluation.latency}ms</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mb-3">
        <div className="text-white/80 font-semibold text-sm mb-1">Input:</div>
        <div className="text-white bg-white/5 rounded p-2 text-sm">
          {testCase.input}
        </div>
      </div>

      {/* Expected Behavior */}
      <div className="mb-3">
        <div className="text-white/80 font-semibold text-sm mb-1">Expected:</div>
        <div className="text-white/90 bg-white/5 rounded p-2 text-sm">
          {testCase.expectedBehavior}
        </div>
      </div>

      {/* Reasoning Trace */}
      {evaluation.reasoning && evaluation.reasoning.length > 0 && (
        <div className="mb-3">
          <div className="text-white/80 font-semibold text-sm mb-1">Agent Reasoning:</div>
          <div className="bg-white/5 rounded p-2 space-y-1">
            {evaluation.reasoning.map((step, i) => (
              <div key={i} className="text-white/70 text-xs flex items-start gap-2">
                <span className="text-white/40">{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Reason */}
      <div>
        <div className="text-white/80 font-semibold text-sm mb-1">
          {isSuccess ? 'Success Reason:' : 'Failure Reason:'}
        </div>
        <div className={`rounded p-2 text-sm ${isSuccess ? 'bg-green-500/10 text-green-200' : 'bg-red-500/10 text-red-200'}`}>
          {evaluation.reason}
        </div>
      </div>
    </motion.div>
  );
};
