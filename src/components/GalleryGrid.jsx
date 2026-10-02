import React, { useEffect, useMemo, useState } from "react";

const BREAKS = [
  { q: "(min-width: 1280px)", cols: 3 },
  { q: "(min-width: 900px)", cols: 2 },
  { q: "(min-width: 560px)", cols: 2 },
];

function columnCount() {
  for (const b of BREAKS) {
    if (window.matchMedia(b.q).matches) return b.cols;
  }
  return 1;
}

function aspectScore(aspect = "3 / 4") {
  const [w, h] = String(aspect)
    .split("/")
    .map((n) => Number.parseFloat(n.trim()) || 1);
  return h / w;
}

export default function GalleryGrid({ photos, onSelect }) {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const apply = () => setCols(columnCount());
    apply();
    const mqls = BREAKS.map((b) => window.matchMedia(b.q));
    mqls.forEach((mql) => mql.addEventListener("change", apply));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", apply));
  }, []);

  const columns = useMemo(() => {
    const buckets = Array.from({ length: cols }, () => []);
    const heights = Array(cols).fill(0);

    photos.forEach((photo, index) => {
      const shortest = heights.indexOf(Math.min(...heights));
      buckets[shortest].push({ photo, index });
      heights[shortest] += aspectScore(photo.aspect);
    });

    return buckets;
  }, [photos, cols]);

  return (
    <div className="pin-masonry" style={{ "--pin-cols": cols }}>
      {columns.map((column, colIndex) => (
        <div className="pin-col" key={colIndex}>
          {column.map(({ photo, index }) => (
            <button
              key={photo.id}
              type="button"
              className={`pin-card${(aspectScore(photo.aspect) < 1 ? " pin-card--landscape" : "")}`}
              style={{ aspectRatio: photo.aspect || "3 / 4" }}
              onClick={() => onSelect(index)}
            >
              <img src={photo.src} alt={photo.title} loading="lazy" />
              <span className="pin-card-meta">
                <span className="pin-card-event">{photo.event}</span>
                <span className="pin-card-title">{photo.title}</span>
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
