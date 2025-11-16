import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Bot, Rocket } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import type { LearningPath, PathId } from '../types/game';
import { PixiBackground } from '../components/PixiBackground';

interface PathSelectScreenProps {
  onBack: () => void;
  onSelectPath: (pathId: PathId) => void;
}

// Spring physics configuration for bouncy animations
const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20
};

const learningPaths: LearningPath[] = [
  {
    id: 'beginner-architect',
    name: 'Beginner Architect',
    description: 'Learn the fundamentals: Context, models, and basic tools',
    icon: 'BookOpen',
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(66, 165, 245, 0.8)',
    levels: [1, 2, 3],
  },
  {
    id: 'rag-specialist',
    name: 'RAG Specialist',
    description: 'Master retrieval strategies and data sources',
    icon: 'Search',
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.8)',
    levels: [4, 5, 6],
  },
  {
    id: 'agentic-developer',
    name: 'Agentic Developer',
    description: 'Build with frameworks and tool orchestration',
    icon: 'Bot',
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.8)',
    levels: [7, 8, 9],
  },
  {
    id: 'production-engineer',
    name: 'Production Engineer',
    description: 'Optimize for cost, performance, and scale',
    icon: 'Rocket',
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.8)',
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
    <div className="min-h-screen flex flex-col px-4 py-8 relative bg-[#1a1a2e]">
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10 flex flex-col">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springConfig }}
          className="mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500
                       rounded-xl px-6 py-3 text-white text-xl font-black uppercase
                       shadow-lg hover:shadow-2xl transition-all duration-200
                       border-4 border-white/30"
            style={{
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1
            className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tight"
            style={{
              color: '#FFA726',
              textShadow: `
                5px 5px 0 #000000,
                0 0 40px rgba(255, 167, 38, 0.8)
              `
            }}
          >
            Choose Your Path
          </h1>
          <p
            className="text-xl md:text-2xl font-bold tracking-wide uppercase"
            style={{
              color: '#FFFFFF',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 0 0 20px rgba(255, 255, 255, 0.5)'
            }}
          >
            Select a learning path to begin your journey
          </p>
        </motion.div>

        {/* Path Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto w-full mb-12"
        >
          {learningPaths.map((path, index) => {
            const Icon = iconMap[path.icon as keyof typeof iconMap];
            const completedLevels = path.levels.filter((levelId) =>
              progress.completedLevels.includes(levelId)
            ).length;
            const totalLevels = path.levels.length;

            return (
              <PathCard
                key={path.id}
                path={path}
                icon={Icon}
                completedLevels={completedLevels}
                totalLevels={totalLevels}
                index={index}
                onClick={() => handlePathClick(path.id)}
              />
            );
          })}
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p
            className="text-lg font-bold uppercase"
            style={{
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
            }}
          >
            Complete levels to unlock new challenges and master AI system design
          </p>
        </motion.div>
      </div>
    </div>
  );
};

interface PathCardProps {
  path: LearningPath & { glowColor: string };
  icon: React.ElementType;
  completedLevels: number;
  totalLevels: number;
  index: number;
  onClick: () => void;
}

const PathCard: React.FC<PathCardProps> = ({
  path,
  icon: Icon,
  completedLevels,
  totalLevels,
  index,
  onClick
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springConfig, delay: 0.3 + index * 0.1 }}
      whileHover={{
        scale: 1.05,
        y: -8,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm
                 rounded-2xl p-8 text-left overflow-hidden group
                 border-4 border-white/30 hover:border-white/50 transition-all duration-200"
      style={{
        boxShadow: `0 0 30px ${path.glowColor}40, inset 0 2px 10px rgba(255, 255, 255, 0.1)`,
      }}
    >
      {/* Animated gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0
                   group-hover:opacity-30 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon and Progress */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className={`p-4 rounded-xl bg-gradient-to-br ${path.color} shadow-lg`}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: `0 0 20px ${path.glowColor}, inset 0 2px 10px rgba(255, 255, 255, 0.3)`
            }}
          >
            <Icon className="w-10 h-10 text-white" />
          </motion.div>
          <div
            className="text-xl font-black uppercase px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border-2 border-white/30"
            style={{
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
            }}
          >
            {completedLevels}/{totalLevels}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-3xl md:text-4xl font-black mb-3 uppercase"
          style={{
            color: '#FFFFFF',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 0 0 15px rgba(255, 255, 255, 0.3)'
          }}
        >
          {path.name}
        </h3>

        {/* Description */}
        <p
          className="text-lg font-bold mb-6"
          style={{
            color: '#E0E0E0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 1)'
          }}
        >
          {path.description}
        </p>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-black/50 rounded-full h-4 border-2 border-white/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedLevels / totalLevels) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              className={`h-full bg-gradient-to-r ${path.color} relative`}
              style={{
                boxShadow: `0 0 10px ${path.glowColor}`
              }}
            >
              {/* Shine effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
          {/* Progress percentage text */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full text-sm font-black uppercase px-2 py-1 rounded bg-black/60 border border-white/30"
            style={{
              color: '#FFFFFF',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 1)'
            }}
          >
            {Math.round((completedLevels / totalLevels) * 100)}%
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <div className={`absolute inset-0 bg-gradient-to-br ${path.color} rounded-bl-full`} />
      </div>
    </motion.button>
  );
};
