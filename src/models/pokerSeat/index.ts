//@collapse

import { EventEmitter } from "events";
import { PokerSeatEventName } from "../../enums";
import { PokerSeatEvent } from "../../events";
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
   * constructor
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

  /**
   * constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
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
   * `setDealer`
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
   * `getId`
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
   * `getPosition`
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
   * `isDealer`
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
   * `getPlayer`
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

  public occupy(player: PokerPlayerInterface): void {
    this.__setPlayer(player);
  }

  public vacate(): void {
    if (!this.isOccupied()) {
      throw new Error(`PokerSeat: Seat is already vacant.`);
    }
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
   * #### Description
   * Sets a unique identifier (`id`) for the `PokerSeat` instance.
   *
   * #### Purpose
   * This method ensures that each `PokerSeat` has a unique identifier, allowing distinct identification across
   * different seats at a poker table.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `id: string` - The unique identifier to be assigned to the `PokerSeat`.
   *
   * #### Requirements
   * - `id` must be a valid, unique string that identifies this specific seat.
   *
   * #### Returns
   * - Returns the `id` assigned to the seat as a string.
   *
   * #### Usage
   * This method is used internally to assign or update the unique identifier of the seat during initialization.
   *
   * @param {string} id - A unique identifier for the seat.
   *
   * @returns {string} - The unique identifier of the seat after assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setId("unique-seat-id-123");
   * console.log(pokerSeat.getId());
   * // Console Output: "unique-seat-id-123"
   * ```
   */
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  /**
   * #### Description
   * Sets the position of the `PokerSeat` within the poker table.
   *
   * #### Purpose
   * Defines the seat's location at the poker table, which is critical for seating arrangements and determining
   * player roles such as dealer or blinds.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `position: number` - The position index of the seat on the table.
   *
   * #### Requirements
   * - `position` must be a non-negative integer and within the range allowed by the table configuration.
   *
   * #### Returns
   * - Returns the assigned position of the seat as a number.
   *
   * #### Usage
   * This method is used internally to assign or update the seat’s position during seat initialization.
   *
   * @param {number} position - Position index of the seat.
   *
   * @returns {number} - The position of the seat after assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setPosition(2);
   * console.log(pokerSeat.getPosition());
   * // Console Output: 2
   * ```
   */
  private __setPosition(position: number): number {
    this.__position = position;
    return this.__position;
  }

  /**
   * #### Description
   * Sets the dealer status for the `PokerSeat`.
   *
   * #### Purpose
   * Indicates if the player in this seat is assigned as the dealer, affecting game flow, especially in managing
   * blinds and player turns.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `bool: boolean` - Boolean value indicating whether this seat is designated as the dealer seat.
   *
   * #### Requirements
   * - `bool` should be a boolean value where `true` designates the seat as the dealer, and `false` removes the dealer status.
   *
   * #### Returns
   * - Returns the dealer status after assignment as a boolean.
   *
   * #### Usage
   * This method is used internally to assign or update the dealer status of the seat.
   *
   * @param {boolean} bool - Indicates if this seat is the dealer seat.
   *
   * @returns {boolean} - Returns the assigned dealer status.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setDealer(true);
   * console.log(pokerSeat.isDealer());
   * // Console Output: true
   * ```
   */
  private __setDealer(bool: boolean): boolean {
    this.__isDealer = bool;
    return this.__isDealer;
  }

  /**
   * #### Description
   * Sets the player occupying this `PokerSeat`.
   *
   * #### Purpose
   * Assigns a player to occupy the seat or sets it to `undefined` if vacant, enabling the system to track seat occupancy.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `player: PokerPlayerInterface | undefined` - The player instance assigned to the seat, or `undefined` if the seat is vacant.
   *
   * #### Requirements
   * - `player` must implement the `PokerPlayerInterface` or be `undefined` to mark the seat as vacant.
   *
   * #### Returns
   * - Returns the player occupying the seat or `undefined` if vacant.
   *
   * #### Usage
   * This method is used internally to assign or update the player occupying the seat.
   *
   * @param {PokerPlayerInterface | undefined} player - The player to occupy the seat, or `undefined` if no player is assigned.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance or `undefined` after assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setPlayer(playerInstance);
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  private __setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined {
    this.__player = player;
    return this.__player;
  }

  /**
   * #### Description
   * Emits an event with an optional middleware processing chain, allowing for event data validation, transformation,
   * or additional handling before final emission.
   *
   * #### Purpose
   * Consolidates event emission into a single method that supports both direct emissions and middleware-processed emissions.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * This method can emit any event specified by `PokerSeatEventName`, including:
   * - **PokerSeatEventName.SEAT_OCCUPIED**: Emitted when a player occupies the seat.
   * - **PokerSeatEventName.SEAT_VACATED**: Emitted when a seat is vacated.
   *
   * #### Parameters
   * - `eventName: PokerSeatEventName` - The name of the event to emit.
   * - `eventData: { [key: string]: any }` - Data specific to the event, such as seat and player details.
   * - `options?: { middlewares?: Array<(event: PokerSeatEvent, next: () => void) => void | false> }`
   *    - `middlewares`: Optional. Array of middleware functions to process the event data before emission.
   *
   * #### Requirements
   * - `eventName` must be a valid `PokerSeatEventName`.
   * - `eventData` must be an object with key-value pairs relevant to the event type.
   * - If `middlewares` are provided, they must follow the `(event: PokerSeatEvent, next: () => void) => void | false` function signature.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * This method is used for both direct and middleware-processed event emissions. When middlewares are provided,
   * each function processes the event data sequentially before final emission.
   *
   * @param {PokerSeatEventName} eventName - The event name to emit.
   * @param {object} eventData - Data specific to the event.
   * @param {object} [options] - Optional parameter containing middleware functions.
   * @param {Array<(event: PokerSeatEvent, next: () => void) => void | false>} [options.middlewares] - Optional array of middleware functions.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * pokerSeat.__emitEvent(PokerSeatEventName.SEAT_OCCUPIED, { seatId: "seat123", playerId: "player456" }, {
   *   middlewares: [
   *     (event, next) => { event.data.processed = true; next(); },
   *     (event, next) => { console.log("Middleware log:", event); next(); }
   *   ]
   * });
   * // Middlewares process the event, modifying `event.data.processed` to true before emitting the event.
   * ```
   */
  private __emitEvent(
    eventName: PokerSeatEventName,
    eventData: { [key: string]: any },
    options?: {
      middlewares?: Array<
        (event: PokerSeatEvent, next: () => void) => void | false
      >;
    }
  ): void {
    const event: PokerSeatEvent = this.__initializeEventObj(
      eventName,
      eventData
    );
    const middlewares = options?.middlewares ?? [];

    if (middlewares.length > 0) {
      const runMiddlewares = (index: number) => {
        if (index < middlewares.length) {
          middlewares[index](event, () => runMiddlewares(index + 1));
        } else {
          this.emit(eventName, event);
        }
      };
      runMiddlewares(0);
    } else {
      this.emit(eventName, event);
    }
  }

  /**
   * #### Description
   * Creates an event object with metadata and data, initializing it for further processing or emission.
   *
   * #### Purpose
   * This method constructs a `PokerSeatEvent` object with standardized metadata, ensuring a uniform structure for
   * seat-related events.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * - `eventName: PokerSeatEventName` - The name of the event.
   * - `eventData: { [key: string]: any }` - Data associated with the event, such as seat or player details.
   *
   * #### Requirements
   * - `eventName` must be a valid `PokerSeatEventName`.
   * - `eventData` should be an object containing relevant key-value pairs for the event.
   *
   * #### Returns
   * - `PokerSeatEvent` - A complete event object ready for processing or emission.
   *
   * #### Usage
   * Use this method to create a structured `PokerSeatEvent` object before emitting, enabling consistent event formatting
   * and easing further event handling or processing.
   *
   * @param {PokerSeatEventName} eventName - The name of the event.
   * @param {object} eventData - Data associated with the event.
   *
   * @returns {PokerSeatEvent} - A complete event object ready for processing or emission.
   *
   * @example
   * ```typescript
   * const event = pokerSeat.__initializeEventObj(PokerSeatEventName.SEAT_OCCUPIED, { seatId: "seat123", playerId: "player456" });
   * console.log(event);
   * // Console Output: { head: { name: "PokerSeat:Occupied", createdAt: <Date> }, data: { seatId: "seat123", playerId: "player456" } }
   * ```
   */
  private __initializeEventObj(
    eventName: PokerSeatEventName,
    eventData: { [key: string]: any }
  ): PokerSeatEvent {
    const event: PokerSeatEvent = {
      head: {
        id: generateUniqueId(),
        name: eventName,
        createdAt: new Date(),
        source: `PokerSeat`,
      },
      data: eventData,
    };
    return event;
  }
}

export { PokerSeat };
