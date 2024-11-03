//@collapse

import { EventEmitter } from "events";

// Import Enums
import { PokerSeatEventName } from "../../enums";

// Import Events
import { BaseEvent } from "../../events";

// Import Interfaces
import { BaseEventEmitterInterface } from "../../interfaces";

import { generateUniqueId } from "../../utils";

/**
 * @class `BaseEventEmitter`
 * Represents a BaseEventEmitter environment that manages multiple poker rooms (`PokerRooms`).
 * This class handles operations related to room creation, listing, removal, and searching.
 *
 * #### Purpose
 * A BaseEventEmitter serves as a central hub for organizing poker games by managing rooms.
 * Each room can accommodate players and maintain its own game state.
 *
 * #### Extends
 * Additionally, it extends the Node.js `EventEmitter` to emit events when specific actions
 * occur, such as creating or removing a room.
 *
 * #### Implements
 * This class implements the `BaseEventEmitterInterface` and inherits from the `EventEmitter` class,
 * allowing it to emit events and conform to the defined interface structure for consistency
 * and predictability.
 *
 * #### Events
 * The `BaseEventEmitter` class emits custom events to signal room-related actions. For instance,
 * when a room is created, an event `casino:roomCreated` is emitted, making it easy
 * to handle notifications or updates related to the Casino’s operations.
 *
 * @example
 * ```typescript
 * const casino = new BaseEventEmitter();
 * casino.on('casino:roomCreated', (room) => console.log(`Room created: ${room.name}`));
 * const room = casino.createRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 });
 * console.log(room); // Logs details of "Room1"
 * ```
 */
class BaseEventEmitter
  extends EventEmitter
  implements BaseEventEmitterInterface
{
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * The `constructor` initializes the `BaseEventEmitter` class.
   *
   * @example
   * ```typescript
   * const casino = new BaseEventEmitter();
   * console.log(casino.getRooms()); // Output: []
   * ```
   */
  constructor() {
    super();
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

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

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `__emitEvent` method emits an event with optional middleware processing, allowing for validation or transformation
   * before final emission.
   *
   * #### Purpose
   * This method centralizes event emission, supporting direct and middleware-processed emissions for flexible event handling.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * This method can emit any event defined in `PokerSeatEventName`, including:
   * - **PokerSeatEventName.SEAT_OCCUPIED**: Emitted when a player occupies the seat.
   * - **PokerSeatEventName.SEAT_VACATED**: Emitted when a seat is vacated.
   *
   * #### Parameters
   * - `eventName: PokerSeatEventName` - The name of the event to emit.
   * - `eventData: { [key: string]: any }` - Data specific to the event, like seat and player details.
   * - `options?: { middlewares?: Array<(event: PokerSeatEvent, next: () => void) => void | false> }`
   *    - `middlewares`: Optional. Array of middleware functions for processing the event data before emission.
   *
   * #### Requirements
   * - `eventName` must be a valid `PokerSeatEventName`.
   * - If `middlewares` are provided, they must follow the `(event: PokerSeatEvent, next: () => void) => void | false` signature.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * This method is used for both direct and middleware-processed event emissions, allowing for sequential processing
   * of the event data when middlewares are specified.
   *
   * @param {PokerSeatEventName} eventName - The event name to emit.
   * @param {object} eventData - Data specific to the event.
   * @param {object} [options] - Optional parameter with middleware functions.
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
    eventName: string,
    eventData: { [key: string]: any },
    options?: {
      middlewares?: Array<(event: BaseEvent, next: () => void) => void | false>;
    }
  ): void {
    const event: BaseEvent = this.__initializeEventObj(eventName, eventData);
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
   * The `__initializeEventObj` method creates a structured event object, initializing it with metadata and data.
   *
   * #### Purpose
   * This method constructs a `PokerSeatEvent` object with consistent metadata, ensuring uniformity for seat-related events.
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
   * - `eventData: { [key: string]: any }` - Data related to the event, such as seat or player details.
   *
   * #### Requirements
   * - `eventName` must be a valid `PokerSeatEventName`.
   * - `eventData` should be a well-defined object containing event details.
   *
   * #### Returns
   * - `PokerSeatEvent` - A complete event object ready for processing or emission.
   *
   * #### Usage
   * Use this method to create a structured `PokerSeatEvent` object before emission, allowing for consistent event handling.
   *
   * @param {PokerSeatEventName} eventName - The name of the event.
   * @param {object} eventData - Data associated with the event.
   *
   * @returns {PokerSeatEvent} - A structured event object ready for emission.
   *
   * @example
   * ```typescript
   * const event = pokerSeat.__initializeEventObj(PokerSeatEventName.SEAT_OCCUPIED, { seatId: "seat123", playerId: "player456" });
   * console.log(event);
   * // Console Output: { head: { name: "PokerSeat:Occupied", createdAt: <Date> }, data: { seatId: "seat123", playerId: "player456" } }
   * ```
   */
  private __initializeEventObj(
    eventName: string,
    eventData: { [key: string]: any }
  ): BaseEvent {
    const event: BaseEvent = {
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

export { BaseEventEmitter };
