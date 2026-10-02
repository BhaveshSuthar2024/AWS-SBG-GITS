import React from "react";
import { useEffect, useRef } from "react";
import "./About.css";

function Journey() {
  const TIMELINE_EVENTS = [
    {
      year: "2021",
      title: "Started Programming",
      description:
        "Began journey with core programming languages, algorithms, and data structures. Developed a strong logical foundation.",
    },
    {
      year: "2022",
      title: "Learned Web Development",
      description:
        "Mastered HTML, CSS, and modern JavaScript. Built interactive web applications and started working with React.",
    },
    {
      year: "2023",
      title: "Built MERN Projects",
      description:
        "Transitioned to Full-Stack. Designed and deployed end-to-end applications using MongoDB, Express, React, and Node.js.",
    },
    {
      year: "2023",
      title: "Mastered Backend Development",
      description:
        "Focused heavily on server-side architecture. Deep-dived into REST APIs, database indexing, caching (Redis), and WebSockets.",
    },
    {
      year: "2024",
      title: "Started AWS",
      description:
        "Began hosting and architecting in the cloud. Mastered AWS services like EC2, S3, RDS, Lambda, VPC, and IAM.",
    },
    {
      year: "2025",
      title: "Learning DevOps",
      description:
        "Integrated containerization and automation. Mastered Docker, Kubernetes, CI/CD with GitHub Actions, and Infrastructure as Code using Terraform.",
    },
    {
      year: "2025",
      title: "Studying System Design",
      description:
        "Transitioned to high-level distributed architectures. Studying load balancers, rate limiting, microservices, and database sharding.",
    },
    {
      year: "2026",
      title: "Preparing for Top Tech Companies",
      description:
        "Refining algorithmic skills (DSA), practicing system design, and building high-throughput backend products.",
    },
  ];

  const timelineRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    const timelineItems =
      timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => observer.observe(item));

    return () => {
      timelineItems?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <>
      <div className="timeline-container" ref={timelineRef}>
        <h3 className="timeline-section-title">Milestones</h3>

        <div className="timeline-track" />

        <div className="timeline-list">
          {TIMELINE_EVENTS.map((event, index) => (
            <div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              {/* Timeline Dot */}
              <div className="timeline-dot" />

              {/* Timeline Card */}
              <div className="timeline-content-card glass">
                <span className="timeline-year">{event.year}</span>
                <h4 className="timeline-title">{event.title}</h4>
                <p className="timeline-desc">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Journey;
