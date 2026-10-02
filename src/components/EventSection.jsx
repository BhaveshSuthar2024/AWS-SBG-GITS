/**
 * EventSection.jsx
 * ------------------------------------------------------------------
 * Drop this into the page below your "What We Do" timeline. It:
 *
 *   1. Leaves ~100px of breathing space, then spreads a subtle
 *      orange glow up from the bottom as the section enters.
 *   2. Reveals the "UPCOMING / EVENTS" heading with a scroll-driven
 *      blur-removal + letter-spacing contraction (GSAP ScrollTrigger).
 *   3. Renders exactly one of three states based on `events.length`:
 *      empty / single (full hero) / two (hero + secondary).
 *
 * No background of its own - it inherits whatever background layer
 * the page already renders behind it (see CloudArchitectureBackground).
 * ------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroEvent from "../utils/UpcomingEvents/HeroEvent";
import SecondaryEvent from "../utils/UpcomingEvents/SecondaryEvent";
import EventEmptyState from "../utils/UpcomingEvents/EventEmptyState";
import { sampleEvents } from "../utils/UpcomingEvents/eventsData";
import { usePrefersReducedMotion } from "../customHooks/usePrefersReducedMotion";
import "./EventSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function EventSection({ events = sampleEvents, onNotifyMe }) {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const headingRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    if (reducedMotion) {
      // Snap straight to the final, fully-visible state.
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 1, scale: 1 });
      if (headingRef.current) {
        gsap.set(headingRef.current.querySelectorAll("[data-reveal-word]"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          letterSpacing: "0em",
        });
      }
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Orange glow spreads up from the bottom as the section arrives.
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Heading: fade upward, blur removal, letter-spacing contracts.
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll("[data-reveal-word]");
        gsap.fromTo(
          words,
          { opacity: 0, y: 40, filter: "blur(10px)", letterSpacing: "0.12em" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            letterSpacing: "0em",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const count = events?.length || 0;

  return (
    <section
      id="events"
      ref={sectionRef}
      className="evt-section"
      aria-labelledby="upcoming-events-heading"
    >
      {/* Entrance glow - purely decorative */}
      <div ref={glowRef} aria-hidden className="evt-glow" />

      {/* Ambient light streaks, very low opacity, purely atmospheric */}
      <div aria-hidden className="evt-streaks">
        <div className="evt-streak-a" />
        <div className="evt-streak-b" />
      </div>

      <div ref={headingRef} className="evt-heading-wrap">
        <h2 id="upcoming-events-heading" className="evt-heading">
          <span data-reveal-word className="evt-heading-line">
            UPCOMING
          </span>
          <span data-reveal-word className="evt-heading-accent">
            EVENTS
          </span>
        </h2>
        <p className="evt-subtitle" data-reveal-word>
          Join hands-on workshops, hackathons, technical sessions, and community
          meetups designed to help you build real cloud skills.
        </p>
      </div>

      <div className="evt-body">
        {count === 0 && <EventEmptyState onNotifyMe={onNotifyMe} />}

        {count === 1 && <HeroEvent event={events[0]} />}

        {count >= 2 && (
          <div className="evt-two-col">
            <HeroEvent event={events[0]} />
            {/* <SecondaryEvent event={events[1]} /> */}
          </div>
        )}
      </div>
    </section>
  );
}
