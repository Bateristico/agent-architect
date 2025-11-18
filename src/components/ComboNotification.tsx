import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap } from './PixelIcon';
import { useEffect, useState } from 'react';

interface ComboNotificationProps {
  comboName: string | null;
  onDismiss: () => void;
}

export const ComboNotification: React.FC<ComboNotificationProps> = ({
  comboName,
  onDismiss,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (comboName) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onDismiss, 500); // Wait for exit animation
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [comboName, onDismiss]);

  return (
    <AnimatePresence>
      {show && comboName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          {/* Combo Card */}
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-lg blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Content */}
            <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 border-4 border-yellow-400 rounded-lg p-6 shadow-2xl min-w-[320px]">
              {/* Zap Animation */}
              <div className="absolute top-2 right-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Zap className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </div>

              {/* Badge */}
              <div className="flex items-center justify-center mb-3">
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="bg-yellow-400 px-4 py-1 rounded-full"
                >
                  <span className="text-purple-900 font-bold text-xs uppercase tracking-wider">
                    Combo Discovered!
                  </span>
                </motion.div>
              </div>

              {/* Combo Name */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-yellow-300" />
                <h2 className="text-2xl font-bold text-white text-center">
                  {comboName}
                </h2>
                <Heart className="w-8 h-8 text-yellow-300" />
              </div>

              {/* Subtitle */}
              <p className="text-purple-200 text-center text-sm">
                Perfect card combination!
              </p>

              {/* Particle Effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 100,
                    y: Math.sin((i * Math.PI * 2) / 8) * 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
