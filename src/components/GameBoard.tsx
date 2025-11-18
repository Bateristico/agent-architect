import React from 'react';
import { motion } from 'framer-motion';
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
  modifiers?: {
    synergyBonus: number;
    antiSynergyPenalty: number;
    comboBonus: number;
    netModifier: number;
    currentScore: number;
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
  ({ board, onRemoveCard, combos, modifiers }) => {
    const hasModifiers = modifiers && (modifiers.synergyBonus > 0 || modifiers.antiSynergyPenalty > 0 || modifiers.comboBonus > 0);
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
          border: '5px solid rgba(0, 0, 0, 0.6)',
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
          className="text-center py-3 text-subheading font-bold uppercase"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
            color: '#ff00ff',
            textShadow: '2px 2px 0px #000000',
            fontFamily: "'Press Start 2P', monospace",
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

          {/* Combo Display Panel - Redesigned with Pixel Art Aesthetic */}
          <div
            className="flex flex-col p-4 gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(45, 27, 61, 0.95) 0%, rgba(26, 15, 36, 0.95) 100%)',
              border: '5px solid #00ff88',
              borderRadius: '2px',
              boxShadow: '5px 5px 0px 0px #000000, 0 0 20px rgba(0, 255, 136, 0.4)',
            }}
          >
            {/* Panel Title */}
            <div
              className="text-center text-sm uppercase font-bold pb-2"
              style={{
                color: '#00ff88',
                borderBottom: '3px solid #00ff88',
                fontFamily: "'Press Start 2P', monospace",
                textShadow: '2px 2px 0px #000000',
                letterSpacing: '0.05em',
                fontSize: '12px',
              }}
            >
              ⚡ COMBOS
            </div>

            {/* Synergy Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: combos.synergy
                  ? 'rgba(0, 255, 136, 0.15)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: combos.synergy
                  ? '4px solid #00ff88'
                  : '4px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                opacity: combos.synergy ? 1 : 0.7,
                boxShadow: combos.synergy
                  ? '0 0 15px rgba(0, 255, 136, 0.4), 3px 3px 0px #000000'
                  : '2px 2px 0px rgba(0, 0, 0, 0.5)',
                transition: 'all 200ms ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  textShadow: '1px 1px 0px #000000',
                  marginRight: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '12px' }}>🔗</span>
                Synergy
              </div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.synergy
                    ? '#00ff88'
                    : 'rgba(0, 0, 0, 0.4)',
                  color: combos.synergy ? '#000000' : 'rgba(255, 255, 255, 0.4)',
                  border: '2px solid rgba(0, 0, 0, 0.5)',
                  borderRadius: '2px',
                  boxShadow: combos.synergy ? '2px 2px 0px #000000' : 'none',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  animation: combos.synergy ? 'comboGlow 2s ease-in-out infinite' : 'none',
                }}
              >
                +25
              </div>
            </div>

            {/* Integration Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: combos.integration
                  ? 'rgba(0, 255, 136, 0.15)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: combos.integration
                  ? '4px solid #00ff88'
                  : '4px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                opacity: combos.integration ? 1 : 0.7,
                boxShadow: combos.integration
                  ? '0 0 15px rgba(0, 255, 136, 0.4), 3px 3px 0px #000000'
                  : '2px 2px 0px rgba(0, 0, 0, 0.5)',
                transition: 'all 200ms ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  textShadow: '1px 1px 0px #000000',
                  marginRight: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '12px' }}>🎯</span>
                Integration
              </div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.integration
                    ? '#00ff88'
                    : 'rgba(0, 0, 0, 0.4)',
                  color: combos.integration ? '#000000' : 'rgba(255, 255, 255, 0.4)',
                  border: '2px solid rgba(0, 0, 0, 0.5)',
                  borderRadius: '2px',
                  boxShadow: combos.integration ? '2px 2px 0px #000000' : 'none',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  animation: combos.integration ? 'comboGlow 2s ease-in-out infinite' : 'none',
                }}
              >
                +30
              </div>
            </div>

            {/* Security Combo */}
            <div
              className="flex items-center justify-between p-3 text-xs"
              style={{
                background: combos.security
                  ? 'rgba(0, 255, 136, 0.15)'
                  : 'rgba(0, 0, 0, 0.3)',
                border: combos.security
                  ? '4px solid #00ff88'
                  : '4px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                opacity: combos.security ? 1 : 0.7,
                boxShadow: combos.security
                  ? '0 0 15px rgba(0, 255, 136, 0.4), 3px 3px 0px #000000'
                  : '2px 2px 0px rgba(0, 0, 0, 0.5)',
                transition: 'all 200ms ease-out',
              }}
            >
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  textShadow: '1px 1px 0px #000000',
                  marginRight: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '12px' }}>🛡️</span>
                Security
              </div>
              <div
                className="px-2 py-1 font-bold"
                style={{
                  background: combos.security
                    ? '#00ff88'
                    : 'rgba(0, 0, 0, 0.4)',
                  color: combos.security ? '#000000' : 'rgba(255, 255, 255, 0.4)',
                  border: '2px solid rgba(0, 0, 0, 0.5)',
                  borderRadius: '2px',
                  boxShadow: combos.security ? '2px 2px 0px #000000' : 'none',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  animation: combos.security ? 'comboGlow 2s ease-in-out infinite' : 'none',
                }}
              >
                +15
              </div>
            </div>

            {/* Modifiers Section - Bottom Half */}
            {modifiers && (
              <>
                <div
                  style={{
                    borderTop: '3px solid rgba(255, 255, 255, 0.2)',
                    marginTop: '0.5rem',
                    paddingTop: '0.75rem',
                  }}
                >
                  <div
                    className="text-center text-xs uppercase font-bold pb-2"
                    style={{
                      color: '#ff00ff',
                      fontFamily: "'Press Start 2P', monospace",
                      textShadow: '1px 1px 0px #000000',
                      fontSize: '10px',
                    }}
                  >
                    ⚡ Score: {modifiers.currentScore}
                  </div>
                </div>

                {/* Modifier Items */}
                {hasModifiers ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {/* Synergy Bonus */}
                    {modifiers.synergyBonus > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(0, 255, 136, 0.1)',
                          border: '2px solid #00ff88',
                          borderRadius: '2px',
                          boxShadow: '2px 2px 0px #000000',
                          padding: '0.375rem 0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            color: '#00ff88',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          ➜ Synergy
                        </span>
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            fontWeight: 'bold',
                            color: '#00ff88',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          +{modifiers.synergyBonus}%
                        </span>
                      </motion.div>
                    )}

                    {/* Anti-Synergy Penalty */}
                    {modifiers.antiSynergyPenalty > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(255, 51, 102, 0.1)',
                          border: '2px solid #ff3366',
                          borderRadius: '2px',
                          boxShadow: '2px 2px 0px #000000',
                          padding: '0.375rem 0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            color: '#ff3366',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          ← Anti-Syn
                        </span>
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            fontWeight: 'bold',
                            color: '#ff3366',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          -{modifiers.antiSynergyPenalty}%
                        </span>
                      </motion.div>
                    )}

                    {/* Combo Bonus */}
                    {modifiers.comboBonus > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(255, 0, 255, 0.1)',
                          border: '2px solid #ff00ff',
                          borderRadius: '2px',
                          boxShadow: '2px 2px 0px #000000',
                          padding: '0.375rem 0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            color: '#ff00ff',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          ♥ Combo
                        </span>
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            fontWeight: 'bold',
                            color: '#ff00ff',
                            textShadow: '1px 1px 0px #000000',
                          }}
                        >
                          +{modifiers.comboBonus}%
                        </span>
                      </motion.div>
                    )}

                    {/* Net Modifier */}
                    <div
                      style={{
                        borderTop: '2px solid rgba(255, 255, 255, 0.15)',
                        paddingTop: '0.375rem',
                        marginTop: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '7px',
                          color: '#ffffff',
                          textShadow: '1px 1px 0px #000000',
                        }}
                      >
                        Net Total
                      </span>
                      <span
                        style={{
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '8px',
                          fontWeight: 'bold',
                          color: modifiers.netModifier > 0 ? '#00ff88' : modifiers.netModifier < 0 ? '#ff3366' : '#ffffff',
                          textShadow: '1px 1px 0px #000000',
                        }}
                      >
                        {modifiers.netModifier > 0 ? '+' : ''}{modifiers.netModifier}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '0.75rem 0' }}>
                    <p
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        textShadow: '1px 1px 0px #000000',
                      }}
                    >
                      No modifiers
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

GameBoard.displayName = 'GameBoard';
