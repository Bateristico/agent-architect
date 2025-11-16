import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { useState } from 'react';

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to Agent Architect!',
    description: 'Learn how to design AI agents by combining the right components. Each level presents a challenge that teaches you key concepts.',
    icon: Sparkles,
    color: 'text-purple-400',
  },
  {
    title: 'Build Your Agent',
    description: 'Drag cards from your hand to the board slots. Each card represents a component: Context, Model, Tools, Framework, or Guardrails.',
    icon: Zap,
    color: 'text-blue-400',
  },
  {
    title: 'Energy Budget',
    description: 'Each card costs energy. You must stay within your budget while meeting the level requirements. Choose wisely!',
    icon: Target,
    color: 'text-green-400',
  },
  {
    title: 'Ready to Start?',
    description: 'Complete levels to unlock new cards and learn how to build production-grade AI systems. Good luck!',
    icon: ArrowRight,
    color: 'text-orange-400',
  },
];

export const Tutorial: React.FC<TutorialProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-white/20 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl"
      >
        {/* Skip button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="mb-6"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 ${step.color}`}>
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-purple-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              currentStep === 0
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white hover:bg-white/10'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-colors"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              <>
                Start Playing
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
