/**
 * EventCountdown.jsx
 * ------------------------------------------------------------------
 * The section's signature element: a large, monospace "launch clock"
 * readout, echoing the technical/cloud visual language of the rest
 * of the site rather than a generic rounded-card countdown widget.
 * Each digit group flips in with a short fade+slide when it changes.
 *
 * Styles live in the shared EventSection.css stylesheet.
 * ------------------------------------------------------------------
 */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "../../customHooks/useCountdown";
import "../../components/EventSection.css";


function pad(n) {
  return String(n).padStart(2, "0");
}

function Segment({ value, label }) {
  return (
    <div className="evt-countdown__segment">
      <div className="evt-countdown__digit-window">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="evt-countdown__digit"
          >
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="evt-countdown__digit-label">{label}</span>
    </div>
  );
}

export default function EventCountdown({ targetISO, className = "" }) {
  const { days, hours, minutes, isPast } = useCountdown(targetISO);

  if (!targetISO) return null;

  if (isPast) {
    return (
      <div className={`evt-countdown__now ${className}`}>Happening now</div>
    );
  }

  return (
    <div
      className={`evt-countdown ${className}`}
      role="timer"
      aria-live="polite"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes remaining`}
    >
      <Segment value={days} label="Days" />
      <span className="evt-countdown__colon">:</span>
      <Segment value={hours} label="Hours" />
      <span className="evt-countdown__colon">:</span>
      <Segment value={minutes} label="Minutes" />
    </div>
  );
}
