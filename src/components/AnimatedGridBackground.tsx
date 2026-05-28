'use client';

import React, { useEffect, useRef } from 'react';

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip heavy canvas entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let frameCount = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Reduced column density for performance (every 20px instead of 14px)
    const fontSize = 20;
    let columns: number[] = [];
    const initColumns = () => {
      const count = Math.floor(width / fontSize);
      columns = Array.from({ length: count }, () => Math.random() * height);
    };
    initColumns();

    const chars = '01ABCDEF0110';

    // Reduced node count: 10 instead of 18
    const nodes: { x: number; y: number; r: number; pulse: number; speed: number }[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * 1440,
      y: Math.random() * 900,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      speed: 0.025 + Math.random() * 0.015,
    }));

    // Circuit lines (static)
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [
      { x1: 0.05, y1: 0.15, x2: 0.25, y2: 0.15 },
      { x1: 0.25, y1: 0.15, x2: 0.25, y2: 0.45 },
      { x1: 0.25, y1: 0.45, x2: 0.45, y2: 0.45 },
      { x1: 0.75, y1: 0.2, x2: 0.95, y2: 0.2 },
      { x1: 0.75, y1: 0.2, x2: 0.75, y2: 0.55 },
      { x1: 0.55, y1: 0.7, x2: 0.75, y2: 0.7 },
      { x1: 0.75, y1: 0.55, x2: 0.95, y2: 0.55 },
      { x1: 0.1, y1: 0.75, x2: 0.3, y2: 0.75 },
      { x1: 0.3, y1: 0.75, x2: 0.3, y2: 0.9 },
    ];

    const draw = () => {
      frameCount++;
      // Skip every other frame — halves CPU cost with no visible difference
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Dark fade
      ctx.fillStyle = 'rgba(5, 13, 26, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Data rain — draw only half the columns per frame for perf
      ctx.font = `${fontSize}px monospace`;
      const half = Math.ceil(columns.length / 2);
      const startIdx = (frameCount / 2) % 2 === 0 ? 0 : half;
      const endIdx = startIdx === 0 ? half : columns.length;

      for (let i = startIdx; i < endIdx; i++) {
        const y = columns[i];
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const alpha = 0.06 + Math.random() * 0.1;
        ctx.fillStyle = `rgba(0, 196, 160, ${alpha})`;
        ctx.fillText(char, x, y);
        if (y > height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] = y + fontSize;
        }
      }

      // Circuit lines (draw every 4th frame — they're static)
      if (frameCount % 4 === 0) {
        lines.forEach((line) => {
          ctx.beginPath();
          ctx.moveTo(line.x1 * width, line.y1 * height);
          ctx.lineTo(line.x2 * width, line.y2 * height);
          ctx.strokeStyle = 'rgba(0, 196, 160, 0.12)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // Circuit nodes (pulsing)
      nodes.forEach((node) => {
        node.pulse += node.speed;
        const alpha = 0.3 + 0.5 * Math.abs(Math.sin(node.pulse));
        const nx = (node.x / 1440) * width;
        const ny = (node.y / 900) * height;
        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 196, 160, ${alpha})`;
        ctx.fill();
        // Glow ring
        ctx.beginPath();
        ctx.arc(nx, ny, node.r * 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 196, 160, ${alpha * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Blue accent glow (every 6th frame)
      if (frameCount % 6 === 0) {
        const bx = 0.08 * width;
        const by = 0.25 * height;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, 80);
        grad.addColorStop(0, 'rgba(30, 100, 220, 0.08)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(bx - 80, by - 80, 160, 160);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85, willChange: 'transform' }}
      />
      {/* Radial center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 65%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050D1A)' }}
      />
    </div>
  );
}