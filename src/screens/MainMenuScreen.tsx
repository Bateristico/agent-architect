import { motion } from 'framer-motion';
import { Play, Settings, Info } from 'lucide-react';

interface MainMenuScreenProps {
  onNavigate: (screen: 'play' | 'settings' | 'about') => void;
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold text-white mb-4">
          Agent Architect
        </h1>
        <p className="text-xl text-purple-200">
          Learn AI Systems Through Play
        </p>
      </motion.div>

      {/* Menu Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <MenuButton
          icon={<Play className="w-6 h-6" />}
          label="Play"
          onClick={() => onNavigate('play')}
          delay={0.3}
        />
        <MenuButton
          icon={<Settings className="w-6 h-6" />}
          label="Settings"
          onClick={() => onNavigate('settings')}
          delay={0.4}
        />
        <MenuButton
          icon={<Info className="w-6 h-6" />}
          label="About"
          onClick={() => onNavigate('about')}
          delay={0.5}
        />
      </motion.div>

      {/* Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-purple-200 text-sm"
      >
        v1.0.0 - Local Edition
      </motion.div>
    </div>
  );
};

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onClick, delay }) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05, x: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border-2 border-white/20
                 rounded-lg px-8 py-4 text-white text-xl font-semibold
                 hover:bg-white/20 hover:border-white/40 transition-all duration-200"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
};
