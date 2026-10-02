import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import TimelineImage from './TimelineImage';
import TimelineContent from './TimelineContent';

const EASE = [0.16, 1, 0.3, 1];

// Node glows -> image slides in from the left -> text fades in from the
// right -> settle. Framer Motion's stagger handles the sequencing so each
// event plays independently the first time it enters view.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.04 } },
};
const nodeVariants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};
const imageVariants = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};
const textVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE, delay: 0.08 } },
};

export default function TimelineItem({ event, index, isActive, onActivate }) {
  const ref = useRef(null);

  // "Active" = this event currently sits at the vertical center of the
  // viewport. A center-anchored rootMargin makes exactly one item active
  // at a time without any scroll-position math.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActivate(index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onActivate]);

  return (
    <motion.div
      ref={ref}
      className={`wwd-item ${isActive ? 'is-active' : ''}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div className="wwd-item-node-wrap" variants={nodeVariants}>
        <TimelineNode active={isActive} />
      </motion.div>

      <motion.div className="wwd-item-image-col" variants={imageVariants}>
        <TimelineImage src={event.image} alt={event.title} />
      </motion.div>

      <motion.div className="wwd-item-text-col" variants={textVariants}>
        <TimelineContent
          category={event.category}
          title={event.title}
          description={event.description}
          buttonLabel={event.buttonLabel || 'Learn More'}
          onButtonClick={event.onButtonClick}
        />
      </motion.div>
    </motion.div>
  );
}
