import React from 'react';
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
    levels: [1, 2, 3],
  },
  {
    id: 'rag-specialist',
    name: 'RAG Specialist',
    description: 'Master retrieval strategies and data sources',
    icon: 'Search',
    color: 'from-green-500 to-emerald-500',
    levels: [4, 5, 6],
  },
  {
    id: 'agentic-developer',
    name: 'Agentic Developer',
    description: 'Build with frameworks and tool orchestration',
    icon: 'Bot',
    color: 'from-purple-500 to-pink-500',
    levels: [7, 8, 9],
  },
  {
    id: 'production-engineer',
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
    <div className="min-h-screen flex flex-col px-4 py-8 relative bg-[#2d1b3d]">
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Pixel grid background pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          zIndex: 0
        }}
      />

      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10 flex flex-col">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-[#2d1b3d] text-white text-sm font-bold uppercase
                       border-4 border-white font-['Press_Start_2P']"
            style={{
              boxShadow: '4px 4px 0px #000000',
              fontFamily: "'Press Start 2P', monospace",
              padding: '12px 20px',
              transition: 'all 100ms ease-out'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut", delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1
            className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight"
            style={{
              color: '#ffaa00',
              textShadow: '4px 4px 0px #000000, 0 0 10px #ffaa00',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            Choose Your Path
          </h1>
          <p
            className="text-xs md:text-sm font-bold tracking-wide uppercase"
            style={{
              color: '#FFFFFF',
              textShadow: '2px 2px 0px #000000',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            Select a learning path to begin
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
            className="text-xs font-bold uppercase"
            style={{
              color: '#d4a5f5',
              fontFamily: "'Silkscreen', monospace"
            }}
          >
            Complete levels to unlock new challenges
          </p>
        </motion.div>
      </div>
    </div>
  );
};

interface PathCardProps {
  path: LearningPath;
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
  const [isHovered, setIsHovered] = React.useState(false);

  // Get border color based on path
  const getBorderColor = () => {
    switch(path.id) {
      case 'beginner-architect': return '#00d9ff'; // context cyan
      case 'rag-specialist': return '#00ff88'; // guardrail green
      case 'agentic-developer': return '#ff00ff'; // model purple
      case 'production-engineer': return '#ffaa00'; // tool orange
      default: return '#ffffff';
    }
  };

  const borderColor = getBorderColor();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: "easeOut", delay: 0.3 + index * 0.1 }}
      whileHover={{
        scale: 1.05,
        y: -4,
        rotate: 1,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.08, ease: "easeIn" }
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-[#2d1b3d]/90 backdrop-blur-sm
                 p-6 text-left overflow-hidden group"
      style={{
        border: `4px solid ${borderColor}`,
        boxShadow: isHovered
          ? `6px 6px 0px #000000, 0 0 20px ${borderColor}`
          : `4px 4px 0px #000000`,
        outline: isHovered ? `2px solid ${borderColor}` : 'none',
        transition: 'box-shadow 150ms ease-out, outline 150ms ease-out',
        cursor: 'pointer'
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        {/* Icon and Progress */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 bg-[#4a2859]"
            style={{
              border: `4px solid ${borderColor}`,
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div
            className="text-sm font-bold uppercase px-3 py-1 bg-[#4a2859]"
            style={{
              color: '#FFFFFF',
              textShadow: '2px 2px 0px #000000',
              border: '2px solid #ffffff',
              boxShadow: '2px 2px 0px #000000',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            {completedLevels}/{totalLevels}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-bold mb-3 uppercase"
          style={{
            color: borderColor,
            textShadow: '2px 2px 0px #000000',
            fontFamily: "'Press Start 2P', monospace",
            lineHeight: '1.4'
          }}
        >
          {path.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs mb-4"
          style={{
            color: '#d4a5f5',
            fontFamily: "'Silkscreen', monospace",
            lineHeight: '1.4'
          }}
        >
          {path.description}
        </p>

        {/* Progress Bar */}
        <div className="relative">
          <div
            className="w-full bg-black/50 h-3 overflow-hidden"
            style={{
              border: '2px solid #ffffff',
              boxShadow: 'inset 2px 2px 0px #000000'
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedLevels / totalLevels) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              className="h-full relative"
              style={{
                backgroundColor: borderColor,
                boxShadow: `0 0 10px ${borderColor}`
              }}
            />
          </div>
          {/* Progress percentage text */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs font-bold uppercase px-2 py-0.5 bg-[#4a2859]"
            style={{
              color: '#FFFFFF',
              textShadow: '1px 1px 0px #000000',
              border: '2px solid #ffffff',
              boxShadow: '2px 2px 0px #000000',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            {Math.round((completedLevels / totalLevels) * 100)}%
          </div>
        </div>
      </div>
    </motion.button>
  );
};
