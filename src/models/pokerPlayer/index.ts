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
   * @property {string} __id
   * @private
   * A unique identifier for the PokerPlayer.
   */
  private __id: string = ``;

  /**
   * @property {string} __name
   * @private
   * The player's name or alias.
   */
  private __name: string = ``;

  /**
   * @property {number} _chips
   * @private
   * The number of chips the player currently has.
   */
  private _chips: number = 0;

  /**
   * @property {CardInterface[]} _hand
   * @private
   * The player's hole cards (the two cards dealt to the player at the start of the game).
   */
  private _hand: CardInterface[] = [];

  /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
  private _isFolded: boolean = false;

  /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
  private _isBetMatched: boolean = false;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * The `constructor` initializes the `Casino` class.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Output: []
   * ```
   */
  constructor(config?: PokerPlayerConfig) {
    super();
    this.__init(config);
  }

  /**
   * `__init`: Performs any necessary setup logic when the `Casino` is instantiated.
   * This is an internal method, meaning it's private and only used within the `Casino` class.
   *
   * #### Purpose
   * This method is designed to be a placeholder for any future setup logic or preparation that the
   * Casino might need during initialization. Currently, it's an empty method that gets called within the constructor.
   *
   * #### Usage
   * Developers can add additional logic in this method if there are operations or configurations
   * that need to happen every time the Casino is created.
   *
   * @returns {void} - This method doesn't return any values.
   *
   * @example
   * The `__init` method is automatically invoked when the `Casino` is created:
   * ```typescript
   * const casino = new Casino();
   * ```
   */
  private __init(config?: PokerPlayerConfig): void {
    // No current logic, but reserved for future setup or configuration
    if (config) {
      this.__id = config.id ? config.id : generateUniqueId();
      this.__name = config.name ? config.name : ``;
      this._chips = config.chips ? config.chips : 100;
      this._hand = config.hand ? config.hand : [];
      this._isFolded = config.isFolded ? config.isFolded : false;
      this._isBetMatched = false;
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

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Creates a new `PokerRoom` instance based on the provided configuration and adds it to the Casino's rooms list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino to dynamically create new rooms as needed by providing specific room configurations.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_CREATED` event, enabling listeners to respond to the creation of a new room.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the newly created `PokerRoomInterface` instance.
   *
   * #### Usage
   * Primarily used within subclasses or protected methods to dynamically create and add rooms to the Casino.
   *
   * @param {PokerRoomConfig} config - Configuration settings for creating a new `PokerRoom`.
   * @returns {PokerRoomInterface} - The newly created room instance.
   *
   * @example
   * ```typescript
   * class SpecialCasino extends Casino {
   *   public createSpecialRoom(config: PokerRoomConfig): PokerRoomInterface {
   *     return this._createRoom(config);
   *   }
   * }
   * const specialCasino = new SpecialCasino();
   * const newRoom = specialCasino.createSpecialRoom({ name: "Champions Lounge", tableSize: 10, smallBlind: 100, bigBlind: 200 });
   * console.log(newRoom.getName()); // Outputs: "Champions Lounge"
   * ```
   */
  public getId(): string {
    return this.__id;
  }

  /**
   * #### Description
   * Retrieves the current name of the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is defined within `PokerRoomInterface` and is implemented by any class adhering to this interface.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getName` method enables access to the current name of a `PokerRoom`, which can be essential for
   * identification, logging, and displaying room information to users.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * `N/A` - This method does not require any parameters.
   *
   * #### Requirements
   * `N/A` - This method simply returns the current name as set by `setName`.
   *
   * #### Returns
   * - Returns the current name of the `PokerRoom` as a string.
   *
   * #### Usage
   * Use this method to fetch the current name of a `PokerRoom`. This can be particularly helpful for displaying
   * or verifying the room name during operations.
   *
   * @returns {string} - The current name of the `PokerRoom`.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "VIP Room", tableSize: 6 });
   * console.log(pokerRoom.getName()); // Logs "VIP Room"
   * ```
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

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

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
  public isBetMatched(): boolean {
    return this._isBetMatched;
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
  private __setChips(chips: number): number {
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
    this._isBetMatched = betMatched;
    return this._isBetMatched;
  }

  public bet(amount: number): boolean {
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
  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  protected _setName(name: string): string {
    this.__name = name;
    return this.__name;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * @method `__setId`
   * @private
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.setRank();
   * console.log(rank); // "A"
   */
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }
}

export { PokerPlayer };
