/**
 * HeroEvent.jsx
 * ------------------------------------------------------------------
 * The "movie poster / keynote slide" treatment for the primary
 * event. The event details and registration panel stack over the
 * image on desktop; on mobile the image and content simply stack
 * (see the responsive rules in EventSection.css).
 *
 * Scroll behaviour:
 *   - GSAP ScrollTrigger drives a slow, continuous parallax + zoom
 *     on the image as the card passes through the viewport (image
 *     moves slower than the content, per spec).
 *   - Framer Motion drives the one-time content reveal (fade + rise)
 *     the first time the card scrolls into view.
 * ------------------------------------------------------------------
 */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventChips, { chipsForEvent } from "./EventChips";
import EventCountdown from "./EventCountdown";
import EventProgress from "./EventProgress";
import RegisterButton from "./RegisterButton";
import { CalendarIcon, ClockIcon, PinIcon, UserIcon } from "./icons";
import { usePrefersReducedMotion } from "../../customHooks/usePrefersReducedMotion";
import "../../components/EventSection.css";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.16, 1, 0.3, 1];

function MetaItem({ icon, children }) {
  if (!children) return null;
  return (
    <div className="evt-hero__meta-item">
      <span className="evt-hero__meta-icon">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default function HeroEvent({ event }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || reducedMotion)
      return undefined;

    const ctx = gsap.context(() => {
      // Slow settle-in zoom the first time the poster enters view, then a
      // gentle continuous parallax drift for the remainder of the scroll.
      gsap.fromTo(
        imageRef.current,
        { scale: 1.12, yPercent: -6 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const chips = chipsForEvent(event);

  return (
    <motion.article
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: easeOut }}
      className="evt-hero"
    >
      {/* Image layer - fills the card on desktop, fixed-height block on mobile */}
      <div className="evt-hero__image-wrap">
        <div
          ref={imageRef}
          className="evt-hero__image"
          style={{ backgroundImage: `url(${event.image})` }}
          role="img"
          aria-label={event.title}
        />
        <div aria-hidden className="evt-hero__image-glow" />
      </div>

      {/* Scrim so text stays legible over any image */}
      <div aria-hidden className="evt-hero__scrim" />

      {/* Content panel */}
      <div className="evt-hero__content">
        <div className="evt-hero__grid">
          {/* Narrative column */}
          <div className="evt-hero__details">
            {event.category && (
              <p className="evt-hero__eyebrow">{event.category}</p>
            )}
            <h3 className="evt-hero__title">{event.title}</h3>
            {event.description && (
              <p className="evt-hero__desc">{event.description}</p>
            )}

            <div className="evt-hero__meta-row">
              <MetaItem icon={<CalendarIcon />}>{event.date}</MetaItem>
              <MetaItem icon={<ClockIcon />}>{event.time}</MetaItem>
              <MetaItem icon={<PinIcon />}>{event.location}</MetaItem>
              <MetaItem icon={<UserIcon />}>{event.speaker}</MetaItem>
            </div>

            <EventChips items={chips} className="evt-hero__chips" />
          </div>

          {/* Action / stats panel */}
          <div className="evt-hero__panel">
            <EventCountdown targetISO={event.countdownTarget} />
            {typeof event.capacity === "number" && (
              <EventProgress
                capacity={event.capacity}
                registeredCount={event.registeredCount}
                className="evt-hero__progress"
              />
            )}
            <RegisterButton
              href={event.registrationOpen ? event.registrationLink : undefined}
              disabled={!event.registrationOpen}
              className="evt-hero__register"
            >
              Register Now
            </RegisterButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
