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
      canvas.width = 40;
      canvas.height = 100;

      ctx.clearRect(0, 0, 40, 100);

      ctx.beginPath();
      ctx.moveTo(40 * 0.5, 0);
      ctx.lineTo(40 * 0.5, 100);
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    resizeAndDraw();
  }, []);

  return <canvas ref={canvasRef} className={cn('w-10 h-auto', className)} />;
}
