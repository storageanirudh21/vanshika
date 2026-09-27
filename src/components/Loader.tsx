import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LoaderProps {
  // Fired when the curtain starts lifting (the hero starts its entrance)
  onReveal: () => void;
  // Fired once the curtain is fully gone
  onDone: () => void;
}

const COUNT_MS = 1800;
const EXIT_MS = 900;
const NAME = 'Vanshika';

export const Loader: React.FC<LoaderProps> = ({ onReveal, onDone }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  // Keep the latest callbacks without restarting the one-shot intro
  const callbacks = useRef({ onReveal, onDone });
  useEffect(() => {
    callbacks.current = { onReveal, onDone };
  }, [onReveal, onDone]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 400 : COUNT_MS;
    const start = performance.now();
    let frame = 0;
    const timers: number[] = [];

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out so the counter slows down near 100
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timers.push(
          window.setTimeout(() => {
            setExiting(true);
            callbacks.current.onReveal();
            timers.push(window.setTimeout(() => callbacks.current.onDone(), EXIT_MS));
          }, 250)
        );
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`loader ${exiting ? 'is-exiting' : ''}`} role="status" aria-label="Loading portfolio">
      <div className="flex flex-col items-center">
        <div className="loader-avatar headshot">
          <img src="/heroimg.png" alt="" className="headshot-img" />
        </div>

        <div className="loader-name mt-6" aria-hidden="true">
          {NAME.split('').map((letter, i) => (
            <span key={i} style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
              {letter}
            </span>
          ))}
        </div>
        <div className="hero-mono text-[var(--text-muted)] mt-3 loader-sub">{PERSONAL_INFO.title}</div>
      </div>

      {/* Counter + label */}
      <div className="absolute left-5 sm:left-8 bottom-6 sm:bottom-8 loader-count">
        {String(progress).padStart(3, '0')}
        <span className="text-[0.4em] align-top ml-1">%</span>
      </div>
      <div className="absolute right-5 sm:right-8 bottom-8 sm:bottom-12 hero-mono text-[var(--text-muted)]">
        Loading portfolio
      </div>

      {/* Progress line */}
      <div className="absolute left-0 bottom-0 h-[3px] bg-[var(--text-primary)]" style={{ width: `${progress}%` }} />
    </div>
  );
};
