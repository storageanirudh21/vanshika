import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LoaderProps {
  // Fired once the hero is fully revealed (its entrance animation starts)
  onReveal: () => void;
  // Fired once the intro is completely gone
  onDone: () => void;
}

const COUNT_MS = 1800;
const WORD = 'PRODUCT DESIGNER';
// Index of the "T" in PRODUCT: the zoom dives into its stem
const T_INDEX = 6;
// Same heavy face as the giant "Vanshika" in the hero
const FONT_FAMILY = '"Inter", "Helvetica Neue", Arial, sans-serif';
const FONT_WEIGHT = 900;
// Extra zoom past "exactly covers the screen", so no sliver of the cover is left
const COVER_MARGIN = 1.12;
// Once committed, the rest of the dive plays as a timed ease-in-out
const DIVE_MS = 1100;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const fontSpec = (size: number) => `${FONT_WEIGHT} ${size}px ${FONT_FAMILY}`;

// Rectangle inside the stem of a "T" in the display font, measured from real pixels.
// x is relative to the glyph's start, y relative to the baseline.
const measureStem = (fontSize: number) => {
  const canvas = document.createElement('canvas');
  const w = Math.ceil(fontSize * 1.2);
  const h = Math.ceil(fontSize * 1.2);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const base = Math.round(fontSize);
  ctx.font = fontSpec(fontSize);
  ctx.fillText('T', 0, base);
  const data = ctx.getImageData(0, 0, w, h).data;
  const solid = (x: number, y: number) => data[(y * w + x) * 4 + 3] > 128;

  // Horizontal span of the stem, a little above the baseline
  const row = Math.round(base - fontSize * 0.15);
  let left = -1;
  let right = -1;
  for (let x = 0; x < w; x++) {
    if (solid(x, row)) {
      if (left < 0) left = x;
      right = x;
    }
  }
  if (left < 0) return null;

  // Cap top and baseline along the stem's centre line
  const col = Math.round((left + right) / 2);
  let top = -1;
  let bottom = -1;
  for (let y = 0; y < h; y++) {
    if (solid(col, y)) {
      if (top < 0) top = y;
      bottom = y;
    }
  }

  // Keep the rectangle safely inside the stem (below the crossbar, inset from the edges)
  const capHeight = bottom - top;
  const inset = (right - left) * 0.08;
  return {
    x0: left + inset,
    x1: right - inset,
    y0: top + capHeight * 0.3 - base,
    y1: bottom - base,
  };
};

// Width of the word in em, used to size it to the screen
const measureWordEm = () => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return 10.5;
  ctx.font = fontSpec(100);
  return ctx.measureText(WORD).width / 100;
};

