import { useEffect, useRef } from 'react';
import { Application, Graphics } from 'pixi.js';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: number;
  alpha: number;
}

export const PixiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let app: Application | null = null;
    let mounted = true;
    let initialized = false;

    const init = async () => {
      try {
        // Create PixiJS application
        app = new Application();

        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x1a1a2e,
          backgroundAlpha: 0,
          antialias: true,
          resolution: window.devicePixelRatio || 1,
        });

        // Mark as initialized after init completes
        initialized = true;

        if (!mounted || !canvasRef.current) {
          if (app && app.renderer) {
            app.destroy(true);
          }
          return;
        }

        canvasRef.current.appendChild(app.canvas as HTMLCanvasElement);

        // Create particles
        const particles: Particle[] = [];
        const particleCount = 100;

        const colors = [
          0x667eea, // purple
          0xf5576c, // pink
          0x00bcd4, // teal
          0xffa726, // orange
          0x42a5f5, // blue
        ];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * app.screen.width,
            y: Math.random() * app.screen.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.5 + 0.2,
          });
        }

        // Create graphics for particles
        const particleGraphics = new Graphics();
        app.stage.addChild(particleGraphics);

        // Animation loop
        app.ticker.add(() => {
          if (!mounted) return;

          particleGraphics.clear();

          particles.forEach((particle) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = app!.screen.width;
            if (particle.x > app!.screen.width) particle.x = 0;
            if (particle.y < 0) particle.y = app!.screen.height;
            if (particle.y > app!.screen.height) particle.y = 0;

            // Pulse alpha
            particle.alpha = Math.sin(Date.now() * 0.001 + particle.x) * 0.3 + 0.4;

            // Draw particle
            particleGraphics.circle(particle.x, particle.y, particle.size);
            particleGraphics.fill({ color: particle.color, alpha: particle.alpha });

            // Add glow effect
            particleGraphics.circle(particle.x, particle.y, particle.size * 2);
            particleGraphics.fill({ color: particle.color, alpha: particle.alpha * 0.3 });
          });
        });

        // Handle window resize
        const handleResize = () => {
          if (app && app.renderer && mounted && initialized) {
            app.renderer.resize(window.innerWidth, window.innerHeight);
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('PixiJS initialization error:', error);
        initialized = false;
      }
    };

    init();

    // Cleanup
    return () => {
      mounted = false;
      if (app) {
        try {
          // Only destroy if initialization completed
          if (initialized && app.renderer) {
            app.destroy(true, { children: true });
          } else if (app.renderer) {
            // If partially initialized, still try to destroy
            app.destroy(true);
          }
        } catch (error) {
          console.error('PixiJS cleanup error:', error);
        } finally {
          // Ensure reference is cleared
          app = null;
        }
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
