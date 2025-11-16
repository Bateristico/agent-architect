import { motion } from 'framer-motion';
import { Zap } from './PixelIcon';
import { Card } from './Card';
import type { ICard } from '../game/types';

interface HandProps {
  cards: ICard[];
  energyRemaining: number;
  energyBudget: number;
  onCardClick?: (card: ICard) => void;
  selectedCardId?: string | null;
}

export const Hand: React.FC<HandProps> = ({
  cards,
  energyRemaining,
  energyBudget,
  onCardClick,
  selectedCardId,
}) => {
  return (
    <div className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Your Hand</h3>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
          <Zap className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-bold">
            {energyRemaining} / {energyBudget}
          </span>
          <span className="text-white/60 text-sm">Energy</span>
        </div>
      </div>

      {/* Cards */}
      {cards.length === 0 ? (
        <div className="text-center py-8 text-white/40">
          No cards in hand
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-2 px-2">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex-shrink-0 relative p-2
                ${selectedCardId === card.id ? 'ring-4 ring-white rounded-lg bg-white/5' : ''}
              `}
            >
              <Card
                card={card}
                onClick={() => onCardClick?.(card)}
                isInHand={true}
              />
              {/* Can't afford indicator */}
              {card.energyCost > energyRemaining && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                  <span className="text-red-300 font-bold text-sm">
                    Not Enough Energy
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-white/60 text-sm">
        {selectedCardId
          ? 'Click a slot on the board to place the selected card'
          : 'Click a card to select it, then click a slot to place it'}
      </div>
    </div>
  );
};
