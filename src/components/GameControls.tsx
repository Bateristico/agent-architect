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
      <div className="flex flex-col gap-3 flex-shrink-0">
        {/* Scenario Panel */}
        <div
          className="flex flex-col p-4 gap-3 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 27, 61, 0.95) 0%, rgba(26, 15, 36, 0.95) 100%)',
            border: '4px solid rgba(255, 170, 0, 0.6)',
            borderRadius: '2px',
            boxShadow: '4px 4px 0px 0px #000000',
            minHeight: '80px',
          }}
        >
          <div
            className="text-xs font-bold uppercase flex items-center gap-2"
            style={{
              color: '#ffaa00',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              textShadow: '1px 1px 0px #000000',
            }}
          >
            📋 SCENARIO
          </div>
          <div
            className="flex-1 text-[10px] leading-relaxed overflow-y-auto font-bold px-2"
            style={{
              color: '#ffffff',
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '1px 1px 0px #000000',
            }}
          >
            {scenario}
          </div>
          <div
            className="flex gap-4 text-[8px] border-t-2 pt-2 px-2"
            style={{
              borderColor: 'rgba(255, 170, 0, 0.3)',
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            <div className="flex items-center gap-1" style={{ color: '#ffaa00' }}>
              🎯 TARGET: {targetScore} PTS
            </div>
            <div className="flex items-center gap-1" style={{ color: '#ffaa00' }}>
              🕐 TIME: {formatTime(timer)}
            </div>
            <div className="flex items-center gap-1" style={{ color: '#ffaa00' }}>
              💡 HINT: Try different card combinations
            </div>
          </div>
        </div>

        {/* Action Buttons - Horizontal Layout (Matching Mockup #3) */}
        <div className="grid grid-cols-3 gap-3">
          {/* Submit Button - Green */}
          <motion.button
            onClick={() => canSubmit && onSubmit()}
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.05, y: -3 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            className="py-4 px-6 font-bold uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '12px',
              background: canSubmit ? '#00ff88' : 'rgba(0, 0, 0, 0.5)',
              color: canSubmit ? '#000000' : 'rgba(255, 255, 255, 0.3)',
              border: '5px solid #ffffff',
              borderRadius: '2px',
              boxShadow: canSubmit
                ? '5px 5px 0px 0px #000000, 0 0 15px rgba(0, 255, 136, 0.5)'
                : '3px 3px 0px 0px rgba(0, 0, 0, 0.5)',
              textShadow: canSubmit ? '2px 2px 0px rgba(0, 0, 0, 0.5)' : 'none',
              transition: 'all 100ms ease-out',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              opacity: canSubmit ? 1 : 0.5,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span style={{ fontSize: '14px' }}>✓</span>
              SUBMIT
            </div>
          </motion.button>

          {/* Hint Button - Yellow */}
          <motion.button
            onClick={onHint}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="py-4 px-6 font-bold uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '12px',
              background: '#ffaa00',
              color: '#000000',
              border: '5px solid #ffffff',
              borderRadius: '2px',
              boxShadow: '5px 5px 0px 0px #000000, 0 0 15px rgba(255, 170, 0, 0.5)',
              textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)',
              transition: 'all 100ms ease-out',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span style={{ fontSize: '14px' }}>💡</span>
              HINT
            </div>
          </motion.button>

          {/* Reset Button - Pink */}
          <motion.button
            onClick={onReset}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="py-4 px-6 font-bold uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '12px',
              background: '#ff1493',
              color: '#ffffff',
              border: '5px solid #ffffff',
              borderRadius: '2px',
              boxShadow: '5px 5px 0px 0px #000000, 0 0 15px rgba(255, 20, 147, 0.5)',
              textShadow: '2px 2px 0px #000000',
              transition: 'all 100ms ease-out',
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span style={{ fontSize: '14px' }}>🔄</span>
              RESET
            </div>
          </motion.button>
        </div>
      </div>
    );
  }
);

GameControls.displayName = 'GameControls';
