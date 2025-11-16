import { motion } from 'framer-motion';
import type { ICard } from '../game/types';

interface BoardSlotProps {
  type: 'context' | 'model' | 'tools' | 'framework' | 'guardrails';
  card: ICard | null;
  onRemove: () => void;
}

// Pixel art SVG icon components
const PixelIcon: React.FC<{ type: string; size: number; color?: string }> = ({ type, size, color = 'currentColor' }) => {
  const iconPaths: Record<string, string> = {
    context: "M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-2 2H7v2h10V7zM7 11h10v2H7v-2zm7 4H7v2h7v-2z",
    model: "M20 3H2v14h8v2H8v2h8v-2h-2v-2h8V3h-2zm-6 12H4V5h16v10h-6z",
    tools: "M17 4h2v10h-2V4zm0 12h-2v2h2v2h2v-2h2v-2h-4zm-4-6h-2v10h2V10zm-8 2H3v2h2v6h2v-6h2v-2H5zm8-8h-2v2H9v2h6V6h-2V4zM5 4h2v6H5V4z",
    framework: "M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z",
    guardrails: "M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z",
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

// Get card type display name
const getCardTypeName = (type: string): string => {
  switch (type) {
    case 'context': return 'CONTEXT';
    case 'model': return 'MODEL';
    case 'tools': return 'TOOL';
    case 'framework': return 'FRAMEWORK';
    case 'guardrails': return 'GUARDRAIL';
    default: return type.toUpperCase();
  }
};

// Get CSS variable name for card type
const getCardColorVar = (type: string): string => {
  const typeMap: Record<string, string> = {
    'context': 'context',
    'model': 'model',
    'tools': 'tool',
    'framework': 'framework',
    'guardrails': 'guardrail'
  };
  return typeMap[type] || type;
};

export const BoardSlot: React.FC<BoardSlotProps> = ({ type, card, onRemove }) => {
  const colorVar = getCardColorVar(type);
  const typeName = getCardTypeName(type);

  return (
    <motion.div
      onClick={() => card && onRemove()}
      whileHover={card ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={{ scale: 0.98 }}
      className={`relative p-1 ${
        card ? `slot-gradient-${colorVar}` : ''
      }`}
      style={{
        width: '140px',
        height: '200px',
        background: card ? undefined : 'var(--card)',
        border: `3px ${card ? 'solid' : 'dashed'} ${card ? `var(--${colorVar}-color)` : 'rgba(255, 255, 255, 0.3)'}`,
        transition: 'all 200ms ease-out',
        cursor: card ? 'pointer' : 'default'
      }}
    >
      {card ? (
        <div
          className="w-full h-full flex flex-col relative overflow-hidden"
          style={{
            background: `color-mix(in srgb, var(--${colorVar}-dark) 80%, #000000 20%)`,
            border: `2px solid rgba(0, 0, 0, 0.3)`
          }}
        >
          {/* Header with message and cost */}
          <div className="flex items-start justify-between p-2 flex-shrink-0">
            {/* Message icon - Top Left */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Message icon clicked for card:', card.id);
              }}
              className="z-10 flex items-center gap-1"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #000000',
                cursor: 'pointer',
                transition: 'all 100ms ease-out',
                padding: '3px 6px',
                boxShadow: '2px 2px 0px #000000'
              }}
            >
              <PixelIcon type="message" size={12} color="#000000" />
            </button>

            {/* Energy cost - Top Right */}
            <div
              className="flex items-center gap-1 z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #000000',
                padding: '3px 6px',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                boxShadow: '2px 2px 0px #000000',
                lineHeight: '1'
              }}
            >
              <PixelIcon type="zap" size={12} color="#FFD700" />
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
                width: '56px',
                height: '56px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #000000'
              }}
            >
              <PixelIcon type={type} size={40} color="#000000" />
            </div>
          </div>

          {/* Banner at bottom with card name */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 12px',
              borderTop: '2px solid rgba(0, 0, 0, 0.7)'
            }}
          >
            <div
              className="text-xs font-bold text-center leading-tight"
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
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div style={{ opacity: 0.3 }}>
            <PixelIcon type={type} size={48} />
          </div>
          <div
            className="text-[10px] uppercase text-center"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--muted-foreground)' }}
          >
            {typeName} SLOT
          </div>
        </div>
      )}
    </motion.div>
  );
};
