import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Star, CheckCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { getLevelsByPath } from '../content';
import type { PathId, Level } from '../types/game';

interface LevelSelectScreenProps {
  pathId: PathId;
  onBack: () => void;
  onSelectLevel: (levelId: number) => void;
}

// Mock level data for paths not yet implemented (will be replaced in future iterations)
const mockLevelData: Record<PathId, Level[]> = {
  'beginner-architect': [], // Uses actual content from getLevelsByPath
  'rag-specialist': [], // To be implemented
  'agentic-developer': [], // To be implemented
  'production-engineer': [], // To be implemented
};

const pathNames: Record<PathId, string> = {
  'beginner-architect': 'Beginner Architect',
  'rag-specialist': 'RAG Specialist',
  'agentic-developer': 'Agentic Developer',
  'production-engineer': 'Production Engineer',
};

const difficultyColors = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
};

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  pathId,
  onBack,
  onSelectLevel,
}) => {
  const { progress } = useGameStore();

  // Get actual levels from content system
  const contentLevels = getLevelsByPath(pathId);

  // Convert to Level format for UI
  const levels: Level[] = contentLevels.length > 0
    ? contentLevels.map(level => ({
        id: level.number,
        pathId: pathId,
        title: level.title,
        description: level.scenario.split('.')[0], // First sentence as description
        difficulty: level.difficulty,
        isUnlocked: progress.unlockedLevels.includes(level.number),
        isCompleted: progress.completedLevels.includes(level.number),
        stars: progress.levelStars[level.number] || 0,
      }))
    : mockLevelData[pathId] || [];

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Back</span>
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">{pathNames[pathId]}</h1>
        <p className="text-xl text-purple-200">Choose a level to begin</p>
      </motion.div>

      {/* Level Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full"
      >
        {levels.map((level, index) => {
          const isUnlocked = progress.unlockedLevels.includes(level.id);
          const isCompleted = progress.completedLevels.includes(level.id);
          const stars = progress.levelStars[level.id] || 0;

          return (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
              onClick={() => isUnlocked && onSelectLevel(level.id)}
              disabled={!isUnlocked}
              className={`relative bg-white/10 backdrop-blur-sm border-2 rounded-xl p-6
                         text-left transition-all duration-200
                         ${
                           isUnlocked
                             ? 'border-white/20 hover:bg-white/20 hover:border-white/40 cursor-pointer'
                             : 'border-white/10 opacity-50 cursor-not-allowed'
                         }`}
            >
              {/* Lock Icon for Locked Levels */}
              {!isUnlocked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-6 h-6 text-white/40" />
                </div>
              )}

              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              )}

              {/* Level Number */}
              <div className="text-purple-300 font-bold text-sm mb-2">LEVEL {level.id}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">{level.title}</h3>

              {/* Description */}
              <p className="text-white/80 text-sm mb-4">{level.description}</p>

              {/* Difficulty */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${difficultyColors[level.difficulty]}`}>
                  {level.difficulty.toUpperCase()}
                </span>

                {/* Stars */}
                {isUnlocked && (
                  <div className="flex gap-1">
                    {[1, 2, 3].map((starNum) => (
                      <Star
                        key={starNum}
                        className={`w-4 h-4 ${
                          starNum <= stars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Info Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-white/60 text-sm">
          Complete levels to earn stars and unlock new challenges
        </p>
      </motion.div>
    </div>
  );
};
