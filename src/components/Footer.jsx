import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-copyright">
          <span>&copy; {currentYear}</span>
          <span className="footer-dot">•</span>
          <span>Designed & Developed by AWS Student Builder Club, GITS</span>
        </div>

        <button 
          onClick={scrollToTop} 
          className="back-to-top-btn" 
          title="Back to Top"
          aria-label="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
