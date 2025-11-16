import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestCaseResult } from '../components/TestCaseResult';
import { Agent } from '../game/Agent';
import { GameSimulator, type TestCaseResult as ITestCaseResult, type LevelResult } from '../game/GameSimulator';
import { PixiBackground } from '../components/PixiBackground';
import type { IBoard, ILevel } from '../game/types';

interface ExecutionScreenProps {
  board: IBoard;
  level: ILevel;
  onComplete: (result: LevelResult) => void;
}

// Get card type color
const getCardTypeColor = (type: string): string => {
  switch (type) {
    case 'context': return '#00d9ff';
    case 'model': return '#ff00ff';
    case 'tools': return '#ffaa00';
    case 'framework': return '#ff1493';
    case 'guardrails': return '#00ff88';
    default: return '#ffffff';
  }
};

// Get card type name
const getCardTypeName = (type: string): string => {
  switch (type) {
    case 'context': return 'CONTEXT';
    case 'model': return 'MODEL';
    case 'tools': return 'TOOL';
    case 'framework': return 'FRAMEWORK';
    case 'guardrails': return 'GUARDRAIL';
    default: return type.toUpperCase();
  }
};

export const ExecutionScreen: React.FC<ExecutionScreenProps> = ({ board, level, onComplete }) => {
  const [currentTest, setCurrentTest] = useState(0);
  const [testResults, setTestResults] = useState<ITestCaseResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [processingSlots, setProcessingSlots] = useState<Record<string, 'pending' | 'processing' | 'completed'>>({
    context: 'pending',
    model: 'pending',
    tools: 'pending',
    framework: 'pending',
    guardrails: 'pending',
  });

  useEffect(() => {
    // Create agent from board
    const agent = new Agent(board);

    // Simulate running test cases one by one
    const runTests = async () => {
      // First, animate through each slot
      const slots = ['context', 'model', 'tools', 'framework', 'guardrails'];
      for (const slot of slots) {
        if (board[slot as keyof IBoard].card) {
          setProcessingSlots(prev => ({ ...prev, [slot]: 'processing' }));
          await new Promise((resolve) => setTimeout(resolve, 800));
          setProcessingSlots(prev => ({ ...prev, [slot]: 'completed' }));
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }

      // Then run actual test cases
      for (let i = 0; i < level.testCases.length; i++) {
        // Wait a bit to simulate execution
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

        const testCase = level.testCases[i];
        const evaluation = agent.evaluate(testCase);

        setTestResults((prev) => [...prev, { testCase, evaluation }]);
        setCurrentTest(i + 1);
      }

      // All tests complete - calculate final result
      await new Promise((resolve) => setTimeout(resolve, 500));

      const finalResult = GameSimulator.runLevel(agent, level, board);
      setIsComplete(true);

      // Wait a moment before showing results
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onComplete(finalResult);
    };

    runTests();
  }, [board, level, onComplete]);

  const totalTests = level.testCases.length;
  const progress = (currentTest / totalTests) * 100;

  // Get board slots with cards
  const boardSlots = Object.entries(board)
    .filter(([_, slot]) => slot.card !== null)
    .map(([type, slot]) => ({ type, card: slot.card! }));

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 relative bg-[#2d1b3d]">
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

      {/* Content wrapper with z-index to appear above background */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <h1
            className="text-2xl md:text-3xl font-bold mb-2 uppercase"
            style={{
              color: '#ffaa00',
              textShadow: '2px 2px 0px #000000, 0 0 10px #ffaa00, 0 0 20px #ffaa00',
              fontFamily: "'Press Start 2P', monospace",
              animation: 'pulse-glow 2s ease-in-out infinite alternate'
            }}
          >
            SYSTEM EXECUTION
          </h1>
          <div
            className="text-sm uppercase"
            style={{
              color: '#00d9ff',
              textShadow: '1px 1px 0px #000000',
              fontFamily: "'Silkscreen', monospace",
              animation: 'blink 1.5s ease-in-out infinite'
            }}
          >
            <span className="inline-block" style={{ animation: 'processing-bounce 1s ease-in-out infinite' }}>
              🔄
            </span>{' '}
            EVALUATING...
          </div>
        </motion.div>

        {/* Progress Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut", delay: 0.2 }}
          className="mb-8 max-w-4xl mx-auto w-full"
        >
          <div
            className="bg-[#2d1b3d]/90 backdrop-blur-sm p-6"
            style={{
              border: '4px solid #ffffff',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            <div
              className="text-center text-sm mb-4 uppercase"
              style={{
                color: '#d4a5f5',
                fontFamily: "'Silkscreen', monospace"
              }}
            >
              PROCESSING AI SYSTEM
            </div>
            <div
              className="relative h-10 overflow-hidden"
              style={{
                background: '#1a0f24',
                border: '4px solid #ffffff',
                boxShadow: 'inset 4px 4px 0px #000000'
              }}
            >
              <motion.div
                className="h-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  background: 'linear-gradient(90deg, #00d9ff 0%, #ff00ff 25%, #ffaa00 50%, #ff1493 75%, #00ff88 100%)',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-base font-bold uppercase"
                style={{
                  color: '#ffffff',
                  textShadow: '2px 2px 0px #000000',
                  fontFamily: "'Press Start 2P', monospace",
                  zIndex: 10
                }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Execution Cards */}
        {boardSlots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-6xl mx-auto w-full"
          >
            {boardSlots.map(({ type, card }, index) => {
              const status = processingSlots[type];
              const color = getCardTypeColor(type);
              const typeName = getCardTypeName(type);

              return (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + index * 0.1 }}
                  className="relative overflow-hidden"
                  style={{
                    background: 'rgba(45, 27, 61, 0.9)',
                    border: `4px solid ${color}`,
                    boxShadow: status === 'processing'
                      ? `8px 8px 0px #000000, 0 0 20px rgba(255, 255, 255, 0.3)`
                      : '4px 4px 0px #000000',
                    backdropFilter: 'blur(2px)',
                    padding: '20px',
                    transition: 'all 300ms ease-out',
                    animation: status === 'processing' ? 'processing-pulse 1s ease-in-out infinite' : 'none'
                  }}
                >
                  <div
                    className="text-sm font-bold text-center mb-3 uppercase"
                    style={{
                      color: color,
                      fontFamily: "'Press Start 2P', monospace"
                    }}
                  >
                    {typeName}
                  </div>
                  <div className="text-center text-4xl mb-3">
                    {status === 'pending' && (
                      <span style={{ animation: 'pending-pulse 2s ease-in-out infinite', color: '#d4a5f5' }}>
                        ⏳
                      </span>
                    )}
                    {status === 'processing' && (
                      <span style={{ animation: 'processing-spin 1s linear infinite', color: '#ffaa00' }}>
                        🔄
                      </span>
                    )}
                    {status === 'completed' && (
                      <span style={{ animation: 'completed-bounce 0.5s ease-out', color: '#00ff88' }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <div
                    className="text-xs font-bold text-center uppercase"
                    style={{
                      color: '#ffffff',
                      fontFamily: "'Press Start 2P', monospace"
                    }}
                  >
                    +{card.energyCost * 5} PTS
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Test Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto w-full mb-8"
        >
          <AnimatePresence>
            {testResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TestCaseResult result={result} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator for current test */}
          {!isComplete && currentTest < totalTests && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 flex items-center justify-center gap-3"
              style={{
                background: 'rgba(45, 27, 61, 0.9)',
                border: '4px solid #ffffff',
                boxShadow: '4px 4px 0px #000000',
                backdropFilter: 'blur(2px)'
              }}
            >
              <span
                className="inline-block text-2xl"
                style={{ animation: 'processing-spin 1s linear infinite' }}
              >
                🔄
              </span>
              <span
                className="text-sm uppercase"
                style={{
                  color: '#ffffff',
                  fontFamily: "'Silkscreen', monospace"
                }}
              >
                Running test case {currentTest + 1}...
              </span>
            </motion.div>
          )}

          {/* Completion indicator */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-6 text-center"
              style={{
                background: 'rgba(45, 27, 61, 0.9)',
                border: '4px solid #00ff88',
                boxShadow: '4px 4px 0px #000000',
                backdropFilter: 'blur(2px)'
              }}
            >
              <div
                className="text-2xl font-bold mb-2 uppercase"
                style={{
                  color: '#00ff88',
                  textShadow: '2px 2px 0px #000000',
                  fontFamily: "'Press Start 2P', monospace"
                }}
              >
                All Tests Complete!
              </div>
              <div
                className="text-sm uppercase"
                style={{
                  color: '#d4a5f5',
                  fontFamily: "'Silkscreen', monospace"
                }}
              >
                Calculating final score...
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Add animations */}
      <style>{`
        @keyframes pulse-glow {
          from {
            text-shadow: 2px 2px 0px #000000, 0 0 10px #ffaa00, 0 0 20px #ffaa00;
          }
          to {
            text-shadow: 2px 2px 0px #000000, 0 0 15px #ffaa00, 0 0 30px #ffaa00;
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.5; }
        }

        @keyframes processing-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(90deg); }
          50% { transform: translateY(0) rotate(180deg); }
          75% { transform: translateY(-5px) rotate(270deg); }
        }

        @keyframes processing-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes pending-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes processing-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes completed-bounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
