import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { LevelResult } from '../game/GameSimulator';
import type { ILevel } from '../game/types';
import { PixiBackground } from '../components/PixiBackground';

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
  // level is not used in the current implementation
  onRetry,
  onNextLevel,
  onMainMenu,
  hasNextLevel,
}) => {
  const { stars, totalScore, accuracyScore, efficiencyScore, bestPracticesScore, robustnessScore, feedback } = result;
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Calculate performance breakdown
  const performanceCards = [
    { label: 'ACCURACY', emoji: '🎯', score: accuracyScore, maxScore: 30, color: '#00d9ff', stars: accuracyScore >= 25 ? 3 : accuracyScore >= 20 ? 2 : 1 },
    { label: 'EFFICIENCY', emoji: '⚡', score: efficiencyScore, maxScore: 20, color: '#ffaa00', stars: efficiencyScore >= 18 ? 3 : efficiencyScore >= 15 ? 2 : 1 },
    { label: 'BEST PRACTICES', emoji: '🛡️', score: bestPracticesScore, maxScore: 30, color: '#ff00ff', stars: bestPracticesScore >= 25 ? 3 : bestPracticesScore >= 20 ? 2 : 1 },
    { label: 'ROBUSTNESS', emoji: '📈', score: robustnessScore, maxScore: 20, color: '#00ff88', stars: robustnessScore >= 18 ? 3 : robustnessScore >= 15 ? 2 : 1 },
  ];

  // Calculate combo bonuses from feedback
  const comboBonuses = feedback.slice(0, 3).map((item, index) => ({
    text: item,
    bonus: index === 0 ? 25 : index === 1 ? 30 : 15,
    emoji: index === 0 ? '⚡' : index === 1 ? '🔗' : '🛡️',
  }));

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

      {/* Confetti Burst */}
      {showConfetti && <ConfettiBurst />}

      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex-1" />
          <h1
            className="text-2xl md:text-3xl font-bold uppercase text-center"
            style={{
              color: '#00ff88',
              textShadow: '2px 2px 0px #000000, 0 0 15px #00ff88, 0 0 30px #00ff88',
              fontFamily: "'Press Start 2P', monospace",
              animation: 'title-celebration 2s ease-in-out infinite alternate'
            }}
          >
            RESULTS
          </h1>
          <div
            className="flex-1 flex justify-end text-sm uppercase"
            style={{
              color: '#00ff88',
              fontFamily: "'Press Start 2P', monospace",
              animation: 'success-pulse 1s ease-in-out infinite'
            }}
          >
            <span className="inline-block">🎉</span>
          </div>
        </motion.div>

        {/* Level Complete Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2
            className="text-xl md:text-2xl font-bold uppercase"
            style={{
              color: '#ffaa00',
              textShadow: '2px 2px 0px #000000, 0 0 10px #ffaa00',
              fontFamily: "'Press Start 2P', monospace"
            }}
          >
            ⭐ LEVEL COMPLETE! ⭐
          </h2>
        </motion.div>

        {/* Score Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="max-w-4xl mx-auto w-full mb-8"
        >
          <div
            className="bg-[#2d1b3d]/90 backdrop-blur-sm p-6"
            style={{
              border: '4px solid #00ff88',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            <div className="mb-4">
              <CountUpNumber
                value={totalScore}
                duration={2000}
                delay={600}
                className="text-3xl md:text-4xl font-bold text-center uppercase"
                style={{
                  color: '#ffaa00',
                  textShadow: '2px 2px 0px #000000, 0 0 15px #ffaa00',
                  fontFamily: "'Press Start 2P', monospace"
                }}
                prefix="FINAL SCORE: "
                suffix=" / 100"
              />
            </div>

            {/* Progress Bar */}
            <div
              className="relative h-10 overflow-hidden"
              style={{
                background: '#1a0f24',
                border: '4px solid #ffffff',
                boxShadow: 'inset 4px 4px 0px #000000'
              }}
            >
              <motion.div
                className="h-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${totalScore}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                style={{
                  background: 'linear-gradient(90deg, #00ff88 0%, #ffaa00 50%, #00ff88 100%)',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase"
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 0px #000000',
                  fontFamily: "'Press Start 2P', monospace",
                  zIndex: 10
                }}
              >
                {Math.round(totalScore)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-6xl mx-auto w-full mb-8"
        >
          <div
            className="text-center text-sm mb-6 uppercase"
            style={{
              color: '#d4a5f5',
              fontFamily: "'Silkscreen', monospace"
            }}
          >
            PERFORMANCE BREAKDOWN
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {performanceCards.map((card, index) => (
              <PerformanceCard
                key={card.label}
                {...card}
                delay={0.5 + index * 0.2}
              />
            ))}
          </div>
        </motion.div>

        {/* Combo Bonuses */}
        {comboBonuses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.5 }}
            className="max-w-4xl mx-auto w-full mb-8"
          >
            <div
              className="bg-[#2d1b3d]/90 backdrop-blur-sm p-6"
              style={{
                border: '4px solid #00ff88',
                boxShadow: '4px 4px 0px #000000'
              }}
            >
              <div
                className="text-center text-sm mb-4 uppercase"
                style={{
                  color: '#00ff88',
                  fontFamily: "'Silkscreen', monospace"
                }}
              >
                COMBO BONUSES
              </div>
              <div className="space-y-3">
                {comboBonuses.map((combo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + index * 0.3, duration: 0.8, ease: "easeOut" }}
                    className="flex items-center justify-between p-3"
                    style={{
                      background: 'rgba(74, 40, 89, 0.6)',
                      border: '2px solid #ffffff'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xl"
                        style={{ animation: 'icon-dance 2s ease-in-out infinite' }}
                      >
                        {combo.emoji}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color: '#d4a5f5',
                          fontFamily: "'Silkscreen', monospace"
                        }}
                      >
                        {combo.text}
                      </span>
                    </div>
                    <div
                      className="px-3 py-1 text-xs font-bold uppercase"
                      style={{
                        background: '#00ff88',
                        color: '#2d1b3d',
                        border: '2px solid #ffffff',
                        boxShadow: '2px 2px 0px #000000',
                        fontFamily: "'Press Start 2P', monospace",
                        animation: 'bonus-glow 2s ease-in-out infinite'
                      }}
                    >
                      +{combo.bonus}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Rewards Earned */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 2.2 }}
          className="max-w-4xl mx-auto w-full mb-8"
        >
          <div
            className="bg-[#2d1b3d]/90 backdrop-blur-sm p-6"
            style={{
              border: '4px solid #ffaa00',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            <div
              className="text-center text-sm mb-6 uppercase"
              style={{
                color: '#ffaa00',
                fontFamily: "'Silkscreen', monospace"
              }}
            >
              REWARDS EARNED
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <RewardBadge emoji="🏆" label={`${stars} STARS`} delay={0.2} />
              <RewardBadge emoji="💰" label={`+${totalScore} CHIPS`} delay={0.5} />
              <RewardBadge emoji="🎯" label="PROGRESS" delay={0.8} />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {hasNextLevel && stars >= 1 && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.8, ease: "easeOut" }}
              onClick={onNextLevel}
              whileHover={{ scale: 1.08, rotate: 1, transition: { duration: 0.15, ease: "easeOut" } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.08, ease: "easeIn" } }}
              className="px-6 py-4 text-xs font-bold uppercase"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: '#00ff88',
                color: '#2d1b3d',
                border: '4px solid #ffffff',
                boxShadow: '4px 4px 0px #000000',
                transition: 'all 150ms ease-out'
              }}
            >
              NEXT LEVEL
            </motion.button>
          )}

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
            onClick={onRetry}
            whileHover={{ scale: 1.08, rotate: 1, transition: { duration: 0.15, ease: "easeOut" } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.08, ease: "easeIn" } }}
            className="px-6 py-4 text-xs font-bold uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: '#ffaa00',
              color: '#2d1b3d',
              border: '4px solid #ffffff',
              boxShadow: '4px 4px 0px #000000',
              transition: 'all 150ms ease-out'
            }}
          >
            RETRY LEVEL
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.8, ease: "easeOut" }}
            onClick={onMainMenu}
            whileHover={{ scale: 1.08, rotate: 1, transition: { duration: 0.15, ease: "easeOut" } }}
            whileTap={{ scale: 0.95, transition: { duration: 0.08, ease: "easeIn" } }}
            className="px-6 py-4 text-xs font-bold uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: '#ffffff',
              color: '#2d1b3d',
              border: '4px solid #ffffff',
              boxShadow: '4px 4px 0px #000000',
              transition: 'all 150ms ease-out'
            }}
          >
            MAIN MENU
          </motion.button>
        </motion.div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes title-celebration {
          from {
            text-shadow: 2px 2px 0px #000000, 0 0 15px #00ff88, 0 0 30px #00ff88;
            transform: scale(1);
          }
          to {
            text-shadow: 2px 2px 0px #000000, 0 0 25px #00ff88, 0 0 50px #00ff88;
            transform: scale(1.05);
          }
        }

        @keyframes success-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes card-entrance {
          0% { opacity: 0; transform: translateY(50px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes star-twinkle {
          0% { opacity: 0; transform: scale(0) rotate(180deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(0deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes icon-dance {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-3px) rotate(-5deg); }
        }

        @keyframes bonus-glow {
          0%, 100% {
            box-shadow: 2px 2px 0px #000000;
            transform: scale(1);
          }
          50% {
            box-shadow: 2px 2px 0px #000000, 0 0 15px #00ff88;
            transform: scale(1.05);
          }
        }

        @keyframes reward-bounce {
          0% { opacity: 0; transform: translateY(30px) scale(0.5); }
          60% { opacity: 1; transform: translateY(-10px) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Performance Card Component
interface PerformanceCardProps {
  label: string;
  emoji: string;
  score: number;
  maxScore: number;
  color: string;
  stars: number;
  delay: number;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  label,
  emoji,
  score,
  // maxScore is not used in the current implementation
  color,
  stars,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="bg-[#2d1b3d]/90 backdrop-blur-sm p-5"
      style={{
        border: `4px solid ${color}`,
        boxShadow: '4px 4px 0px #000000',
        animation: `card-entrance 0.8s ease-out forwards`
      }}
    >
      <div
        className="text-sm font-bold text-center mb-3 uppercase"
        style={{
          color: color,
          fontFamily: "'Press Start 2P', monospace"
        }}
      >
        {label}
      </div>
      <div className="text-center text-3xl mb-3">
        {emoji}
      </div>
      <div
        className="text-center text-lg font-bold mb-3"
        style={{
          color: '#ffffff',
          fontFamily: "'Press Start 2P', monospace"
        }}
      >
        +{score}
      </div>
      <div className="flex justify-center gap-1">
        {[1, 2, 3].map((starNum) => (
          <motion.span
            key={starNum}
            initial={{ opacity: 0, scale: 0, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: delay + 0.2 + starNum * 0.2,
              duration: 0.6,
              ease: "easeOut"
            }}
            className="text-base"
            style={{
              color: starNum <= stars ? '#ffaa00' : '#666666',
              textShadow: starNum <= stars ? '0 0 8px #ffaa00' : 'none'
            }}
          >
            ⭐
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// Reward Badge Component
interface RewardBadgeProps {
  emoji: string;
  label: string;
  delay: number;
}

const RewardBadge: React.FC<RewardBadgeProps> = ({ emoji, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: delay,
        duration: 0.8,
        ease: "easeOut"
      }}
      className="inline-block p-4"
      style={{
        background: 'rgba(74, 40, 89, 0.8)',
        border: '3px solid #ffffff',
        boxShadow: '3px 3px 0px #000000',
        animation: 'reward-bounce 0.8s ease-out forwards'
      }}
    >
      <div className="text-center text-2xl mb-2">{emoji}</div>
      <div
        className="text-xs font-bold uppercase text-center"
        style={{
          color: '#ffffff',
          fontFamily: "'Press Start 2P', monospace"
        }}
      >
        {label}
      </div>
    </motion.div>
  );
};

// Confetti Burst Component
const ConfettiBurst: React.FC = () => {
  const colors = ['#00d9ff', '#ff00ff', '#ffaa00', '#ff1493', '#00ff88'];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Count-up animation component
interface CountUpNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
  suffix?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  duration = 1000,
  delay = 0,
  className = '',
  style = {},
  prefix = '',
  suffix = '',
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, value, {
        duration: duration / 1000,
        ease: 'easeOut',
      });

      return controls.stop;
    }, delay);

    return () => clearTimeout(timer);
  }, [value, duration, delay, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [rounded]);

  return (
    <div className={className} style={style}>
      {prefix}{displayValue}{suffix}
    </div>
  );
};
