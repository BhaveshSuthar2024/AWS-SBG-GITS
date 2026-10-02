import React from 'react';

/**
 * PulseEffect
 * A soft, looping ripple/halo rendered behind a TimelineNode when active.
 * Pure CSS animation (see WhatWeDo.css .wwd-pulse-ring) - no JS ticking,
 * so it costs nothing while off-screen and never blocks the main thread.
 */
export default function PulseEffect({ active = false, color = 'orange' }) {
  return (
    <span
      className={`wwd-pulse ${active ? 'is-active' : ''} wwd-pulse--${color}`}
      aria-hidden="true"
    >
      <span className="wwd-pulse-ring" />
      <span className="wwd-pulse-ring wwd-pulse-ring--delay" />
    </span>
  );
}
