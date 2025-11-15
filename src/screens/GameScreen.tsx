import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Clock, DollarSign } from 'lucide-react';
import { Board } from '../components/Board';
import { Card } from '../components/Card';
import { CARDS } from '../game/cards';
import { getLevelByNumber } from '../content';
import { useGameStore } from '../store/gameStore';
import type { IBoard, ICard } from '../game/types';

interface GameScreenProps {
  onBack: () => void;
  onSubmit?: (board: IBoard) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onBack, onSubmit }) => {
  const { progress } = useGameStore();

  // Load current level data
  const currentLevel = progress.currentLevel ? getLevelByNumber(progress.currentLevel) : null;

  // Fallback to Level 1 if no level is set
  const levelData = currentLevel || getLevelByNumber(1);

  if (!levelData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Level not found</div>;
  }

  const [draggedCard, setDraggedCard] = useState<ICard | null>(null);
  const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
  const [hand, setHand] = useState<ICard[]>(
    levelData.availableCards.map((id: string) => CARDS[id]).filter(Boolean)
  );
  const [board, setBoard] = useState<IBoard>({
    context: { type: 'context', card: null, required: levelData.requiredSlots.context },
    model: { type: 'model', card: null, required: levelData.requiredSlots.model },
    tools: { type: 'tools', card: null, required: levelData.requiredSlots.tools },
    framework: { type: 'framework', card: null, required: levelData.requiredSlots.framework },
    guardrails: { type: 'guardrails', card: null, required: levelData.requiredSlots.guardrails },
  });
  const [energyRemaining, setEnergyRemaining] = useState(levelData.energyBudget);
  const [mouseY, setMouseY] = useState(0);
  const slotRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollIntervalRef = useRef<number | null>(null);

  // Auto-scroll effect when dragging near screen edges
  useEffect(() => {
    if (!draggedCard) {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Set up scroll interval
    scrollIntervalRef.current = window.setInterval(() => {
      const scrollThreshold = 100;
      const scrollSpeed = 5;
      const viewportHeight = window.innerHeight;

      if (mouseY < scrollThreshold && mouseY > 0) {
        window.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
      } else if (mouseY > viewportHeight - scrollThreshold) {
        window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
      }
    }, 16); // ~60fps

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [draggedCard, mouseY]);

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
  const handleDragEnd = (card: ICard, event: any) => {
    // Use the mouse position from the actual mouse event instead of Framer's transform-based point
    const mouseEvent = event as MouseEvent;
    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;

    let droppedOnSlot: keyof IBoard | null = null;
    let maxOverlap = 0;

    // Calculate card bounds based on MOUSE position (150x200 card size, scaled by 1.1 during drag)
    const cardWidth = 150 * 1.1;
    const cardHeight = 200 * 1.1;
    const cardRect = {
      left: mouseX - cardWidth / 2,
      right: mouseX + cardWidth / 2,
      top: mouseY - cardHeight / 2,
      bottom: mouseY + cardHeight / 2,
    };

    // Get valid slots for this card type
    const validSlots = getValidSlots(card);

    // Find the slot with maximum overlap
    for (const [slotType, element] of Object.entries(slotRefs.current)) {
      if (!element) continue;

      // Skip if not a valid slot for this card type
      if (!validSlots.includes(slotType as keyof IBoard)) continue;

      const rect = element.getBoundingClientRect();

      // Calculate overlap between card and slot
      const overlapLeft = Math.max(cardRect.left, rect.left);
      const overlapRight = Math.min(cardRect.right, rect.right);
      const overlapTop = Math.max(cardRect.top, rect.top);
      const overlapBottom = Math.min(cardRect.bottom, rect.bottom);

      // Check if there is any overlap
      if (overlapLeft < overlapRight && overlapTop < overlapBottom) {
        const overlapWidth = overlapRight - overlapLeft;
        const overlapHeight = overlapBottom - overlapTop;
        const overlapArea = overlapWidth * overlapHeight;

        // Use the slot with the largest overlap
        if (overlapArea > maxOverlap) {
          maxOverlap = overlapArea;
          droppedOnSlot = slotType as keyof IBoard;
        }
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
          <span className="text-white/60 text-sm">Level {levelData.number}</span>
          <span className="text-white font-semibold">{levelData.difficulty.toUpperCase()}</span>
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
          {levelData.title}
        </h1>

        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-3">Scenario</h2>
          <p className="text-white/80 mb-4">{levelData.scenario}</p>

          <h3 className="text-lg font-semibold text-white mb-3">Success Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
              <Target className="w-6 h-6 text-green-300" />
              <div>
                <div className="text-white/60 text-sm">Accuracy</div>
                <div className="text-white font-bold">{levelData.successCriteria.accuracy}%</div>
              </div>
            </div>
            {levelData.successCriteria.maxLatency && (
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <Clock className="w-6 h-6 text-blue-300" />
                <div>
                  <div className="text-white/60 text-sm">Max Latency</div>
                  <div className="text-white font-bold">{levelData.successCriteria.maxLatency}ms</div>
                </div>
              </div>
            )}
            {levelData.successCriteria.maxCost && (
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                <DollarSign className="w-6 h-6 text-yellow-300" />
                <div>
                  <div className="text-white/60 text-sm">Max Cost</div>
                  <div className="text-white font-bold">{levelData.successCriteria.maxCost} energy</div>
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
                {energyRemaining} / {levelData.energyBudget}
              </span>
              <span className="text-white/60 text-sm">Energy</span>
            </div>
          </div>

          {hand.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              No cards in hand
            </div>
          ) : (
            <div className="relative">
              <div
                className="flex justify-center items-center gap-4 pb-2 flex-wrap"
                style={{ overflow: 'visible', minHeight: '220px' }}
              >
                {hand.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0"
                    style={{ position: 'relative', zIndex: draggedCard?.id === card.id ? 9999 : 1 }}
                  >
                    <Card
                      card={card}
                      onClick={() => handleCardClick(card)}
                      onDragStart={() => handleDragStart(card)}
                      onDragEnd={(event) => handleDragEnd(card, event)}
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
          onClick={() => {
            if (canSubmit && onSubmit) {
              onSubmit(board);
            }
          }}
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
