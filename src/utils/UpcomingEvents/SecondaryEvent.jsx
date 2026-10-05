/**
 * SecondaryEvent.jsx
 * ------------------------------------------------------------------
 * The "next up" card for the second event when two are active.
 * Deliberately smaller and quieter than HeroEvent - it should read
 * as "coming after this one", never as an equal competitor.
 * ------------------------------------------------------------------
 */
import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, PinIcon } from "./icons";
import RegisterButton from "./RegisterButton";
import KonfHubRegistrationWidget from "../KonfHubRegistrationWidget";
import "../../components/EventSection.css";

const easeOut = [0.16, 1, 0.3, 1];

export default function SecondaryEvent({ event }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
      whileHover={{ y: -6 }}
      className="evt-secondary"
    >
      <div className="evt-secondary__image-wrap">
        <div
          className="evt-secondary__image"
          style={{ backgroundImage: `url(${event.image})` }}
          role="img"
          aria-label={event.title}
        />
        <div aria-hidden className="evt-secondary__scrim" />
      </div>

      <div className="evt-secondary__body">
        {event.category && (
          <p className="evt-secondary__eyebrow">
            Next up &middot; {event.category}
          </p>
        )}
        <h4 className="evt-secondary__title">{event.title}</h4>

        <div className="evt-secondary__meta-row">
          <span className="evt-secondary__meta-item">
            <CalendarIcon className="evt-secondary__meta-icon" />
            {event.date}
          </span>
          <span className="evt-secondary__meta-item">
            <PinIcon className="evt-secondary__meta-icon" />
            {event.location}
          </span>
        </div>

        {event.registrationWidget ? (
          <KonfHubRegistrationWidget className="evt-btn evt-btn--sm evt-secondary__register">
            Register
            <span className="evt-btn__arrow" aria-hidden="true">→</span>
          </KonfHubRegistrationWidget>
        ) : (
          <RegisterButton
            href={event.registrationOpen ? event.registrationLink : undefined}
            disabled={!event.registrationOpen}
            size="sm"
            className="evt-secondary__register"
          >
            Register
          </RegisterButton>
        )}
      </div>
    </motion.article>
  );
}
