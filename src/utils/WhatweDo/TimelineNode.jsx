import React from 'react';
import PulseEffect from './PulseEffect';

/**
 * TimelineNode
 * Inactive: small gray circle.
 * Active (event centered in viewport): orange core + blue halo + pulse.
 */
export default function TimelineNode({ active = false, final: isFinal = false }) {
  return (
    <div className={`wwd-node ${active ? 'is-active' : ''} ${isFinal ? 'is-final' : ''}`}>
      <PulseEffect active={active} color={isFinal ? 'blue' : 'orange'} />
      <span className="wwd-node-core" />
    </div>
  );
}
