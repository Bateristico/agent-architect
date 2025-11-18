import { motion } from 'framer-motion';
import { Zap, ArrowRight, ArrowLeft, Heart } from './PixelIcon';

interface ScoreBreakdownProps {
  synergyBonus: number;
  antiSynergyPenalty: number;
  comboBonus: number;
  netModifier: number;
  achievedCombos: string[];
  currentScore: number;
  isVisible: boolean;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({
  synergyBonus,
  antiSynergyPenalty,
  comboBonus,
  netModifier,
  achievedCombos,
  currentScore,
  isVisible,
}) => {
  if (!isVisible) return null;

  const hasModifiers = synergyBonus > 0 || antiSynergyPenalty > 0 || comboBonus > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        background: 'linear-gradient(135deg, rgba(45, 27, 61, 0.98) 0%, rgba(26, 15, 36, 0.98) 100%)',
        border: '5px solid #ff00ff',
        borderRadius: '2px',
        boxShadow: '5px 5px 0px 0px #000000, 0 0 20px rgba(255, 0, 255, 0.4)',
        padding: '1rem',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3 pb-2"
        style={{
          borderBottom: '3px solid #ff00ff',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '16px' }}>⚡</span>
          <h3
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              color: '#ff00ff',
              textShadow: '2px 2px 0px #000000',
              textTransform: 'uppercase',
            }}
          >
            Modifiers
          </h3>
        </div>
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: '2px 2px 0px #000000',
          }}
        >
          {currentScore}
        </div>
      </div>

      {/* Modifiers */}
      {hasModifiers ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Synergy Bonus */}
          {synergyBonus > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0, 255, 136, 0.15)',
                border: '3px solid #00ff88',
                borderRadius: '2px',
                boxShadow: '3px 3px 0px #000000',
                padding: '0.5rem 0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '12px' }}>➜</span>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '8px',
                    color: '#00ff88',
                    textShadow: '1px 1px 0px #000000',
                  }}
                >
                  Synergy
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  fontWeight: 'bold',
                  color: '#00ff88',
                  textShadow: '1px 1px 0px #000000',
                }}
              >
                +{synergyBonus}%
              </span>
            </motion.div>
          )}

          {/* Anti-Synergy Penalty */}
          {antiSynergyPenalty > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 51, 102, 0.15)',
                border: '3px solid #ff3366',
                borderRadius: '2px',
                boxShadow: '3px 3px 0px #000000',
                padding: '0.5rem 0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '12px' }}>←</span>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '8px',
                    color: '#ff3366',
                    textShadow: '1px 1px 0px #000000',
                  }}
                >
                  Anti-Synergy
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  fontWeight: 'bold',
                  color: '#ff3366',
                  textShadow: '1px 1px 0px #000000',
                }}
              >
                -{antiSynergyPenalty}%
              </span>
            </motion.div>
          )}

          {/* Combo Bonuses */}
          {comboBonus > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: 'rgba(138, 43, 226, 0.15)',
                border: '3px solid #ff00ff',
                borderRadius: '2px',
                boxShadow: '3px 3px 0px #000000',
                padding: '0.5rem 0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '12px' }}>♥</span>
                  <span
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '8px',
                      color: '#ff00ff',
                      textShadow: '1px 1px 0px #000000',
                    }}
                  >
                    Combos
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: '#ff00ff',
                    textShadow: '1px 1px 0px #000000',
                  }}
                >
                  +{comboBonus}%
                </span>
              </div>

              {/* List achieved combos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                {achievedCombos.map((combo, idx) => (
                  <motion.div
                    key={combo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'rgba(138, 43, 226, 0.2)',
                      borderRadius: '2px',
                      padding: '0.25rem 0.5rem',
                    }}
                  >
                    <span style={{ color: '#ff00ff', fontSize: '10px' }}>★</span>
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px',
                        color: '#d4a5f5',
                        textShadow: '1px 1px 0px #000000',
                      }}
                    >
                      {combo}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Net Modifier Summary */}
          <div
            style={{
              borderTop: '2px solid rgba(255, 255, 255, 0.2)',
              paddingTop: '0.5rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  color: '#ffffff',
                  textShadow: '1px 1px 0px #000000',
                }}
              >
                Net Total
              </span>
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '9px',
                  fontWeight: 'bold',
                  color: netModifier > 0 ? '#00ff88' : netModifier < 0 ? '#ff3366' : '#ffffff',
                  textShadow: '1px 1px 0px #000000',
                }}
              >
                {netModifier > 0 ? '+' : ''}{netModifier}%
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              color: 'rgba(255, 255, 255, 0.5)',
              textShadow: '1px 1px 0px #000000',
              marginBottom: '0.5rem',
            }}
          >
            No modifiers yet
          </p>
          <p
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '7px',
              color: 'rgba(255, 255, 255, 0.3)',
              textShadow: '1px 1px 0px #000000',
            }}
          >
            Place cards!
          </p>
        </div>
      )}
    </motion.div>
  );
};
