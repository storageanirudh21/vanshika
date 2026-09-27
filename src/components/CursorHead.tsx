import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

// A little avatar "head" that trails the mouse pointer (desktop only)
export const CursorHead: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hovering = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      hovering = !!(e.target as Element | null)?.closest?.('a, button, [role="button"]');
      el.classList.add('is-active');
    };
    const onLeave = () => el.classList.remove('is-active');

    const loop = () => {
      const dx = target.x - pos.x;
      pos.x += dx * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const tilt = Math.max(-18, Math.min(18, dx * 0.4));
      const scale = hovering ? 1.25 : 1;
      el.style.transform = `translate3d(${pos.x + 16}px, ${pos.y + 18}px, 0) rotate(${tilt}deg) scale(${scale})`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-head" aria-hidden="true">
      <img
        src={PERSONAL_INFO.avatar}
        onError={(e) => {
          if (!e.currentTarget.src.endsWith('/images/portrait.jpg')) e.currentTarget.src = '/images/portrait.jpg';
        }}
        alt=""
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
};
