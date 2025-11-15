// Learning Path Types
export type PathId = 'beginner-architect' | 'rag-specialist' | 'agentic-developer' | 'production-engineer';

export interface LearningPath {
  id: PathId;
  name: string;
  description: string;
  icon: string;
  color: string;
  levels: number[];
}

// Level Types
export interface Level {
  id: number;
  pathId: PathId;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isUnlocked: boolean;
  isCompleted: boolean;
  stars: number; // 0-3 stars earned
}

// Card Types
export type CardCategory = 'context' | 'model' | 'tool' | 'framework' | 'guardrail';

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  description: string;
  cost: number;
  effect: string;
}

// Game State Types
export interface GameProgress {
  unlockedLevels: number[];
  completedLevels: number[];
  levelStars: Record<number, number>; // levelId -> stars (0-3)
  currentPath: PathId | null;
  currentLevel: number | null;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface GameState {
  progress: GameProgress;
  settings: GameSettings;
}
