import { EventEmitter } from "events";
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
} from "../../interfaces";

/**
 * @interface `PokerSeat`
 * Represents a PokerSeat within a PokerRoom.
 * The PokerSeat manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerSeat extends EventEmitter implements PokerSeatInterface {
  /**
   * @property {string} _id
   * A unique identifier for the PokerSeat.
   */
  private _id: string;

  /**
   * @property {number} position
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _position: number;

  /**
   * @property {boolean} isDealer
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _isDealer: boolean;

  /**
   * @property {boolean} isSmallBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _isSmallBlind: boolean;

  /**
   * @property {boolean} isBigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _isBigBlind: boolean;

  /**
   * @property {PokerPlayerInterface | undefined} player
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _player: PokerPlayerInterface | undefined;

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerSeatConfig) {
    super();
    this._id = config.id ? config.id : ``;
    this._position = config.position;
    this._isDealer = config.isDealer;
    this._isSmallBlind = config.isSmallBlind;
    this._isBigBlind = config.isBigBlind;
    this._player = config.player ? config.player : undefined;
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
   * @method `getPosition`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getPosition(): number {
    return this._position;
  }

  /**
   * @method `setPosition`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private setPosition(position: number): number {
    this._position = position;
    return this._position;
  }

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
  public isDealer(): boolean {
    return this._isDealer;
  }

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
  public setIsDealer(bool: boolean): boolean {
    this._isDealer = bool;
    return this._isDealer;
  }

  /**
   * @method `isSmallBlind`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public isSmallBlind(): boolean {
    return this._isSmallBlind;
  }

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
  public setIsSmallBlind(bool: boolean): boolean {
    this._isSmallBlind = bool;
    return this._isSmallBlind;
  }
  /**
   * @method `isBigBlind`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public isBigBlind(): boolean {
    return this._isBigBlind;
  }

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
  public setIsBigBlind(bool: boolean): boolean {
    this._isBigBlind = bool;
    return this._isBigBlind;
  }
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
  public getPlayer(): PokerPlayerInterface | undefined {
    return this._player;
  }

  /**
   * @method `setPlayer`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined {
    this._player = player;
    return this._player;
  }

  public isOccupied(): boolean{
    if (this.getPlayer() === undefined) {
      return false;
    } 
    return true;}
 
}

export { PokerSeat };
