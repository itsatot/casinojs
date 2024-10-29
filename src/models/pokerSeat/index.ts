import { EventEmitter } from "events";
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
} from "../../interfaces";
import { generateUniqueId } from "../../utils";

/**
 * @interface `PokerSeat`
 * Represents a PokerSeat within a PokerRoom.
 * The PokerSeat manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerSeat extends EventEmitter implements PokerSeatInterface {
  /******************* PROPERTIES *******************/

  /**
   * @property {string} __id
   * A unique identifier for the PokerSeat.
   */
  private __id: string = ``;

  /**
   * @property {number} position
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __position: number = 0;

  /**
   * @property {boolean} isDealer
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __isDealer: boolean = false;

  /**
   * @property {PokerPlayerInterface | undefined} player
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __player: PokerPlayerInterface | undefined;

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
    this.__id = config.id ? config.id : generateUniqueId();
    this.__position = config.position;
    this.__isDealer = config.isDealer ? config.isDealer : false;
    this.__player = config.player ? config.player : undefined;
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
    return this.__id;
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
    this.__id = id;
    return this.__id;
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
    return this.__position;
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
    this.__position = position;
    return this.__position;
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
    return this.__isDealer;
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
    this.__isDealer = bool;
    return this.__isDealer;
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
    return this.__player;
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
    this.__player = player;
    return this.__player;
  }

  public isOccupied(): boolean {
    if (this.getPlayer() === undefined) {
      return false;
    }
    return true;
  }
}

export { PokerSeat };
