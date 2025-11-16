import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from './PixelIcon';

interface GameHUDProps {
  levelNumber: number;
  energyRemaining: number;
  energyBudget: number;
  chips: number;
  stars: { current: number; total: number };
  timer: number;
  onBack: () => void;
  shakeEnergy?: boolean;
}

/**
 * GameHUD Component
 *
 * Displays the game header with level info, energy, chips, stars, and timer.
 *
 * Usage:
 * <GameHUD
 *   levelNumber={1}
 *   energyRemaining={8}
 *   energyBudget={10}
 *   chips={1250}
 *   stars={{ current: 15, total: 20 }}
 *   timer={165}
 *   onBack={() => navigate('menu')}
 * />
 */
export const GameHUD: React.FC<GameHUDProps> = React.memo(({
  levelNumber,
  energyRemaining,
  energyBudget,
  chips,
  stars,
  timer,
  onBack,
  shakeEnergy = false,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="flex items-center justify-between px-4 flex-shrink-0"
      style={{
        height: '60px',
        background: 'var(--card)',
        borderBottom: '3px solid var(--border)',
        boxShadow: '0 3px 0px var(--shadow-color, #000000)',
      }}
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-[#2d1b3d] text-white text-sm font-bold uppercase border-4 border-white"
          style={{
            boxShadow: '4px 4px 0px #000000',
            fontFamily: "'Press Start 2P', monospace",
            padding: '12px 20px',
            transition: 'all 100ms ease-out',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
        <div
          className="flex items-center gap-2 px-3 py-2 text-xs pl-3"
          style={{
            background: 'var(--muted)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--foreground)',
          }}
        >
          🎯 <span className="pl-1">LEVEL {levelNumber}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs">
        {/* Energy Meter */}
        <motion.div
          className="flex items-center gap-2 px-3 py-2"
          animate={
            shakeEnergy
              ? {
                  x: [-3, 3, -3, 3, 0],
                  scale: [1, 0.98, 1.02, 0.98, 1],
                }
              : {}
          }
          transition={{ duration: 0.4 }}
          style={{
            background:
              energyRemaining <= 2
                ? 'var(--error-color)'
                : energyRemaining <= 4
                ? 'var(--accent)'
                : 'var(--success-color)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            fontFamily: 'var(--font-sans)',
            color:
              energyRemaining <= 2 ? 'var(--foreground)' : 'var(--background)',
            fontWeight: 'bold',
            transition: 'all 200ms ease-out',
          }}
        >
          ⚡{' '}
          <span>
            ENERGY: {energyRemaining}/{energyBudget}
          </span>
        </motion.div>

        {/* Chips */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: 'var(--muted)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--foreground)',
          }}
        >
          💰 <span>CHIPS: {chips}</span>
        </div>

        {/* Stars */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: 'var(--muted)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            fontFamily: 'var(--font-sans)',
            color: 'var(--foreground)',
          }}
        >
          ⭐{' '}
          <span>
            {stars.current}/{stars.total}
          </span>
        </div>

        {/* Timer */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: 'var(--muted)',
            border: '2px solid var(--border)',
            boxShadow: 'var(--shadow-xs)',
            fontFamily: 'var(--font-sans)',
            color: timer < 30 ? 'var(--error-color)' : 'var(--foreground)',
          }}
        >
          🕐 <span>{formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
});

GameHUD.displayName = 'GameHUD';
