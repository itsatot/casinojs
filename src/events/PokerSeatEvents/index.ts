//@collapse

/**
 * @module `PokerSeatEvents`
 * Centralized export for all poker-related events.
 * This module gathers and exports events for `Rank` and `Suit`,
 * which represent the ranks and suits of playing cards in poker.
 *
 * By centralizing these events, other modules can import them easily
 * for consistent use across the library.
 *
 * @example
 * ```typescript
 * // Import all events from the centralized module
 * import { CasinoEventName, CasinoEventNameEvents, PokerPhaseName, PokerPhaseNameEvents, Rank, RankEvents, Suit, SuitEvents } from './events';
 * ```
 */
export * as PokerSeatOccupiedEvents from "./PokerSeatOccupiedEvent";
export * from "./PokerSeatOccupiedEvent";
export * as PokerSeatVacatedEvents from "./PokerSeatVacatedEvent";
export * from "./PokerSeatVacatedEvent";
