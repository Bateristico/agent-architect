import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Loading Component
 *
 * Displays a retro-styled loading indicator with optional message
 *
 * Usage:
 * <Loading message="Loading level..." size="large" />
 */
export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 'medium',
}) => {
  const sizeMap = {
    small: { spinner: 24, text: '12px' },
    medium: { spinner: 48, text: '16px' },
    large: { spinner: 64, text: '20px' },
  };

  const dimensions = sizeMap[size];

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 min-h-[200px]"
      style={{
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Animated Spinner */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          width: dimensions.spinner,
          height: dimensions.spinner,
          border: '4px solid var(--border)',
          borderTop: '4px solid var(--accent)',
          borderRadius: '0',
        }}
      />

      {/* Loading Message */}
      {message && (
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: dimensions.text,
            color: 'var(--foreground)',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};
