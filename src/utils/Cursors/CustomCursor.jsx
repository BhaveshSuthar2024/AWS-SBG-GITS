import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinates
  const mouse = useRef({ x: 0, y: 0 });
  // Lerp coordinates for the outer ring
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Enable custom cursor body styling
    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setIsVisible(true);

      // Move the dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Lerp loop for the ring
    let animationFrameId;
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const render = () => {
      if (ringRef.current) {
        // Linear interpolation for smooth trailing
        ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15);
        ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15);

        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive-card') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isClicked ? 'clicked' : ''} ${isHovered ? 'hovered' : ''}`}
      />
    </>
  );
}
