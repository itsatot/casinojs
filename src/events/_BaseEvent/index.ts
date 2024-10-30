//@collapse

/**
 * @interface `_BaseEvent`
 * Represents a standard structure for all events emitted within the library,
 * containing metadata (`head`) and dynamic payload (`data`) fields.
 *
 * #### Purpose
 * Serves as a base structure that can be extended by specific event interfaces,
 * ensuring a consistent and standardized format across all event emissions.
 *
 * #### Structure
 * - `head`: Contains metadata like event name and timestamp, with support for additional properties.
 * - `data`: Holds event-specific details, customized by each derived interface, and allows custom properties.
 *
 * #### Extensibility
 * Both `head` and `data` support optional additional key-value pairs for easy extension in specific events.
 *
 * @example
 * ```typescript
 * const event: _BaseEvent = {
 *   head: { name: "Casino:RoomCreated", createdAt: new Date(), customMeta: "metaData" },
 *   data: { customData: "additional info" }
 * };
 * console.log(event);
 * // Console Output: { head: { name: "Casino:RoomCreated", createdAt: <Date>, customMeta: "metaData" }, data: { customData: "additional info" } }
 * ```
 */
interface _BaseEvent {
  head: {
    name: string;
    createdAt: Date;
    [key: string]: any;
  };
  data: {
    [key: string]: any;
  };
}

export { _BaseEvent };
