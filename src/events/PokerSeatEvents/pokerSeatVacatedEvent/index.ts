//@collapse

// Import Enums
import { PokerSeatEventName } from "../../../enums";

// Import Events
import { PokerSeatEvent } from "../pokerSeatEvent";

/**
 * @interface `PokerSeatEvent`
 *
 * A standardized event structure for events concerning a `PokerSeat`, particularly when it is occupied
 * by a player. This interface extends `_BaseEvent`, ensuring consistent format and encapsulation for all
 * seat-related events within the poker library.
 *
 * #### Purpose
 * The `PokerSeatEvent` interface enables accurate and uniform event handling each time a player occupies a seat.
 * By using this structure, subscribers can respond to seat occupancy changes in real-time, adjusting the game
 * state and visual displays accordingly.
 *
 * #### Extends
 * `PokerSeatEvent` extends `_BaseEvent`, incorporating common metadata (`head`) and event-specific data (`data`),
 * while allowing flexibility through optional additional fields.
 *
 * #### Structure
 * - `head`: Provides essential metadata like `name`, `createdAt`, and `lastModifiedAt` (optional) for
 *           easy tracking and identification of the event.
 * - `data`: Holds specific details about the occupied seat, such as `seatId`, `playerId`, and the updated
 *           seat reference.
 *
 * #### Usage
 * The `PokerSeatEvent` is emitted whenever a player occupies a seat in a poker game. This event
 * supports custom extensions through optional fields within `head` and `data`, offering flexible adaptation
 * for different game requirements or additional metadata.
 *
 * #### Events Overview
 * This interface is primarily used to convey seat-related events such as:
 * - **PokerSeat:Occupied**: Indicates that a player has occupied the seat.
 * - **PokerSeat:Vacated**: Indicates that a player has vacated the seat (though managed by sibling interfaces).
 *
 * @extends _BaseEvent
 *
 * @example
 * ```typescript
 * const event: PokerSeatEvent = {
 *   head: { name: "PokerSeat:Occupied", createdAt: new Date(), lastModifiedAt: new Date(), additionalMeta: "seat change" },
 *   data: { seatId: "12345", playerId: "p7890", updatedSeat: seatInstance, extraInfo: "reserved" }
 * };
 * console.log(event);
 * // Console Output: { head: { name: "PokerSeat:Occupied", createdAt: <Date>, lastModifiedAt: <Date>, additionalMeta: "seat change" }, data: { seatId: "12345", playerId: "p7890", updatedSeat: <PokerSeatInterface>, extraInfo: "reserved" } }
 * ```
 */
interface PokerSeatVacatedEvent<T = any> extends PokerSeatEvent {
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
    name: PokerSeatEventName.SEAT_VACATED;

    createdAt: Date;

    source: "PokerSeat";
  };
}

export { PokerSeatVacatedEvent };
