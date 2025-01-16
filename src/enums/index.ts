//@collapse

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
 * import { CasinoEventName, CasinoEventNamesEnum, PokerPhaseName, PokerPhasesEnum, Rank, RanksEnum, Suit, SuitsEnum } from './enums';
 */
export * as EventsEnumModule from "./events";
export * from "./events";
export * as LogLevelsEnumModule from "./logLevels";
export * from "./logLevels";
export * as PokerPhasesEnumModule from "./pokerPhases";
export * from "./pokerPhases";
export * as RanksEnumModule from "./ranks";
export * from "./ranks";
export * as SourcesEnumModule from "./sources";
export * from "./sources";
export * as SuitsEnumModule from "./suits";
export * from "./suits";
export * as handRank from "./handRank";
export * from "./handRank";
