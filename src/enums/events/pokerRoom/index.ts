//@collapse

/**
 * @enum `PokerRoomEvents`
 *
 * Defines the events associated with a player's seat in a poker game. These events help manage seat availability
 * and player actions related to occupying or vacating seats at a poker table.
 *
 * #### Purpose
 * The `PokerRoomEvents` enum is designed to provide a standardized reference for seat-related events in the game.
 * It simplifies the handling of seat states, ensuring seat occupancy and vacancy can be tracked and updated
 * accurately within the game flow.
 *
 * #### Events Overview
 * The `PokerRoomEvents` includes the following events:
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
 * const seatEvent: PokerRoomEvents = PokerRoomEvents.OCCUPIED;
 * console.log(seatEvent);
 * // Console Output: "PokerRoom:Occupied"
 * ```
 */
enum PokerRoomEvents {
  /**
   * Indicates that the seat has been initialized and is ready for occupancy.
   *
   * @example
   * ```typescript
   * const seatEvent: PokerRoomEvents = PokerRoomEvents.INITIALIZED;
   * console.log(seatEvent);
   * // Console Output: "PokerRoom:Initialized"
   * ```
   */
  INITIALIZED = "PokerRoom:Initialized",

  TABLE_CREATED = "PokerRoom:PokerTableCreated",

  /**
   * `ROOM_ADDED` - Emitted when a single room is added to the casino's list of managed rooms.
   *
   * #### Purpose
   * Allows listeners to respond when a new room is introduced into the Casino’s list of available rooms.
   */
  TABLE_ADDED = "PokerRoom:PokerTableAdded",

  /**
   * `ROOM_UPDATED` - Emitted when an existing room in the casino is modified.
   *
   * #### Purpose
   * Notifies listeners when a room’s configuration or attributes (e.g., blinds, player limits) have been updated.
   */
  TABLE_UPDATED = "PokerRoom:PokerTableUpdated",

  /**
   * `ROOM_DELETED` - Emitted when an existing room is removed from the casino's list of managed rooms.
   *
   * #### Purpose
   * Enables clean-up or resource reallocation processes by notifying listeners when a room is removed from the Casino.
   */
  TABLE_DELETED = "PokerRoom:PokerTableDeleted",

  ROOM_RESET = "PokerRoom:PokerRoomReset",
}

export { PokerRoomEvents };
