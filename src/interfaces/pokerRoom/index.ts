import { EventEmitter } from "events";
import { PokerTableConfig , PokerTableInterface } from "../pokerTable";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerRoomConfig`
 * Represents a PokerPlayer Config.
 */
interface PokerRoomConfig {
  /**
   * @property {string | undefined} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id: string | undefined;

  /**
   * @property {string | undefined} name
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  name: string | undefined;

  /**
   * @property {string | undefined} name
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  smallBlindAmount: number;


  /**
   * @property {string | undefined} name
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  tableConfig: PokerTableConfig;
}

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

export { PokerRoomConfig , PokerRoomInterface };
