import React, { useState, useEffect, useMemo } from 'react';
import { CARDS } from '../game/cards';
import { getLevelByNumber } from '../content';
import { useGameStore } from '../store/gameStore';
import { PixiBackground } from '../components/PixiBackground';
import { GameHUD } from '../components/GameHUD';
import { GameBoard } from '../components/GameBoard';
import { GameFooter } from '../components/GameFooter';
import { GameControls } from '../components/GameControls';
import { useKeyboardShortcuts } from '../hooks';
import type { Board, Card } from '../types';
import type { IBoard, ICard } from '../game/types';

interface GameScreenProps {
  onBack: () => void;
  onSubmit?: (board: IBoard) => void;
}

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * GameScreen Component (Refactored)
 *
 * Main game screen orchestrating game state and child components.
 * Reduced from 768 lines to ~200 lines by extracting:
 * - GameHUD: Header with level info, energy, timer
 * - GameBoard: Board slots and combo display
 * - GameFooter: Card hand display
 * - GameControls: Scenario panel and action buttons
 */
export const GameScreen: React.FC<GameScreenProps> = ({ onBack, onSubmit }) => {
  const { progress } = useGameStore();

  // Load current level data
  const currentLevel = progress.currentLevel
    ? getLevelByNumber(progress.currentLevel)
    : null;
  const levelData = currentLevel || getLevelByNumber(1);

  if (!levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Level not found
      </div>
    );
  }

  // Get available cards for this level
  const availableCards = levelData.availableCards
    .map((id: string) => CARDS[id])
    .filter(Boolean);

  // Shuffle cards once on mount using useMemo
  const shuffledCards = useMemo(
    () => shuffleArray(availableCards),
    [levelData.number]
  );

  // Game state
  const [board, setBoard] = useState<IBoard>({
    context: {
      type: 'context',
      card: null,
      required: levelData.requiredSlots.context,
    },
    model: {
      type: 'model',
      card: null,
      required: levelData.requiredSlots.model,
    },
    tools: {
      type: 'tools',
      card: null,
      required: levelData.requiredSlots.tools,
    },
    framework: {
      type: 'framework',
      card: null,
      required: levelData.requiredSlots.framework,
    },
    guardrails: {
      type: 'guardrails',
      card: null,
      required: levelData.requiredSlots.guardrails,
    },
  });

  const [energyRemaining, setEnergyRemaining] = useState(
    levelData.energyBudget
  );
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

  // Handle card selection from hand
  const handleSelectCard = (card: ICard) => {
    if (card.energyCost > energyRemaining) {
      // Visual feedback for insufficient energy
      setShakeCard(card.id);
      setTimeout(() => setShakeCard(null), 400);
      return;
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
      setEnergyRemaining(
        energyRemaining + slot.card.energyCost - card.energyCost
      );
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

  // Handle reset
  const handleReset = () => {
    setBoard({
      context: {
        type: 'context',
        card: null,
        required: levelData.requiredSlots.context,
      },
      model: {
        type: 'model',
        card: null,
        required: levelData.requiredSlots.model,
      },
      tools: {
        type: 'tools',
        card: null,
        required: levelData.requiredSlots.tools,
      },
      framework: {
        type: 'framework',
        card: null,
        required: levelData.requiredSlots.framework,
      },
      guardrails: {
        type: 'guardrails',
        card: null,
        required: levelData.requiredSlots.guardrails,
      },
    });
    setEnergyRemaining(levelData.energyBudget);
  };

  // Handle hint
  const handleHint = () => {
    console.log('Hint requested (placeholder)');
    // TODO: Implement hint system
  };

  // Handle submit
  const handleSubmit = () => {
    if (canSubmit && onSubmit) {
      onSubmit(board);
    }
  };

  // Check for combos
  const combos = {
    synergy: board.context.card !== null && board.model.card !== null,
    integration: board.model.card !== null && board.tools.card !== null,
    security: board.tools.card !== null && board.guardrails.card !== null,
  };

  const canSubmit = board.context.card !== null && board.model.card !== null;

  // Keyboard shortcuts
  useKeyboardShortcuts({
    Escape: onBack,
    r: handleReset,
    R: handleReset,
    h: handleHint,
    H: handleHint,
    ' ': handleSubmit,
  });

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: 'var(--background)' }}
    >
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Solid background layer */}
      <div
        className="fixed inset-0"
        style={{
          background:
            'linear-gradient(135deg, var(--background) 0%, var(--card) 50%, var(--muted) 100%)',
          zIndex: 0,
        }}
      />

      {/* Pixel grid background pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
          backgroundSize: '16px 16px',
          zIndex: 1,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header HUD */}
        <GameHUD
          levelNumber={levelData.number}
          energyRemaining={energyRemaining}
          energyBudget={levelData.energyBudget}
          chips={chips}
          stars={stars}
          timer={timer}
          onBack={onBack}
          shakeEnergy={shakeCard !== null}
        />

        {/* Main Game Container */}
        <div className="flex-1 flex flex-col p-3 gap-3 min-h-0">
          {/* Shuffled Cards Row */}
          <GameFooter
            cards={shuffledCards as Card[]}
            energyRemaining={energyRemaining}
            onCardSelect={handleSelectCard}
            shakeCardId={shakeCard}
          />

          {/* Game Board */}
          <GameBoard
            board={board as unknown as Board}
            onRemoveCard={handleRemoveCard}
            combos={combos}
          />

          {/* Bottom Panel with Scenario and Controls */}
          <GameControls
            scenario={levelData.scenario}
            targetScore={350}
            timer={timer}
            canSubmit={canSubmit}
            onSubmit={handleSubmit}
            onHint={handleHint}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
};
