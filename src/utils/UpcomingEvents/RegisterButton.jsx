/**
 * RegisterButton.jsx
 * ------------------------------------------------------------------
 * The single call to action of the whole section. Orange gradient,
 * glow on hover, arrow that slides on hover, and a lightweight
 * ripple on click. Renders as a real <a> when `href` is given so it
 * stays keyboard- and screen-reader-friendly.
 *
 * Styles live in the shared EventSection.css stylesheet.
 * ------------------------------------------------------------------
 */
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../components/EventSection.css";

let rippleId = 0;

export default function RegisterButton({
  href,
  onClick,
  disabled = false,
  size = "lg",
  className = "",
  children = "Register Now",
}) {
  const navigate = useNavigate();
  const [ripples, setRipples] = useState([]);

  const handlePointerDown = useCallback(
    (e) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const id = rippleId++;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipples((r) => [...r, { id, x, y }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    },
    [disabled],
  );

  const isInternal = Boolean(href && href.startsWith("/") && !disabled);
  const Component = href && !disabled ? motion.a : motion.button;
  const componentProps =
    href && !disabled ? { href } : { type: "button", disabled };

  const handleClick = (e) => {
    if (isInternal) {
      e.preventDefault();
      navigate(href);
    }
    onClick?.(e);
  };

  const classNames = [
    "evt-btn",
    size === "sm" ? "evt-btn--sm" : "evt-btn--lg",
    disabled ? "evt-btn--disabled" : "",
    className,
  ].join(" ");

  return (
    <Component
      {...componentProps}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={classNames}
      aria-disabled={disabled}
    >
      <span className="evt-btn__label">
        {disabled ? "Registration Closed" : children}
      </span>
      {!disabled && (
        <svg
          className="evt-btn__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      )}

      {ripples.map((r) => (
        <span
          key={r.id}
          className="evt-btn__ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </Component>
  );
}
