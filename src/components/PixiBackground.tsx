import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseOffset: number;
}

export const PixiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#00d9ff', // Neon cyan
      '#ff00ff', // Magenta
      '#ffaa00', // Orange
      '#ff1493', // Hot pink
      '#00ff88', // Neon green
    ];

    const particleCount = 150;
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Calculate pulsing alpha
        const pulseAlpha = Math.sin(Date.now() * 0.002 + particle.pulseOffset) * 0.4 + 0.6;
        const finalAlpha = particle.alpha * pulseAlpha;

        // Draw particle with glow effect
        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(finalAlpha * 0.2 * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Middle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(finalAlpha * 0.4 * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(finalAlpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Clear particles array
      particlesRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
