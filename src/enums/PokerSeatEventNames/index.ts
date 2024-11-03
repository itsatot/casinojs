//@collapse

/**
 * @enum `PokerSeatEventName`
 * Defines the events associated with a player's seat in a poker game. These events help manage
 * seat availability and player actions related to occupying or vacating seats at a poker table.
 *
 * #### Purpose
 * `PokerSeatEventName` is designed to provide a standardized reference for seat-related events.
 * It simplifies the handling of seat occupancy and vacancy, ensuring that seat states can be
 * tracked and updated accurately within the game flow.
 *
 * #### Events Overview
 * The `PokerSeatEventName` includes the following events:
 * - **OCCUPIED**: Indicates a seat has been occupied by a player.
 * - **VACATED**: Indicates a seat has been vacated by a player.
 *
 * #### Usage
 * This enum standardizes the handling of seat events, making it easy to manage player movements
 * at the table and ensure compatibility with various game modules and event listeners.
 *
 * @example
 * ```typescript
 * const seatEvent: PokerSeatEventName = PokerSeatEventName.OCCUPIED;
 * console.log(seatEvent);
 * // Console Output: "PokerSeat:Occupied"
 * ```
 */
enum PokerSeatEventName {
  /**
   * Indicates a seat has been occupied by a player.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEventName = PokerSeatEventName.OCCUPIED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Occupied"
   * ```
   */
  INITIALIZED = "PokerSeat:Initialized",

  /**
   * Indicates a seat has been occupied by a player.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEventName = PokerSeatEventName.OCCUPIED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Occupied"
   * ```
   */
  OCCUPIED = "PokerSeat:Occupied",

  /**
   * Indicates a seat has been vacated by a player.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEventName = PokerSeatEventName.VACATED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Vacated"
   * ```
   */
  VACATED = "PokerSeat:Vacated",

  /**
   * Indicates a seat has been vacated by a player.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEventName = PokerSeatEventName.VACATED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Vacated"
   * ```
   */
  ERROR = "PokerSeat:Error",
}

export { PokerSeatEventName };
