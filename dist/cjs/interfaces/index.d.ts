/**
 * @module `Interfaces`
 * Centralized export for all poker-related interfaces and types.
 * This module gathers and exports interfaces and types for `Card`, `Deck`.
 * This allows for streamlined imports in other modules, ensuring that all poker-related interfaces
 * and types can be accessed from a single location.
 *
 * @example
 * // Import all interfaces and types from the centralized module
 * import { CardInterface, DeckInterface } from './interfaces';
 */
export * as CardInterfaces from "./card";
export * from "./card";
export * as CasinoInterfaces from "./casino";
export * from "./casino";
export * as DeckInterfaces from "./deck";
export * from "./deck";
export * as PokerGameInterfaces from "./pokerGame";
export * from "./pokerGame";
export * as PokerPhaseInterfaces from "./pokerPhase";
export * from "./pokerPhase";
export * as PokerPlayerInterfaces from "./pokerPlayer";
export * from "./pokerPlayer";
export * as PokerRoomInterfaces from "./pokerRoom";
export * from "./pokerRoom";
export * as PokerSeatInterfaces from "./pokerSeat";
export * from "./pokerSeat";
export * as PokerTableInterfaces from "./pokerTable";
export * from "./pokerTable";