export const Loader: React.FC<LoaderProps> = ({ onReveal, onDone }) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [wordEm, setWordEm] = useState(10.5);

  const overlayRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const zoomRef = useRef<SVGGElement>(null);
  const stemRef = useRef<SVGRectElement>(null);
  const origin = useRef({ x: size.w / 2, y: size.h / 2 });
  // Zoom at which the stem rectangle covers the whole screen
  const coverScale = useRef(60);
  const remeasure = useRef<() => void>(() => {});
  const commit = useRef<() => void>(() => {});

  // Keep the latest callbacks without restarting the intro
  const callbacks = useRef({ onReveal, onDone });
  useEffect(() => {
    callbacks.current = { onReveal, onDone };
  }, [onReveal, onDone]);

  // The word fills ~90% of the width, capped by the height
  const fontSize = Math.min((size.w * 0.9) / wordEm, size.h * 0.3);
  const baseline = size.h / 2 + fontSize * 0.36;

  // Match the SVG to the overlay's real size (window.inner* can include scrollbars)
  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once the font is in, size the word to the screen
  useEffect(() => {
    let cancelled = false;
    document.fonts?.load(fontSpec(100), WORD).then(
      () => !cancelled && setWordEm(measureWordEm()),
      () => {}
    );
    return () => {
      cancelled = true;
    };
  }, []);

  // Locate the T's stem: zoom origin + a rectangle hole that tracks it exactly
  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      const text = measureRef.current;
      if (cancelled || !text) return;
      try {
        const box = text.getExtentOfChar(T_INDEX);
        const stem = measureStem(fontSize);
        if (box.width <= 0 || !stem) return;
        const x0 = box.x + stem.x0;
        const x1 = box.x + stem.x1;
        const y0 = baseline + stem.y0;
        const y1 = baseline + stem.y1;
        const ox = (x0 + x1) / 2;
        const oy = (y0 + y1) / 2;
        origin.current = { x: ox, y: oy };
        stemRef.current?.setAttribute('x', String(x0));
        stemRef.current?.setAttribute('y', String(y0));
        stemRef.current?.setAttribute('width', String(x1 - x0));
        stemRef.current?.setAttribute('height', String(y1 - y0));
        // Scale needed for each edge of the rectangle to reach the matching screen edge
        coverScale.current =
          Math.max(ox / (ox - x0), (size.w - ox) / (x1 - ox), oy / (oy - y0), (size.h - oy) / (y1 - oy)) *
          COVER_MARGIN;
      } catch {
        // keep the defaults
      }
    };
    remeasure.current = measure;
    measure();
    // Measuring with the fallback font would aim the zoom at the wrong spot
    document.fonts?.load(fontSpec(fontSize), WORD).then(measure, () => {});
    return () => {
      cancelled = true;
    };
  }, [size, fontSize, baseline]);

  // 1) Loading counter
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 400 : COUNT_MS;
    const start = performance.now();
    let frame = 0;
    if (location.search.includes('skip')) { callbacks.current.onReveal(); callbacks.current.onDone(); return; } // TEMP-DEBUG
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setReady(true);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // 2) Scroll-driven reveal: zoom into the T until the hero fills the screen
  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = 0;
    let current = 0;
    let committed = false;
    let diveFrom = 0;
    let diveStart = 0;
    let frame = 0;
    let touchY = 0;

    const startDive = () => {
      if (committed) return;
      committed = true;
      remeasure.current();
      diveFrom = current;
      diveStart = performance.now();
    };
    commit.current = startDive;

    const nudge = (delta: number) => {
      if (committed) return;
      target = clamp01(target + delta);
      // Past a good chunk of the way, finish the dive on its own
      if (target > 0.45) startDive();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      nudge(e.deltaY / 2400);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0].clientY;
      nudge((touchY - y) / (window.innerHeight * 1.1));
      touchY = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if ([' ', 'ArrowDown', 'PageDown', 'Enter'].includes(e.key)) {
        e.preventDefault();
        nudge(0.2);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        nudge(-0.2);
      }
    };

    const apply = (p: number) => {
      // Exponential zoom feels linear to the eye; at p = 1 the stem covers the screen
      const scale = reduced ? 1 : Math.pow(coverScale.current, p);
      const { x, y } = origin.current;
      zoomRef.current?.setAttribute('transform', `translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`);
      if (uiRef.current) uiRef.current.style.opacity = String(1 - clamp01(p / 0.12));
      if (reduced && overlayRef.current) overlayRef.current.style.opacity = String(1 - p);
    };

    const loop = (now: number) => {
      if (committed) {
        const t = clamp01((now - diveStart) / DIVE_MS);
        current = diveFrom + (1 - diveFrom) * easeInOutCubic(t);
      } else {
        current += (target - current) * 0.09;
      }
      apply(current);
      if (current >= 1) {
        // The hero now fills the screen: start its entrance, then drop the (invisible) intro
        callbacks.current.onReveal();
        callbacks.current.onDone();
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKey);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(frame);
    };
  }, [ready]);

  return (
    <div ref={overlayRef} className="intro" role="dialog" aria-label="Intro: scroll to reveal the portfolio">
      {/* Solid cover with "PRODUCT DESIGNER" cut out of it: the letters are windows onto the hero */}
      <svg className="intro-cover" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
        <defs>
          {/* Mask and cover overshoot the viewBox so there's never a gap at the edges */}
          <mask id="intro-mask" maskUnits="userSpaceOnUse" x={-size.w} y={-size.h} width={size.w * 3} height={size.h * 3}>
            <rect x={-size.w} y={-size.h} width={size.w * 3} height={size.h * 3} fill="#fff" />
            <g ref={zoomRef}>
              <text
                className="intro-mask-text"
                x={size.w / 2}
                y={baseline}
                textAnchor="middle"
                fontSize={fontSize}
              >
                {WORD}
              </text>
              {/* Sits exactly inside the T's stem; unlike text it stays precise at huge zoom */}
              <rect ref={stemRef} className="intro-mask-text" width="0" height="0" />
            </g>
          </mask>
        </defs>

        <rect
          x={-size.w}
          y={-size.h}
          width={size.w * 3}
          height={size.h * 3}
          fill="#0b0b0d"
          mask="url(#intro-mask)"
        />

        {/* Invisible twin of the masked text, used only to measure where the T sits */}
        <text
          ref={measureRef}
          className="intro-measure-text"
          x={size.w / 2}
          y={baseline}
          textAnchor="middle"
          fontSize={fontSize}
        >
          {WORD}
        </text>
      </svg>

      {/* Small UI around the edges */}
      <div ref={uiRef} className="intro-ui">
        <div className="absolute left-5 sm:left-8 top-5 lg:top-[42px] flex items-center gap-4">
          <div className="headshot w-11 h-11 lg:w-[58px] lg:h-[58px]">
            <img src="/heroimg.png" alt="" className="headshot-img" />
          </div>
          <span className="font-bold text-xl lg:text-[30px] tracking-[-0.01em] text-white">
            {PERSONAL_INFO.name}
          </span>
        </div>

        <div className="absolute left-5 sm:left-8 bottom-6 sm:bottom-8">
          {ready ? (
            <button onClick={() => commit.current()} className="intro-scroll-cta">
              Scroll to reveal
              <ArrowDown className="intro-scroll-arrow" strokeWidth={2.5} />
            </button>
          ) : (
            <div className="intro-count">
              {String(progress).padStart(3, '0')}
              <span className="text-[0.4em] align-top ml-1">%</span>
            </div>
          )}
        </div>

        <div className="absolute right-5 sm:right-8 bottom-8 sm:bottom-12 hero-mono text-white/55">
          {ready ? 'Scroll · Swipe · Space' : 'Loading portfolio'}
        </div>

        <div
          className="absolute left-0 bottom-0 h-[3px] bg-white transition-opacity duration-500"
          style={{ width: `${progress}%`, opacity: ready ? 0 : 1 }}
        />
      </div>
    </div>
  );
};
