import { useState } from 'react';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { PathSelectScreen } from './screens/PathSelectScreen';
import { LevelSelectScreen } from './screens/LevelSelectScreen';
import { GameScreen } from './screens/GameScreen';
import { ExecutionScreen } from './screens/ExecutionScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { useGameStore } from './store/gameStore';
import { getLevelByNumber } from './content';
import type { PathId } from './types/game';
import type { IBoard } from './game/types';
import type { LevelResult } from './game/GameSimulator';

type Screen = 'menu' | 'path-select' | 'level-select' | 'game' | 'execution' | 'results' | 'settings' | 'about';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [executionBoard, setExecutionBoard] = useState<IBoard | null>(null);
  const [levelResult, setLevelResult] = useState<LevelResult | null>(null);
  const { progress, setCurrentPath, setCurrentLevel, completeLevel } = useGameStore();

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

  const handleGameSubmit = (board: IBoard) => {
    setExecutionBoard(board);
    setCurrentScreen('execution');
  };

  const handleExecutionComplete = (result: LevelResult) => {
    setLevelResult(result);

    // Save progress to localStorage
    if (progress.currentLevel && result.stars >= 1) {
      completeLevel(progress.currentLevel, result.stars);
    }

    setCurrentScreen('results');
  };

  const handleRetryLevel = () => {
    setExecutionBoard(null);
    setLevelResult(null);
    setCurrentScreen('game');
  };

  const handleNextLevel = () => {
    if (progress.currentLevel) {
      const nextLevelId = progress.currentLevel + 1;
      setCurrentLevel(nextLevelId);
      setExecutionBoard(null);
      setLevelResult(null);
      setCurrentScreen('game');
    }
  };

  const handleResultsToMenu = () => {
    setExecutionBoard(null);
    setLevelResult(null);
    setCurrentScreen('menu');
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
        <GameScreen onBack={handleBackToPathSelect} onSubmit={handleGameSubmit} />
      )}
      {currentScreen === 'execution' && executionBoard && progress.currentLevel && (() => {
        const levelData = getLevelByNumber(progress.currentLevel);
        if (!levelData) return null;

        return (
          <ExecutionScreen
            board={executionBoard}
            level={{
              id: levelData.number,
              title: levelData.title,
              difficulty: levelData.difficulty,
              scenario: levelData.scenario,
              successCriteria: levelData.successCriteria,
              startingHand: [],
              energyBudget: levelData.energyBudget,
              testCases: levelData.testCases.map(tc => ({
                id: tc.id,
                input: tc.input,
                expectedBehavior: tc.expectedBehavior,
                difficulty: tc.difficulty,
              })),
            }}
            onComplete={handleExecutionComplete}
          />
        );
      })()}
      {currentScreen === 'results' && levelResult && progress.currentLevel && (() => {
        const levelData = getLevelByNumber(progress.currentLevel);
        if (!levelData) return null;

        return (
          <ResultsScreen
            result={levelResult}
            level={{
              id: levelData.number,
              title: levelData.title,
              difficulty: levelData.difficulty,
              scenario: levelData.scenario,
              successCriteria: levelData.successCriteria,
              startingHand: [],
              energyBudget: levelData.energyBudget,
              testCases: [],
            }}
            onRetry={handleRetryLevel}
            onNextLevel={handleNextLevel}
            onMainMenu={handleResultsToMenu}
            hasNextLevel={progress.unlockedLevels.includes(progress.currentLevel + 1)}
          />
        );
      })()}
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
