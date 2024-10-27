import { EventEmitter } from "events";
import {
  PokerRoomConfig,
  PokerPlayerInterface,
  PokerRoomInterface,
  PokerTableInterface,
  PokerPlayerConfig,
} from "../../interfaces";
import { PokerTable } from "../pokerTable";
import { PokerPlayer } from "../pokerPlayer";

/**
 * @class `PokerRoom`
 * Represents a PokerRoom within a Casino that holds a single PokerTable. The PokerRoom manages the player queue, automatically assigning players to the PokerTable as seats become available.
 * This class extends `EventEmitter` and implements the `PokerRoomInterface` interface.
 */
class PokerRoom extends EventEmitter implements PokerRoomInterface {
  /****************************************************************
   * PROPERTIES
   ****************************************************************/

  /**
   * @property {string} _id
   * @private
   * A unique identifier for the PokerRoom.
   */
  private _id: string;

  /**
   * @property {string} _name
   * @private
   * The name of the PokerRoom.
   */
  private _name: string;

  /**
   * @property {PokerPlayerInterface[]} _queue
   * @private
   * An array of players who are waiting for a seat at the PokerTable.
   * Every player who enters the PokerRoom is automatically added to this queue.
   */
  private _queue: PokerPlayerInterface[];

  /**
   * @property {PokerTableInterface} _table
   * @private
   * The PokerTable that is contained within the PokerRoom.
   */
  private _table: PokerTableInterface;

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerRoomConfig) {
    super();
    this._id = config.id ? config.id : ``;
    this._name = config.name ? config.name : ``;
    this._queue = [];
    this._table = new PokerTable(config.tableConfig);
  }

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
  public getId(): string {
    return this._id;
  }

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
  public getName(): string {
    return this._name;
  }

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
  public getQueue(): PokerPlayerInterface[] {
    return this._queue;
  }

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
  public addToQueue(config: PokerPlayerConfig): boolean {
    const player = new PokerPlayer(config);
    this._queue.push(player);
    return true;
  }

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
  public getTable(): PokerTableInterface {
    return this._table;
  }

  /****************************************************************
   * SET METHODS
   ****************************************************************/

  /**
   * @method `setId`
   * @private
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.setRank();
   * console.log(rank); // "A"
   */
  private setId(id: string): string {
    this._id = id;
    return this._id;
  }

  /**
   * @method `setName`
   * @private
   * Returns the poker room's `name`.
   * @returns {string} The poker room's `name`.
   *
   * @example
   * const rank = card.setName();
   * console.log(rank); // "A"
   */
  public setName(name: string): string {
    this._name = name;
    return this._name;
  }

  /**
   * @method `setQueue`
   * @private
   * Returns the poker room's `name`.
   * @returns {PokerPlayerInterface[]} The poker room's `name`.
   *
   * @example
   * const rank = card.setName();
   * console.log(rank); // "A"
   */
  public setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[] {
    this._queue = queue;
    return this._queue;
  }

  /**
   * @method `setTable`
   * @private
   * Returns the poker room's `name`.
   * @returns {PokerTableInterface} The poker room's `name`.
   *
   * @example
   * const rank = card.setName();
   * console.log(rank); // "A"
   */
  public setTable(table: PokerTableInterface): PokerTableInterface {
    this._table = table;
    return this._table;
  }

  /****************************************************************
   * UPDATE METHODS
   ****************************************************************/

  /****************************************************************
   * DELETE METHODS
   ****************************************************************/

  public moveToTable(seatPostion: number): boolean {
    let roomSeats = this.getTable().getSeats();
    for (let index = 0; index < roomSeats.length; index++) {
      if (
        roomSeats[index].getPosition() === seatPostion &&
        !roomSeats[index].isOccupied() &&
        this.getQueue().length >= 1
      ) {
        let queue = this.getQueue();
        let pokerPlayer = queue.splice(0, 1);
        this.setQueue(queue);
        roomSeats[index].setPlayer(pokerPlayer[0]);
        return true;
      }
    }
    return false;
  }
}

export { PokerRoom };
