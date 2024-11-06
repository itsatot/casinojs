// @collapse

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
 * Represents a base event emitter for handling poker-related events, particularly in managing multiple
 * poker rooms (`PokerRooms`). This class is responsible for creating, listing, removing, and searching rooms,
 * emitting specific events related to these actions.
 *
 * #### Purpose
 * Acts as a central hub for organizing poker games, enabling the creation and management of poker rooms. Each room
 * can accommodate players and maintain its own game state. The `BaseEventEmitter` also supports middleware-based event processing,
 * allowing for validation and transformation of events.
 *
 * #### Extends
 * Extends the Node.js `EventEmitter` to emit events when specific actions occur, such as creating or removing a room.
 *
 * #### Implements
 * Implements the `BaseEventEmitterInterface`, ensuring a consistent interface structure and predictable behavior
 * for all event emitters within the library.
 *
 * #### Events Overview
 * - **casino:roomCreated**: Emitted when a new room is created, signaling listeners to respond to this action.
 * - **casino:roomRemoved**: Emitted when a room is removed, signaling listeners to update or respond accordingly.
 *
 * #### Usage
 * This class can be instantiated to manage rooms, emit events for room-related actions, and handle middleware-based
 * processing for emitted events. It’s designed for easy integration into poker or casino game management.
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

  /**
   * Emits an event, optionally with middleware processing for validation or transformation.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param {object} options - Configuration for event emission.
   * @param {object} options.eventHead - Event metadata including `source` and other properties.
   * @param {object} options.eventData - Data relevant to the event.
   * @param {Array<(event: BaseEvent, next: () => void) => void | false>} [options.middlewares] - Optional array of middleware functions for processing.
   *
   * #### Description
   * The `emitEvent` method is a public method for emitting events with optional middleware functions. These middlewares allow
   * for custom processing, validation, or transformation of the event before it is emitted to all listeners.
   *
   * #### Purpose
   * Provides a central method for emitting events, ensuring that each emitted event can be customized through middleware processing
   * if needed.
   *
   * #### Events
   * This method can emit any valid event name specified in the `eventName` parameter, allowing flexible event handling
   * in the application.
   *
   * #### Usage
   * Use this method to emit events with or without middleware processing. Middlewares, if provided, can alter the event data
   * before it reaches the listeners.
   *
   * @example
   * ```typescript
   * emitter.emitEvent("CustomEvent", {
   *   eventHead: { source: "PokerSeat" },
   *   eventData: { seatId: "123" },
   *   middlewares: [
   *     (event, next) => { console.log("Middleware 1"); next(); },
   *     (event, next) => { console.log("Middleware 2"); next(); }
   *   ]
   * });
   * ```
   */
  public emitEvent(
    eventName: string,
    options: {
      event: {
        data: { [key: string]: any };
        [key: string]: any;
      };
      middlewares?: Array<(event: BaseEvent, next: () => void) => void | false>;
    }
  ): void {
    this.__emitEvent(eventName, options);
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
   * The `__emitEvent` method emits an event with optional middleware processing, allowing for validation or transformation
   * before the final emission.
   *
   * #### Purpose
   * This method centralizes event emission, supporting both direct and middleware-processed emissions. This provides
   * flexible event handling, where middleware functions can alter the event data or perform validation before the event
   * is officially emitted.
   *
   * #### Events
   * This method can emit any valid event, with processing provided by middlewares if specified.
   *
   * #### Usage
   * This method can be used for both direct and middleware-processed event emissions, allowing for sequential processing
   * of the event data through middleware functions if specified.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param {object} options - Optional parameter with middleware functions.
   * @param {Array<(event: BaseEvent, next: () => void) => void | false>} [options.middlewares] - Optional array of middleware functions.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * pokerSeat.__emitEvent("CustomEvent", {
   *   middlewares: [
   *     (event, next) => { event.data.processed = true; next(); },
   *     (event, next) => { console.log("Middleware log:", event); next(); }
   *   ]
   * });
   * ```
   */
  private __emitEvent(
    eventName: string,
    options: {
      event: {
        data: { [key: string]: any };
        [key: string]: any;
      };
      middlewares?: Array<(event: BaseEvent, next: () => void) => void | false>;
    }
  ): void {
    const event: BaseEvent = this.__initializeEventObj(eventName, options);
    const middlewares = options.middlewares ?? [];

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
   * It allows for extensibility through merging additional metadata specified in the `options` parameter.
   *
   * #### Parameters
   * - `eventName: string` - The name of the event.
   * - `options: { event: { data: { [key: string]: any } } }` - Configuration object for the event.
   *
   * #### Requirements
   * - `eventName` must be a valid event name.
   * - `event.data` should be a well-defined object containing event-specific details.
   *
   * #### Returns
   * - `BaseEvent` - A complete event object ready for processing or emission.
   *
   * #### Usage
   * Use this method to create a structured `PokerSeatEvent` object before emission, allowing for consistent event handling.
   *
   * @param {string} eventName - The name of the event.
   * @param {object} options - Configuration object for the event.
   * @param {object} options.event - Event data details.
   *
   * @returns {BaseEvent} - A structured event object ready for emission.
   *
   * @example
   * ```typescript
   * const event = pokerSeat.__initializeEventObj("CustomEvent", { event: { data: { seatId: "seat123", playerId: "player456" } } });
   * console.log(event);
   * ```
   */
  private __initializeEventObj(
    eventName: string,
    options: {
      event: {
        data: { [key: string]: any };
      };
    }
  ): BaseEvent {
    return {
      id: generateUniqueId(),
      name: eventName,
      createdAt: new Date(),
      source: "BaseEventEmitter",
      ...options.event,
    };
  }
}

export { BaseEventEmitter };
