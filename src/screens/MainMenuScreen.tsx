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

// Icon components using pixelarticons SVG paths
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6V18L17 12L8 6Z" />
  </svg>
);

const SlidersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H5V6H3V7ZM3 9H5V8H3V9ZM6 6V9H7V10H12V9H13V6H12V5H7V6H6ZM11 6V9H7V6H11ZM21 7H19V6H21V7ZM21 9H19V8H21V9ZM18 6V9H17V10H12V9H11V6H12V5H17V6H18ZM17 6V9H13V6H17ZM3 16H5V15H3V16ZM3 18H5V17H3V18ZM6 15V18H7V19H12V18H13V15H12V14H7V15H6ZM11 15V18H7V15H11ZM21 16H19V15H21V16ZM21 18H19V17H21V18Z" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 11H13V17H11V11ZM11 7H13V9H11V7ZM5 3H19V4H20V20H19V21H5V20H4V4H5V3ZM6 5V19H18V5H6Z" />
  </svg>
);

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

      {/* Content wrapper - matches reference design exactly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
        style={{
          background: 'rgba(20, 10, 30, 0.98)',
          border: '6px solid',
          borderImage: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 25%, #ff00ff 75%, #ffaa00 100%) 1',
          boxShadow: '0 0 0 3px #000000, 8px 8px 0px #000000, 0 0 40px rgba(0, 217, 255, 0.4)',
          padding: '40px 50px 50px 50px',
          backdropFilter: 'blur(8px)',
          width: '580px',
          maxWidth: '90vw'
        }}
      >
        <div className="text-center">
          {/* Logo - exact match to reference */}
          <div className="relative inline-block mb-6">
            <h1
              className="relative z-10 font-black uppercase"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '48px',
                color: '#ffffff',
                textShadow: `
                  4px 4px 0px #000000,
                  0 0 15px #00d9ff,
                  0 0 30px #00d9ff
                `,
                letterSpacing: '0.05em',
                lineHeight: '1.2'
              }}
            >
              AGENTCRAFT
            </h1>
          </div>

          {/* Subtitle - exact match */}
          <p
            className="uppercase"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '11px',
              color: '#00d9ff',
              textShadow: '2px 2px 0px #000000',
              letterSpacing: '0.3em',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}
          >
            LEARN AI DESIGN, CARD BY CARD
          </p>

          {/* Menu Buttons - exact layout from reference */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <MenuButton
              icon={<PlayIcon />}
              label="PLAY"
              onClick={onNavigate}
              delay={0.1}
              bgColor="#00ff88"
              textColor="#000000"
              glowColor="#00ff88"
            />
            <MenuButton
              icon={<SlidersIcon />}
              label="SETTINGS"
              onClick={onSettings}
              delay={0.2}
              bgColor="#00d9ff"
              textColor="#000000"
              glowColor="#00d9ff"
            />
            <MenuButton
              icon={<InfoIcon />}
              label="ABOUT"
              onClick={onAbout}
              delay={0.3}
              bgColor="#ff00ff"
              textColor="#000000"
              glowColor="#ff00ff"
            />
          </div>

          {/* Version - exact match */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              color: '#888888',
              textShadow: '1px 1px 0px #000000',
              letterSpacing: '0.15em',
              marginTop: '40px'
            }}
          >
            V1.0.0 - LOCAL EDITION
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
              3px 3px 0px #000000,
              0 0 10px #ffffff,
              0 0 20px #ffffff;
          }
          to {
            text-shadow:
              3px 3px 0px #000000,
              0 0 15px #ffffff,
              0 0 30px #ffffff;
          }
        }
      `}</style>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
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
        scale: 1.03,
        boxShadow: `0 0 0 3px #000000, 0 0 0 6px ${bgColor}, 5px 5px 0px 6px #000000, 0 0 25px ${glowColor}`,
        transition: { duration: 0.1 }
      }}
      whileTap={{
        scale: 0.98,
        boxShadow: `0 0 0 3px #000000, 3px 3px 0px 3px #000000`,
        transition: { duration: 0.08 }
      }}
      onClick={onClick}
      className="w-full mx-auto flex items-center justify-start gap-3 relative overflow-hidden"
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '14px',
        backgroundColor: bgColor,
        color: textColor,
        border: '3px solid #000000',
        boxShadow: '0 0 0 3px #000000, 4px 4px 0px 3px #000000',
        textShadow: 'none',
        letterSpacing: '0.05em',
        padding: '18px 24px',
        fontWeight: 'normal'
      }}
    >
      <span className="relative z-10 flex items-center gap-3 w-full">
        <span className="flex-shrink-0" style={{ display: 'flex', alignItems: 'center', width: '24px', height: '24px' }}>
          {icon}
        </span>
        <span className="flex-1 text-left">
          {label}
        </span>
      </span>

      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)'
        }}
      />
    </motion.button>
  );
};
