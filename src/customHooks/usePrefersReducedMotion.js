/**
 * usePrefersReducedMotion.js
 * ------------------------------------------------------------------
 * Small accessibility utility: components use this to skip
 * parallax/zoom/stagger animations (snapping straight to the final
 * state instead) when the user has requested reduced motion.
 * ------------------------------------------------------------------
 */
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = (e) => setReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return reduced;
}