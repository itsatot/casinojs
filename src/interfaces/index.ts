import { ICard } from "./card";
import { IDeck } from "./deck";
import { Rank } from "./rank";
import { Suit } from "./suit";

/**
 * @module `Interfaces`
 * Centralized export for all poker-related interfaces and types.
 * This module gathers and exports interfaces and types for `Card`, `Deck`, `Rank`, and `Suit`.
 * This allows for streamlined imports in other modules, ensuring that all poker-related interfaces
 * and types can be accessed from a single location.
 *
 * @example
 * // Import all interfaces and types from the centralized module
 * import { ICard, IDeck, Rank, Suit } from './interfaces';
 */

export { ICard, IDeck, Rank, Suit };
