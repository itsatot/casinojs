import { EventEmitter } from "events";
import { PokerTableConfig, PokerTableInterface } from "../pokerTable";
import { PokerPlayerConfig, PokerPlayerInterface } from "../pokerPlayer";

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
  /****************************************************************
   * GET METHODS
   ****************************************************************/

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

  /**
   * @method `getQueue`
   * @public
   * Returns the poker room's `name`.
   * @returns {PokerPlayerInterface[]} The poker room's `name`.
   *
   * @example
   * const rank = card.getName();
   * console.log(rank); // "A"
   */
  getQueue(): PokerPlayerInterface[];

  /**
   * @method `getQueue`
   * @public
   * Returns the poker room's `name`.
   * @returns {PokerPlayerInterface[]} The poker room's `name`.
   *
   * @example
   * const rank = card.getName();
   * console.log(rank); // "A"
   */
  addToQueue(config: PokerPlayerConfig): boolean;

  /**
   * @method `getTable`
   * @public
   * Returns the poker room's `name`.
   * @returns {PokerTableInterface} The poker room's `name`.
   *
   * @example
   * const rank = card.getName();
   * console.log(rank); // "A"
   */
  getTable(): PokerTableInterface;

  /****************************************************************
   * SET METHODS
   ****************************************************************/

  // /**
  //  * @method `setId`
  //  * @private
  //  * Returns the poker table's `id`.
  //  * @returns {string} The poker table's `id`.
  //  *
  //  * @example
  //  * const rank = card.setRank();
  //  * console.log(rank); // "A"
  //  */
  // setId(id: string): string;

  // /**
  //  * @method `setName`
  //  * @private
  //  * Returns the poker room's `name`.
  //  * @returns {string} The poker room's `name`.
  //  *
  //  * @example
  //  * const rank = card.setName();
  //  * console.log(rank); // "A"
  //  */
  // setName(name: string): string;

  // /**
  //  * @method `setQueue`
  //  * @private
  //  * Returns the poker room's `name`.
  //  * @returns {PokerPlayerInterface[]} The poker room's `name`.
  //  *
  //  * @example
  //  * const rank = card.setName();
  //  * console.log(rank); // "A"
  //  */
  // setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[];

  // /**
  //  * @method `setTable`
  //  * @private
  //  * Returns the poker room's `name`.
  //  * @returns {PokerTableInterface} The poker room's `name`.
  //  *
  //  * @example
  //  * const rank = card.setName();
  //  * console.log(rank); // "A"
  //  */
  // setTable(table: PokerTableInterface): PokerTableInterface;

  /****************************************************************
   * UPDATE METHODS
   ****************************************************************/

  /****************************************************************
   * DELETE METHODS
   ****************************************************************/
}

export { PokerRoomConfig, PokerRoomInterface };
