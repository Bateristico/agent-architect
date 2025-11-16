import React from 'react';
import { motion } from 'framer-motion';
import type { Card } from '../types';

interface GameFooterProps {
  cards: Card[];
  energyRemaining: number;
  onCardSelect: (card: Card) => void;
  shakeCardId: string | null;
}

// Pixel art SVG icon component
const PixelIcon: React.FC<{
  type: string;
  size: number;
  color?: string;
}> = ({ type, size, color = 'currentColor' }) => {
  const iconPaths: Record<string, string> = {
    context:
      'M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-2 2H7v2h10V7zM7 11h10v2H7v-2zm7 4H7v2h7v-2z',
    model:
      'M20 3H2v14h8v2H8v2h8v-2h-2v-2h8V3h-2zm-6 12H4V5h16v10h-6z',
    tool: 'M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z',
    framework:
      'M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z',
    guardrail:
      'M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z',
    zap: 'M14 2h-2v2h-2v2H8v2H6v2H4v2h2v-2h2V8h2V6h2V4h2v6h-2v2h-2v2H8v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2h2v-2h2v-2h2V2z',
    message:
      'M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2h-2z',
  };

  const iconPath = iconPaths[type] || iconPaths.context;

  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ display: 'block' }}
    >
      <path d={iconPath} fill={color} />
    </svg>
  );
};

// Get card type color CSS variable
const getCardTypeColor = (type: string): string => {
  switch (type) {
    case 'context':
      return 'var(--context-color)';
    case 'model':
      return 'var(--model-color)';
    case 'tool':
      return 'var(--tool-color)';
    case 'framework':
      return 'var(--framework-color)';
    case 'guardrail':
      return 'var(--guardrail-color)';
    default:
      return 'var(--foreground)';
  }
};

/**
 * GameFooter Component
 *
 * Displays the shuffled card hand at the bottom of the game screen.
 *
 * Usage:
 * <GameFooter
 *   cards={shuffledCards}
 *   energyRemaining={8}
 *   onCardSelect={handleSelectCard}
 *   shakeCardId={shakeCard}
 * />
 */
export const GameFooter: React.FC<GameFooterProps> = React.memo(
  ({ cards, energyRemaining, onCardSelect, shakeCardId }) => {
    return (
      <div className="flex-shrink-0 overflow-x-auto p-2" style={{ height: '190px' }}>
        <div
          className="flex gap-5 items-start p-2 justify-center"
          style={{
            background: 'var(--card)',
            border: '3px solid var(--border)',
            boxShadow: 'var(--shadow)',
            minWidth: 'max-content',
          }}
        >
          {cards.map((card: Card) => {
            const canAfford = card.energyCost <= energyRemaining;
            const typeColorVar =
              card.type === 'tool'
                ? 'tool'
                : card.type === 'guardrail'
                ? 'guardrail'
                : card.type;

            return (
              <motion.button
                key={card.id}
                onClick={() => onCardSelect(card)}
                whileHover={canAfford ? { scale: 1.08, y: -6, rotate: 2 } : {}}
                whileTap={canAfford ? { scale: 0.95 } : {}}
                className="flex-shrink-0 relative p-1"
                animate={
                  shakeCardId === card.id
                    ? {
                        x: [-5, 5, -5, 5, -5, 5, 0],
                        scale: [1, 0.95, 1.05, 0.95, 1.05, 0.95, 1],
                        boxShadow: [
                          'var(--shadow-xs)',
                          '0 0 20px rgba(255, 51, 102, 0.8), var(--shadow-xs)',
                          '0 0 25px rgba(255, 51, 102, 0.9), var(--shadow-xs)',
                          '0 0 20px rgba(255, 51, 102, 0.8), var(--shadow-xs)',
                          'var(--shadow-xs)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '120px',
                  height: '160px',
                  background: canAfford
                    ? `linear-gradient(135deg, var(--${typeColorVar}-dark) 0%, var(--${typeColorVar}-color) 100%)`
                    : 'var(--card)',
                  border: `3px solid ${getCardTypeColor(card.type)}`,
                  boxShadow: canAfford
                    ? `0 0 15px rgba(var(--${typeColorVar}-rgb), 0.4), var(--shadow-xs)`
                    : 'var(--shadow-xs)',
                  cursor: canAfford ? 'pointer' : 'not-allowed',
                  opacity: canAfford ? 1 : 0.3,
                  transition: 'all 150ms ease-out',
                  filter: canAfford ? 'none' : 'grayscale(80%) brightness(0.6)',
                }}
              >
                {/* Inner rectangle with darker shade */}
                <div
                  className="w-full h-full flex flex-col relative overflow-hidden"
                  style={{
                    background: `color-mix(in srgb, var(--${typeColorVar}-dark) 80%, #000000 20%)`,
                    border: `2px solid rgba(0, 0, 0, 0.3)`,
                  }}
                >
                  {/* Header with message and cost */}
                  <div className="flex items-start justify-between p-2 flex-shrink-0">
                    {/* Message icon - Top Left */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Message icon clicked for card:', card.id);
                      }}
                      className="z-10 flex items-center gap-1"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid #000000',
                        cursor: 'pointer',
                        transition: 'all 100ms ease-out',
                        padding: '3px 5px',
                        boxShadow: '2px 2px 0px #000000',
                      }}
                    >
                      <PixelIcon type="message" size={11} color="#000000" />
                    </button>

                    {/* Energy cost - Top Right */}
                    <div
                      className="flex items-center gap-1 z-10"
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid #000000',
                        padding: '3px 5px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 'bold',
                        boxShadow: '2px 2px 0px #000000',
                        lineHeight: '1',
                      }}
                    >
                      <PixelIcon type="zap" size={11} color="#FFD700" />
                      <span style={{ lineHeight: '1', color: '#000000' }}>
                        {card.energyCost}
                      </span>
                    </div>
                  </div>

                  {/* Icon - Centered in card */}
                  <div className="flex items-center justify-center flex-1">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid #000000',
                      }}
                    >
                      <PixelIcon type={card.type} size={32} color="#000000" />
                    </div>
                  </div>

                  {/* Banner at bottom with card name */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      padding: '6px 8px',
                      borderTop: '2px solid rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    <div
                      className="text-[9px] font-bold text-center leading-tight"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: '#ffffff',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {card.name}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
);

GameFooter.displayName = 'GameFooter';
