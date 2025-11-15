import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Bot, Rocket } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { LearningPath, PathId } from '../types/game';

interface PathSelectScreenProps {
  onBack: () => void;
  onSelectPath: (pathId: PathId) => void;
}

const learningPaths: LearningPath[] = [
  {
    id: 'beginner',
    name: 'Beginner Architect',
    description: 'Learn the fundamentals: Context, models, and basic tools',
    icon: 'BookOpen',
    color: 'from-blue-500 to-cyan-500',
    levels: [1, 2, 3],
  },
  {
    id: 'rag',
    name: 'RAG Specialist',
    description: 'Master retrieval strategies and data sources',
    icon: 'Search',
    color: 'from-green-500 to-emerald-500',
    levels: [4, 5, 6],
  },
  {
    id: 'agentic',
    name: 'Agentic Developer',
    description: 'Build with frameworks and tool orchestration',
    icon: 'Bot',
    color: 'from-purple-500 to-pink-500',
    levels: [7, 8, 9],
  },
  {
    id: 'production',
    name: 'Production Engineer',
    description: 'Optimize for cost, performance, and scale',
    icon: 'Rocket',
    color: 'from-orange-500 to-red-500',
    levels: [10, 11, 12],
  },
];

const iconMap = {
  BookOpen,
  Search,
  Bot,
  Rocket,
};

export const PathSelectScreen: React.FC<PathSelectScreenProps> = ({ onBack, onSelectPath }) => {
  const { progress } = useGameStore();

  const handlePathClick = (pathId: PathId) => {
    onSelectPath(pathId);
  };

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
        <h1 className="text-5xl font-bold text-white mb-4">Choose Your Path</h1>
        <p className="text-xl text-purple-200">
          Select a learning path to begin your journey
        </p>
      </motion.div>

      {/* Path Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
      >
        {learningPaths.map((path, index) => {
          const Icon = iconMap[path.icon as keyof typeof iconMap];
          const completedLevels = path.levels.filter((levelId) =>
            progress.completedLevels.includes(levelId)
          ).length;
          const totalLevels = path.levels.length;

          return (
            <motion.button
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePathClick(path.id)}
              className="relative bg-white/10 backdrop-blur-sm border-2 border-white/20
                         hover:bg-white/20 hover:border-white/40 rounded-xl p-6
                         text-left transition-all duration-200 overflow-hidden group"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0
                           group-hover:opacity-20 transition-opacity duration-200`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${path.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-white/80 text-sm">
                    {completedLevels}/{totalLevels} completed
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{path.name}</h3>
                <p className="text-white/80 mb-4">{path.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${path.color} transition-all duration-300`}
                    style={{ width: `${(completedLevels / totalLevels) * 100}%` }}
                  />
                </div>
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
          Complete levels to unlock new challenges and master AI system design
        </p>
      </motion.div>
    </div>
  );
};
