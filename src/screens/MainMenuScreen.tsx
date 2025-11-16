import { motion } from 'framer-motion';
import { PixiBackground } from '../components/PixiBackground';

interface MainMenuScreenProps {
  onNavigate: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

// Arcade-snappy animation config
const arcadeConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  duration: 0.1
};

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onNavigate, onSettings, onAbout }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #2d1b3d 0%, #1a0f24 50%, #4a2859 100%)'
         }}>
      {/* PixiJS animated particle background */}
      <PixiBackground />

      {/* Pixel grid background pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          zIndex: 0
        }}
      />

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
        style={{
          background: 'rgba(45, 27, 61, 0.9)',
          border: '4px solid #ffffff',
          boxShadow: '8px 8px 0px #000000, 0 0 20px rgba(255, 255, 255, 0.1)',
          padding: '60px',
          backdropFilter: 'blur(2px)'
        }}
      >
        <div className="text-center">
          {/* Logo with animated rainbow background */}
          <div className="relative inline-block mb-5">
            <div
              className="absolute -inset-4 rounded-lg opacity-30"
              style={{
                background: 'conic-gradient(#ffaa00 0deg, #00d9ff 72deg, #ff00ff 144deg, #ff1493 216deg, #00ff88 288deg, #ffaa00 360deg)',
                animation: 'spin 8s linear infinite'
              }}
            />
            <h1
              className="relative z-10 text-5xl md:text-6xl font-black uppercase tracking-tight"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                color: '#ffaa00',
                textShadow: `
                  2px 2px 0px #000000,
                  0 0 10px #ffaa00,
                  0 0 20px #ffaa00,
                  0 0 30px #ff6600
                `,
                animation: 'pulse-glow 2s ease-in-out infinite alternate'
              }}
            >
              AGENTCRAFT
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="text-sm md:text-base mb-10 uppercase tracking-wide"
            style={{
              fontFamily: "'Silkscreen', monospace",
              color: '#00d9ff',
              textShadow: '1px 1px 0px #000000, 0 0 8px #00d9ff'
            }}
          >
            LEARN AI DESIGN, CARD BY CARD
          </p>

          {/* Menu Buttons */}
          <div className="space-y-6">
            <MenuButton
              icon="▶"
              label="PLAY"
              onClick={onNavigate}
              delay={0.1}
              bgColor="#00ff88"
              textColor="#2d1b3d"
              glowColor="#00ff88"
            />
            <MenuButton
              icon="⚙"
              label="SETTINGS"
              onClick={onSettings}
              delay={0.2}
              bgColor="#00d9ff"
              textColor="#2d1b3d"
              glowColor="#00d9ff"
            />
            <MenuButton
              icon="ℹ"
              label="ABOUT"
              onClick={onAbout}
              delay={0.3}
              bgColor="#ff00ff"
              textColor="#ffffff"
              glowColor="#ff00ff"
            />
          </div>

          {/* Version */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-xs"
            style={{
              fontFamily: "'Silkscreen', monospace",
              color: '#d4a5f5',
              textShadow: '1px 1px 0px #000000'
            }}
          >
            v1.0.0 - Local Edition
          </motion.div>
        </div>
      </motion.div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          from {
            text-shadow:
              2px 2px 0px #000000,
              0 0 10px #ffaa00,
              0 0 20px #ffaa00,
              0 0 30px #ff6600;
          }
          to {
            text-shadow:
              2px 2px 0px #000000,
              0 0 15px #ffaa00,
              0 0 25px #ffaa00,
              0 0 40px #ff6600;
          }
        }
      `}</style>
    </div>
  );
};

interface MenuButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
  delay: number;
  bgColor: string;
  textColor: string;
  glowColor: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onClick, delay, bgColor, textColor, glowColor }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...arcadeConfig, delay }}
      whileHover={{
        scale: 1.08,
        rotate: 1,
        boxShadow: `6px 6px 0px #000000, 0 0 15px ${glowColor}`,
        outline: `2px solid ${glowColor}`,
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.95,
        boxShadow: '2px 2px 0px #000000',
        transition: { duration: 0.08 }
      }}
      onClick={onClick}
      className="w-64 mx-auto block px-8 py-4 text-sm font-black uppercase relative overflow-hidden"
      style={{
        fontFamily: "'Press Start 2P', monospace",
        backgroundColor: bgColor,
        color: textColor,
        border: `4px solid ${bgColor}`,
        boxShadow: '4px 4px 0px #000000'
      }}
    >
      <span className="relative z-10">
        {icon} {label}
      </span>

      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.2 }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
        }}
      />
    </motion.button>
  );
};
