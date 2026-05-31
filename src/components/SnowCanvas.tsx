import { useEffect, useRef } from 'react';

export default function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    interface Flake {
      x: number;
      y: number;
      r: number;
      s: number;
      d: number;
      a: number;
      type: 'flake' | 'dot';
    }

    const flakes: Flake[] = [];
    const maxFlakes = 60; // Optimized for performance

    for (let i = 0; i < maxFlakes; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 0.8,
        s: Math.random() * 0.5 + 0.15,
        d: Math.random() * 0.3 - 0.15,
        a: Math.random() * 0.45 + 0.1,
        type: Math.random() > 0.75 ? 'flake' : 'dot',
      });
    }

    const drawFlake = (x: number, y: number, r: number, a: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = a;
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(r * 2.5, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(r, 0.4 * r);
        ctx.lineTo(r, -0.4 * r);
        ctx.stroke();
      }
      ctx.restore();
    };

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const f of flakes) {
        if (f.type === 'flake') {
          drawFlake(f.x, f.y, f.r, f.a);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 240, 255, ${f.a})`;
          ctx.fill();
        }

        f.y += f.s;
        f.x += f.d;

        if (f.y > height + 10) {
          f.y = -10;
          f.x = Math.random() * width;
        }

        if (f.x > width + 10) {
          f.x = -10;
        } else if (f.x < -10) {
          f.x = width + 10;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="snow"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
