import React from 'react';

/**
 * TimelineImage
 * ~420x260 glass-bordered image. Hover: scale 1.03, brighten, glow.
 * Lazy-loaded since most events sit far below the fold.
 */
export default function TimelineImage({ src, alt }) {
  return (
    <div className="wwd-image-frame">
      <img className="wwd-image" src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="wwd-image-glow" aria-hidden="true" />
    </div>
  );
}
