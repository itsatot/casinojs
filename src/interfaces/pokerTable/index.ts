import { EventEmitter } from "events";
import { PokerSeatInterface } from "../pokerSeat";

/**
 * @interface `PokerTableConfig`
 * Represents a PokerTable Config.
 */
interface PokerTableConfig {
  /**
   * @property {number} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id: string | undefined;

  /**
   * @property {number} size
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  size: number | undefined;

  /**
   * @property {number} smallBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  smallBlindAmount: number | undefined;
}

/**
 * @interface `PokerTableInterface`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerTableInterface extends NodeJS.EventEmitter {
  /**
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getId(): string;

  /**
   * @method `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  getSeats(): PokerSeatInterface[];
}

export { PokerTableConfig, PokerTableInterface };
