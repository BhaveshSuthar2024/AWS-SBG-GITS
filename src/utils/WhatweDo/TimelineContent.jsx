import React from 'react';

/**
 * TimelineContent
 * Right-hand text block: category / title / description / optional link.
 */
export default function TimelineContent({ category, title, description, buttonLabel, onButtonClick }) {
  return (
    <div className="wwd-content">
      {category && <span className="wwd-category">{category}</span>}
      <h3 className="wwd-item-title">{title}</h3>
      {description && <p className="wwd-description">{description}</p>}
      {buttonLabel && (
        <button type="button" className="wwd-link-btn" onClick={onButtonClick}>
          <span>{buttonLabel}</span>
          <span className="wwd-link-arrow" aria-hidden="true">
            &rarr;
          </span>
        </button>
      )}
    </div>
  );
}
