//@collapse

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
export * as BaseInterfaceModule from "./_base";
export * from "./_base";
export * as BaseEventInterfaceModule from "./baseEvent";
export * from "./baseEvent";
export * as CardInterfaceModule from "./card";
export * from "./card";
export * as CasinoInterfaceModule from "./casino";
export * from "./casino";
export * as DeckInterfaceModule from "./deck";
export * from "./deck";
export * as LoggerInterfaceModule from "./logger";
export * from "./logger";
export * as PokerGameInterfaceModule from "./pokerGame";
export * from "./pokerGame";
export * as PokerPhaseInterfaceModule from "./pokerPhase";
export * from "./pokerPhase";
export * as PokerPlayerInterfaceModule from "./pokerPlayer";
export * from "./pokerPlayer";
export * as PokerRoomInterfaceModule from "./pokerRoom";
export * from "./pokerRoom";
export * as PokerSeatInterfaceModule from "./pokerSeat";
export * from "./pokerSeat";
export * as PokerTableInterfaceModule from "./pokerTable";
export * from "./pokerTable";
