import { EventEmitter } from "events";
import {
  CardInterface,
  PokerPlayerConfig,
  PokerPlayerInterface,
} from "../../interfaces";

/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
class PokerPlayer extends EventEmitter implements PokerPlayerInterface {
  /******************* PROPERTIES *******************/

  /**
   * @property {string} _id
   * @private
   * A unique identifier for the PokerPlayer.
   */
  private _id: string;

  /**
   * @property {string} _name
   * @private
   * The player's name or alias.
   */
  private _name: string;

  /**
   * @property {number} _chips
   * @private
   * The number of chips the player currently has.
   */
  private _chips: number;

  /**
   * @property {CardInterface[]} _hand
   * @private
   * The player's hole cards (the two cards dealt to the player at the start of the game).
   */
  private _hand: CardInterface[];

  /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
  private _isFolded: boolean;

  /******************* CONSTRUCTOR *******************/

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerPlayerConfig) {
    super();
    this._id = config.id ? config.id : ``;
    this._name = config.name ? config.name : ``;
    this._chips = config.chips ? config.chips : 100;
    this._hand = config.hand ? config.hand : [];
    this._isFolded = config.isFolded ? config.isFolded : false;
  }

  /******************* GETTERS *******************/

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
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getName(): string {
    return this._name;
  }

  /**
   * @method `getChips`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getChips(): number {
    return this._chips;
  }

  /**
   * @method `getHand`
   * @public
   * Returns the poker table's `id`.
   * @returns {CardInterface[]} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getHand(): CardInterface[] {
    return this._hand;
  }

  /**
   * @method `isFolded`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public isFolded(): boolean {
    return this._isFolded;
  }

  /******************* SETTERS *******************/

  /**
   * @method `setId`
   * @private
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
   * @method `setName`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setName(name: string): string {
    this._name = name;
    return this._name;
  }

  /**
   * @method `setChips`
   * @private
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private setChips(chips: number): number {
    this._chips = chips;
    return this._chips;
  }

  /**
   * @method `setHand`
   * @private
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setHand(hand: CardInterface[]): CardInterface[] {
    this._hand = hand;
    return this._hand;
  }

  
  /**
   * @method `setIsFolded`
   * @private
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setIsFolded(bool: boolean): boolean {
    this._isFolded = bool;
    return this._isFolded;
  }

  public bet(amount:number):boolean{
    this._chips = this.getChips() - amount;
    return true;
  }

  /**
   * @method `setHand`
   * @private
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */

  public addToHand(hand: CardInterface): boolean {
    this.getHand().push(hand);
    return true;
  }
}

export { PokerPlayer };
