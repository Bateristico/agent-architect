import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Clock, DollarSign } from 'lucide-react';
import { Board } from '../components/Board';
import { Hand } from '../components/Hand';
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

  const handleCardClick = (card: ICard) => {
    if (card.energyCost <= energyRemaining) {
      setSelectedCard(card);
    }
  };

  const handleSlotClick = (slotType: keyof IBoard) => {
    if (!selectedCard) return;

    // Check if card type matches slot (with some flexibility)
    const slot = board[slotType];
    const canPlace =
      (slotType === 'context' && selectedCard.type === 'context') ||
      (slotType === 'model' && selectedCard.type === 'model') ||
      (slotType === 'tools' && selectedCard.type === 'tool') ||
      (slotType === 'framework' && selectedCard.type === 'framework') ||
      (slotType === 'guardrails' && selectedCard.type === 'guardrail');

    if (!canPlace) {
      alert(`Cannot place ${selectedCard.type} card in ${slotType} slot`);
      return;
    }

    // If slot already has a card, return it to hand
    if (slot.card) {
      setHand([...hand, slot.card]);
      setEnergyRemaining(energyRemaining + slot.card.energyCost);
    }

    // Place new card
    setBoard({
      ...board,
      [slotType]: { ...slot, card: selectedCard },
    });

    // Remove card from hand and deduct energy
    setHand(hand.filter(c => c.id !== selectedCard.id));
    setEnergyRemaining(energyRemaining - selectedCard.energyCost);
    setSelectedCard(null);
  };

  const canSubmit = board.context.card !== null && board.model.card !== null;

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
      >
        <Board board={board} onSlotClick={handleSlotClick} />
      </motion.div>

      {/* Hand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Hand
          cards={hand}
          energyRemaining={energyRemaining}
          energyBudget={MOCK_LEVEL.energyBudget}
          onCardClick={handleCardClick}
          selectedCardId={selectedCard?.id}
        />
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
