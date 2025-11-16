import React from 'react';
import { BoardSlot } from './BoardSlot';
import type { Board } from '../types';

interface GameBoardProps {
  board: Board;
  onRemoveCard: (slotType: keyof Board) => void;
  combos: {
    synergy: boolean;
    integration: boolean;
    security: boolean;
  };
}

/**
 * GameBoard Component
 *
 * Displays the main game board with card slots and combo information.
 *
 * Usage:
 * <GameBoard
 *   board={boardState}
 *   onRemoveCard={handleRemoveCard}
 *   combos={{ synergy: true, integration: false, security: false }}
 * />
 */
export const GameBoard: React.FC<GameBoardProps> = React.memo(
  ({ board, onRemoveCard, combos }) => {
    return (
      <div
        className="flex-1 flex flex-col overflow-hidden min-h-0"
        style={{
          background: `
          radial-gradient(ellipse at center,
            rgba(74, 40, 89, 0.9) 0%,
            rgba(45, 27, 61, 1) 70%,
            rgba(26, 15, 36, 1) 100%
          ),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.08) 3px,
            rgba(0, 0, 0, 0.08) 6px
          )
        `,
          border: '6px solid rgba(0, 0, 0, 0.6)',
          boxShadow: `
          inset 0 0 60px rgba(0, 0, 0, 0.5),
          inset 0 0 20px rgba(138, 43, 226, 0.3),
          var(--shadow-lg)
        `,
          borderRadius: '2px',
        }}
      >
        {/* Board Title */}
        <div
          className="text-center py-3 text-subheading font-bold uppercase glow-magenta"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff, 2px 2px 0px #000000',
            fontFamily: 'var(--font-pixel)',
            letterSpacing: '0.1em',
          }}
        >
          GAME BOARD
        </div>

        <div className="flex-1 grid grid-cols-[2.5fr_0.6fr] gap-4 p-4 min-h-0">
          {/* Card Slots Area */}
          <div className="flex justify-center items-center">
            <div
              className="grid gap-8 place-items-center"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 140px))',
                maxWidth: '900px',
                justifyContent: 'center',
              }}
            >
              <BoardSlot
                type="context"
                card={board.context.card}
                onRemove={() => onRemoveCard('context')}
              />

              <BoardSlot
                type="model"
                card={board.model.card}
                onRemove={() => onRemoveCard('model')}
              />

              <BoardSlot
                type="tools"
                card={board.tools.card}
                onRemove={() => onRemoveCard('tools')}
              />

              <BoardSlot
                type="guardrails"
                card={board.guardrails.card}
                onRemove={() => onRemoveCard('guardrails')}
              />

              <BoardSlot
                type="framework"
                card={board.framework.card}
                onRemove={() => onRemoveCard('framework')}
              />
            </div>
          </div>

          {/* Combo Display Panel */}
          <div
            className="flex flex-col p-4 gap-3"
            style={{
              background: 'var(--card)',
              border: '3px solid var(--success-color)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div
              className="text-center text-sm uppercase font-bold pb-2"
              style={{
                color: 'var(--success-color)',
                borderBottom: '2px solid var(--success-color)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              ⚡ COMBOS
            </div>

            {/* Synergy Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                border: '2px solid var(--border)',
                opacity: combos.synergy ? 1 : 0.5,
                transition: 'opacity 200ms ease-out',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)' }}>🔗 Synergy</div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.synergy
                    ? 'var(--success-color)'
                    : 'var(--muted)',
                  color: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-sans)',
                  animation: combos.synergy
                    ? 'combo-glow 2s ease-in-out infinite'
                    : 'none',
                }}
              >
                +25
              </div>
            </div>

            {/* Integration Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                border: '2px solid var(--border)',
                opacity: combos.integration ? 1 : 0.5,
                transition: 'opacity 200ms ease-out',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)' }}>
                🎯 Integration
              </div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.integration
                    ? 'var(--success-color)'
                    : 'var(--muted)',
                  color: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-sans)',
                  animation: combos.integration
                    ? 'combo-glow 2s ease-in-out infinite'
                    : 'none',
                }}
              >
                +30
              </div>
            </div>

            {/* Security Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                border: '2px solid var(--border)',
                opacity: combos.security ? 1 : 0.5,
                transition: 'opacity 200ms ease-out',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)' }}>🛡️ Security</div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.security
                    ? 'var(--success-color)'
                    : 'var(--muted)',
                  color: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  fontFamily: 'var(--font-sans)',
                  animation: combos.security
                    ? 'combo-glow 2s ease-in-out infinite'
                    : 'none',
                }}
              >
                +15
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GameBoard.displayName = 'GameBoard';
