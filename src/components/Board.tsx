import { motion } from 'framer-motion';
import { Sparkles, Zap, Wrench, GitBranch, Shield, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import type { IBoard } from '../game/types';

interface BoardProps {
  board: IBoard;
  onSlotClick?: (slotType: keyof IBoard) => void;
}

const SLOT_CONFIG = {
  context: {
    label: 'Context',
    icon: Sparkles,
    color: 'border-blue-400 bg-blue-500/10',
    position: { row: 1, col: 1 },
  },
  model: {
    label: 'Model',
    icon: Zap,
    color: 'border-purple-400 bg-purple-500/10',
    position: { row: 1, col: 2 },
  },
  tools: {
    label: 'Tools',
    icon: Wrench,
    color: 'border-green-400 bg-green-500/10',
    position: { row: 2, col: 1 },
  },
  framework: {
    label: 'Framework',
    icon: GitBranch,
    color: 'border-orange-400 bg-orange-500/10',
    position: { row: 2, col: 2 },
  },
  guardrails: {
    label: 'Guardrails',
    icon: Shield,
    color: 'border-gray-400 bg-gray-500/10',
    position: { row: 2, col: 3 },
  },
};

export const Board: React.FC<BoardProps> = ({ board, onSlotClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg">
      {/* Title */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Agent Architecture</h2>
        <p className="text-white/60 text-sm">Design your AI system by placing cards in the slots</p>
      </div>

      {/* Architecture Diagram */}
      <div className="relative">
        {/* User Input */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 border-2 border-white/20 rounded-lg px-4 py-2 text-white font-semibold">
            User Input
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-4">
          <ArrowRight className="w-6 h-6 text-white/40 transform rotate-90" />
        </div>

        {/* Row 1: Context & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <BoardSlot
            slotType="context"
            config={SLOT_CONFIG.context}
            card={board.context.card}
            required={board.context.required}
            onClick={() => onSlotClick?.('context')}
          />
          <BoardSlot
            slotType="model"
            config={SLOT_CONFIG.model}
            card={board.model.card}
            required={board.model.required}
            onClick={() => onSlotClick?.('model')}
          />
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-4">
          <ArrowRight className="w-6 h-6 text-white/40 transform rotate-90" />
        </div>

        {/* Row 2: Tools, Framework, Guardrails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <BoardSlot
            slotType="tools"
            config={SLOT_CONFIG.tools}
            card={board.tools.card}
            required={board.tools.required}
            onClick={() => onSlotClick?.('tools')}
          />
          <BoardSlot
            slotType="framework"
            config={SLOT_CONFIG.framework}
            card={board.framework.card}
            required={board.framework.required}
            onClick={() => onSlotClick?.('framework')}
          />
          <BoardSlot
            slotType="guardrails"
            config={SLOT_CONFIG.guardrails}
            card={board.guardrails.card}
            required={board.guardrails.required}
            onClick={() => onSlotClick?.('guardrails')}
          />
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center mb-4">
          <ArrowRight className="w-6 h-6 text-white/40 transform rotate-90" />
        </div>

        {/* Output */}
        <div className="flex justify-center">
          <div className="bg-white/10 border-2 border-white/20 rounded-lg px-4 py-2 text-white font-semibold">
            Agent Output
          </div>
        </div>
      </div>
    </div>
  );
};

interface BoardSlotProps {
  slotType: keyof IBoard;
  config: typeof SLOT_CONFIG[keyof typeof SLOT_CONFIG];
  card: any;
  required: boolean;
  onClick: () => void;
}

const BoardSlot: React.FC<BoardSlotProps> = ({ config, card, required, onClick }) => {
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        relative min-h-[240px] rounded-lg border-2 ${config.color}
        flex flex-col items-center justify-center p-4
        ${!card ? 'cursor-pointer hover:border-white/40' : ''}
        transition-all
      `}
    >
      {card ? (
        // Show placed card
        <div className="flex items-center justify-center">
          <Card card={card} isInHand={false} />
        </div>
      ) : (
        // Show empty slot
        <div className="text-center">
          <Icon className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">{config.label}</h3>
          {required && (
            <span className="text-xs text-red-300 font-semibold">Required</span>
          )}
          <div className="mt-2 w-16 h-16 border-2 border-dashed border-white/20 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-white/40 text-3xl">?</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Click to place card</p>
        </div>
      )}
    </motion.div>
  );
};
