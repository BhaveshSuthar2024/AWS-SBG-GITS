/**
 * EventProgress.jsx
 * ------------------------------------------------------------------
 * "N / capacity registered" readout with a smoothly animated fill
 * bar. Surfaces urgency (low seats remaining) without being alarmist.
 *
 * Styles live in the shared EventSection.css stylesheet.
 * ------------------------------------------------------------------
 */
import React from "react";
import { motion } from "framer-motion";
import "../../components/EventSection.css";


export default function EventProgress({
  capacity,
  registeredCount,
  className = "",
}) {
  if (!capacity || capacity <= 0) return null;

  const registered = Math.min(registeredCount || 0, capacity);
  const pct = Math.round((registered / capacity) * 100);
  const remaining = capacity - registered;
  const isFillingUp = remaining > 0 && remaining <= capacity * 0.15;
  const isFull = remaining <= 0;

  return (
    <div
      className={`evt-progress ${className}`}
      aria-label="Registration progress"
    >
      <div className="evt-progress__row">
        <span className="evt-progress__label">
          <span className="evt-progress__count">{registered}</span> / {capacity}{" "}
          registered
        </span>
        {isFull ? (
          <span className="evt-progress__status-full">Full</span>
        ) : isFillingUp ? (
          <span className="evt-progress__status-low">
            {remaining} seat{remaining === 1 ? "" : "s"} left
          </span>
        ) : (
          <span className="evt-progress__status-normal">
            {remaining} seats left
          </span>
        )}
      </div>

      <div className="evt-progress__track">
        <motion.div
          className="evt-progress__fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
