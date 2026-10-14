import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LinkedInIcon from '../../../components/LinkedInIcon';
import { coreTeam } from '../../communityDayData';

gsap.registerPlugin(ScrollTrigger);

function InteractiveMarqueeRow({
  items,
  direction = 'left',
  speed = 0.85,
  initialOffset = 0,
  rowLabel = 'CORE TEAM',
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [copyCount, setCopyCount] = useState(2);
  const xPos = useRef(initialOffset);
  const currentSpeed = useRef(direction === 'left' ? -speed : speed);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const isHovered = useRef(false);
  const singleSetWidth = useRef(0);
  const baseSpeed = direction === 'left' ? -speed : speed;

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || items.length === 0) return undefined;

    const renderPosition = () => {
      track.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
    };
    const measureWidth = () => {
      const firstSet = track.children[0];
      const secondSet = track.children[1];
      if (!firstSet || !secondSet) return;

      const period = secondSet.offsetLeft - firstSet.offsetLeft;
      if (period <= 0) return;

      singleSetWidth.current = period;
      const requiredCopies = Math.max(
        2,
        Math.ceil(container.clientWidth / period) + 2,
      );
      setCopyCount((currentCount) =>
        currentCount === requiredCopies ? currentCount : requiredCopies,
      );
      xPos.current = ((xPos.current % period) + period) % period - period;
      renderPosition();
    };

    measureWidth();
    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(measureWidth) : null;
    resizeObserver?.observe(track);
    resizeObserver?.observe(container);
    if (!resizeObserver) window.addEventListener('resize', measureWidth);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let animationFrame = 0;

    const animate = () => {
      if (!isDragging.current && !prefersReducedMotion) {
        if (Math.abs(velocity.current) > 0.05) {
          xPos.current += velocity.current;
          velocity.current *= 0.94;
        } else {
          const targetSpeed = isHovered.current ? baseSpeed * 0.38 : baseSpeed;
          currentSpeed.current +=
            (targetSpeed - currentSpeed.current) * 0.06;
          xPos.current += currentSpeed.current;
        }

        const period = singleSetWidth.current;
        if (period > 0) {
          while (xPos.current <= -period) xPos.current += period;
          while (xPos.current > 0) xPos.current -= period;
        }
        renderPosition();
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!animationFrame && !prefersReducedMotion) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    const stop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) start();
            else stop();
          }, { rootMargin: '120px 0px' })
        : null;

    if (observer) observer.observe(container);
    else start();

    return () => {
      window.removeEventListener('resize', measureWidth);
      resizeObserver?.disconnect();
      observer?.disconnect();
      stop();
    };
  }, [baseSpeed, items.length]);

  const handlePointerDown = (event) => {
    isDragging.current = true;
    lastX.current = event.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;

    const now = performance.now();
    const deltaTime = Math.max(now - lastTime.current, 1);
    const deltaX = event.clientX - lastX.current;
    xPos.current += deltaX;
    velocity.current = (deltaX / deltaTime) * 16.6;
    lastX.current = event.clientX;
    lastTime.current = now;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="marquee-edge-mask cursor-grab active:cursor-grabbing select-none py-3"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        isHovered.current = false;
      }}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      aria-label={`${rowLabel} Marquee`}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        ref={trackRef}
        className="flex items-start gap-0 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {Array.from({ length: copyCount }, (_, setIndex) => (
          <div
            key={`team-marquee-set-${setIndex}`}
            className="flex items-start gap-6 sm:gap-8"
            aria-hidden={setIndex > 0 ? 'true' : undefined}
          >
            {items.map((member, index) => (
              <article
                key={`${member.id ?? member.name}-${setIndex}-${index}`}
                className="team-portrait-card"
              >
                <div className="team-image-container">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={
                        setIndex > 0
                          ? ''
                          : `${member.name}, AWS Community Day Udaipur Core Team`
                      }
                      loading={index < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="team-portrait-img"
                      draggable="false"
                    />
                  )}
                  <div className="team-image-vignette" />
                  <div className="team-hover-tag">
                    <span className="team-tag-dot" />
                    <span className="team-tag-text">CORE TEAM</span>
                  </div>
                </div>
                <div className="team-meta-container">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  {member.linkedin && (
                    <a
                      className="team-member-linkedin"
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${member.name}'s LinkedIn profile`}
                      title={`${member.name} on LinkedIn`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <LinkedInIcon size={16} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CoreTeam({ rows = [coreTeam] }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeContainerRef = useRef(null);
  const allMembers = rows.flat();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        marqueeContainerRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: marqueeContainerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full bg-[#030303] text-white overflow-hidden pt-12 pb-24 md:pb-36"
    >
      <div className="section-editorial-divider">
        <span>AWS COMMUNITY DAY / UDAIPUR</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14 md:mb-20">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-medium text-zinc-400">
                04
              </span>
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-xs font-mono tracking-widest text-[#FF9900] uppercase">
                CORE TEAM
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 hidden sm:block" />
              <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase hidden sm:inline">
                AWS STUDENT BUILDER GROUP GITS
              </span>
            </div>
            <h2 className="core-team-heading">
              The people <br />
              <em>behind the experience.</em>
            </h2>
          </div>

          <div className="max-w-xs md:text-right">
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider leading-relaxed">
              {String(allMembers.length).padStart(2, '0')} CORE ORGANIZERS
              {' · '}BUILT FOR BUILDERS
              {' · '}100% COMMUNITY VOLUNTARY
            </p>
          </div>
        </div>
      </div>

      <div ref={marqueeContainerRef} className="w-full">
        <InteractiveMarqueeRow
          items={allMembers}
          direction="left"
          speed={0.8}
          initialOffset={0}
          rowLabel="Core Team"
        />
      </div>
    </section>
  );
}
