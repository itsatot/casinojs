//@collapse

/**
 * @enum `PokerTableEvents`
 *
 * Defines the events associated with a player's seat in a poker game. These events help manage seat availability
 * and player actions related to occupying or vacating seats at a poker table.
 *
 * #### Purpose
 * The `PokerTableEvents` enum is designed to provide a standardized reference for seat-related events in the game.
 * It simplifies the handling of seat states, ensuring seat occupancy and vacancy can be tracked and updated
 * accurately within the game flow.
 *
 * #### Events Overview
 * The `PokerTableEvents` includes the following events:
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
 * const seatEvent: PokerTableEvents = PokerTableEvents.OCCUPIED;
 * console.log(seatEvent);
 * // Console Output: "PokerTable:Occupied"
 * ```
 */
enum PokerTableEvents {
  /**
   * Indicates that the seat has been initialized and is ready for occupancy.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerTableEvents = PokerTableEvents.INITIALIZED;
   * console.log(seatEvent);
   * // Console Output: "PokerTable:Initialized"
   * ```
   */
  

  /**
   * Indicates that the seat has been initialized and is ready for occupancy.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerTableEvents = PokerTableEvents.INITIALIZED;
   * console.log(seatEvent);
   * // Console Output: "PokerTable:Initialized"
   * ```
   */
  NEW_GAME = "PokerTable:NewGame",
}

export { PokerTableEvents };
