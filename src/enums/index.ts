//@collapse

import { Source } from "./source";

/**
 * @module `Enums`
 * Centralized export for all poker-related enums.
 * This module gathers and exports enums for `Rank` and `Suit`,
 * which represent the ranks and suits of playing cards in poker.
 *
 * By centralizing these enums, other modules can import them easily
 * for consistent use across the library.
 *
 * @example
 * // Import all enums from the centralized module
 * import { CasinoEventName, CasinoEventNamesEnum, PokerPhaseName, PokerPhaseNamesEnum, Rank, RanksEnum, Suit, SuitsEnum } from './enums';
 */
export * as CasinoEventNamesEnum from "./casinoEventNames";
export * from "./casinoEventNames";
export * as PokerPhaseNamesEnum from "./pokerPhaseNames";
export * from "./pokerPhaseNames";
export * as PokerSeatEventNamesEnum from "./pokerSeatEventNames";
export * from "./pokerSeatEventNames";
export * as RanksEnum from "./rank";
export * from "./rank";
export * as Sources from "./source";
export * from "./source";
export * as SuitsEnum from "./suit";
export * from "./suit";
