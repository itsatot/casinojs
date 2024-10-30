//@collapse

import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerSeatConfig`
 * Represents a PokerTable Config.
 */
interface PokerSeatConfig {
  /**
   * @property {string | undefined} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id?: string;

  /**
   * @property {number} position
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  position: number;

  /**
   * @property {boolean} isDealer
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  isDealer?: boolean;

  /**
   * @property {PokerPlayerInterface | undefined} player
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  player?: PokerPlayerInterface;
}

/**
 * @interface `PokerSeatInterface`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerSeatInterface extends NodeJS.EventEmitter {
  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * @method `setIsDealer`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  setIsDealer(bool: boolean): boolean;

  /**
   * @method `setPlayer`
   * @public
   * Returns the poker table's `id`.
   * @returns {PokerPlayerInterface | undefined} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined;

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

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
   * @method `getPosition`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getPosition(): number;

  /**
   * @method `isDealer`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getIsDealer(): boolean;

  /**
   * @method `getPlayer`
   * @public
   * Returns the poker table's `id`.
   * @returns {PokerPlayerInterface | undefined} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getPlayer(): PokerPlayerInterface | undefined;

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  isOccupied(): boolean;

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/
}

export { PokerSeatConfig, PokerSeatInterface };
