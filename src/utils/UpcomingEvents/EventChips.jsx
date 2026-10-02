/**
 * EventChips.jsx
 * ------------------------------------------------------------------
 * Renders the small set of premium "chips" (category, difficulty,
 * format, certificate, ...) that replace long descriptive paragraphs.
 * Deliberately tiny and quiet - these are labels, not buttons.
 *
 * Styles live in the shared EventSection.css stylesheet.
 * ------------------------------------------------------------------
 */
import React from "react";
import { motion } from "framer-motion";
import "../../components/EventSection.css";


/**
 * Builds the chip label list from an event, in a fixed, sensible
 * order. Accepts either a full event object or an explicit `tags`
 * array override.
 */
export function chipsForEvent(event) {
  if (Array.isArray(event.tags) && event.tags.length) return event.tags;
  return [
    event.category,
    event.difficulty,
    event.format,
    event.certificate ? "Certificate" : null,
  ].filter(Boolean);
}

export default function EventChips({ items, size = "md", className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`evt-chip-list ${className}`} aria-label="Event tags">
      {items.map((label, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className={`evt-chip ${size === "sm" ? "evt-chip--sm" : ""}`}>
            {label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
