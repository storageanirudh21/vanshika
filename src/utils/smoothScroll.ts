import Lenis from 'lenis';

let lenis: Lenis | null = null;

// Buttery page scrolling. Returns a cleanup function for useEffect.
export const initSmoothScroll = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: true,
  });

  return () => {
    lenis?.destroy();
    lenis = null;
  };
};

// Scroll to an element (or a pixel offset) through Lenis, falling back to native smooth scroll.
export const scrollToTarget = (target: Element | number | null | undefined) => {
  if (target == null) return;
  if (lenis) {
    lenis.scrollTo(target as HTMLElement | number);
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

// Freeze / release page scrolling (used while the loader is on screen)
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
