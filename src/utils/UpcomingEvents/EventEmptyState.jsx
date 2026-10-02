/**
 * EventEmptyState.jsx
 * ------------------------------------------------------------------
 * Shown when `events` is empty. Still needs to feel premium and
 * intentional - an invitation to check back, not a dead end.
 *
 * Styles live in the shared EventSection.css stylesheet.
 * ------------------------------------------------------------------
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../components/EventSection.css";


export default function EventEmptyState({ onNotifyMe }) {
  const [notified, setNotified] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="evt-empty"
    >
      <div aria-hidden className="evt-empty__icon">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF9900"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M8.5 15l2 2 4.5-4.5" />
        </svg>
      </div>

      <h3 className="evt-empty__headline">No Upcoming Events</h3>
      <p className="evt-empty__desc">
        We&rsquo;re preparing something exciting for the community. Check back
        soon, or get notified the moment registration opens.
      </p>

      <motion.button
        type="button"
        onClick={() => {
          setNotified(true);
          onNotifyMe?.();
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        disabled={notified}
        className={`evt-empty__btn ${notified ? "evt-empty__btn--done" : ""}`}
      >
        {notified ? "You're on the list" : "Notify Me"}
      </motion.button>
    </motion.div>
  );
}
