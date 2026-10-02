import React, { useEffect, useState, useRef } from "react";
import {
  Briefcase,
  Code,
  FolderGit,
  Cloud,
  BookOpen,
  Award,
  Users,
} from "lucide-react";
import "./Statistics.css";
import SpotlightCard from "./SpotlightCard";

// Reusable Counter Component
function Counter({ end, duration = 2000, startCount }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let startTime = null;
    const startVal = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);

      // Easing out quadratic
      const easeProgress = progressPercentage * (2 - progressPercentage);

      const currentCount = Math.floor(
        easeProgress * (end - startVal) + startVal,
      );
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, startCount]);

  return <span>{count}</span>;
}

const STATS_DATA = [
  {
    label: "Actice Members",
    value: 600,
    suffix: "+",
    icon: BookOpen,
    color: "var(--accent-secondary)",
  },
  {
    label: "Event Organized",
    value: 5,
    suffix: "",
    icon: Code,
    color: "var(--accent-primary)",
  },
  {
    label: "Quizes Organized",
    value: 2,
    suffix: "",
    icon: FolderGit,
    color: "var(--accent-secondary)",
  },
  {
    label: "Expert Lecture",
    value: 1,
    suffix: "",
    icon: Cloud,
    color: "var(--accent-primary)",
  },
  {
    label: "Hands On Labs",
    value: 2,
    suffix: "",
    icon: BookOpen,
    color: "var(--accent-secondary)",
  },
];

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="container" style={{ padding: 0 }}>
        <div className="stats-grid">
          {STATS_DATA.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <SpotlightCard
                className="custom-spotlight-card about-sub stat-card card-glow"
                spotlightColor="rgba(0, 229, 255, 0.2)"
                key={index}
                style={{ "--accent-color": stat.color }}
              >
                <div
                  className="stat-icon-wrapper"
                  style={{
                    color: stat.color,
                    backgroundColor: `rgba(var(--accent-primary-rgb), 0.05)`,
                  }}
                >
                  <Icon size={24} />
                </div>

                <div className="stat-value-container">
                  <h3 className="stat-number">
                    <Counter end={stat.value} startCount={isVisible} />
                    <span className="stat-suffix">{stat.suffix}</span>
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
