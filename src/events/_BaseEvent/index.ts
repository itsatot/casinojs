//@collapse

/**
 * @interface `_BaseEvent`
 *
 * Represents a foundational structure for events emitted within the library, including metadata (`head`)
 * and dynamic payload (`data`) sections. This structure supports the creation of standardized events
 * across the application.
 *
 * #### Purpose
 * Designed to provide a consistent structure for all events, `_BaseEvent` acts as a base for extending
 * specific event types, ensuring that all events have a similar format with metadata and data fields.
 *
 * #### Structure
 * - **head**: Contains metadata such as the event name, timestamps, and other identifying information.
 * - **data**: Holds event-specific details, allowing each derived event to provide custom data relevant
 *   to the event being emitted.
 *
 * #### Extensibility
 * Both `head` and `data` support additional optional properties to facilitate custom fields as required
 * by various event types. The `_BaseEvent` interface itself can be extended with sibling properties,
 * allowing for maximum flexibility.
 *
 * #### Usage
 * `_BaseEvent` provides the base structure for all library events. It is typically extended by other
 * event interfaces to add event-specific data in the `data` section.
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
interface _BaseEvent {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {object} head
   *
   * Contains metadata about the event, such as the event name, creation time, and optional custom fields.
   *
   * #### Purpose
   * Provides essential information for identifying and tracking events, including the event name and
   * creation timestamp.
   *
   * #### Structure
   * - **name**: A unique string identifier representing the event type.
   * - **createdAt**: Timestamp of when the event was created.
   * - **lastModifiedAt**: Optional timestamp for when the event was last modified.
   *
   * #### Extensibility
   * This property allows additional metadata fields using key-value pairs to accommodate specific needs
   * of extended event types.
   *
   * @example
   * ```typescript
   * const eventHead = event.head;
   * console.log(eventHead);
   * // Console Output: { name: "Casino:RoomCreated", createdAt: <Date>, lastModifiedAt: <Date> }
   * ```
   */
  head: {
    /**
     * @property {string} name
     *
     * Unique identifier for the event, typically indicating the event type (e.g., "PokerSeat:Occupied").
     *
     * #### Purpose
     * Labels the event for easy filtering and identification by event listeners and handlers.
     *
     * #### Requirements
     * - Should be a descriptive string that indicates the event type.
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
     * Allows tracking of the event creation time for time-sensitive operations, logging, or auditing.
     *
     * #### Requirements
     * - Must be a valid `Date` object representing the creation time.
     *
     * @example
     * ```typescript
     * const eventTime = event.head.createdAt;
     * console.log(eventTime);
     * // Console Output: <Date>
     * ```
     */
    createdAt: Date;

    /**
     * @property {Date} lastModifiedAt
     *
     * Optional timestamp for when the event was last modified, if applicable.
     *
     * #### Purpose
     * Enables tracking of updates or changes to the event, useful for event-driven systems that rely
     * on the latest event data.
     *
     * #### Requirements
     * - **Optional**: Only provided if the event undergoes modifications post-creation.
     *
     * @example
     * ```typescript
     * const lastModified = event.head.lastModifiedAt;
     * console.log(lastModified);
     * // Console Output: <Date>
     * ```
     */
    lastModifiedAt?: Date;

    /**
     * Supports additional metadata fields in the `head` section for extensibility.
     *
     * #### Usage
     * Allows custom key-value pairs to be added for specific requirements or future extensions.
     *
     * @example
     * ```typescript
     * event.head.customField = "Extra metadata";
     * ```
     */
    [key: string]: any;
  };

  /**
   * @property {object} data
   *
   * Contains the event-specific data payload, which varies depending on the event type.
   *
   * #### Purpose
   * Provides details relevant to the event, allowing each extended event interface to customize this
   * section as needed.
   *
   * #### Requirements
   * - This property is customized per event, supporting key-value pairs based on the event requirements.
   *
   * #### Extensibility
   * Allows additional properties to be added as required by specific event types.
   *
   * @example
   * ```typescript
   * const eventData = event.data;
   * console.log(eventData);
   * // Console Output: { customData: "event-specific details" }
   * ```
   */
  data: {
    /**
     * Enables adding custom properties within `data` to accommodate specific event needs.
     *
     * #### Usage
     * Allows for a flexible event payload structure, adding custom key-value pairs as needed.
     */
    [key: string]: any;
  };

  /**
   * Allows additional sibling properties within `_BaseEvent` for extensibility.
   *
   * #### Usage
   * Enables flexible additions to `_BaseEvent` directly, supporting any key-value pair at the root level.
   *
   * @example
   * ```typescript
   * const event: _BaseEvent = { customSibling: "extra information" };
   * console.log(event.customSibling);
   * // Console Output: "extra information"
   * ```
   */
  [key: string]: any;
}

export { _BaseEvent };
