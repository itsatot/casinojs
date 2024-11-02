//@collapse

/**
 * @interface `_BaseEvent`
 *
 * Represents a foundational structure for events emitted within the library, ensuring consistency
 * across event types by including both metadata (`head`) and event-specific payload (`data`) sections.
 *
 * #### Purpose
 * The `_BaseEvent` interface establishes a standardized structure for all events across the library.
 * It is designed to be extended by specific event types, providing core fields while supporting extensibility
 * for additional metadata and payload properties. The `_BaseEvent` structure ensures that all events are
 * easy to identify, track, and extend as needed by various components within the library.
 *
 * #### Structure
 * - **head**: Contains key metadata, including the event's name, creation timestamp, and other optional
 *   fields like status and priority. These fields offer essential tracking and categorization data for the event.
 * - **data**: Carries dynamic content specific to each event, allowing derived event interfaces to add
 *   event-relevant details that can be processed by listeners.
 * - **Extensibility**: Both the `head` and `data` sections can support optional additional properties, making
 *   it possible to adapt the structure for a range of scenarios. The `_BaseEvent` interface itself allows
 *   sibling properties to be added as needed by extending interfaces.
 *
 * #### Usage
 * `_BaseEvent` provides the foundation for defining any event within the library. It is intended to be
 * extended by event-specific interfaces that may introduce additional fields within `data`. In this way,
 * `_BaseEvent` serves as a flexible base for creating a wide variety of standardized events across the
 * library’s features.
 *
 * @example
 * ```typescript
 * const event: _BaseEvent = {
 *   head: { name: "Casino:RoomCreated", createdAt: new Date(), customMeta: "extra metadata" },
 *   data: { customData: "event-specific details" },
 *   customSibling: "additional info"
 * };
 * console.log(event);
 * // Console Output: { head: { name: "Casino:RoomCreated", createdAt: <Date>, customMeta: "extra metadata" }, data: { customData: "event-specific details" }, customSibling: "additional info" }
 * ```
 */
interface _BaseEvent<T = any> {
  head: {
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
     * const eventId = event.head.id;
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
     * const eventName = event.head.name;
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
     * const creationTime = event.head.createdAt;
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
     * const modificationTime = event.head.lastModifiedAt;
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
     * const eventStatus = event.head.status;
     * console.log(eventStatus);
     * // Console Output: "in-progress" or other string value indicating status.
     * ```
     */
    status?: "initiated" | "in-progress" | "completed" | string;

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
     * const eventPriority = event.head.priority;
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
     * #### Optional
     * - This field is optional and can be a string representing the source component or module.
     *
     * @example
     * ```typescript
     * const eventSource = event.head.source;
     * console.log(eventSource);
     * // Console Output: "PokerRoom" or similar string value.
     * ```
     */
    source?: string;

    /**
     * Allows additional metadata fields in `head` for extensibility.
     *
     * #### Usage
     * Enables flexible additions to `head` metadata, supporting any custom key-value pair
     * that may be required for specific events.
     */
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
   * @property {[key: string]: any}
   * Allows additional sibling properties within `_BaseEvent` for extensibility.
   *
   * #### Usage
   * Supports additional fields at the root level of `_BaseEvent`, providing flexibility
   * for specific event needs.
   *
   * @example
   * ```typescript
   * const customEvent: _BaseEvent = {
   *   head: { name: "CustomEvent", createdAt: new Date() },
   *   data: { customData: "details" },
   *   customProperty: "custom value"
   * };
   * console.log(customEvent.customProperty);
   * // Console Output: "custom value"
   * ```
   */
  [key: string]: any;
}

export { _BaseEvent };
