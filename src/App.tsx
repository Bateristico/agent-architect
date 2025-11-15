import { useState } from 'react';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';

type Screen = 'menu' | 'play' | 'settings' | 'about';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('menu');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && (
        <MainMenuScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={handleBack} />
      )}
      {currentScreen === 'about' && (
        <AboutScreen onBack={handleBack} />
      )}
      {currentScreen === 'play' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Game Coming Soon!</h2>
            <p className="text-purple-200 mb-6">
              Path selection and levels will be implemented in Iteration 2
            </p>
            <button
              onClick={handleBack}
              className="bg-white/10 hover:bg-white/20 border-2 border-white/20
                         hover:border-white/40 rounded-lg px-6 py-3 text-white
                         font-semibold transition-all"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
