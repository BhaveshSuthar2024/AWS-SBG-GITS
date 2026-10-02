import React from "react";
import {
  Award,
  Code2,
  Trophy,
  Flame,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";
import "./Achievements.css";

const ACHIEVEMENTS_DATA = [
  {
    title: "Smart India Hackathon Finalist",
    organization: "Ministry of Education, Govt. of India",
    date: "2024",
    category: "Hackathon",
    desc: "Led a 6-member team to the national finals. Designed and developed a secure, scalable portal for tracking drug supply chain using Node.js, Express, and React.",
    icon: Trophy,
    color: "var(--accent-primary)",
    link: "#",
  },
  {
    title: "Winner - Local Hackathon (HackCloud)",
    organization: "RTU Tech Fest",
    date: "2024",
    category: "Hackathon",
    desc: "Won 1st place among 40+ teams. Developed a serverless, event-driven image processing microservice on AWS using Lambda, S3, and DynamoDB in under 24 hours.",
    icon: Award,
    color: "var(--success)",
    link: "#",
  },
  {
    title: "LeetCode - 1650+ Rating",
    organization: "LeetCode",
    date: "Active",
    category: "Coding",
    desc: "Solved over 500+ algorithmic problems (Easy: 150, Medium: 300, Hard: 50). Consistently participating in weekly and bi-weekly coding contests.",
    icon: Code2,
    color: "var(--accent-secondary)",
    link: "https://leetcode.com/bhaveshsuthar",
  },
  {
    title: "HackerRank Problem Solving (Gold)",
    organization: "HackerRank",
    date: "2023",
    category: "Coding",
    desc: "Achieved 5-Star Gold Badge in Problem Solving and 5-Star in Java. Demonstrated proficiency in complex data structures and algorithms.",
    icon: Flame,
    color: "var(--success)",
    link: "https://hackerrank.com/bhaveshsuthar",
  },
  {
    title: "AWS Academy Graduate",
    organization: "Amazon Web Services",
    date: "2024",
    category: "Certification",
    desc: "Completed official AWS Academy courses on Cloud Foundations and Cloud Architecture. Gained hands-on experience in VPC, EC2, IAM, and RDS.",
    icon: Award,
    color: "var(--accent-primary)",
    link: "#",
  },
  {
    title: "Open Source Contributor",
    organization: "GitHub Community",
    date: "Active",
    category: "Open Source",
    desc: "Contributed security patches and optimized database queries in popular Node.js backend utility libraries. Active member of local developer circles.",
    icon: Code2,
    color: "var(--accent-secondary)",
    link: "https://github.com/bhaveshsuthar",
  },
];

export default function Achievements() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <h2 className="section-title">Achievements & Badges</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            Key milestones, competitive programming accomplishments, and
            certifications.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {ACHIEVEMENTS_DATA.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div
                key={idx}
                className="ach-card card-glow"
                onMouseMove={handleMouseMove}
                style={{ "--accent-color": ach.color }}
              >
                {/* Header Row */}
                <div className="ach-card-header">
                  <div
                    className="ach-icon-box"
                    style={{
                      color: ach.color,
                      backgroundColor: `rgba(var(--accent-primary-rgb), 0.05)`,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="ach-date">{ach.date}</span>
                </div>

                {/* Content */}
                <div className="ach-card-body">
                  <span className="ach-category">{ach.category}</span>
                  <h3 className="ach-title">{ach.title}</h3>
                  <p className="ach-org">{ach.organization}</p>
                  <p className="ach-desc">{ach.desc}</p>
                </div>

                {/* Optional Link */}
                {ach.link && ach.link !== "#" && (
                  <a
                    href={ach.link}
                    target="_blank"
                    rel="noreferrer"
                    className="ach-link-btn"
                  >
                    <span>View Link</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
