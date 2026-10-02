import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const InteractiveBackground = lazy(() => import("./InteractiveBackground"));

const TYPING_STRINGS = [
  "Learn AWS.",
  "Build on the Cloud.",
  "Deploy Real Projects.",
  "A Step to Master Cloud Computing.",
  "Innovate Together.",
  "Become Cloud Ready.",
];

export default function Hero() {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);
  const pointerFrame = useRef(0);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) setTypedText(TYPING_STRINGS[0]);
    return () => cancelAnimationFrame(pointerFrame.current);
  }, []);

  // Typing effect
  useEffect(() => {
    if (reducedMotion.current) return undefined;
    let timer;
    const currentString = TYPING_STRINGS[stringIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setTypedText(currentString.substring(0, typedText.length - 1));
      }, 30);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setTypedText(currentString.substring(0, typedText.length + 1));
      }, 60);
    }

    // If fully typed, wait and start deleting
    if (!isDeleting && typedText === currentString) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    }
    // If fully deleted, move to next string
    else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setStringIndex((stringIndex + 1) % TYPING_STRINGS.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, stringIndex]);

  // Mouse Parallax Effect
  const handleMouseMove = (e) => {
    if (!containerRef.current || reducedMotion.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    pointerTarget.current = {
      x: ((e.clientX - rect.left) / rect.width - .5) * 16,
      y: ((e.clientY - rect.top) / rect.height - .5) * 16,
    };
    if (pointerFrame.current) return;
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = 0;
      containerRef.current?.style.setProperty("--pointer-x", `${pointerTarget.current.x}px`);
      containerRef.current?.style.setProperty("--pointer-y", `${pointerTarget.current.y}px`);
    });
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--pointer-x", "0px");
    containerRef.current.style.setProperty("--pointer-y", "0px");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="hero-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Suspense fallback={null}>
        <InteractiveBackground scope="hero" />
      </Suspense>
      <div className="hero-container container">
        {/* Left Info Column */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>AWS STUDENT BUILDER GROUP · GITS</span>
          </div>

          <h1 className="hero-title">
            BUILD THE FUTURE <br />
            <span className="text-gradient">WITH AWS</span>
          </h1>

          {/* Typing Container */}
          <div className="typing-container">
            <span className="typing-text">{typedText}</span>
            <span className="typing-cursor">|</span>
          </div>

          <p className="hero-description">
            Join a community of innovators, builders, and future cloud
            engineers. Learn through hands-on workshops, real-world projects,
            hackathons, and industry mentorship.
          </p>

          <div className="hero-cta-buttons">
            <button
              onClick={() => navigate("/community-day")}
              className="btn btn-premium"
            >
              Student Community Day
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn btn-secondary"
            >
              Contact Us
            </button>
          </div>
        </div>
        
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        aria-label="Scroll to About section"
        className="scroll-indicator"
        onClick={() => scrollToSection("about")}
      >
        <div className="mouse-scroll">
          <div className="wheel" />
        </div>
        <span>Scroll Down</span>
        <ArrowDown size={14} className="arrow-bounce" />
      </button>
    </section>
  );
}
