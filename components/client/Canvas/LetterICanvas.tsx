import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useRef } from 'react';

export function LetterICanvas({ className }: HTMLAttributes<HTMLCanvasElement>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeAndDraw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(width * 0.5, 0);
      ctx.lineTo(width * 0.5, height);
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const observer = new ResizeObserver(resizeAndDraw);
    observer.observe(canvas);

    resizeAndDraw();

    return () => observer.disconnect();
  }, []);

  return <canvas ref={canvasRef} className={cn('w-10 h-auto', className)} />;
}
