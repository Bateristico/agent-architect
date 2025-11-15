import { motion } from 'framer-motion';
import { Sparkles, Zap, Wrench, GitBranch, Shield } from 'lucide-react';
import type { ICard } from '../game/types';

interface CardProps {
  card: ICard;
  onClick?: () => void;
  isInHand?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (event: any, info: any) => void;
  isDragging?: boolean;
}

const CARD_COLORS: Record<string, { gradient: string; border: string; icon: string }> = {
  context: {
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-400',
    icon: 'text-blue-300',
  },
  model: {
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-400',
    icon: 'text-purple-300',
  },
  tool: {
    gradient: 'from-green-500 to-emerald-500',
    border: 'border-green-400',
    icon: 'text-green-300',
  },
  framework: {
    gradient: 'from-orange-500 to-red-500',
    border: 'border-orange-400',
    icon: 'text-orange-300',
  },
  guardrail: {
    gradient: 'from-gray-500 to-slate-600',
    border: 'border-gray-400',
    icon: 'text-gray-300',
  },
};

const CARD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  context: Sparkles,
  model: Zap,
  tool: Wrench,
  framework: GitBranch,
  guardrail: Shield,
};

export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  isInHand = true,
  onDragStart,
  onDragEnd,
  isDragging = false,
}) => {
  const colors = CARD_COLORS[card.type];
  const Icon = CARD_ICONS[card.type];

  return (
    <motion.div
      drag={isInHand}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={isInHand ? { scale: 1.05, y: -5 } : {}}
      whileTap={isInHand ? { scale: 0.95 } : {}}
      whileDrag={{ scale: 1.1, rotate: 5, zIndex: 9999 }}
      onClick={onClick}
      style={{ position: isDragging ? 'fixed' : 'relative' }}
      className={`
        w-[150px] h-[200px] rounded-lg overflow-hidden
        ${isInHand ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        shadow-lg hover:shadow-xl transition-shadow
        ${isDragging ? 'shadow-2xl' : ''}
      `}
    >
      {/* Card Background with Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-90`} />

      {/* Border Glow */}
      <div className={`absolute inset-0 border-2 ${colors.border} rounded-lg`} />

      {/* Content */}
      <div className="relative h-full p-3 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <Icon className={`w-5 h-5 ${colors.icon}`} />
          <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3 text-yellow-300" />
            <span className="text-white text-xs font-bold">{card.energyCost}</span>
          </div>
        </div>

        {/* Card Name */}
        <h3 className="text-white font-bold text-sm mb-1 leading-tight">
          {card.name}
        </h3>

        {/* Card Type */}
        <div className="bg-black/20 px-2 py-0.5 rounded mb-2 inline-block self-start">
          <span className="text-white/80 text-xs uppercase tracking-wide">
            {card.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/90 text-xs leading-tight mb-2 flex-1 overflow-hidden">
          {card.description}
        </p>

        {/* Quick Stats */}
        <div className="space-y-1">
          {card.pros.length > 0 && (
            <div className="text-xs">
              <span className="text-green-200 font-semibold">+</span>
              <span className="text-white/80 ml-1">{card.pros[0]}</span>
            </div>
          )}
          {card.cons.length > 0 && (
            <div className="text-xs">
              <span className="text-red-200 font-semibold">-</span>
              <span className="text-white/80 ml-1">{card.cons[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Overlay for Details */}
      {isInHand && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/90 p-3 overflow-y-auto"
        >
          <div className="text-white space-y-2">
            <h4 className="font-bold text-sm mb-2">{card.name}</h4>

            <div>
              <p className="text-xs text-green-300 font-semibold mb-1">Pros:</p>
              <ul className="text-xs space-y-0.5">
                {card.pros.map((pro, i) => (
                  <li key={i} className="text-white/80">• {pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-red-300 font-semibold mb-1">Cons:</p>
              <ul className="text-xs space-y-0.5">
                {card.cons.map((con, i) => (
                  <li key={i} className="text-white/80">• {con}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs text-blue-300 font-semibold mb-1">Best For:</p>
              <ul className="text-xs space-y-0.5">
                {card.bestFor.map((use, i) => (
                  <li key={i} className="text-white/80">• {use}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
