import { motion } from 'framer-motion';
import { Play, Settings, Info } from 'lucide-react';
import { PixiBackground } from '../components/PixiBackground';

interface MainMenuScreenProps {
  onNavigate: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

// Spring physics configuration for bouncy animations
const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20
};

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onNavigate, onSettings, onAbout }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Floating card decorations in background */}
      <FloatingCards />

      {/* Content wrapper with z-index to appear above floating cards */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title with gradient effect and stroke */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1
            className="text-7xl md:text-9xl font-black mb-2 uppercase tracking-tight"
            style={{
              color: '#FFA726',
              textShadow: `
                5px 5px 0 #000000,
                0 0 40px rgba(255, 167, 38, 0.8)
              `
            }}
          >
            AGENT
          </h1>
          <h1
            className="text-7xl md:text-9xl font-black mb-8 uppercase tracking-tight"
            style={{
              color: '#42A5F5',
              textShadow: `
                5px 5px 0 #000000,
                0 0 40px rgba(66, 165, 245, 0.8)
              `
            }}
          >
            ARCHITECT
          </h1>
          <p className="text-xl md:text-2xl font-bold tracking-wide uppercase"
             style={{
               color: '#FFFFFF',
               textShadow: '3px 3px 6px rgba(0, 0, 0, 1), 0 0 20px rgba(255, 255, 255, 0.5)'
             }}
          >
            An AI Architecture Design Game
          </p>
        </motion.div>

        {/* Menu Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.2 }}
          className="flex flex-col gap-6 w-full max-w-2xl"
        >
          <MenuButton
            icon={<Play className="w-12 h-12" />}
            label="PLAY"
            onClick={onNavigate}
            delay={0.3}
            gradient="from-orange-500 via-orange-400 to-yellow-400"
            glowColor="rgba(255, 167, 38, 0.8)"
          />
          <MenuButton
            icon={<Settings className="w-12 h-12" />}
            label="SETTINGS"
            onClick={onSettings}
            delay={0.4}
            gradient="from-blue-500 via-blue-400 to-cyan-400"
            glowColor="rgba(66, 165, 245, 0.8)"
          />
          <MenuButton
            icon={<Info className="w-12 h-12" />}
            label="ABOUT"
            onClick={onAbout}
            delay={0.5}
            gradient="from-purple-500 via-purple-400 to-pink-400"
            glowColor="rgba(171, 71, 188, 0.8)"
          />
        </motion.div>

        {/* Version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-gray-400 text-sm font-medium"
        >
          v1.0.0 - Local Edition
        </motion.div>
      </div>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
  gradient: string;
  glowColor: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onClick, delay, gradient, glowColor }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...springConfig, delay }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-6 bg-gradient-to-r ${gradient}
                 rounded-2xl px-12 py-8 text-white text-4xl font-black uppercase
                 shadow-lg hover:shadow-2xl transition-all duration-200
                 border-4 border-white/30`}
      style={{
        boxShadow: `0 0 25px ${glowColor}, inset 0 2px 10px rgba(255, 255, 255, 0.3)`,
        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)'
      }}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};

// Floating card decorations component
const FloatingCards: React.FC = () => {
  const cards = [
    { id: 1, x: '10%', y: '20%', delay: 0, color: 'from-purple-500/20 to-pink-500/20' },
    { id: 2, x: '85%', y: '15%', delay: 0.5, color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 3, x: '15%', y: '75%', delay: 1, color: 'from-pink-500/20 to-orange-500/20' },
    { id: 4, x: '80%', y: '70%', delay: 1.5, color: 'from-cyan-500/20 to-purple-500/20' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={`absolute w-24 h-32 bg-gradient-to-br ${card.color} rounded-lg backdrop-blur-sm border border-white/10`}
          style={{
            left: card.x,
            top: card.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
            rotate: [-15, 15, -15],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            delay: card.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
