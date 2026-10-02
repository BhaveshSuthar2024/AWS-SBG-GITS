import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Award, Briefcase, Cpu, Sparkles } from "lucide-react";
import { coreTeamMembers, teamBands } from "../utils/coreTeamData";
import "./CoreTeam.css";

function ProfileModal({ member, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Linkedin = ({ size = 24, ...props }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );

  return (
    <div className="team-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <button className="team-modal-close" type="button" onClick={onClose} aria-label="Close profile">
          <X size={18} />
        </button>

        <div className="team-modal-hero">
          <img src={member.photo} alt={member.name} />
          <div>
            <p className="team-role-tag">{member.role}</p>
            <h3>{member.name}</h3>
            <p className="team-position">{member.position}</p>
            <p className="team-field">{member.field}</p>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="team-linkedin">
                <Linkedin size={16} />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        <p className="team-intro">{member.intro}</p>

        <div className="team-modal-grid">
          <section>
            <h4>
              <Award size={16} /> Qualifications
            </h4>
            <ul>
              {member.qualifications.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>
              <Sparkles size={16} /> Achievements
            </h4>
            <ul>
              {member.achievements.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>
              <Briefcase size={16} /> Experience
            </h4>
            <ul className="team-exp">
              {member.experience.map((row) => (
                <li key={row.title}>
                  <strong>{row.title}</strong>
                  <span>
                    {row.org} · {row.period}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h4>
              <Cpu size={16} /> Technologies
            </h4>
            <div className="team-tech">
              {member.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        </div>

        <blockquote className="team-fact">
          <span>A fact</span>
          {member.fact}
        </blockquote>
      </div>
    </div>
  );
}

export default function CoreTeamSection() {
  const [openId, setOpenId] = useState(null);
  const openMember = coreTeamMembers.find((m) => m.id === openId);

  return (
    <section id="core-team" className="team-section">
      <div className="container">
        <div className="team-head">
          <p className="gallery-eyebrow">People</p>
          <h2>Core team</h2>
          <p>
            One captain, one vice captain, two tech leads, and three non-tech leads.
            Open a profile for introduction, qualifications, and the work they own.
          </p>
        </div>

        {teamBands.map((band) => {
          const members = coreTeamMembers.filter((m) => m.band === band.id);
          return (
            <div key={band.id} className={`team-band team-band--${band.id.toLowerCase()}`}>
              <p className="team-band-label">{band.caption}</p>
              <div className="team-grid">
                {members.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    className="team-card"
                    onClick={() => setOpenId(member.id)}
                  >
                    <div className="team-card-photo">
                      <img src={member.photo} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div className="team-card-copy">
                      <span className="team-role-tag">{member.role}</span>
                      <h3>{member.name}</h3>
                      <p>{member.field}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {openMember && (
        createPortal(<ProfileModal member={openMember} onClose={() => setOpenId(null)} />, document.body)
      )}
    </section>
  );
}
