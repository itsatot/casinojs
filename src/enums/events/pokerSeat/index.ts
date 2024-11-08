//@collapse

/**
 * @enum `PokerSeatEvents`
 *
 * Defines the events associated with a player's seat in a poker game. These events help manage seat availability
 * and player actions related to occupying or vacating seats at a poker table.
 *
 * #### Purpose
 * The `PokerSeatEvents` enum is designed to provide a standardized reference for seat-related events in the game.
 * It simplifies the handling of seat states, ensuring seat occupancy and vacancy can be tracked and updated
 * accurately within the game flow.
 *
 * #### Events Overview
 * The `PokerSeatEvents` includes the following events:
 * - **INITIALIZED**: Indicates that the seat has been initialized and is ready for occupancy.
 * - **OCCUPIED**: Indicates a seat has been occupied by a player.
 * - **VACATED**: Indicates a seat has been vacated by a player.
 *
 * #### Usage
 * This enum standardizes the handling of seat events, making it easier to manage player movements at the table and
 * ensuring compatibility with various game modules and event listeners.
 *
 * @example
 * ```typescript
 * const seatEvent: PokerSeatEvents = PokerSeatEvents.OCCUPIED;
 * console.log(seatEvent);
 * // Console Output: "PokerSeat:Occupied"
 * ```
 */
enum PokerSeatEvents {
  /**
   * Indicates that the seat has been initialized and is ready for occupancy.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEvents = PokerSeatEvents.INITIALIZED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Initialized"
   * ```
   */
  INITIALIZED = "PokerSeat:Initialized",

  /**
   * Indicates a seat has been occupied by a player.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerSeatEvents = PokerSeatEvents.OCCUPIED;
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
   * const seatEvent: PokerSeatEvents = PokerSeatEvents.VACATED;
   * console.log(seatEvent);
   * // Console Output: "PokerSeat:Vacated"
   * ```
   */
  VACATED = "PokerSeat:Vacated",
}

export { PokerSeatEvents };
