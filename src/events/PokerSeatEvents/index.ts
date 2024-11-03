//@collapse

// Import Enums
import { PokerSeatEventName } from "../../enums";

// Import Events
import { _BaseEvent } from "../_baseEvent";

/**
 * @interface `PokerSeatEvent`
 *
 * Represents an event structure specifically for actions concerning a `PokerSeat`, such as when a seat is occupied
 * by a player. Extending `_BaseEvent`, this interface ensures that all seat-related events within the poker library
 * follow a consistent format, encapsulating both essential metadata and event-specific details.
 *
 * #### Purpose
 * The `PokerSeatEvent` interface allows accurate event handling for seat changes, ensuring that any changes in seat
 * occupancy can be captured and processed in real-time. This structure aids in maintaining a synchronized state
 * across all listeners.
 *
 * #### Extends
 * This interface extends `_BaseEvent`, incorporating core metadata fields (`head`) and allowing custom data fields
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
 * @extends _BaseEvent
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
interface PokerSeatEvent<T = any>
  extends _BaseEvent<{
    [key: string]: any;
  }> {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  head: {
    /**
     * @property {PokerSeatEventName} name
     *
     * Represents the event name, identifying it as a `PokerSeatOccupiedEvent`.
     *
     * #### Purpose
     * Labels the event type to allow easy filtering and subscription by listeners.
     *
     * #### Requirements
     * - Should be descriptive and set as `"PokerSeat:Occupied"`.
     *
     * @example
     * ```typescript
     * const eventName = event.head.name;
     * console.log(eventName);
     * // Console Output: "PokerSeat:Occupied"
     * ```
     */
    id: string;

    /**
     * @property {PokerSeatEventName} name
     *
     * Represents the event name, identifying it as a `PokerSeatOccupiedEvent`.
     *
     * #### Purpose
     * Labels the event type to allow easy filtering and subscription by listeners.
     *
     * #### Requirements
     * - Should be descriptive and set as `"PokerSeat:Occupied"`.
     *
     * @example
     * ```typescript
     * const eventName = event.head.name;
     * console.log(eventName);
     * // Console Output: "PokerSeat:Occupied"
     * ```
     */
    name: PokerSeatEventName;

    createdAt: Date;

    source: "PokerSeat";
  };
}

export { PokerSeatEvent };
