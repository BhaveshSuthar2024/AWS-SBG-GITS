import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import KonfHubRegistrationWidget from '../../KonfHubRegistrationWidget';

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky bar after scrolling past 25% of viewport height (~20-30vh)
      const threshold = window.innerHeight * 0.28;
      if (window.scrollY > threshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className={`mobile-sticky-bar ${visible ? 'visible' : ''}`}
      aria-label="Mobile Registration Bar"
    >
      <div className="mobile-sticky-info">
        <span className="mobile-sticky-title">AWS COMMUNITY DAY</span>
        <span className="mobile-sticky-subtitle">UDAIPUR '26 · FEB 28</span>
      </div>

      <KonfHubRegistrationWidget className="mobile-sticky-btn">
        <span>Register</span>
        <ArrowUpRight className="mobile-sticky-arrow" />
      </KonfHubRegistrationWidget>
    </aside>
  );
}
