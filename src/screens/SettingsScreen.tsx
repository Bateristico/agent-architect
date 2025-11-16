import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Music } from '../components/PixelIcon';
import { useGameStore } from '../store/gameStore';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const { settings, toggleSound, toggleMusic } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Back</span>
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto w-full"
      >
        <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>

        {/* Settings Options */}
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 space-y-6">
          <SettingRow
            icon={<Volume2 className="w-5 h-5" />}
            label="Sound Effects"
            description="Enable game sound effects"
            checked={settings.soundEnabled}
            onChange={toggleSound}
          />
          <SettingRow
            icon={<Music className="w-5 h-5" />}
            label="Background Music"
            description="Enable background music (Coming soon)"
            checked={settings.musicEnabled}
            onChange={toggleMusic}
            disabled
          />
        </div>

        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white/80 text-sm">
            Your progress is automatically saved to your browser's local storage.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, description, checked, onChange, disabled }) => {
  return (
    <div className={`flex items-center justify-between ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="text-purple-300">{icon}</div>
        <div>
          <div className="text-white font-semibold">{label}</div>
          <div className="text-white/60 text-sm">{description}</div>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer
                        peer-checked:after:translate-x-full peer-checked:after:border-white
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-full
                        after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600">
        </div>
      </label>
    </div>
  );
};
