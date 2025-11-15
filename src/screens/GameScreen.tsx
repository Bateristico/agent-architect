import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Clock, DollarSign } from 'lucide-react';
import { Board } from '../components/Board';
import { Card } from '../components/Card';
import { CARDS } from '../game/cards';
import type { IBoard, ICard } from '../game/types';

interface GameScreenProps {
  onBack: () => void;
}

// Mock level data for now
const MOCK_LEVEL = {
  id: 1,
  title: 'Customer Support Assistant',
  difficulty: 'easy' as const,
  scenario: 'Build an AI agent to handle basic customer support questions. The agent should be able to answer common questions about products, shipping, and returns with high accuracy.',
  successCriteria: {
    accuracy: 85,
    maxLatency: 2000,
    maxCost: 10,
  },
  startingHand: ['context-basic', 'context-detailed', 'model-gpt35', 'model-gpt4', 'tool-search', 'tool-database', 'framework-sequential'],
  energyBudget: 10,
};

export const GameScreen: React.FC<GameScreenProps> = ({ onBack }) => {
  const [draggedCard, setDraggedCard] = useState<ICard | null>(null);
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [hand, setHand] = useState<ICard[]>(
    MOCK_LEVEL.startingHand.map(id => CARDS[id]).filter(Boolean)
  );
  const [board, setBoard] = useState<IBoard>({
    context: { type: 'context', card: null, required: true },
    model: { type: 'model', card: null, required: true },
    tools: { type: 'tools', card: null, required: false },
    framework: { type: 'framework', card: null, required: false },
    guardrails: { type: 'guardrails', card: null, required: false },
  });
  const [energyRemaining, setEnergyRemaining] = useState(MOCK_LEVEL.energyBudget);
  const slotRefs = useRef<Record<string, HTMLElement | null>>({});

  // Get valid slots for the dragged card
  const getValidSlots = (card: ICard | null): (keyof IBoard)[] => {
    if (!card) return [];
    switch (card.type) {
      case 'context': return ['context'];
      case 'model': return ['model'];
      case 'tool': return ['tools'];
      case 'framework': return ['framework'];
      case 'guardrail': return ['guardrails'];
      default: return [];
    }
  };

  // Handle card drag start
  const handleDragStart = (card: ICard) => {
    setDraggedCard(card);
    setSelectedCard(card);
  };

  // Handle card drag end
  const handleDragEnd = (card: ICard, _event: any, info: any) => {
    const { point } = info;
    let droppedOnSlot: keyof IBoard | null = null;

    // Auto-scroll logic - scroll page when dragging near top/bottom edges
    const scrollThreshold = 100;
    const scrollSpeed = 10;
    const viewportHeight = window.innerHeight;

    if (point.y < scrollThreshold) {
      window.scrollBy({ top: -scrollSpeed, behavior: 'smooth' });
    } else if (point.y > viewportHeight - scrollThreshold) {
      window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
    }

    // Check which slot the card was dropped on
    for (const [slotType, element] of Object.entries(slotRefs.current)) {
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
        droppedOnSlot = slotType as keyof IBoard;
        break;
      }
    }

    if (droppedOnSlot) {
      handleCardPlace(card, droppedOnSlot);
    }
    setDraggedCard(null);
  };

  // Handle placing a card in a slot
  const handleCardPlace = (card: ICard, slotType: keyof IBoard) => {
    const validSlots = getValidSlots(card);
    if (!validSlots.includes(slotType)) {
      alert(`Cannot place ${card.type} card in ${slotType} slot`);
      return;
    }
    if (card.energyCost > energyRemaining) {
      alert('Not enough energy!');
      return;
    }

    const slot = board[slotType];
    // If slot already has a card, return it to hand
    if (slot.card) {
      setHand([...hand, slot.card]);
      setEnergyRemaining(energyRemaining + slot.card.energyCost);
    }

    // Place new card
    setBoard({ ...board, [slotType]: { ...slot, card } });
    setHand(hand.filter(c => c.id !== card.id));
    setEnergyRemaining(energyRemaining - card.energyCost);
    setSelectedCard(null);
  };

  const handleCardClick = (card: ICard) => {
    if (card.energyCost <= energyRemaining) {
      setSelectedCard(card);
    }
  };

  const handleSlotClick = (slotType: keyof IBoard) => {
    if (selectedCard) {
      handleCardPlace(selectedCard, slotType);
    }
  };

  // Handle removing a card from a slot
  const handleCardRemove = (slotType: keyof IBoard) => {
    const slot = board[slotType];
    if (!slot.card) return;

    // Return card to hand and refund energy
    setHand([...hand, slot.card]);
    setEnergyRemaining(energyRemaining + slot.card.energyCost);

    // Clear slot
    setBoard({ ...board, [slotType]: { ...slot, card: null } });
  };

  const canSubmit = board.context.card !== null && board.model.card !== null;
  const highlightedSlots = getValidSlots(draggedCard);

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Back</span>
        </button>

        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
          <span className="text-white/60 text-sm">Level {MOCK_LEVEL.id}</span>
          <span className="text-white font-semibold">{MOCK_LEVEL.difficulty.toUpperCase()}</span>
        </div>
      </motion.div>

      {/* Level Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          {MOCK_LEVEL.title}
        </h1>

        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-3">Scenario</h2>
          <p className="text-white/80 mb-4">{MOCK_LEVEL.scenario}</p>

          <h3 className="text-lg font-semibold text-white mb-3">Success Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <Target className="w-6 h-6 text-green-300" />
              <div>
                <div className="text-white/60 text-sm">Accuracy</div>
                <div className="text-white font-bold">{MOCK_LEVEL.successCriteria.accuracy}%</div>
              </div>
            </div>
            {MOCK_LEVEL.successCriteria.maxLatency && (
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <Clock className="w-6 h-6 text-blue-300" />
                <div>
                  <div className="text-white/60 text-sm">Max Latency</div>
                  <div className="text-white font-bold">{MOCK_LEVEL.successCriteria.maxLatency}ms</div>
                </div>
              </div>
            )}
            {MOCK_LEVEL.successCriteria.maxCost && (
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-yellow-300" />
                <div>
                  <div className="text-white/60 text-sm">Max Cost</div>
                  <div className="text-white font-bold">{MOCK_LEVEL.successCriteria.maxCost} energy</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
        ref={(el) => {
          if (el) {
            // Store refs for all slots for drop detection
            Object.keys(board).forEach(slotType => {
              const slotEl = el.querySelector(`[data-slot="${slotType}"]`);
              if (slotEl) slotRefs.current[slotType] = slotEl as HTMLElement;
            });
          }
        }}
      >
        <Board
          board={board}
          onSlotClick={handleSlotClick}
          onCardRemove={handleCardRemove}
          highlightedSlots={highlightedSlots}
        />
      </motion.div>

      {/* Hand - with draggable cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">Your Hand</h3>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-bold">
                {energyRemaining} / {MOCK_LEVEL.energyBudget}
              </span>
              <span className="text-white/60 text-sm">Energy</span>
            </div>
          </div>

          {hand.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              No cards in hand
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto overflow-y-visible pb-2">
              {hand.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 relative"
                >
                  <Card
                    card={card}
                    onClick={() => handleCardClick(card)}
                    onDragStart={() => handleDragStart(card)}
                    onDragEnd={(event, info) => handleDragEnd(card, event, info)}
                    isDragging={draggedCard?.id === card.id}
                    isInHand={true}
                  />
                  {card.energyCost > energyRemaining && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center pointer-events-none">
                      <span className="text-red-300 font-bold text-sm">
                        Not Enough Energy
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-4 text-center text-white/60 text-sm">
            {draggedCard
              ? 'Drop card on a highlighted slot or click a slot to place it'
              : 'Drag cards to slots or click to select, then click a slot'}
          </div>
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mb-8"
      >
        <button
          disabled={!canSubmit}
          className={`
            px-8 py-4 rounded-lg font-bold text-lg
            transition-all transform
            ${canSubmit
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 shadow-lg'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
            }
          `}
        >
          {canSubmit ? 'Submit Design' : 'Place Required Cards (Context & Model)'}
        </button>
      </motion.div>
    </div>
  );
};
