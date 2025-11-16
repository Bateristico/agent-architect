import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from '../components/PixelIcon';
import { useGameStore } from '../store/gameStore';
import { getLevelsByPath } from '../content';
import type { PathId, Difficulty } from '../types/game';
import { PixiBackground } from '../components/PixiBackground';

interface LevelSelectScreenProps {
  pathId: PathId;
  onBack: () => void;
  onSelectLevel: (levelId: number) => void;
}

// UI-specific level type
interface UILevel {
  id: number;
  pathId: PathId;
  title: string;
  description: string;
  difficulty: Difficulty;
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: number;
}

const pathNames: Record<PathId, string> = {
  'beginner-architect': 'Beginner Architect',
  'rag-specialist': 'RAG Specialist',
  'agentic-developer': 'Agentic Developer',
  'production-engineer': 'Production Engineer',
};

const pathColors: Record<PathId, string> = {
  'beginner-architect': '#00d9ff', // cyan
  'rag-specialist': '#00ff88', // green
  'agentic-developer': '#ff00ff', // purple
  'production-engineer': '#ffaa00', // orange
};

// Difficulty color mapping
const difficultyColors = {
  easy: '#00ff88',
  medium: '#ffaa00',
  hard: '#ff3366',
};

// Calculate reward chips based on difficulty
const getRewardChips = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  return difficulty === 'easy' ? 100 : difficulty === 'medium' ? 150 : 200;
};

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  pathId,
  onBack,
  onSelectLevel,
}) => {
  const { progress } = useGameStore();

  // Get actual levels from content system
  const contentLevels = getLevelsByPath(pathId);

  // Convert to UILevel format for UI
  const levels: UILevel[] = contentLevels.map(level => ({
    id: level.number,
    pathId: pathId,
    title: level.title,
    description: level.scenario.split('.')[0], // First sentence as description
    difficulty: level.difficulty,
    isUnlocked: progress.unlockedLevels.includes(level.number),
    isCompleted: progress.completedLevels.includes(level.number),
    stars: progress.levelStars[level.number] || 0,
  }));

  const pathColor = pathColors[pathId];

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
      <div className="relative z-10 flex flex-col max-w-4xl mx-auto w-full">
        {/* Back Button */}
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

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut", delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1
            className="font-bold uppercase"
            style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
              color: pathColor,
              textShadow: `0.125rem 0.125rem 0 #000000, 0 0 0.625rem ${pathColor}, 0 0 1.25rem ${pathColor}`,
              fontFamily: "'Press Start 2P', monospace",
              animation: 'pulse-glow 3s ease-in-out infinite alternate'
            }}
          >
            {pathNames[pathId]}
          </h1>
          <p
            className="uppercase"
            style={{
              fontSize: '0.75rem',
              color: '#d4a5f5',
              textShadow: '0.0625rem 0.0625rem 0 #000000',
              fontFamily: "'Silkscreen', monospace"
            }}
          >
            Choose a level to begin
          </p>
        </motion.div>

        {/* Level Cards */}
        <div className="space-y-6 flex flex-col items-center">
          {levels.map((level, index) => (
            <LevelCard
              key={level.id}
              level={level}
              index={index}
              onSelect={() => onSelectLevel(level.id)}
            />
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
          style={{ marginTop: '1rem' }}
        >
          <p
            className="uppercase"
            style={{
              fontSize: '0.75rem',
              color: '#00d9ff',
              textShadow: '0.0625rem 0.0625rem 0 #000000',
              fontFamily: "'Silkscreen', monospace",
              lineHeight: '1.6'
            }}
          >
            Complete levels to unlock more challenges
          </p>
        </motion.div>
      </div>

      {/* Add pulse-glow animation */}
      <style>{`
        @keyframes pulse-glow {
          from {
            text-shadow: 0.125rem 0.125rem 0 #000000, 0 0 0.625rem ${pathColor}, 0 0 1.25rem ${pathColor};
          }
          to {
            text-shadow: 0.125rem 0.125rem 0 #000000, 0 0 0.9375rem ${pathColor}, 0 0 1.875rem ${pathColor};
          }
        }
      `}</style>
    </div>
  );
};

interface LevelCardProps {
  level: UILevel;
  index: number;
  onSelect: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, index, onSelect }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isShaking, setIsShaking] = React.useState(false);

  const isUnlocked = level.isUnlocked;
  const isCompleted = level.isCompleted;
  const stars = level.stars;

  // Determine border color based on state
  const getBorderColor = () => {
    if (isCompleted) return '#ffaa00'; // orange for completed
    if (isUnlocked) return '#00ff88'; // green for unlocked
    return '#666666'; // gray for locked
  };

  const borderColor = getBorderColor();
  const difficultyColor = difficultyColors[level.difficulty as keyof typeof difficultyColors];
  const rewardChips = getRewardChips(level.difficulty);

  // Get difficulty dots count (1=easy, 2=medium, 3=hard)
  const difficultyDots = level.difficulty === 'easy' ? 1 : level.difficulty === 'medium' ? 2 : 3;

  const handleClick = () => {
    if (!isUnlocked) {
      // Shake animation for locked levels
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    onSelect();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
      whileHover={isUnlocked ? {
        scale: 1.08,
        rotate: 1,
        transition: { duration: 0.15, ease: "easeOut" }
      } : {}}
      whileTap={isUnlocked ? {
        scale: 0.95,
        transition: { duration: 0.08, ease: "easeIn" }
      } : {}}
      onClick={handleClick}
      onHoverStart={() => isUnlocked && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      disabled={!isUnlocked}
      className="relative bg-[#2d1b3d]/90 backdrop-blur-sm text-left overflow-hidden"
      style={{
        width: '60%',
        margin: '0 auto',
        padding: '0.5rem',
        border: `0.25rem solid ${borderColor}`,
        boxShadow: isHovered
          ? `0.375rem 0.375rem 0 #000000, 0 0 0.9375rem ${borderColor}`
          : `0.25rem 0.25rem 0 #000000`,
        outline: isHovered ? `0.125rem solid ${borderColor}` : 'none',
        transition: 'box-shadow 150ms ease-out, outline 150ms ease-out',
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        opacity: isUnlocked ? 1 : 0.6,
        transform: isShaking ? 'translateX(0)' : 'none',
        animation: isShaking ? 'shake 0.5s ease-in-out' : 'none'
      }}
    >
      {/* Shine effect on hover */}
      {isUnlocked && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            animation: 'shine 0.2s ease-out forwards'
          }}
        />
      )}

      {/* Level Header */}
      <div className="flex justify-between items-center mb-3">
        {/* Title with icon */}
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem' }}>
            {!isUnlocked ? '🔒' : isCompleted ? '🔓' : '🔓'}
          </span>
          <h3
            className="font-bold uppercase"
            style={{
              fontSize: '1rem',
              color: '#ffffff',
              fontFamily: "'Press Start 2P', monospace",
              lineHeight: '1.4'
            }}
          >
            {level.title}
          </h3>
        </div>

        {/* Star Rating */}
        {isUnlocked && (
          <div className="flex" style={{ gap: '0.25rem' }}>
            {[1, 2, 3].map((starNum) => (
              <span
                key={starNum}
                style={{
                  fontSize: '1rem',
                  color: starNum <= stars ? '#ffaa00' : '#666666',
                  textShadow: starNum <= stars ? '0 0 0.5rem #ffaa00' : 'none',
                  transition: 'all 200ms ease-out'
                }}
              >
                ⭐
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className="mb-4"
        style={{
          fontSize: '0.75rem',
          color: '#d4a5f5',
          fontFamily: "'Silkscreen', monospace",
          lineHeight: '1.4'
        }}
      >
        {level.description}
      </p>

      {/* Stats Row */}
      <div className="flex justify-between items-center">
        {/* Difficulty Indicator */}
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          <span
            className="uppercase"
            style={{
              fontSize: '0.625rem',
              color: '#ffffff',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            Difficulty:
          </span>
          <div className="flex" style={{ gap: '0.125rem' }}>
            {[1, 2, 3].map((dotNum) => (
              <div
                key={dotNum}
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  border: '0.125rem solid #ffffff',
                  background: dotNum <= difficultyDots ? difficultyColor : '#666666',
                  boxShadow: dotNum <= difficultyDots ? `0 0 0.5rem ${difficultyColor}` : 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Reward Chip */}
        <div
          className="font-bold uppercase"
          style={{
            fontSize: '0.625rem',
            padding: '0.25rem 0.5rem',
            background: '#ffaa00',
            color: '#2d1b3d',
            border: '0.125rem solid #ffffff',
            boxShadow: '0.125rem 0.125rem 0 #000000',
            fontFamily: "'Press Start 2P', monospace"
          }}
        >
          {rewardChips} CHIPS
        </div>
      </div>

      {/* Add shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-0.1875rem); }
          75% { transform: translateX(0.1875rem); }
        }
        @keyframes shine {
          from { left: -100%; }
          to { left: 100%; }
        }
      `}</style>
    </motion.button>
  );
};
