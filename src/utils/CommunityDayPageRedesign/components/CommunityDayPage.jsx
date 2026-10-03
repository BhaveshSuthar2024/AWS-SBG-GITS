import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from '../hooks/useLenis';
import { useMouse } from '../hooks/useMouse';
import CustomCursor from './CustomCursor';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Speakers from './Speakers';
import CoreTeam from './CoreTeam';
import Volunteers from './Volunteers';
import Schedule from './Schedule';
import Venue from './Venue';
import Sponsors from './Sponsors';
import FAQ from './FAQ';
import Registration from './Registration';
import Footer from './Footer';
import MobileStickyCTA from './MobileStickyCTA';
import '../styles/globals.css';

export default function CommunityDayPage() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Track cursor position for custom cursor & 3D hero reaction
  const mouse = useMouse();

  // Track active section for navigation
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll progress for 3D hero transition
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Scroll progress from 0 to 1.5 during hero transition
      scrollProgress.current = Math.min(Math.max(scrollY / windowHeight, 0), 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight current active section in nav
  useEffect(() => {
    const sections = ['home', 'about', 'speakers', 'team', 'volunteers', 'schedule', 'venue', 'sponsors', 'faq', 'register'];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="community-day-redesign">
      <div className="relative w-full min-h-screen bg-[#030303] text-white selection:bg-[#FF9900] selection:text-black">
        {/* Precision desktop custom cursor */}
        <CustomCursor mouse={mouse} />

        {/* Fixed Navigation Header */}
        <Navigation activeSection={activeSection} />

        {/* Main Sections */}
        <main>
          <Hero mouse={mouse} scrollProgress={scrollProgress} />
          <About />
          <Speakers />
          <CoreTeam />
          <Volunteers />
          <Schedule />
          <Venue />
          <Sponsors />
          <FAQ />
          <Registration />
        </main>

        {/* Minimal Editorial Footer */}
        <Footer />

        {/* Fixed Mobile Conversion Registration Bar */}
        <MobileStickyCTA />
      </div>
    </div>
  );
}
