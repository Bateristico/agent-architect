import { motion } from 'framer-motion';
import { Star, RotateCcw, Home, ArrowRight, Target, Zap, Shield, TrendingUp } from 'lucide-react';
import type { LevelResult } from '../game/GameSimulator';
import type { ILevel } from '../game/types';

interface ResultsScreenProps {
  result: LevelResult;
  level: ILevel;
  onRetry: () => void;
  onNextLevel: () => void;
  onMainMenu: () => void;
  hasNextLevel: boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  level,
  onRetry,
  onNextLevel,
  onMainMenu,
  hasNextLevel,
}) => {
  const { stars, totalScore, accuracyScore, efficiencyScore, bestPracticesScore, robustnessScore, feedback } = result;

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Level Complete!
        </h1>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((star) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + star * 0.1, type: 'spring' }}
            >
              <Star
                className={`w-16 h-16 ${
                  star <= stars ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-2">{totalScore}</div>
          <div className="text-white/60 text-lg">out of 100 points</div>
        </div>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto w-full mb-8"
      >
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Score Breakdown</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Accuracy */}
            <ScoreCard
              icon={<Target className="w-6 h-6" />}
              label="Accuracy"
              score={accuracyScore}
              maxScore={30}
              color="text-green-400"
              delay={0.5}
            />

            {/* Efficiency */}
            <ScoreCard
              icon={<Zap className="w-6 h-6" />}
              label="Efficiency"
              score={efficiencyScore}
              maxScore={20}
              color="text-blue-400"
              delay={0.6}
            />

            {/* Best Practices */}
            <ScoreCard
              icon={<Shield className="w-6 h-6" />}
              label="Best Practices"
              score={bestPracticesScore}
              maxScore={30}
              color="text-purple-400"
              delay={0.7}
            />

            {/* Robustness */}
            <ScoreCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Robustness"
              score={robustnessScore}
              maxScore={20}
              color="text-orange-400"
              delay={0.8}
            />
          </div>

          {/* Feedback */}
          {feedback.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-3">Feedback</h3>
              <div className="space-y-2">
                {feedback.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="text-white/80 text-sm flex items-start gap-2"
                  >
                    <span className="text-white/40 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Learning Point */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="max-w-3xl mx-auto w-full mb-8"
      >
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-200 mb-3">💡 Key Learning</h3>
          <p className="text-white/90 text-lg">
            {getLearningPoint(level, stars, totalScore)}
          </p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Retry Level</span>
        </button>

        {hasNextLevel && stars >= 1 && (
          <button
            onClick={onNextLevel}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-colors"
          >
            <span>Next Level</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onMainMenu}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Main Menu</span>
        </button>
      </motion.div>
    </div>
  );
};

// Score Card Component
interface ScoreCardProps {
  icon: React.ReactNode;
  label: string;
  score: number;
  maxScore: number;
  color: string;
  delay: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ icon, label, score, maxScore, color, delay }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white/5 rounded-lg p-4"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={color}>{icon}</div>
        <div>
          <div className="text-white font-semibold">{label}</div>
          <div className="text-white/60 text-sm">
            {score} / {maxScore} pts
          </div>
        </div>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full ${color.replace('text-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

// Get learning point based on level and performance
function getLearningPoint(level: ILevel, stars: number, totalScore: number): string {
  // Default learning points based on level
  const defaultLearnings: Record<number, string> = {
    1: 'Context and model selection are the foundation of any AI agent. Even basic setup can handle simple queries effectively.',
  };

  // Performance-based learning
  if (stars === 3 && totalScore >= 90) {
    return defaultLearnings[level.id] || 'Excellent work! You\'ve mastered the optimal configuration for this scenario.';
  } else if (stars === 2) {
    return defaultLearnings[level.id] || 'Good job! Consider adding tools or guardrails to improve robustness and safety.';
  } else {
    return defaultLearnings[level.id] || 'Remember: matching your agent components to the use case complexity is key to success.';
  }
}
