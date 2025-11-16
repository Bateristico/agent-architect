import { motion } from 'framer-motion';
import { MoonStars, Zap, Code, GitBranch, Shield } from './PixelIcon';
import type { ICard } from '../game/types';

interface CardProps {
  card: ICard;
  onClick?: () => void;
  isInHand?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (event: any, info: any) => void;
  isDragging?: boolean;
}

const CARD_COLORS: Record<string, { gradient: string; border: string; icon: string; shadow: string; iconBg: string }> = {
  context: {
    gradient: 'from-blue-500 to-blue-600',
    border: 'border-blue-400',
    icon: 'text-blue-900',
    shadow: 'hover:shadow-blue-500/50',
    iconBg: 'bg-blue-100',
  },
  model: {
    gradient: 'from-purple-500 to-purple-600',
    border: 'border-purple-400',
    icon: 'text-purple-900',
    shadow: 'hover:shadow-purple-500/50',
    iconBg: 'bg-purple-100',
  },
  tool: {
    gradient: 'from-teal-500 to-teal-600',
    border: 'border-teal-400',
    icon: 'text-teal-900',
    shadow: 'hover:shadow-teal-500/50',
    iconBg: 'bg-teal-100',
  },
  framework: {
    gradient: 'from-orange-500 to-orange-600',
    border: 'border-orange-400',
    icon: 'text-orange-900',
    shadow: 'hover:shadow-orange-500/50',
    iconBg: 'bg-orange-100',
  },
  guardrail: {
    gradient: 'from-red-500 to-red-600',
    border: 'border-red-400',
    icon: 'text-red-900',
    shadow: 'hover:shadow-red-500/50',
    iconBg: 'bg-red-100',
  },
};

const CARD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  context: MoonStars,
  model: Zap,
  tool: Code,
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
      dragElastic={0}
      dragTransition={{ power: 0, timeConstant: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileHover={isInHand && !isDragging ? { scale: 1.03, y: -3 } : {}}
      whileTap={isInHand && !isDragging ? { scale: 0.98 } : {}}
      whileDrag={{ scale: 1.05, zIndex: 9999 }}
      onClick={onClick}
      animate={isDragging ? {} : { x: 0, y: 0 }}
      className={`
        w-[160px] h-[220px] rounded-lg overflow-hidden
        ${isInHand ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
        shadow-lg ${!isDragging ? colors.shadow : ''}
        ${isDragging ? 'shadow-2xl' : ''}
      `}
      style={{
        position: isInHand ? 'relative' : 'relative',
        zIndex: isDragging ? 9999 : 1,
      }}
    >
      {/* Card Background with Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-90`} />

      {/* Border Glow */}
      <div className={`absolute inset-0 border-2 ${colors.border} rounded-lg`} />

      {/* Content */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Header with Icon and Cost */}
        <div className="flex items-center justify-between mb-3">
          {/* Icon on Light Background Square */}
          <div className={`w-12 h-12 ${colors.iconBg} rounded-md flex items-center justify-center`}>
            <Icon className={`w-7 h-7 ${colors.icon}`} />
          </div>

          {/* Cost Badge on White Background */}
          <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_#000]">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-black text-sm font-bold">{card.energyCost}</span>
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
        <p className="text-white/90 text-xs leading-tight mb-3 flex-1 overflow-hidden">
          {card.description}
        </p>

        {/* Quick Stats - Fixed Height Containers */}
        <div className="space-y-1.5">
          {/* Pro - Always same size */}
          <div className="h-8 bg-black/20 rounded px-2 py-1 flex items-start">
            {card.pros.length > 0 ? (
              <>
                <span className="text-green-300 font-bold text-xs mr-1">+</span>
                <span className="text-white/90 text-xs leading-tight">{card.pros[0]}</span>
              </>
            ) : (
              <span className="text-white/40 text-xs italic">No pros listed</span>
            )}
          </div>

          {/* Con - Always same size */}
          <div className="h-8 bg-black/20 rounded px-2 py-1 flex items-start">
            {card.cons.length > 0 ? (
              <>
                <span className="text-red-300 font-bold text-xs mr-1">-</span>
                <span className="text-white/90 text-xs leading-tight">{card.cons[0]}</span>
              </>
            ) : (
              <span className="text-white/40 text-xs italic">No cons listed</span>
            )}
          </div>
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
