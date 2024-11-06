//@collapse

// Import Enums
import { PokerSeatEventName, Source } from "../../enums";

// Import Events
import { BaseEvent } from "../_base";

/**
 * @interface `PokerSeatEvent`
 *
 * Represents an event structure specifically for actions concerning a `PokerSeat`, such as when a seat is occupied
 * by a player. Extending `BaseEvent`, this interface ensures that all seat-related events within the poker library
 * follow a consistent format, encapsulating both essential metadata and event-specific details.
 *
 * #### Purpose
 * The `PokerSeatEvent` interface allows accurate event handling for seat changes, ensuring that any changes in seat
 * occupancy can be captured and processed in real-time. This structure aids in maintaining a synchronized state
 * across all listeners.
 *
 * #### Extends
 * This interface extends `BaseEvent`, incorporating core metadata fields (`head`) and allowing custom data fields
 * (`data`) specific to seat occupancy events.
 *
 * #### Structure
 * - `head`: Contains metadata such as the event name, a unique identifier, creation timestamp, and event source.
 * - `data`: Holds detailed information about the seat that was occupied, such as `seatId` and `playerId`.
 *
 * #### Usage
 * The `PokerSeatEvent` is emitted whenever a player occupies a seat in the poker game, allowing listeners to update
 * the game state in response to these seat changes. The event supports flexible customization through optional fields
 * within `head` and `data`, enabling adaptation for various use cases.
 *
 * #### Events Overview
 * This interface is primarily used to convey events related to seat occupancy, such as:
 * - **PokerSeat:Occupied**: Signals that a player has occupied the seat.
 * - **PokerSeat:Vacated**: Signals that a player has vacated the seat (handled by a sibling interface).
 *
 * @extends BaseEvent
 *
 * @example
 * ```typescript
 * const event: PokerSeatEvent = {
 *   head: { id: "unique-event-id", name: "PokerSeat:Occupied", createdAt: new Date(), source: "PokerSeat" },
 *   data: { seatId: "12345", playerId: "p7890", additionalInfo: "special seating" }
 * };
 * console.log(event);
 * // Console Output: { head: { id: "unique-event-id", name: "PokerSeat:Occupied", createdAt: <Date>, source: "PokerSeat" }, data: { seatId: "12345", playerId: "p7890", additionalInfo: "special seating" } }
 * ```
 */
interface PokerSeatEvent<T = any> extends BaseEvent<T> {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string} id
   *
   * Unique identifier for the event instance, ensuring traceability across emitted events.
   *
   * #### Purpose
   * Used for tracking the event instance, especially useful in scenarios with multiple simultaneous events.
   *
   * #### Requirements
   * - Should be a unique string.
   *
   * @example
   * ```typescript
   * const eventId = event.id;
   * console.log(eventId);
   * // Console Output: "unique-event-id"
   * ```
   */
  id: string;

  /**
   * @property {PokerSeatEventName} name
   *
   * Identifies the name of the event, specifying its purpose within the poker library.
   *
   * #### Purpose
   * Used by event listeners to filter and categorize events, e.g., `"PokerSeat:Occupied"`.
   *
   * #### Requirements
   * - Should match a valid `PokerSeatEventName` value, indicating the nature of the event.
   *
   * @example
   * ```typescript
   * const eventName = event.name;
   * console.log(eventName);
   * // Console Output: "PokerSeat:Occupied"
   * ```
   */
  name: PokerSeatEventName;

  /**
   * @property {Date} createdAt
   *
   * Timestamp indicating when the event was created.
   *
   * #### Purpose
   * Useful for event sequencing, logging, and auditing, capturing the exact time of event emission.
   *
   * #### Requirements
   * - Should be a valid `Date` object.
   *
   * @example
   * ```typescript
   * const creationTime = event.createdAt;
   * console.log(creationTime);
   * // Console Output: Date object representing event creation time.
   * ```
   */
  createdAt: Date;

  /**
   * @property {Date} lastModifiedAt
   *
   * Timestamp indicating the last time the event was modified, if applicable.
   *
   * #### Purpose
   * Useful for tracking updates to the event after creation, helpful in cases where event data may change.
   *
   * #### Optional
   * - This field is optional and should be a valid `Date` object if present.
   *
   * @example
   * ```typescript
   * const modificationTime = event.lastModifiedAt;
   * console.log(modificationTime);
   * // Console Output: Date object representing last modification time, if set.
   * ```
   */
  lastModifiedAt?: Date;

  /**
   * @property {string} status
   *
   * Current processing status of the event.
   *
   * #### Purpose
   * Indicates the event's state, useful for monitoring and debugging the event's lifecycle.
   *
   * #### Optional
   * - Possible values include `"initiated"`, `"in-progress"`, `"completed"`, or custom statuses.
   *
   * @example
   * ```typescript
   * const eventStatus = event.status;
   * console.log(eventStatus);
   * // Console Output: "in-progress" or other string value indicating status.
   * ```
   */
  status?: string;

  /**
   * @property {number} priority
   *
   * Priority level of the event, where higher numbers indicate higher priority.
   *
   * #### Purpose
   * Helps in prioritizing event handling, especially when multiple events are emitted and processed in sequence.
   *
   * #### Optional
   * - This field is optional, and values can range from `0` (lowest) to any positive integer.
   *
   * @example
   * ```typescript
   * const eventPriority = event.priority;
   * console.log(eventPriority);
   * // Console Output: Integer representing event priority level.
   * ```
   */
  priority?: number;

  /**
   * @property {Source.POKER_SEAT} source
   *
   * Specifies the origin of the event, set to `Source.POKER_SEAT` for events originating from `PokerSeat`.
   *
   * #### Purpose
   * Useful for tracing event origin, especially in applications with multiple modules or components.
   *
   * #### Requirements
   * - Should be set to `Source.POKER_SEAT`.
   *
   * @example
   * ```typescript
   * const eventSource = event.source;
   * console.log(eventSource);
   * // Console Output: "PokerSeat"
   * ```
   */
  source: Source.POKER_SEAT;

  /**
   * @property {Record<string, any>} meta
   *
   * Additional metadata for the event, allowing extensibility with custom key-value pairs.
   *
   * #### Purpose
   * Supports flexible additions to metadata, adapting to specific requirements for each event.
   *
   * #### Optional
   * - This field is optional and can store any additional event metadata as key-value pairs.
   *
   * @example
   * ```typescript
   * const eventMetadata = event.meta;
   * console.log(eventMetadata);
   * // Console Output: { customMetaKey: "customMetaValue" }
   * ```
   */
  meta?: {
    [key: string]: any;
  };

  /**
   * @property {T} data
   *
   * Contains event-specific details, dynamically adapted based on the type `T`, representing custom content.
   *
   * #### Purpose
   * Carries unique data associated with the event, allowing specific identifiers, payloads, or other details
   * relevant to each event type.
   *
   * #### Requirements
   * - `data` should be structured as per the requirements of each derived event type.
   *
   * @example
   * ```typescript
   * const seatEventData = event.data;
   * console.log(seatEventData);
   * // Console Output: Custom data object, e.g., { seatId: "123", playerId: "p789" }
   * ```
   */
  data: T;

  /**
   * Allows additional properties for further extensibility.
   *
   * #### Usage
   * Supports flexible additions to event fields, accommodating custom key-value pairs needed for specific events.
   */
  [key: string]: any;
}

export { PokerSeatEvent };
