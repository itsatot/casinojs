import { EventEmitter } from "events";
import {
  CardInterface,
  PokerPlayerConfig,
  PokerPlayerInterface,
} from "../../interfaces";
import { generateUniqueId } from "../../utils";

/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
class PokerPlayer extends EventEmitter implements PokerPlayerInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string} _id
   * @private
   * A unique identifier for the PokerPlayer.
   */
  private __id: string = ``;

  /**
   * @property {string} _name
   * @private
   * The player's name or alias.
   */
  private __name: string = ``;

  /**
   * @property {number} _chips
   * @private
   * The number of chips the player currently has.
   */
  private __chips: number = 100;

  /**
   * @property {CardInterface[]} _hand
   * @private
   * The player's hole cards (the two cards dealt to the player at the start of the game).
   */
  private __hand: CardInterface[] = [];

  /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
  private __isFolded: boolean = false;

  /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
  private __isBetMatched: boolean = false;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config?: PokerPlayerConfig) {
    super();
    this.__init(config);
  }

  private __init(config?: PokerPlayerConfig) {
    if (config) {
      this.__id = config.id ? config.id : generateUniqueId();
      this.__name = config.name ? config.name : this.__name;
      this.__chips = config.chips ? config.chips : this.__chips;
      this.__hand = config.hand ? config.hand : this.__hand;
      this.__isFolded = config.isFolded ? config.isFolded : this.__isFolded;
      this.__isBetMatched = this.__isBetMatched;
    }
  }
  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * #### Description
   * Sets the name of the `PokerRoom`, allowing the name to be updated or customized.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setName` method is used to assign a specific name to a `PokerRoom`, which helps distinguish it within the system.
   * This is essential for systems where rooms need to be identifiable and manageable through a unique name.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `name`: A string representing the new name for the room. It must be a valid, non-empty string to ensure
   *   the room has a clear, identifiable label.
   *
   * #### Requirements
   * - The `name` parameter should be a non-empty string to provide meaningful identification.
   * - Passing an empty or invalid value could result in future misidentification of rooms if validation is implemented.
   *
   * #### Returns
   * - Returns the `name` that was set for the `PokerRoom`.
   *
   * #### Usage
   * Use this method to set or update the name of a room in a system where unique or identifiable room names
   * are necessary for reference.
   *
   * @param {string} name - The new name for the `PokerRoom`.
   * @returns {string} - Returns the name of the room that was set.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room1", tableSize: 6 });
   * pokerRoom.setName("HighRollers"); // Sets the name of the room to "HighRollers"
   * console.log(pokerRoom.getName()); // Logs "HighRollers"
   * ```
   */
  public setName(name: string): string {
    return this._setName(name);
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
  public setChips(chips: number): number {
    return this._setChips(chips);
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
    return this._setHand(hand);
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
  public setisBetMatched(betMatched: boolean): boolean {
    return this.__setisBetMatched(betMatched);
  }


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
  public getId(): string {
    return this.__id;
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
    return this.__name;
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
    return this.__chips;
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
    return this.__hand;
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
  public getIsFolded(): boolean {
    return this.__isFolded;
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
  public getIsBetMatched(): boolean {
    return this.__isBetMatched;
  }
  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/
  

  public bet(amount: number): boolean {
    this.__chips = this.getChips() - amount;
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
  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  protected _setName(name: string): string {
    this.__name = name;
    return this.__name;
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
  protected _setChips(chips: number): number {
    this.__chips = chips;
    return this.__chips;
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
  protected _setHand(hand: CardInterface[]): CardInterface[] {
    this.__hand = hand;
    return this.__hand;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

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
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
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
  private __setIsFolded(bool: boolean): boolean {
    this.__isFolded = bool;
    return this.__isFolded;
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
  private __setisBetMatched(betMatched: boolean): boolean {
    this.__isBetMatched = betMatched;
    return this.__isBetMatched;
  }



}

export { PokerPlayer };
