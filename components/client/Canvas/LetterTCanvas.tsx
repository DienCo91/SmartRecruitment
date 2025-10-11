import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useRef } from 'react';

export function LetterTCanvas({
  className,
  height = 100,
  width = 40,
}: HTMLAttributes<HTMLCanvasElement> & { height?: number; width?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeAndDraw = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(width * 0.5, 0);
      ctx.lineTo(width * 0.5, height);
      ctx.moveTo(width * 0.5, height * 0.3);
      ctx.lineTo(width, height * 0.3);
      ctx.strokeStyle = 'gray';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    resizeAndDraw();
  }, [height, width]);

  return <canvas ref={canvasRef} className={cn('w-10', className)} />;
}
