import { useState } from 'react';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PathSelectScreen } from './screens/PathSelectScreen';
import { LevelSelectScreen } from './screens/LevelSelectScreen';
import { useGameStore } from './store/gameStore';
import type { PathId } from './types/game';

type Screen = 'menu' | 'path-select' | 'level-select' | 'game' | 'settings' | 'about';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const { progress, setCurrentPath, setCurrentLevel } = useGameStore();

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('menu');
  };

  const handlePlayClick = () => {
    setCurrentScreen('path-select');
  };

  const handlePathSelect = (pathId: PathId) => {
    setCurrentPath(pathId);
    setCurrentScreen('level-select');
  };

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
    setCurrentScreen('game');
  };

  const handleBackToPathSelect = () => {
    setCurrentScreen('path-select');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && (
        <MainMenuScreen onNavigate={handlePlayClick} onSettings={() => handleNavigate('settings')} onAbout={() => handleNavigate('about')} />
      )}
      {currentScreen === 'path-select' && (
        <PathSelectScreen onBack={handleBack} onSelectPath={handlePathSelect} />
      )}
      {currentScreen === 'level-select' && progress.currentPath && (
        <LevelSelectScreen
          pathId={progress.currentPath}
          onBack={handleBackToPathSelect}
          onSelectLevel={handleLevelSelect}
        />
      )}
      {currentScreen === 'game' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Game Board Coming Soon!</h2>
            <p className="text-purple-200 mb-6">
              The game board will be implemented in Iteration 3
            </p>
            <button
              onClick={handleBackToPathSelect}
              className="bg-white/10 hover:bg-white/20 border-2 border-white/20
                         hover:border-white/40 rounded-lg px-6 py-3 text-white
                         font-semibold transition-all"
            >
              Back to Levels
            </button>
          </div>
        </div>
      )}
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={handleBack} />
      )}
      {currentScreen === 'about' && (
        <AboutScreen onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
