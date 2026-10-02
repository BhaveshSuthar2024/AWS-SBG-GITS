import React, { useState } from "react";
import { Send, Mail, MessageSquare, CheckCircle2 } from "lucide-react";

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
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const Instagram = ({ size = 24, ...props }) => (
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    // Simulate API request (e.g., Formspree or EmailJS)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset back to idle after 4 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 400);
    }, 1800);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center cloud-journey-heading">
          <p className="contact-kicker">AWS STUDENT BUILDER CLUB · GITS</p>
          <h2 className="section-title">Start Your Cloud Journey</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            Become part of a community where students learn, build, and grow
            together through AWS workshops, projects, hackathons, and technical
            sessions.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Info & Socials */}
          <div className="contact-info-panel glass">
            <h3 className="contact-sub-title">Why Join Us?</h3>
            <p className="contact-info-desc">
              Whether you're just getting started with cloud computing or
              already building on AWS, our community offers hands-on workshops,
              collaborative projects, technical sessions, hackathons, and
              networking opportunities to help you grow.
            </p>

            <form onSubmit={handleSubmit} className="contact-form-left">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`btn form-submit-btn ${status === "success" ? "btn-success" : "btn-premium"}`}
              >
                {status === "idle" && (
                  <>
                    <span>Subscribe</span>
                    <Send size={16} />
                  </>
                )}
                {status === "sending" && (
                  <>
                    <span>Sending Message...</span>
                    <div className="form-spinner" />
                  </>
                )}
                {status === "success" && (
                  <>
                    <span>Subscribed Successfully..</span>
                    <CheckCircle2 size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="contact-socials-grid">
              <h4 className="socials-title">Connect With Us</h4>
              <div className="socials-row">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-btn"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon-btn"
                  title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="mailto:awsclub@gits.ac.in"
                  className="social-icon-btn"
                  title="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form glass">
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group text">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi, I'd like to join the AWS Student Builder Club..."
                className="form-input form-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={`btn form-submit-btn ${status === "success" ? "btn-success" : "btn-premium"}`}
            >
              {status === "idle" && (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
              {status === "sending" && (
                <>
                  <span>Sending Message...</span>
                  <div className="form-spinner" />
                </>
              )}
              {status === "success" && (
                <>
                  <span>Message Sent!</span>
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
