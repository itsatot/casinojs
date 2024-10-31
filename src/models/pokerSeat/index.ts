//@collapse

import { EventEmitter } from "events";
import { PokerSeatEventName } from "../../enums";
import { PokerSeatEvent, PokerSeatEvents } from "../../events";
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

  public occupy(player: PokerPlayerInterface): void {
    this.__setPlayer(player);
    this.__emitEvent(PokerSeatEventName.SEAT_OCCUPIED, {
      head: {
        name: PokerSeatEventName.SEAT_OCCUPIED,
        createdAt: new Date(),
      },
      data: {
        seatId: this.getId(),
        playerId: player.getId(),
        updatedSeat: this,
      },
    });
  }

  public vacate(): void {
    if (!this.isOccupied()) {
      throw new Error(`PokerSeat: Seat is already vacant.`);
    }
    const playerid = this.getPlayer()?.getId();
    this.__setPlayer(undefined);
    this.__emitEvent(PokerSeatEventName.SEAT_VACATED, {
      head: {
        name: PokerSeatEventName.SEAT_VACATED,
        createdAt: new Date(),
      },
      data: {
        seatId: this.getId(),
        playerId: playerid,
        updatedSeat: this,
      },
    });
  }

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

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
  public attachEventListener<T extends PokerSeatEvent = PokerSeatEvent>(
    name: PokerSeatEventName,
    middlewares: Array<(event: T, next: () => void) => void | false> = []
  ): void {
    this.__attachEventListener(name, middlewares);
  }

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
   * Ensures that each `PokerSeat` has a unique identifier, allowing distinct identification across different seats
   * at a poker table.
   *
   * #### Parameters
   * - `id: string` - The unique identifier to be assigned to the `PokerSeat`.
   *
   * #### Requirements
   * - The `id` should be a valid, unique string that identifies this specific seat.
   *
   * #### Returns
   * - Returns the `id` assigned to the seat.
   *
   * #### Usage
   * Use this method to assign or update the unique identifier of the seat during initialization.
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
   * Defines the location or order of the seat at the poker table, which is critical for seating arrangements
   * and determining player roles such as dealer or blinds.
   *
   * #### Parameters
   * - `position: number` - The position index of the seat on the table.
   *
   * #### Requirements
   * - `position` must be a non-negative integer and should be within the range allowed by the table configuration.
   *
   * #### Returns
   * - Returns the assigned position of the seat.
   *
   * #### Usage
   * Use this method to assign or update the seat’s position at the table during seat initialization.
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
   * Indicates whether the player in this seat is currently assigned the role of dealer, which affects game flow,
   * especially in managing blinds and player turns.
   *
   * #### Parameters
   * - `bool: boolean` - Boolean value indicating whether this seat is designated as the dealer seat.
   *
   * #### Requirements
   * - `bool` should be a boolean value where `true` marks the seat as dealer and `false` removes the dealer status.
   *
   * #### Returns
   * - Returns the dealer status after assignment.
   *
   * #### Usage
   * Use this method to assign or update the dealer status of the seat.
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
   * Assigns a player to occupy the seat or sets it to `undefined` if vacant, allowing the system to track seat occupancy.
   *
   * #### Parameters
   * - `player: PokerPlayerInterface | undefined` - The player instance to be assigned to the seat, or `undefined` if the seat is vacant.
   *
   * #### Requirements
   * - `player` should implement the `PokerPlayerInterface` or be `undefined` to mark the seat as vacant.
   *
   * #### Returns
   * - Returns the player occupying the seat or `undefined` if the seat is vacant.
   *
   * #### Usage
   * Use this method to assign or update the player occupying the seat.
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
   * Emits an event with a predefined structure, containing metadata and data specific to the event.
   *
   * #### Purpose
   * The `__emitEvent` method standardizes the emission of events from `PokerSeat`, allowing event listeners to
   * receive structured information regarding seat-related actions.
   *
   * #### Parameters
   * - `name: PokerSeatEventName` - The name of the event to emit.
   * - `event: PokerSeatEvent` - The data associated with the event, encapsulated in a standardized structure.
   *
   * #### Requirements
   * - `name` should be a valid `PokerSeatEventName` and correspond to predefined seat events.
   * - `event` should follow the `PokerSeatEvent` interface format, providing structured event data.
   *
   * #### Returns
   * - This method does not return any value (`void`).
   *
   * #### Usage
   * Use this method to emit events related to the seat, such as seat occupancy changes or dealer assignments.
   *
   * @param {PokerSeatEventName} name - The event name to emit.
   * @param {PokerSeatEvent} event - Structured data associated with the event.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * pokerSeat.__emitEvent(PokerSeatEventName.SEAT_OCCUPIED, {
   *   head: { name: "PokerSeat:Occupied", createdAt: new Date() },
   *   data: { seatId: "seat123", playerId: "player789" }
   * });
   * // Event emitted: listeners receive { head: { name: "PokerSeat:Occupied", createdAt: <Date> }, data: { seatId: "seat123", playerId: "player789" } }
   * ```
   */
  private __emitEvent(name: PokerSeatEventName, event: PokerSeatEvent): void {
    this.emit(name, event);
  }

  /**
   * #### Description
   * Instantiates an event object and processes it through middleware functions before emitting.
   *
   * #### Purpose
   * Allows for event data to be processed and modified via middleware before final emission,
   * ensuring the event adheres to required validations and transformations.
   *
   * #### Parameters
   * - `name: PokerSeatEventName` - The name of the event to emit.
   * - `eventData: object` - The raw data for the event, used to instantiate the full event object.
   * - `middlewares: Array<(event: PokerSeatEvent, next: () => void) => void | false>` - Array of middleware functions.
   *
   * #### Returns
   * - `void` - This method does not return any value.
   *
   * #### Example
   * ```typescript
   * this.__emitEventWithMiddlewares(PokerSeatEventName.SEAT_OCCUPIED, { seatId: "123", playerId: "456" }, [
   *   (event, next) => { event.data.processed = true; next(); },
   *   (event, next) => { console.log("Middleware log:", event); next(); }
   * ]);
   * ```
   *
   * @param {PokerSeatEventName} name - The name of the event to emit.
   * @param {object} eventData - The initial raw event data.
   * @param {Array<(event: PokerSeatEvent, next: () => void) => void | false>} middlewares - Array of middleware functions.
   */
  private __emitEventWithMiddlewares(
    name: PokerSeatEventName,
    eventData: { [key: string]: any },
    middlewares: Array<
      (event: PokerSeatEvent, next: () => void) => void | false
    > = []
  ): void {
    // Instantiate the actual event object with metadata and provided data
    const event: PokerSeatEvent = {
      head: { name, createdAt: new Date() },
      data: eventData,
    };

    const runMiddlewares = (index: number) => {
      if (index < middlewares.length) {
        middlewares[index](event, () => runMiddlewares(index + 1));
      } else {
        this.__emitEvent(name, event); // Emit after all middlewares have run
      }
    };

    runMiddlewares(0); // Start processing middlewares
  }

  /**
   * #### Description
   * Attaches an event listener with an optional sequence of middleware functions to preprocess event data.
   *
   * #### Purpose
   * This method allows attaching a listener for a specified event with middleware for additional data handling
   * or validation before the final event is emitted.
   *
   * #### Parameters
   * - `name: PokerSeatEventName` - The event name for which the listener is attached.
   * - `middlewares: Array<(event: T, next: () => void) => void | false>` - A sequence of middleware functions to process
   *   the event data before the final emission. Each middleware can modify `event` or terminate propagation by returning `false`.
   *
   * #### Requirements
   * - `name` must be a valid `PokerSeatEventName`.
   * - Each middleware in `middlewares` should follow the expected `(event: T, next: () => void) => void | false` format.
   *
   * #### Returns
   * - This method does not return any value (`void`).
   *
   * #### Usage
   * Use this method to attach custom event listeners and middleware for events, allowing advanced data processing.
   *
   * @param {PokerSeatEventName} name - The event name for which the listener is attached.
   * @param {Array<(event: T, next: () => void) => void | false>} middlewares - An array of middleware functions.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * pokerSeat.__attachEventListener(PokerSeatEventName.SEAT_OCCUPIED, [
   *   (event, next) => {
   *     event.data.timestamp = Date.now();
   *     next();
   *   },
   *   (event, next) => {
   *     if (event.data.seatId) next();
   *     else return false;
   *   }
   * ]);
   * ```
   */
  private __attachEventListener<T extends PokerSeatEvent = PokerSeatEvent>(
    name: PokerSeatEventName,
    middlewares: Array<(event: T, next: () => void) => void | false> = []
  ): void {
    this.on(name, (eventData: T) => {
      const runMiddlewares = (index: number) => {
        if (index < middlewares.length) {
          middlewares[index](eventData, () => {
            runMiddlewares(index + 1);
          });
        } else {
          this.__emitEvent(name, eventData);
        }
      };
      runMiddlewares(0);
    });
  }
}

export { PokerSeat };
