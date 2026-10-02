import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const MESSAGES = [
  "Initializing AWS Environment...",
  "Loading Terraform State...",
  "Provisioning Infrastructure...",
  "Creating VPC & Networking...",
  "Launching EC2 Instances...",
  "Configuring IAM Roles...",
  "Deploying Application...",
  "Running Health Checks...",
  "Infrastructure Ready 🚀"
];

export default function LoadingScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let currentLine = 0;
    
    // Print each line with a slight delay
    const interval = setInterval(() => {
      if (currentLine < MESSAGES.length) {
        setVisibleLines(prev => [...prev, MESSAGES[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        // Wait a bit, then fade out
        setTimeout(() => {
          setIsFadingOut(true);
          // Trigger completion after fade transition completes
          setTimeout(() => {
            onComplete();
          }, 600); // matches CSS transition duration
        }, 300);
      }
    }, 200); // 7 lines * 200ms = 1400ms total typing time

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-container">
        {/* Large Name */}
        <h1 className="loader-name">
          AWS Student Builder Group
        </h1>
        
        {/* Subtitle / Role */}
        <div className="loader-role">
          <span>Learn CLOUD</span>
        </div>

        {/* Terminal logs */}
        <div className="terminal-log">
          {visibleLines.map((line, index) => (
            <div 
              key={index} 
              className={`terminal-line ${index === MESSAGES.length - 1 ? 'ready-line' : ''}`}
            >
              <span className="terminal-prompt">&gt;</span> {line}
            </div>
          ))}
          {visibleLines.length < MESSAGES.length && (
            <div className="terminal-line active-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="cursor-blink">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
