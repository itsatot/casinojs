//@collapse

// Import Enums
import { PokerSeatEventName } from "../../enums";

// Import Events
import { _BaseEvent } from "../_BaseEvent";

// Import Interfaces
import { PokerSeatInterface } from "../../interfaces";

/**
 * @interface `PokerSeatOccupiedEvent`
 *
 * Represents an event structure for when a `PokerSeat` is occupied by a player.
 * Extends `_BaseEvent` to maintain a standardized format, ensuring consistent event data
 * encapsulation across the library.
 *
 * #### Purpose
 * The `PokerSeatOccupiedEvent` interface captures and relays detailed information whenever
 * a seat is occupied during a poker game. By emitting this event, subscribers can respond
 * immediately to seat occupancy changes and manage game state accordingly.
 *
 * #### Extends
 * Inherits from `_BaseEvent`, incorporating core metadata (`head`) and payload (`data`) fields,
 * which can be extended with specific information about the occupied seat.
 *
 * #### Structure
 * - `head`: Provides metadata such as event `name` and `createdAt` timestamp.
 * - `data`: Holds seat-specific details, like `seatId`, `playerId`, and a reference to the updated seat interface.
 *
 * #### Usage
 * Emitted each time a player occupies a seat, the `PokerSeatOccupiedEvent` facilitates flexible
 * extensions by allowing optional additional properties within `head` and `data`.
 *
 * @extends _BaseEvent
 *
 * @example
 * ```typescript
 * const event: PokerSeatOccupiedEvent = {
 *   head: { name: "PokerSeat:Occupied", createdAt: new Date(), additionalMeta: "seat change" },
 *   data: { seatId: "12345", playerId: "p7890", updatedSeat: seatInstance, extraInfo: "reserved" }
 * };
 * console.log(event);
 * // Console Output: { head: { name: "PokerSeat:Occupied", createdAt: <Date>, additionalMeta: "seat change" }, data: { seatId: "12345", playerId: "p7890", updatedSeat: <PokerSeatInterface>, extraInfo: "reserved" } }
 * ```
 */
interface PokerSeatEvent extends _BaseEvent {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {PokerSeatEventName} head
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
   * const eventHead = event.head;
   * console.log(eventHead);
   * // Console Output: "PokerSeat:Occupied"
   * ```
   */
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
    name: PokerSeatEventName;

    /**
     * @property {Date} createdAt
     *
     * Timestamp of when the event was emitted.
     *
     * #### Purpose
     * Tracks the event emission time, useful for time-sensitive operations like logging.
     *
     * #### Requirements
     * - Must be a valid `Date` object representing the exact emission time.
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
     * @property {Date} createdAt
     *
     * Timestamp of when the event was emitted.
     *
     * #### Purpose
     * Tracks the event emission time, useful for time-sensitive operations like logging.
     *
     * #### Requirements
     * - Must be a valid `Date` object representing the exact emission time.
     *
     * @example
     * ```typescript
     * const eventTime = event.head.createdAt;
     * console.log(eventTime);
     * // Console Output: <Date>
     * ```
     */
    lastModifiedAt?: Date;

    /**
     * Allows additional metadata fields in the `head` for extensibility.
     *
     * #### Usage
     * Enables flexible additions to `head` metadata, supporting any key-value pair.
     */
    [key: string]: any;
  };

  data: {
    // /**
    //  * @property {string} seatId
    //  *
    //  * Unique identifier for the seat that has been occupied.
    //  *
    //  * #### Purpose
    //  * Tracks which specific seat has been occupied, assisting in managing seat states.
    //  *
    //  * #### Requirements
    //  * - Should correspond to the seat’s unique identifier.
    //  *
    //  * @example
    //  * ```typescript
    //  * const seatId = event.data.seatId;
    //  * console.log(seatId);
    //  * // Console Output: "12345"
    //  * ```
    //  */
    // seatId: string;

    // /**
    //  * @property {string} playerId
    //  *
    //  * Unique identifier of the player occupying the seat.
    //  *
    //  * #### Purpose
    //  * Links the player to the occupied seat, assisting in event tracking and game state management.
    //  *
    //  * #### Requirements
    //  * - Should match the player’s unique identifier in the game.
    //  *
    //  * @example
    //  * ```typescript
    //  * const playerId = event.data.playerId;
    //  * console.log(playerId);
    //  * // Console Output: "p7890"
    //  * ```
    //  */
    // playerId: string | undefined;

    // /**
    //  * @property {PokerSeatInterface} updatedSeat
    //  *
    //  * Reference to the updated seat interface, reflecting its new occupied status.
    //  *
    //  * #### Purpose
    //  * Provides a detailed view of the seat after occupation, useful for downstream processing.
    //  *
    //  * #### Requirements
    //  * - Must be a valid `PokerSeatInterface` object.
    //  *
    //  * @example
    //  * ```typescript
    //  * const updatedSeat = event.data.updatedSeat;
    //  * console.log(updatedSeat);
    //  * // Console Output: <PokerSeatInterface>
    //  * ```
    //  */
    // updatedSeat: PokerSeatInterface;

    /**
     * Supports additional properties within `data` for further extensibility.
     *
     * #### Usage
     * Allows custom properties to be added to `data` to accommodate specific requirements.
     */
    [key: string]: any;
  };

  /**
   * Allows additional data fields in the `PokerSeatEvent` for extensibility.
   *
   * #### Usage
   * Enables flexible additions to `PokerSeatEvent` metadata, supporting any key-value pair.
   */
  [key: string]: any;
}

export { PokerSeatEvent };
