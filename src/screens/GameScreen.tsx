import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CARDS } from '../game/cards';
import { getLevelByNumber } from '../content';
import { useGameStore } from '../store/gameStore';
import { PixiBackground } from '../components/PixiBackground';
import { BoardSlot } from '../components/BoardSlot';
import type { IBoard, ICard } from '../game/types';

interface GameScreenProps {
  onBack: () => void;
  onSubmit?: (board: IBoard) => void;
}

// Pixel art SVG icon component
const PixelIcon: React.FC<{ type: string; size: number; color?: string }> = ({ type, size, color = 'currentColor' }) => {
  const iconPaths: Record<string, string> = {
    context: "M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-2 2H7v2h10V7zM7 11h10v2H7v-2zm7 4H7v2h7v-2z",
    model: "M20 3H2v14h8v2H8v2h8v-2h-2v-2h8V3h-2zm-6 12H4V5h16v10h-6z",
    tool: "M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z",
    framework: "M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z",
    guardrail: "M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z",
    zap: "M14 2h-2v2h-2v2H8v2H6v2H4v2h2v-2h2V8h2V6h2V4h2v6h-2v2h-2v2H8v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2h2v-2h2v-2h2V2z",
    message: "M20 2H2v20h2V4h16v12H6v2H4v2h2v-2h16V2h-2z"
  };

  const iconPath = iconPaths[type] || iconPaths.context;

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ display: 'block' }}>
      <path d={iconPath} fill={color} />
    </svg>
  );
};

