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
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

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
  constructor(config?: PokerSeatConfig) {
    super();
    this.__init(config);
  }

  private __init(config?: PokerSeatConfig) {
    if (config){
    this.__id = config.id ? config.id : this.__generateId();
    this.__position = config.position;
    this.__isDealer = config.isDealer ? config.isDealer : false;
    this.__player = config.player ? config.player : undefined;
    }
  }

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
  public setIsDealer(bool: boolean): boolean {
    return this._setIsDealer(bool);
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
    return this._setPlayer(player);
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
   * @method `isDealer`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
   public getIsDealer(): boolean {
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
  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/
  

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/
  
  public isOccupied(): boolean {
    if (this.getPlayer() === undefined) {
      return false;
    }
    return true;
  }
  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
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
  protected _setIsDealer(bool: boolean): boolean {
    this.__isDealer = bool;
    return this.__isDealer;
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
   protected _setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined {
    this.__player = player;
    return this.__player;
  }

   /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/
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
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
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
  private __setPosition(position: number): number {
    this.__position = position;
    return this.__position;
  }

  /**
   * #### Description
   * The `__generateId` method generates a unique identifier string. This ID is used internally
   * to uniquely identify instances or components within the `PokerRoom` class, helping manage
   * each room separately by its own ID.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * The purpose of the `__generateId` method is to provide a consistent, automatic way
   * to generate unique IDs, ensuring that each `PokerRoom` instance has its own distinct
   * identifier. This prevents conflicts or confusion between instances.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * This method does not take any parameters.
   *
   * #### Requirements
   * - Utilizes the `generateUniqueId` function from an external library or internal utility.
   * - This function must be capable of producing unique, non-repeating strings each time it's called.
   *
   * #### Returns
   * The method returns a `string` type, representing a unique identifier.
   *
   * #### Usage
   * Typically used internally within the `PokerRoom` or `Casino` classes when a new
   * room instance is created, this method is called automatically without requiring
   * external intervention.
   *
   * @returns {string} - A unique string identifier generated by the `generateUniqueId` function.
   *
   * @throws {Error} - This method does not throw any errors.
   *
   * @example
   * ```typescript
   * class PokerRoom {
   *   private __id: string = this.__generateId();
   *
   *   private __generateId(): string {
   *     return generateUniqueId(); // Creates a new unique ID for this PokerRoom instance
   *   }
   * }
   *
   * const room = new PokerRoom();
   * console.log(room.__id); // Outputs a unique identifier, e.g., "room_12345abc"
   * ```
   */
  private __generateId(): string {
    return generateUniqueId();
  }
}

export { PokerSeat };
