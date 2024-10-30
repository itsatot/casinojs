//@collapse

// Import Events
import { _BaseEvent } from "../_BaseEvent";

// Import Interfaces
import { PokerSeatInterface } from "../../interfaces";

/**
 * @interface `PokerSeatOccupiedEvent`
 *
 * Represents an event structure for when a `PokerSeat` becomes occupied by a player.
 * Extends `_BaseEvent` to inherit a standardized format, allowing consistent event data
 * encapsulation within the library.
 *
 * #### Purpose
 * The `PokerSeatOccupiedEvent` interface is specifically designed to capture and emit
 * information whenever a seat is occupied in a poker game, enabling listeners to react
 * to seat occupancy changes in real-time.
 *
 * #### Extends
 * Extends `_BaseEvent` to inherit core metadata (`head`) and payload (`data`) structures,
 * adding more specific information about the occupied seat for subscribers.
 *
 * #### Structure
 * - `head`: Contains core metadata, including `name` and `createdAt` to mark the event type and timestamp.
 * - `data`: Customizable details specific to the `PokerSeatOccupiedEvent`, such as player ID or seat number.
 *
 * #### Usage
 * `PokerSeatOccupiedEvent` is emitted each time a player occupies a seat in the game.
 * This interface supports additional key-value pairs in both `head` and `data` for flexibility
 * in extending event details if necessary.
 *
 * @extends _BaseEvent
 *
 * @example
 * ```typescript
 * const event: PokerSeatOccupiedEvent = {
 *   head: { name: "PokerSeat:Occupied", createdAt: new Date(), customMeta: "extra metadata" },
 *   data: { seatId: "12345", playerId: "p7890", customField: "additional details" }
 * };
 * console.log(event);
 * // Console Output: { head: { name: "PokerSeat:Occupied", createdAt: <Date>, customMeta: "extra metadata" }, data: { seatId: "12345", playerId: "p7890", customField: "additional details" } }
 * ```
 */
interface PokerSeatOccupiedEvent extends _BaseEvent {
  head: {
    /**
     * @property {string} name
     *
     * Represents the name of the event, used for identifying the specific type of `PokerSeatOccupiedEvent`.
     *
     * #### Purpose
     * Used to label and identify the event as a `PokerSeatOccupiedEvent` for listeners or subscribers.
     *
     * #### Requirements
     * - Should be set to a descriptive value, e.g., `"PokerSeat:Occupied"`.
     *
     * @example
     * ```typescript
     * const eventName = event.head.name;
     * console.log(eventName);
     * // Console Output: "PokerSeat:Occupied"
     * ```
     */
    name: string;

    /**
     * @property {Date} createdAt
     *
     * Records the exact timestamp when the `PokerSeatOccupiedEvent` is emitted.
     *
     * #### Purpose
     * Provides a reliable way to track the event occurrence timing, useful in time-sensitive
     * scenarios such as logging or auditing seat occupancy changes.
     *
     * #### Requirements
     * - Must be a valid `Date` object representing the event’s emission time.
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
     * Allows additional metadata fields for extending the `head` section if needed.
     *
     * #### Usage
     * Supports any key-value pair, making it adaptable for further event details as required.
     */
    [key: string]: any;
  };

  data: {
    /**
     * @property {string} seatId
     *
     * Represents the unique identifier for the seat that has become occupied.
     *
     * #### Purpose
     * Identifies the specific seat involved in the event, ensuring accurate tracking of seat states.
     *
     * #### Requirements
     * - Should match the seat's unique identifier within the game.
     *
     * @example
     * ```typescript
     * const seatId = event.data.seatId;
     * console.log(seatId);
     * // Console Output: "12345"
     * ```
     */
    seatId: string;

    /**
     * @property {string} playerId
     *
     * Represents the unique identifier of the player who occupies the seat.
     *
     * #### Purpose
     * Associates a specific player with the seat, allowing event subscribers to identify
     * which player has taken the seat.
     *
     * #### Requirements
     * - Should match the player's unique identifier in the system.
     *
     * @example
     * ```typescript
     * const playerId = event.data.playerId;
     * console.log(playerId);
     * // Console Output: "p7890"
     * ```
     */
    playerId: string;

    /**
     * @property {string} playerId
     *
     * Represents the unique identifier of the player who occupies the seat.
     *
     * #### Purpose
     * Associates a specific player with the seat, allowing event subscribers to identify
     * which player has taken the seat.
     *
     * #### Requirements
     * - Should match the player's unique identifier in the system.
     *
     * @example
     * ```typescript
     * const playerId = event.data.playerId;
     * console.log(playerId);
     * // Console Output: "p7890"
     * ```
     */
    updatedSeat: PokerSeatInterface;

    /**
     * Allows additional properties within the `data` field to extend event-specific details as needed.
     *
     * #### Usage
     * Enables flexible additions to the `data` section with any extra information relevant to the event.
     */
    [key: string]: any;
  };
}

export { PokerSeatOccupiedEvent };
