import React, { useEffect, useMemo, useState } from 'react';

/**
 * ParticleLayer
 * A pool of small dots drifting downward along the timeline, each on its
 * own randomized CSS animation (duration/delay/x-jitter) so the stream
 * never looks like a repeating loop. Pure CSS transform+opacity - GPU
 * accelerated, nothing ticks in JS.
 *
 * When `activeIndex` changes (a new node has just lit up) a handful of
 * brighter "burst" particles are mounted for ~900ms near that node to sell
 * the "energy pulse activating the next node" moment, then unmounted.
 */
export default function ParticleLayer({ count = 12, activeIndex = -1 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 50 + (Math.random() * 10 - 5), // small jitter around the line, in %
      duration: 3.2 + Math.random() * 3.4,
      delay: -(Math.random() * 6), // negative delay staggers start immediately
      size: 2 + Math.random() * 2,
    }));
  }, [count]);

  const [burstKey, setBurstKey] = useState(null);

  useEffect(() => {
    if (activeIndex < 0) return;
    setBurstKey(`${activeIndex}-${Date.now()}`);
    const timer = setTimeout(() => setBurstKey(null), 900);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <div className="wwd-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="wwd-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {burstKey && (
        <span key={burstKey} className="wwd-particle wwd-particle--burst" style={{ left: '50%' }} />
      )}
    </div>
  );
}
