import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "./TimelineItem";
import TimelineNode from "./TimelineNode";
import ParticleLayer from "./ParticleLayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1];

/**
 * Timeline
 * Height, node count, and spacing all fall out of normal document flow -
 * every TimelineItem below just stacks with consistent CSS gap, so the
 * container's height is however tall `events.length` items naturally make
 * it. Nothing here is measured or hardcoded in pixels, so 3 events or 300
 * events both work without touching this file.
 *
 * The vertical line is two stacked bars (a dim always-present track and a
 * bright glowing overlay) whose scaleY is driven by GSAP ScrollTrigger's
 * scrub progress against this container - "drawing" the line and lighting
 * it up are the same animation.
 */
export default function Timeline({ events }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const glowRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [finalActive, setFinalActive] = useState(false);
  const finalRef = useRef(null);

  const handleActivate = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  // Scroll-scrubbed line draw / progress glow
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!container || !track || !glow) return;

    gsap.set([track, glow], { scaleY: 0, transformOrigin: "top center" });
    gsap.set(glow, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 78%",
      end: "bottom 55%",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(track, { scaleY: p });
        gsap.set(glow, { scaleY: p, opacity: Math.min(1, p * 1.6) });
      },
    });

    return () => trigger.kill();
  }, [events.length]);

  // Final node: once reached, the energy "remains there" - never resets.
  useEffect(() => {
    const el = finalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFinalActive(true);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wwd-timeline" ref={containerRef}>
      <div className="wwd-line wwd-line--track" ref={trackRef} />
      <div className="wwd-line wwd-line--glow" ref={glowRef} />

      <ParticleLayer
        count={events.length > 8 ? 18 : 12}
        activeIndex={activeIndex}
      />

      <div className="wwd-items">
        {events.map((event, index) => (
          <TimelineItem
            key={event.title || index}
            event={event}
            index={index}
            isActive={index === activeIndex}
            onActivate={handleActivate}
          />
        ))}

        {/* Final node - not part of the data array, always appended */}
        <motion.div
          ref={finalRef}
          className={`wwd-item wwd-item--final ${finalActive ? "is-active" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: EASE },
          }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="wwd-item-node-wrap">
            <TimelineNode active={finalActive} final />
          </div>
          <div className="wwd-final-content">
            <span className="wwd-category">Next Step</span>
            <h3 className="wwd-final-title">Your Journey Starts Here</h3>
            <button
              type="button"
              className="wwd-cta-btn"
              onClick={() => {
                window.open(
                  "https://chat.whatsapp.com/CoQDbQYdD9e67R3RpKAsWA",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              Join Our Community
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
