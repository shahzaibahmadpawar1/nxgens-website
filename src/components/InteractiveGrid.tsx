'use client';

import React, { useRef, useEffect } from 'react';

export const InteractiveGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const cellSize = 52; // Matching the 52px background size from globals.css
    let mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      // Ensure z-index or styling doesn't block mouse interactions
      parent.style.position = 'relative';
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint base grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.055)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw active hover interactions if active
      if (mouse.active) {
        // Active grid cell highlight
        const cellX = Math.floor(mouse.x / cellSize) * cellSize;
        const cellY = Math.floor(mouse.y / cellSize) * cellSize;

        // Draw a glowing orange background in the cell under the mouse
        ctx.fillStyle = 'rgba(232, 96, 26, 0.09)';
        ctx.fillRect(cellX, cellY, cellSize, cellSize);

        // Highlight active cell outline
        ctx.strokeStyle = 'rgba(232, 96, 26, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(cellX, cellY, cellSize, cellSize);

        // Draw smooth radial spotlight glow behind cursor
        const radialGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        radialGlow.addColorStop(0, 'rgba(232, 96, 26, 0.16)');
        radialGlow.addColorStop(1, 'rgba(232, 96, 26, 0)');
        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();

        // Draw highlighted grid line segments within proximity of cursor
        ctx.strokeStyle = 'rgba(232, 96, 26, 0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const scanRadius = 160;
        const startX = Math.max(0, Math.floor((mouse.x - scanRadius) / cellSize) * cellSize);
        const endX = Math.min(width, Math.ceil((mouse.x + scanRadius) / cellSize) * cellSize);
        const startY = Math.max(0, Math.floor((mouse.y - scanRadius) / cellSize) * cellSize);
        const endY = Math.min(height, Math.ceil((mouse.y + scanRadius) / cellSize) * cellSize);

        for (let x = startX; x <= endX; x += cellSize) {
          ctx.moveTo(x, Math.max(0, mouse.y - scanRadius));
          ctx.lineTo(x, Math.min(height, mouse.y + scanRadius));
        }
        for (let y = startY; y <= endY; y += cellSize) {
          ctx.moveTo(Math.max(0, mouse.x - scanRadius), y);
          ctx.lineTo(Math.min(width, mouse.x + scanRadius), y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-grid-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
