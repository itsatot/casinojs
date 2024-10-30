//@collapse

// Import Enums
import { PokerSeatEventName } from "../../../enums";

// Import Events
import { _BaseEvent } from "../../_BaseEvent";

// Import Interfaces
import { PokerSeatInterface } from "../../../interfaces";

/**
 * @interface `PokerSeatVacatedEvent`
 *
 * Represents the event structure for when a `PokerSeat` becomes vacant.
 * Extends `_BaseEvent` to ensure a consistent format across all event data
 * emitted within the library.
 *
 * #### Purpose
 * The `PokerSeatVacatedEvent` interface is designed to relay information
 * when a seat is vacated by a player in a poker game, enabling subscribers to
 * monitor changes in seat occupancy and adjust game state accordingly.
 *
 * #### Extends
 * Extends `_BaseEvent`, inheriting `head` and `data` structures with metadata
 * fields and customizable details specific to the `PokerSeatVacatedEvent`.
 *
 * #### Structure
 * - `head`: Core metadata, including `name` and `createdAt` fields, to identify
 * and timestamp the event.
 * - `data`: Specific information about the vacated seat, such as the `seatId`
 * and player details.
 *
 * #### Usage
 * Emitted each time a player vacates a seat, this interface supports additional
 * properties within `head` and `data` for flexibility in extending event details
 * if needed.
 *
 * @extends _BaseEvent
 *
 * @example
 * ```typescript
 * const event: PokerSeatVacatedEvent = {
 *   head: { name: "PokerSeat:Vacated", createdAt: new Date(), customMeta: "extra metadata" },
 *   data: { seatId: "12345", playerId: "p7890", updatedSeat: seatInstance, additionalDetail: "extra info" }
 * };
 * console.log(event);
 * // Console Output: { head: { name: "PokerSeat:Vacated", createdAt: <Date>, customMeta: "extra metadata" }, data: { seatId: "12345", playerId: "p7890", updatedSeat: <PokerSeatInterface>, additionalDetail: "extra info" } }
 * ```
 */
interface PokerSeatVacatedEvent extends _BaseEvent {
  head: {
    /**
     * @property {PokerSeatEventName} name
     *
     * Represents the event name, identifying it as a `PokerSeatVacatedEvent`.
     *
     * #### Purpose
     * Labels the event type for easy filtering and subscription by listeners.
     *
     * #### Requirements
     * - Should be descriptive and set as `"PokerSeat:Vacated"`.
     *
     * @example
     * ```typescript
     * const eventName = event.head.name;
     * console.log(eventName);
     * // Console Output: "PokerSeat:Vacated"
     * ```
     */
    name: PokerSeatEventName;

    /**
     * @property {Date} createdAt
     *
     * Timestamp indicating when the event was emitted.
     *
     * #### Purpose
     * Tracks the time of the event’s emission, useful for logging and
     * time-sensitive operations.
     *
     * #### Requirements
     * - Must be a valid `Date` object representing the emission time.
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
     * Supports additional metadata fields within `head` for extensibility.
     *
     * #### Usage
     * Enables flexible additions to `head` metadata, supporting any
     * key-value pair as required.
     */
    [key: string]: any;
  };

  data: {
    /**
     * @property {string} seatId
     *
     * Unique identifier for the seat that has been vacated.
     *
     * #### Purpose
     * Tracks which specific seat has become vacant, aiding in managing
     * seat occupancy status.
     *
     * #### Requirements
     * - Should correspond to the seat’s unique identifier in the game.
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
     * Unique identifier of the player who vacated the seat.
     *
     * #### Purpose
     * Allows event subscribers to identify which player has left the seat.
     *
     * #### Requirements
     * - Should match the player’s unique identifier in the game.
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
     * @property {PokerSeatInterface} updatedSeat
     *
     * Reference to the updated seat interface, reflecting its vacated status.
     *
     * #### Purpose
     * Provides subscribers with a detailed view of the seat after it
     * has been vacated.
     *
     * #### Requirements
     * - Must be a valid `PokerSeatInterface` object.
     *
     * @example
     * ```typescript
     * const updatedSeat = event.data.updatedSeat;
     * console.log(updatedSeat);
     * // Console Output: <PokerSeatInterface>
     * ```
     */
    updatedSeat: PokerSeatInterface;

    /**
     * Allows additional properties within `data` for further extensibility.
     *
     * #### Usage
     * Supports custom properties within `data` to include additional
     * information relevant to the event.
     */
    [key: string]: any;
  };
}

export { PokerSeatVacatedEvent };
