import { EventEmitter } from "events";
import {
  PokerSeatInterface,
  PokerTableConfig,
  PokerTableInterface,
} from "../../interfaces";

/**
 * @interface `PokerTable`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerTable extends EventEmitter implements PokerTableInterface {
  /**
   * @property {string} _id
   * A unique identifier for the PokerTable.
   */
  private _id: string;

  /**
   * @property {number} _size
   * The maximum number of players that can be seated at the PokerTable.
   */
  private _size: number;

  /**
   * @property {PokerSeatInterface[] | undefined} _seats
   * An array of players currently seated at the PokerTable.
   */
  private _seats: PokerSeatInterface[] | undefined;

  /**
   * @property {boolean} gameInProgress
   * A boolean indicating whether a PokerGame is currently in progress at the table.
   */
  private _gameInProgress: boolean;

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerTableConfig) {
    super();
    this._id = config.id ? config.id : ``;
    this._size = config.size ? config.size : 8;
    this._seats = config.seats ? config.seats : [];
    this._gameInProgress = false;
  }

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
   * @method `setId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private setId(id: string): string {
    this._id = id;
    return this._id;
  }

  /**
   * @method `getSize`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSize(): number {
    return this._size;
  }

  /**
   * @method `setSize`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private setSize(size: number): number {
    this._size = size;
    return this._size;
  }

  /**
   * @method `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSeats(): number {
    return this._size;
  }

  /**
   * @method `setSeats`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private setSeats(
    seats: PokerSeatInterface[] | undefined
  ): PokerSeatInterface[] | undefined {
    this._seats = seats;
    return this._seats;
  }
}

export { PokerTable };
