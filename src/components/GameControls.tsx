import React from 'react';
import { motion } from 'framer-motion';

interface GameControlsProps {
  scenario: string;
  targetScore: number;
  timer: number;
  canSubmit: boolean;
  onSubmit: () => void;
  onHint: () => void;
  onReset: () => void;
}

/**
 * GameControls Component
 *
 * Displays the scenario panel and action buttons (Submit, Hint, Reset).
 *
 * Usage:
 * <GameControls
 *   scenario="Build a customer service chatbot..."
 *   targetScore={350}
 *   timer={165}
 *   canSubmit={true}
 *   onSubmit={handleSubmit}
 *   onHint={handleHint}
 *   onReset={handleReset}
 * />
 */
export const GameControls: React.FC<GameControlsProps> = React.memo(
  ({ scenario, targetScore, timer, canSubmit, onSubmit, onHint, onReset }) => {
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div
        className="grid grid-cols-[2fr_1fr] gap-3 flex-shrink-0"
        style={{ height: '120px' }}
      >
        {/* Scenario Panel */}
        <div
          className="flex flex-col p-4 gap-3 overflow-hidden"
          style={{
            background: 'var(--card)',
            border: '3px solid var(--accent)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div
            className="text-xs font-bold uppercase flex items-center gap-2"
            style={{
              color: 'var(--accent)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            📋 SCENARIO
          </div>
          <div
            className="flex-1 text-[10px] leading-normal overflow-y-auto font-bold px-2"
            style={{
              color: 'var(--foreground)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {scenario}
          </div>
          <div
            className="flex gap-3 text-[10px] border-t-2 pt-2 px-2"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-1">
              🎯{' '}
              <span style={{ fontFamily: 'var(--font-sans)' }}>
                TARGET: {targetScore} PTS
              </span>
            </div>
            <div className="flex items-center gap-1">
              🕐{' '}
              <span style={{ fontFamily: 'var(--font-sans)' }}>
                TIME: {formatTime(timer)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              💡{' '}
              <span style={{ fontFamily: 'var(--font-sans)' }}>
                HINT: Try different card combinations
              </span>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div
          className="flex flex-col p-3 justify-between"
          style={{
            background: 'var(--card)',
            border: '3px solid var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <motion.button
            onClick={() => canSubmit && onSubmit()}
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.05, y: -2 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            className="py-2 px-3 text-[10px] font-bold uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              background: canSubmit ? 'var(--success-color)' : 'var(--muted)',
              color: canSubmit
                ? 'var(--background)'
                : 'var(--muted-foreground)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 100ms ease-out',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              opacity: canSubmit ? 1 : 0.6,
            }}
          >
            ✓ SUBMIT
          </motion.button>

          <motion.button
            onClick={onHint}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-3 text-[10px] font-bold uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'var(--accent)',
              color: 'var(--background)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 100ms ease-out',
            }}
          >
            💡 HINT
          </motion.button>

          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-3 text-[10px] font-bold uppercase"
            style={{
              fontFamily: 'var(--font-sans)',
              background: 'var(--destructive-color)',
              color: 'var(--background)',
              border: '2px solid var(--border)',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 100ms ease-out',
            }}
          >
            🔄 RESET
          </motion.button>
        </div>
      </div>
    );
  }
);

GameControls.displayName = 'GameControls';
