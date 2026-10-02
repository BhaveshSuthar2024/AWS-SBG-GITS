import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Timeline from "../utils/WhatweDo/Timeline";
import defaultEvents from "../utils/WhatweDo/whatWeDoEvents";
import "./WhatWeDo.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Optional Lenis integration: if the app already runs a global Lenis
  // instance (exposed as window.lenis, the common convention), sync it
  // with ScrollTrigger. We deliberately do NOT instantiate our own Lenis
  // here - creating a second smooth-scroll instance just for this section
  // would fight whatever the rest of the site is already doing. Native
  // scroll + ScrollTrigger works perfectly well on its own if Lenis isn't
  // present.
  if (window.lenis && !window.lenis.__wwdSynced) {
    window.lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => window.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    window.lenis.__wwdSynced = true;
  }
}

const EASE = [0.16, 1, 0.3, 1];

export default function WhatWeDoSection({ events = defaultEvents }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const revealed = useRef(false);

  // Section starts empty (see .wwd-section / .wwd-heading initial state in
  // CSS). Once the timeline has scrolled ~10% through, fade the heading up
  // once and leave it - this mirrors the same ScrollTrigger the Timeline
  // uses for its line so the two stay in sync without extra measurement.
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      end: "bottom 55%",
      scrub: 0.6,
      onUpdate: (self) => {
        if (self.progress > 0.1 && !revealed.current) {
          revealed.current = true;
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="what-we-do" className="wwd-section" ref={sectionRef}>
      <div className="wwd-heading" ref={headingRef}>
        <span className="wwd-eyebrow">What We Do</span>
        <h2 className="wwd-heading-title">
          Building Skills.
          <br />
          Creating Opportunities.
        </h2>
      </div>

      <Timeline events={events} />
    </section>
  );
}
