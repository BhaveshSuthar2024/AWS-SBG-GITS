/**
 * index.js - barrel export for the EventSection module.
 */
import EventSection from './EventSection';

export default EventSection;
export { default as HeroEvent } from './HeroEvent';
export { default as SecondaryEvent } from './SecondaryEvent';
export { default as EventCountdown } from './EventCountdown';
export { default as EventChips, chipsForEvent } from './EventChips';
export { default as EventProgress } from './EventProgress';
export { default as RegisterButton } from './RegisterButton';
export { default as EventEmptyState } from './EventEmptyState';
export { sampleEvents } from './eventsData';
export { useCountdown } from './useCountdown';
export { usePrefersReducedMotion } from './usePrefersReducedMotion';
