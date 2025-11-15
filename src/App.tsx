import { useState } from 'react';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PathSelectScreen } from './screens/PathSelectScreen';
import { LevelSelectScreen } from './screens/LevelSelectScreen';
import { GameScreen } from './screens/GameScreen';
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
        <GameScreen onBack={handleBackToPathSelect} />
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