// Get card type color CSS variable
const getCardTypeColor = (type: string): string => {
  switch (type) {
    case 'context': return 'var(--context-color)';
    case 'model': return 'var(--model-color)';
    case 'tool': return 'var(--tool-color)';
    case 'framework': return 'var(--framework-color)';
    case 'guardrail': return 'var(--guardrail-color)';
    default: return 'var(--foreground)';
  }
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const GameScreen: React.FC<GameScreenProps> = ({ onBack, onSubmit }) => {
  const { progress } = useGameStore();

  // Load current level data
  const currentLevel = progress.currentLevel ? getLevelByNumber(progress.currentLevel) : null;
  const levelData = currentLevel || getLevelByNumber(1);

  if (!levelData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Level not found</div>;
  }

  // Group available cards by type
  const availableCards = levelData.availableCards.map((id: string) => CARDS[id]).filter(Boolean);

  // Shuffle cards once on mount using useMemo
  const shuffledCards = useMemo(() => shuffleArray(availableCards), [levelData.number]);

  const cardsByType = {
    context: availableCards.filter((card: ICard) => card.type === 'context'),
    model: availableCards.filter((card: ICard) => card.type === 'model'),
    tool: availableCards.filter((card: ICard) => card.type === 'tool'),
    framework: availableCards.filter((card: ICard) => card.type === 'framework'),
    guardrail: availableCards.filter((card: ICard) => card.type === 'guardrail'),
  };

  const [board, setBoard] = useState<IBoard>({
    context: { type: 'context', card: null, required: levelData.requiredSlots.context },
    model: { type: 'model', card: null, required: levelData.requiredSlots.model },
    tools: { type: 'tools', card: null, required: levelData.requiredSlots.tools },
    framework: { type: 'framework', card: null, required: levelData.requiredSlots.framework },
    guardrails: { type: 'guardrails', card: null, required: levelData.requiredSlots.guardrails },
  });

  const [energyRemaining, setEnergyRemaining] = useState(levelData.energyBudget);
  const [timer, setTimer] = useState(165); // 2:45 in seconds
  const [chips] = useState(1250);
  const [stars] = useState({ current: 15, total: 20 });
  const [shakeCard, setShakeCard] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle card selection
  const handleSelectCard = (card: ICard) => {
    if (card.energyCost > energyRemaining) {
      // Visual feedback for insufficient energy
      setShakeCard(card.id);
      setTimeout(() => setShakeCard(null), 400);
      return; // Not enough energy
    }

    // Map card type to board slot
    const slotMap: Record<string, keyof IBoard> = {
      context: 'context',
      model: 'model',
      tool: 'tools',
      framework: 'framework',
      guardrail: 'guardrails',
    };

    const slotType = slotMap[card.type];
    if (!slotType) return;

    const slot = board[slotType];

    // If slot already has a card, return energy
    if (slot.card) {
      setEnergyRemaining(energyRemaining + slot.card.energyCost - card.energyCost);
    } else {
      setEnergyRemaining(energyRemaining - card.energyCost);
    }

    // Place new card
    setBoard({ ...board, [slotType]: { ...slot, card } });
  };

  // Handle removing card from slot
  const handleRemoveCard = (slotType: keyof IBoard) => {
    const slot = board[slotType];
    if (!slot.card) return;

    // Return energy
    setEnergyRemaining(energyRemaining + slot.card.energyCost);

    // Clear slot
    setBoard({ ...board, [slotType]: { ...slot, card: null } });
  };

  // Check for combos
  const combos = {
    synergy: board.context.card !== null && board.model.card !== null,
    integration: board.model.card !== null && board.tools.card !== null,
    security: board.tools.card !== null && board.guardrails.card !== null,
  };

  const canSubmit = board.context.card !== null && board.model.card !== null;

  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{ background: 'var(--background)' }}>
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Solid background layer */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(135deg, var(--background) 0%, var(--card) 50%, var(--muted) 100%)',
          zIndex: 0
        }}
      />

      {/* Pixel grid background pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '16px 16px',
          zIndex: 1
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Bar - Fixed 60px */}
        <div
          className="flex items-center justify-between px-4 flex-shrink-0"
          style={{
            height: '60px',
            background: 'var(--card)',
            borderBottom: '3px solid var(--border)',
            boxShadow: '0 3px 0px var(--shadow-color, #000000)'
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
                transition: 'all 100ms ease-out'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
            <div
              className="flex items-center gap-2 px-3 py-2 text-xs"
              style={{
                background: 'var(--muted)',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--foreground)'
              }}
            >
              🎯 <span>LEVEL {levelData.number}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Energy Meter */}
            <motion.div
              className="flex items-center gap-2 px-3 py-2"
              animate={shakeCard ? {
                x: [-3, 3, -3, 3, 0],
                scale: [1, 0.98, 1.02, 0.98, 1]
              } : {}}
              transition={{ duration: 0.4 }}
              style={{
                background: energyRemaining <= 2 ? 'var(--error-color)' : energyRemaining <= 4 ? 'var(--accent)' : 'var(--success-color)',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
                color: energyRemaining <= 2 ? 'var(--foreground)' : 'var(--background)',
                fontWeight: 'bold',
                transition: 'all 200ms ease-out'
              }}
            >
              ⚡ <span>ENERGY: {energyRemaining}/{levelData.energyBudget}</span>
            </motion.div>
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                background: 'var(--muted)',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--foreground)'
              }}
            >
              💰 <span>CHIPS: {chips}</span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                background: 'var(--muted)',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--foreground)'
              }}
            >
              ⭐ <span>{stars.current}/{stars.total}</span>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                background: 'var(--muted)',
                border: '2px solid var(--border)',
                boxShadow: 'var(--shadow-xs)',
                fontFamily: 'var(--font-sans)',
                color: timer < 30 ? 'var(--error-color)' : 'var(--foreground)'
              }}
            >
              🕐 <span>{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        {/* Main Game Container - Flexible */}
        <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
          {/* Shuffled Cards Row - Fixed 190px */}
          <div className="flex-shrink-0 overflow-x-auto p-2" style={{ height: '190px' }}>
            <div
              className="flex gap-5 items-start p-2 justify-center"
              style={{
                background: 'var(--card)',
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
                minWidth: 'max-content'
              }}
            >
              {shuffledCards.map((card: ICard) => {
                const canAfford = card.energyCost <= energyRemaining;
                const typeColorVar = card.type === 'tool' ? 'tool' : card.type === 'guardrail' ? 'guardrail' : card.type;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    whileHover={canAfford ? { scale: 1.08, y: -6, rotate: 2 } : {}}
                    whileTap={canAfford ? { scale: 0.95 } : {}}
                    className="flex-shrink-0 relative p-1"
                    animate={shakeCard === card.id ? {
                      x: [-5, 5, -5, 5, -5, 5, 0],
                      scale: [1, 0.95, 1.05, 0.95, 1.05, 0.95, 1],
                      boxShadow: [
                        'var(--shadow-xs)',
                        '0 0 20px rgba(255, 51, 102, 0.8), var(--shadow-xs)',
                        '0 0 25px rgba(255, 51, 102, 0.9), var(--shadow-xs)',
                        '0 0 20px rgba(255, 51, 102, 0.8), var(--shadow-xs)',
                        'var(--shadow-xs)'
                      ]
                    } : {}}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
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
                      filter: canAfford ? 'none' : 'grayscale(80%) brightness(0.6)'
                    }}
                  >
                    {/* Inner rectangle with darker shade */}
                    <div
                      className="w-full h-full flex flex-col relative overflow-hidden"
                      style={{
                        background: `color-mix(in srgb, var(--${typeColorVar}-dark) 80%, #000000 20%)`,
                        border: `2px solid rgba(0, 0, 0, 0.3)`
                      }}
                    >
                      {/* Header with message and cost */}
                      <div className="flex items-start justify-between p-2 flex-shrink-0">
                        {/* Message icon - Top Left */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Future feature placeholder
                            console.log('Message icon clicked for card:', card.id);
                          }}
                          className="z-10 flex items-center gap-1"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid #000000',
                            cursor: 'pointer',
                            transition: 'all 100ms ease-out',
                            padding: '3px 5px',
                            boxShadow: '2px 2px 0px #000000'
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
                            lineHeight: '1'
                          }}
                        >
                          <PixelIcon type="zap" size={11} color="#FFD700" />
                          <span style={{ lineHeight: '1', color: '#000000' }}>{card.energyCost}</span>
                        </div>
                      </div>

                      {/* Icon - Centered in card */}
                      <div
                        className="flex items-center justify-center flex-1"
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '2px solid #000000'
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
                          borderTop: '2px solid rgba(0, 0, 0, 0.7)'
                        }}
                      >
                        <div
                          className="text-[9px] font-bold text-center leading-tight"
                          style={{
                            fontFamily: 'var(--font-sans)',
                            color: '#ffffff',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
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

          {/* Game Board - Flexible */}
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
              borderRadius: '2px'
            }}
          >
            <div
              className="text-center py-3 text-subheading font-bold uppercase glow-magenta"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderBottom: '3px solid rgba(255, 255, 255, 0.2)',
                color: '#ff00ff',
                textShadow: '0 0 10px #ff00ff, 2px 2px 0px #000000',
                fontFamily: 'var(--font-pixel)',
                letterSpacing: '0.1em'
              }}
            >
              GAME BOARD
            </div>

            <div className="flex-1 grid grid-cols-[2.5fr_0.6fr] gap-4 p-4 min-h-0">
              {/* Selected Cards Area - Responsive Grid */}
              <div className="flex justify-center items-center">
                <div
                  className="grid gap-8 place-items-center"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 140px))',
                    maxWidth: '900px',
                    justifyContent: 'center'
                  }}
                >
                  {/* Context Slot */}
                  <BoardSlot
                    type="context"
                    card={board.context.card}
                    onRemove={() => handleRemoveCard('context')}
                  />

                  {/* Model Slot */}
                  <BoardSlot
                    type="model"
                    card={board.model.card}
                    onRemove={() => handleRemoveCard('model')}
                  />

                  {/* Tool Slot */}
                  <BoardSlot
                    type="tools"
                    card={board.tools.card}
                    onRemove={() => handleRemoveCard('tools')}
                  />

                  {/* Guardrail Slot */}
                  <BoardSlot
                    type="guardrails"
                    card={board.guardrails.card}
                    onRemove={() => handleRemoveCard('guardrails')}
                  />

                  {/* Framework Slot */}
                  <BoardSlot
                    type="framework"
                    card={board.framework.card}
                    onRemove={() => handleRemoveCard('framework')}
                  />
                </div>
              </div>

              {/* Combo Display */}
              <div
                className="flex flex-col p-4 gap-3"
                style={{
                  background: 'var(--card)',
                  border: '3px solid var(--success-color)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <div
                  className="text-center text-sm uppercase font-bold pb-2"
                  style={{
                    color: 'var(--success-color)',
                    borderBottom: '2px solid var(--success-color)',
                    fontFamily: 'var(--font-sans)'
                  }}
                >
                  ⚡ COMBOS
                </div>

                <div
                  className="flex items-center justify-between p-3 text-xs"
                  style={{
                    background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                    border: '2px solid var(--border)',
                    opacity: combos.synergy ? 1 : 0.5,
                    transition: 'opacity 200ms ease-out'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)' }}>
                    🔗 Synergy
                  </div>
                  <div
                    className="px-2 py-1 font-bold"
                    style={{
                      background: combos.synergy ? 'var(--success-color)' : 'var(--muted)',
                      color: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-sans)',
                      animation: combos.synergy ? 'combo-glow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    +25
                  </div>
                </div>

                <div
                  className="flex items-center justify-between p-3 text-xs"
                  style={{
                    background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                    border: '2px solid var(--border)',
                    opacity: combos.integration ? 1 : 0.5,
                    transition: 'opacity 200ms ease-out'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)' }}>
                    🎯 Integration
                  </div>
                  <div
                    className="px-2 py-1 font-bold"
                    style={{
                      background: combos.integration ? 'var(--success-color)' : 'var(--muted)',
                      color: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-sans)',
                      animation: combos.integration ? 'combo-glow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    +30
                  </div>
                </div>

                <div
                  className="flex items-center justify-between p-3 text-xs"
                  style={{
                    background: 'color-mix(in srgb, var(--muted) 60%, transparent)',
                    border: '2px solid var(--border)',
                    opacity: combos.security ? 1 : 0.5,
                    transition: 'opacity 200ms ease-out'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)' }}>
                    🛡️ Security
                  </div>
                  <div
                    className="px-2 py-1 font-bold"
                    style={{
                      background: combos.security ? 'var(--success-color)' : 'var(--muted)',
                      color: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-sans)',
                      animation: combos.security ? 'combo-glow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    +15
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel - Fixed 120px */}
          <div className="grid grid-cols-[2fr_1fr] gap-3 flex-shrink-0" style={{ height: '120px' }}>
            {/* Scenario Panel */}
            <div
              className="flex flex-col p-4 gap-3 overflow-hidden"
              style={{
                background: 'var(--card)',
                border: '3px solid var(--accent)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div
                className="text-xs font-bold uppercase flex items-center gap-2"
                style={{
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                📋 SCENARIO
              </div>
              <div
                className="flex-1 text-[10px] leading-normal overflow-y-auto font-bold px-2"
                style={{
                  color: 'var(--foreground)',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                {levelData.scenario}
              </div>
              <div className="flex gap-3 text-[10px] border-t-2 pt-2 px-2" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-1">
                  🎯 <span style={{ fontFamily: 'var(--font-sans)' }}>TARGET: 350 PTS</span>
                </div>
                <div className="flex items-center gap-1">
                  🕐 <span style={{ fontFamily: 'var(--font-sans)' }}>TIME: {formatTime(timer)}</span>
                </div>
                <div className="flex items-center gap-1">
                  💡 <span style={{ fontFamily: 'var(--font-sans)' }}>HINT: Try different card combinations</span>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div
              className="flex flex-col p-3 justify-between"
              style={{
                background: 'var(--card)',
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <motion.button
                onClick={() => canSubmit && onSubmit && onSubmit(board)}
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.05, y: -2 } : {}}
                whileTap={canSubmit ? { scale: 0.95 } : {}}
                className="py-2 px-3 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: canSubmit ? 'var(--success-color)' : 'var(--muted)',
                  color: canSubmit ? 'var(--background)' : 'var(--muted-foreground)',
                  border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 100ms ease-out',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  opacity: canSubmit ? 1 : 0.6
                }}
              >
                ✓ SUBMIT
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-3 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: 'var(--accent)',
                  color: 'var(--background)',
                  border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 100ms ease-out'
                }}
              >
                💡 HINT
              </motion.button>

              <motion.button
                onClick={() => {
                  // Reset board
                  setBoard({
                    context: { type: 'context', card: null, required: levelData.requiredSlots.context },
                    model: { type: 'model', card: null, required: levelData.requiredSlots.model },
                    tools: { type: 'tools', card: null, required: levelData.requiredSlots.tools },
                    framework: { type: 'framework', card: null, required: levelData.requiredSlots.framework },
                    guardrails: { type: 'guardrails', card: null, required: levelData.requiredSlots.guardrails },
                  });
                  setEnergyRemaining(levelData.energyBudget);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-3 text-[10px] font-bold uppercase"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: 'var(--destructive)',
                  color: 'var(--foreground)',
                  border: '2px solid var(--border)',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 100ms ease-out'
                }}
              >
                🔄 RESET
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes combo-glow {
          0%, 100% {
            box-shadow: 2px 2px 0px #000000;
            transform: scale(1);
          }
          50% {
            box-shadow: 2px 2px 0px #000000, 0 0 15px #00ff88;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};
