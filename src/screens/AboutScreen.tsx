import { motion } from 'framer-motion';
import { ArrowLeft, Github, Heart } from '../components/PixelIcon';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
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
        <h1 className="text-4xl font-bold text-white mb-8">About</h1>

        <div className="space-y-6">
          {/* Game Info */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">AgentCraft</h2>
            <p className="text-xl font-semibold text-orange-300 mb-4">Learn AI Design, Card by Card</p>
            <p className="text-white/80 mb-4">
              An educational card game that teaches AI/Agent system design through puzzle-solving gameplay.
              Learn best practices for context engineering, RAG, agent frameworks, and production-ready systems.
            </p>
            <p className="text-white/80">
              Build agent architectures by placing cards into puzzle slots, then see immediate feedback
              through simulated test cases. Master 12 levels across 4 learning paths!
            </p>
          </div>

          {/* Learning Paths */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Learning Paths</h3>
            <ul className="space-y-2 text-white/80">
              <li>📚 <strong>Beginner Architect</strong> - Context, models, basic tools</li>
              <li>🔍 <strong>RAG Specialist</strong> - Retrieval strategies, data sources</li>
              <li>🤖 <strong>Agentic Developer</strong> - Frameworks, tool orchestration</li>
              <li>🚀 <strong>Production Engineer</strong> - Optimization, cost, scale</li>
            </ul>
          </div>

          {/* Credits */}
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Credits</h3>
            <div className="text-white/80 space-y-2">
              <p>Inspired by AWS Card Clash</p>
              <p>Built with React, TypeScript, Tailwind CSS, and Framer Motion</p>
              <p className="flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for the AI community
              </p>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="text-center">
            <a
              href="https://github.com/yourusername/agentcraft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                         border-2 border-white/20 hover:border-white/40
                         rounded-lg px-6 py-3 text-white font-semibold transition-all"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
