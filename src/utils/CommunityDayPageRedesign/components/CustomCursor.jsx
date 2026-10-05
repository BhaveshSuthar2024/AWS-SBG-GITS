import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor({ mouse }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'glass'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    let rafId;
    const updateCursor = () => {
      if (mouse.current.clientX !== undefined) {
        // Fast direct dot
        dotX += (mouse.current.clientX - dotX) * 0.4;
        dotY += (mouse.current.clientY - dotY) * 0.4;

        // Smooth trailing ring
        ringX += (mouse.current.clientX - ringX) * 0.15;
        ringY += (mouse.current.clientY - ringY) * 0.15;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }
      rafId = requestAnimationFrame(updateCursor);
    };
    rafId = requestAnimationFrame(updateCursor);

    // Event delegation for interactive hover targets
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive, .glass-target');
      if (target) {
        if (target.classList.contains('glass-target')) {
          setCursorState('glass');
        } else {
          setCursorState('hover');
        }
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [mouse]);

  if (!isVisible) return null;

  return (
    <div className="community-day-cursor">
      <div
        ref={dotRef}
        className={`community-day-cursor__dot community-day-cursor__dot--${cursorState}`}
      />
      <div
        ref={ringRef}
        className={`community-day-cursor__ring community-day-cursor__ring--${cursorState}`}
      />
    </div>
  );
}
