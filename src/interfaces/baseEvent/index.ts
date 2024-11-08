// @collapse

/**
 * @interface `BaseEventInterface`
 *
 * Represents a foundational structure for events emitted within the library, ensuring consistency
 * across event types by standardizing metadata and event-specific payload sections.
 *
 * #### Purpose
 * The `BaseEventInterface` interface establishes a uniform format for all events within the library, promoting
 * a cohesive structure for both general event metadata and customizable data content. Designed for flexibility,
 * `BaseEventInterface` can be extended by more specific event types, allowing for additional properties as needed
 * by various components of the library.
 *
 * #### Structure
 * - **Metadata**: Core fields such as `id`, `name`, `source`, and optional fields like `status` and `priority`
 *   allow for tracking and categorizing events effectively.
 * - **Data**: A dynamic content section specific to each event, adaptable based on the event’s requirements.
 * - **Extensibility**: Supports optional metadata and additional custom fields, enabling event structure
 *   adjustments based on diverse requirements.
 *
 * #### Usage
 * `BaseEventInterface` provides a structured foundation for defining library-wide events. It can be extended by
 * event-specific interfaces that introduce additional data fields. This makes `BaseEventInterface` a versatile
 * base for a variety of events while ensuring a consistent structure across the library.
 *
 * @example
 * ```typescript
 * const event: BaseEventInterface = {
 *   id: "unique-id-1234",
 *   name: "Casino:RoomCreated",
 *   source: "PokerRoom",
 *   createdAt: new Date(),
 *   data: { customData: "event-specific details" },
 *   priority: 1,
 *   customField: "extra info"
 * };
 * console.log(event);
 * // Console Output: { id: "unique-id-1234", name: "Casino:RoomCreated", source: "PokerRoom", createdAt: <Date>, data: { customData: "event-specific details" }, priority: 1, customField: "extra info" }
 * ```
 */
interface BaseEventInterface<T = any> {
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
   * // Console Output: "unique-id-1234"
   * ```
   */
  id: string;

  /**
   * @property {string} name
   *
   * Identifies the name of the event, which specifies the nature and purpose of the event
   * within the library.
   *
   * #### Purpose
   * Used by event listeners to filter and categorize events.
   *
   * #### Requirements
   * - Should be a descriptive name that provides a clear indication of the event's purpose,
   *   such as `"Casino:RoomCreated"` or `"PokerSeat:Occupied"`.
   *
   * @example
   * ```typescript
   * const eventName = event.name;
   * console.log(eventName);
   * // Console Output: "Casino:RoomCreated"
   * ```
   */
  name: string;

  /**
   * @property {Date} createdAt
   *
   * Timestamp indicating when the event was created.
   *
   * #### Purpose
   * Used for tracking the exact time of event emission, which is essential for sequencing,
   * logging, and auditing purposes.
   *
   * #### Requirements
   * - Should be a valid `Date` object.
   *
   * @example
   * ```typescript
   * const creationTime = event.createdAt;
   * console.log(creationTime);
   * // Console Output: Date object representing the event's creation time.
   * ```
   */
  createdAt: Date;

  /**
   * @property {Date} lastModifiedAt
   *
   * Timestamp indicating the last time the event was modified, if applicable.
   *
   * #### Purpose
   * Useful for tracking updates to the event after initial creation, particularly in cases
   * where the event's data might change as it is processed.
   *
   * #### Optional
   * - This field is optional and should be a valid `Date` object if present.
   *
   * @example
   * ```typescript
   * const modificationTime = event.lastModifiedAt;
   * console.log(modificationTime);
   * // Console Output: Date object representing the event's last modification time, if set.
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
   * Helps in prioritizing event handling, especially when multiple events are emitted
   * and processed in sequence.
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
   * @property {string} source
   *
   * Identifier or name of the component or module that generated the event.
   *
   * #### Purpose
   * Used for tracing the origin of the event, especially useful in larger applications
   * with multiple modules.
   *
   * @example
   * ```typescript
   * const eventSource = event.source;
   * console.log(eventSource);
   * // Console Output: "PokerRoom" or similar string value.
   * ```
   */
  source: string;

  /**
   * @property {Record<string, any>} meta
   *
   * Contains additional metadata for the event, supporting extensibility for any custom
   * properties that may be added.
   *
   * #### Purpose
   * Enables flexible additions to event metadata, supporting any custom key-value pair
   * that may be required for specific events.
   *
   * #### Optional
   * - This field is optional and can store any additional event metadata as key-value pairs.
   *
   * @example
   * ```typescript
   * const eventMetadata = event.metadata;
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
   * Contains event-specific details, dynamically adapted based on the type `T`, which can represent any structure.
   *
   * #### Purpose
   * Carries unique data associated with the event, allowing specific identifiers, payloads, or any other
   * information relevant to each type of event.
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
   * Enables flexible additions to event fields, supporting any custom key-value pair
   * that may be required for specific events.
   */
  [key: string]: any;
}

export { BaseEventInterface };
