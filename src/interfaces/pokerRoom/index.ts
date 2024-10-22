import { EventEmitter } from "events";
import { PokerTableInterface } from "../pokerTable";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerRoomInterface`
 * Represents a PokerRoom within a Casino that holds a single PokerTable.
 * The PokerRoom manages the player queue, automatically assigning players to the PokerTable
 * as seats become available.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerRoomInterface extends NodeJS.EventEmitter {
  /**
   * @method `getName`
   * @public
   * Returns the poker room's `name`.
   * @returns {string} The poker room's `name`.
   *
   * @example
   * const rank = card.getName();
   * console.log(rank); // "A"
   */
  getName(): string;
}

export { PokerRoomInterface };
