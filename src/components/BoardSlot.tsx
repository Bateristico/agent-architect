import React from 'react';
import { motion } from 'framer-motion';
import type { ICard } from '../game/types';

interface BoardSlotProps {
  type: 'context' | 'model' | 'tools' | 'framework' | 'guardrails';
  card: ICard | null;
  onRemove: () => void;
}

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

  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={{ display: 'block' }}>
      <path d={iconPaths[type] || iconPaths.context} fill={color} />
    </svg>
  );
};

const getCardTypeName = (type: string): string => {
  const names: Record<string, string> = {
    context: 'CONTEXT',
    model: 'MODEL',
    tools: 'TOOL',
    framework: 'FRAMEWORK',
    guardrails: 'GUARDRAIL'
  };
  return names[type] || type.toUpperCase();
};

const getCardColorVar = (type: string): string => {
  const map: Record<string, string> = {
    context: 'context',
    model: 'model',
    tools: 'tool',
    framework: 'framework',
    guardrails: 'guardrail'
  };
  return map[type] || type;
};

export const BoardSlot = React.memo<BoardSlotProps>(({ type, card, onRemove }) => {
  const typeName = getCardTypeName(type);
  const colorVar = getCardColorVar(type);

  return (
    <motion.div
      onClick={() => card && onRemove()}
      whileHover={card ? { scale: 1.05, rotate: 2 } : {}}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '140px',
        height: '200px',
        background: card ? undefined : 'var(--card)',
        border: card ? `3px solid var(--${colorVar}-color)` : '3px dashed var(--border)',
        boxShadow: card ? `0 0 15px rgba(var(--${colorVar}-rgb), 0.4), var(--shadow-xs)` : 'var(--shadow-xs)',
        cursor: card ? 'pointer' : 'default',
        transition: 'all 150ms ease-out',
      }}
      className={`relative p-1 ${card ? `slot-gradient-${colorVar}` : ''}`}
    >
      {card ? (
        <div
          className="w-full h-full flex flex-col relative overflow-hidden"
          style={{
            background: `color-mix(in srgb, var(--${colorVar}-dark) 80%, #000000 20%)`,
            border: '2px solid rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex items-start justify-between p-2 flex-shrink-0">
            <button
              onClick={(e) => e.stopPropagation()}
              className="z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #000000',
                padding: '3px 5px',
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              <PixelIcon type="message" size={11} color="#000000" />
            </button>
            <div
              className="z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #000000',
                padding: '3px 5px',
                boxShadow: '2px 2px 0px #000000',
              }}
            >
              <PixelIcon type="zap" size={11} color="#FFD700" />
              <span style={{ fontSize: '11px', color: '#000000', fontWeight: 'bold' }}>{card.energyCost}</span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1">
            <div style={{ width: '56px', height: '56px', background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #000000' }}>
              <PixelIcon type={type} size={40} color="#000000" />
            </div>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '8px 12px', borderTop: '2px solid rgba(0, 0, 0, 0.7)' }}>
            <div className="text-xs font-bold text-center" style={{ color: '#ffffff' }}>
              {card.name}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <div style={{ opacity: 0.3 }}>
            <PixelIcon type={type} size={48} />
          </div>
          <div className="text-xs uppercase text-center" style={{ color: 'var(--muted-foreground)' }}>
            {typeName} SLOT
          </div>
        </div>
      )}
    </motion.div>
  );
});

BoardSlot.displayName = 'BoardSlot';
