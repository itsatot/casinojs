// @collapse

import { EventEmitter } from "events";

// Import Enums
import { LogLevel } from "../../enums";

// Import Events
import { BaseEvent } from "../../events";

// Import Interfaces
import { BaseEventEmitterInterface } from "../../interfaces";

// Import Utils
import { generateUniqueId, logger } from "../../utils";

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
   * #### Description
   * The `emitEvent` method is a public method for emitting events, with an optional configuration that allows
   * middleware processing. Middleware functions can intercept and transform the event before it reaches the listeners,
   * allowing custom validation or data modifications.
   *
   * #### Purpose
   * This method enables flexible event emission with support for middleware, providing a robust event processing
   * mechanism in the `BaseEventEmitter`. It’s useful for customizing event behavior based on application-specific needs.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * This method can emit any event specified by `eventName`, which can then be processed by middleware functions if defined.
   *
   * #### Parameters
   * - `eventName: string` - The name of the event to emit.
   * - `options: { event: { data: { [key: string]: any }; [key: string]: any; }, middlewares?: Array<(event: BaseEvent, next: () => void) => void | false> }`
   *   - **event** - The primary event data to emit, containing specific details.
   *   - **middlewares** - An optional array of middleware functions that process the event before emission.
   *
   * #### Requirements
   * - `eventName` must be a valid string.
   * - `options.event` should include relevant data for the event. If `middlewares` are provided, they should be functions with an event and next parameter.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * Use this method to emit events with middleware-based customization, which allows for specific processing
   * logic or transformations before the event reaches listeners.
   *
   * @param {string} eventName - The name of the event to emit.
   * @param {object} options - Configuration for the event and optional middleware functions.
   *
   * @example
   * ```typescript
   * emitter.emitEvent("game:started", {
   *   event: { data: { gameId: "001", status: "active" } },
   *   middlewares: [
   *     (event, next) => { console.log("Processing event:", event); next(); },
   *     (event, next) => { event.data.processed = true; next(); }
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
   * The `__emitEvent` method is an internal method that emits an event with optional middleware processing.
   * Middleware functions can process, validate, or modify the event data before the final emission to listeners.
   *
   * #### Purpose
   * This private method centralizes event emission within the `BaseEventEmitter`, supporting middleware-based
   * customization for flexible event handling and data transformation.
   *
   * #### Events
   * Emits the specified event after optional middleware processing.
   *
   * #### Parameters
   * - `eventName: string` - The event name to emit.
   * - `options: { event: { data: { [key: string]: any } }, middlewares?: Array<(event: BaseEvent, next: () => void) => void | false> }`
   *   - **event** - The primary event data to emit, containing relevant information.
   *   - **middlewares** - Optional array of middleware functions for processing the event before emission.
   *
   * #### Requirements
   * - `eventName` must be a valid string.
   * - If `middlewares` are provided, they should be functions that accept an event and a `next` function.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * Use this method internally within the `emitEvent` method to handle middleware-based processing before the event
   * reaches its listeners.
   *
   * @param {string} eventName - The event name to emit.
   * @param {object} options - Configuration object containing the event data and optional middleware functions.
   *
   * @example
   * ```typescript
   * emitter.__emitEvent("room:updated", {
   *   event: { data: { roomId: "room123", players: 6 } },
   *   middlewares: [
   *     (event, next) => { event.data.updated = true; next(); },
   *     (event, next) => { console.log("Middleware processed event:", event); next(); }
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
          logger.log(LogLevel.INFO, `Event emitted: "${eventName}"`, event);
        }
      };
      runMiddlewares(0);
    } else {
      this.emit(eventName, event);
      logger.log(LogLevel.INFO, `Event emitted: "${eventName}"`, event);
    }
  }

  /**
   * #### Description
   * The `__initializeEventObj` method constructs a structured event object, initializing it with essential metadata
   * and additional data specified in the options parameter.
   *
   * #### Purpose
   * This method ensures that all emitted events in `BaseEventEmitter` follow a standardized format,
   * with uniform metadata for consistency across the application.
   *
   * #### Parameters
   * - `eventName: string` - The name of the event.
   * - `options: { event: { data: { [key: string]: any } } }` - Configuration object for the event.
   *
   * #### Requirements
   * - `eventName` must be a valid event identifier.
   * - `options.event.data` should include any relevant data for the event.
   *
   * #### Returns
   * - `BaseEvent` - The structured event object ready for processing or emission.
   *
   * #### Usage
   * Use this method to generate a complete `BaseEvent` object for any event emission within `BaseEventEmitter`.
   *
   * @param {string} eventName - The name of the event.
   * @param {object} options - Configuration object containing the event data.
   *
   * @returns {BaseEvent} - A structured event object with metadata and data.
   *
   * @example
   * ```typescript
   * const event = emitter.__initializeEventObj("player:joined", { event: { data: { playerId: "player123", seat: 5 } } });
   * console.log(event);
   * // Output: { id: "generated-id", name: "player:joined", createdAt: [Date], source: "BaseEventEmitter", data: { playerId: "player123", seat: 5 } }
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
    const baseEvent: BaseEvent = {
      id: generateUniqueId(),
      name: eventName,
      createdAt: new Date(),
      source: "BaseEventEmitter",
      ...options.event,
    };
    logger.log(LogLevel.INFO, `Event initialized: "${eventName}"`, baseEvent);
    return baseEvent;
  }
}

export { BaseEventEmitter };
