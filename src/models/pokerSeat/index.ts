//@collapse

import { EventEmitter } from "events";
import { PokerSeatEventName } from "../../enums";
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
} from "../../interfaces";
import { generateUniqueId } from "../../utils";

/**
 * @class `PokerSeat`
 *
 * Represents a single seat at a poker table, managing player occupancy and seat status events.
 * The `PokerSeat` class is central to tracking each player’s seat position, handling seat-related
 * events like occupancy, vacancy, and position designation for dealer or blind roles.
 *
 * #### Purpose
 * `PokerSeat` is designed to provide a controlled environment for managing players at individual
 * seats on a poker table. It facilitates managing seat occupancy, seat status updates, and emitting
 * events that alert the broader poker room to seat changes or player actions.
 *
 * #### Extends
 * This class extends Node.js’s `EventEmitter`, allowing `PokerSeat` to emit events like
 * `seatOccupied` or `seatVacated` to notify other components when a seat’s status changes.
 *
 * #### Implements
 * This class implements `PokerSeatInterface`, providing a standard interface for seat operations,
 * ensuring consistent seat management across various parts of the application.
 *
 * #### Methods Overview
 * The `PokerSeat` includes the following methods:
 * - `occupySeat`: Adds a player to the seat and emits a seat-occupied event.
 * - `vacateSeat`: Removes the player from the seat and emits a seat-vacated event.
 * - `isSeatOccupied`: Checks if the seat is currently occupied.
 * - `assignBlind`: Assigns the small or big blind role to the seat.
 *
 * #### Events Overview
 * The `PokerSeat` class emits events related to player actions at the seat:
 * - **PokerSeat:Occupied**: Emitted when a player occupies the seat.
 * - **PokerSeat:Vacated**: Emitted when the seat is vacated.
 *
 * #### Usage
 * This class standardizes player management at a single seat, supporting operations like setting
 * the dealer or blind role and monitoring seat status.
 *
 * @example
 * ```typescript
 * const pokerSeat = new PokerSeat();
 * pokerSeat.on(PokerSeatEventName.SEAT_OCCUPIED, () => console.log("Seat is now occupied"));
 * pokerSeat.occupySeat(player);
 * console.log(pokerSeat.isSeatOccupied()); // Console Output: true
 * ```
 */
class PokerSeat extends EventEmitter implements PokerSeatInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string} __id
   *
   * A unique identifier for the `PokerSeat`.
   *
   * #### Purpose
   * The `__id` property uniquely identifies each `PokerSeat` instance, helping to distinguish between different
   * seats at a table, especially when multiple seats are involved in the game.
   *
   * #### Requirements
   * - This property is auto-generated and assigned a unique string identifier upon seat creation.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * console.log(pokerSeat.getId);
   *
   * // Console Output: a unique string identifier, e.g., "123e4567-e89b-12d3-a456-426614174000"
   * ```
   */
  private __id: string = ``;

  /**
   * @property {number} __position
   *
   * Represents the seat's position at the poker table, generally between 0 and the table’s maximum seating capacity.
   *
   * #### Purpose
   * The `__position` property assigns each seat a specific position on the table, helping to manage seating
   * order, player turns, and blind assignments.
   *
   * #### Requirements
   * - The `__position` is set during seat creation and must be an integer within the table’s allowed range (e.g., 0-13 for a 14-seat table).
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat({position: 3});
   * console.log(pokerSeat.getPosition());
   * // Console Output: 3
   * ```
   */
  private __position: number = 0;

  /**
   * @property {boolean} __isDealer
   *
   * Indicates if this seat is designated as the dealer’s seat.
   *
   * #### Purpose
   * The `__isDealer` property tracks whether a player seated here is currently the dealer, which is essential for managing
   * game flow, determining blinds, and starting each round.
   *
   * #### Requirements
   * - Optional: `__isDealer` is false by default and can be toggled based on the game's current dealer assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.setDealerStatus(true);
   * console.log(pokerSeat.isDealer()); // Console Output: true if set as dealer
   * ```
   */
  private __isDealer: boolean = false;

  /**
   * @property {PokerPlayerInterface | undefined} __player
   *
   * Holds the reference to the player occupying this seat, or `undefined` if no player is seated.
   *
   * #### Purpose
   * The `__player` property is used to track which player occupies this seat, facilitating management of player-specific
   * actions, status, and interactions at the table.
   *
   * #### Requirements
   * - Optional: `__player` is undefined by default until a player occupies the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.occupySeat(player); // player implements PokerPlayerInterface
   * console.log(pokerSeat.getplayer); // Console Output: Player instance if occupied
   * ```
   */
  private __player: PokerPlayerInterface | undefined = undefined;

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
  constructor(config: PokerSeatConfig) {
    super();
    this.__init(config);
  }

  private __init(config?: PokerSeatConfig) {
    if (config) {
      //
      config.id && config.id !== ``
        ? this.__setId(config.id)
        : this.__setId(generateUniqueId());

      //
      config.position
        ? this.__setPosition(config.position)
        : new Error(`PokerSeat: Apt Descriptive Error message.`);

      //
      config.isDealer
        ? this.setDealer(config.isDealer)
        : this.setDealer(this.__isDealer);

      //
      config.player
        ? this.__setPlayer(config.player)
        : this.__setPlayer(this.__player);
    }
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * @method `setDealer`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setDealer(bool: boolean): boolean {
    return this.__setDealer(bool);
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
  public isDealer(): boolean {
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
   * @method `__setDealer`
   * @public
   * Returns the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setDealer(bool: boolean): boolean {
    this.__isDealer = bool;
    return this.__isDealer;
  }

  /**
   * @method `__setPlayer`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined {
    this.__player = player;
    return this.__player;
  }

  /**
   * Emits an event with a standardized format.
   *
   * @param {string} name - The name of the event to emit.
   * @param {object} event - The data associated with the event.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * this.__emitEvent("casino:roomUpdated", { roomId: 1, status: "active" });
   * ```
   */
  private __emitEvent(name: PokerSeatEventName, event: object): void {
    this.emit(name, event);
  }
}

export { PokerSeat };
