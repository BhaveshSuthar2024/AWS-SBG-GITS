/**
 * useCountdown.js
 * ------------------------------------------------------------------
 * Ticks once a second and returns the remaining time until
 * `targetISO`. Pure timing logic only - EventCountdown is
 * responsible for how the numbers are displayed.
 * ------------------------------------------------------------------
 */
import { useEffect, useState } from 'react';

function diff(targetISO) {
  const total = new Date(targetISO).getTime() - Date.now();
  const clamped = Math.max(0, total);
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    isPast: total <= 0,
  };
}

export function useCountdown(targetISO) {
  const [remaining, setRemaining] = useState(() => diff(targetISO));

  useEffect(() => {
    if (!targetISO) return undefined;
    setRemaining(diff(targetISO));
    const id = setInterval(() => setRemaining(diff(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  return remaining;
}
