import { PokerSeatInterface } from "../pokerSeat";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerTableConfig`
 *
 * Represents the configuration settings necessary to define a poker table within a `PokerRoom`. This interface
 * standardizes essential properties such as unique identifiers, table size, and betting values, ensuring each
 * table is set up with consistent and clear parameters.
 *
 * #### Purpose
 * The `PokerTableConfig` interface provides a structured configuration for each table within a poker room. By defining
 * specific parameters for table size, small blind, and big blind amounts, this interface supports accurate table setup
 * and improves the consistency of poker gameplay within the Casino system.
 *
 * #### Structure Overview
 * - **Identification**: The `id` and `name` properties enable unique identification and labeling of tables.
 * - **Betting Structure**: `smallBlind` specify the betting increments for the table.
 * - **Seating Capacity**: `size` defines the maximum number of players per table.
 *
 * #### Usage Context
 * `PokerTableConfig` objects are typically used during table creation or setup, offering a clear and consistent way
 * to configure and manage individual poker tables within a room.
 *
 * #### Requirements
 * - **Optional**: `id`,`name`, `size` and `smallBlind` are not strictly required.
 * - **Mandatory**:  No Mandatory.
 *
 * @example
 * ```typescript
 * const tableConfig: PokerTableConfig = {
 *   id: "table1",
 *   name: "VIP Table",
 *   size: 8,
 *   smallBlind: 50
 * };
 * ```
 */
interface PokerTableConfig {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string | undefined} id
   *
   * A unique identifier for the poker table, enabling precise reference and management within the Casino system.
   *
   * #### Purpose
   * Used to uniquely identify each `PokerTable` within the Casino, providing a direct reference for table-specific operations.
   *
   * #### Requirements
   * - **Optional**: If provided, `id` must be a unique, non-empty string to avoid conflicts.
   *
   * @example
   * **Example 1**:
   * ```typescript
   * const tableConfig: PokerTableConfig = {
   *   id: "table42",
   *   name: "High Stakes Table",
   *   size: 6,
   *   smallBlind: 100
   * };
   * console.log(tableConfig.id);
   * // Console Output: "table42"
   * ```
   * **Example 2**:
   * ```typescript
   * const tableConfig: PokerTableConfig = {
   *   id: undefined,
   *   name: "Standard Table",
   *   size: 4,
   *   smallBlind: 10
   * };
   * console.log(tableConfig.id);
   * // Console Output: undefined
   * ```
   */
  id?: string;

  /**
   * @property {string | undefined} name
   *
   * A descriptive name for the poker table, often displayed in user interfaces or logs to enhance human readability.
   *
   * #### Purpose
   * Serves as a user-friendly label for the poker table, assisting administrators and players in identifying the table easily.
   *
   * #### Requirements
   * - **Optional**: `name` should be a non-empty string if defined, providing a clear label for the table.
   *
   * @example
   * ```typescript
   * const tableConfig: PokerTableConfig = {
   *   id: "table2",
   *   name: "VIP Suite",
   *   size: 8,
   *   smallBlind: 50
   * };
   * console.log(tableConfig.name);
   * // Console Output: "VIP Suite"
   * ```
   */
  name?: string;

  /**
   * @property {number | undefined} size
   *
   * Specifies the maximum number of players that can be seated at the poker table, supporting values within
   * a typical range of 2 to 14 players.
   *
   * #### Purpose
   * Defines the seating capacity of the poker table, ensuring that no more than the specified number of players
   * can join the game at a given time.
   *
   * #### Requirements
   * - Must be a number between 2 and 14 to adhere to typical poker table constraints.
   * - **Note**: If the `size` value is set outside the range of 2 to 14, an error or validation warning may be triggered
   *   during table initialization, as these values fall outside standard poker table configurations.
   *
   * @example
   * ```typescript
   * const tableConfig: PokerTableConfig = {
   *   id: "table3",
   *   name: "Standard Table",
   *   size: 6,
   *   smallBlind: 10
   * };
   * console.log(tableConfig.size);
   * // Console Output: 6
   * ```
   */
  size?: number;

  /**
   * @property {number | undefined} smallBlind
   *
   * The value of the small blind for betting at the table, setting the minimum bet increment.
   *
   * #### Purpose
   * Defines the small blind amount, establishing a base for the betting structure in poker games at this table.
   *
   * #### Requirements
   * - Must be a positive number; negative values or zero could result in validation errors.
   *
   * @example
   * ```typescript
   * const tableConfig: PokerTableConfig = {
   *   id: "table4",
   *   name: "Training Table",
   *   size: 4,
   *   smallBlind: 5
   * };
   * console.log(tableConfig.smallBlind);
   * // Console Output: 5
   * ```
   */
  smallBlind?: number;
}

/**
 * @interface `PokerTableInterface`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerTableInterface extends NodeJS.EventEmitter {
  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * #### Description
   * Sets the name of the `PokerRoom`, allowing the name to be updated or customized.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setName` method is used to assign a specific name to a `PokerRoom`, which helps distinguish it within the system.
   * This is essential for systems where rooms need to be identifiable and manageable through a unique name.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `name`: A string representing the new name for the room. It must be a valid, non-empty string to ensure
   *   the room has a clear, identifiable label.
   *
   * #### Requirements
   * - The `name` parameter should be a non-empty string to provide meaningful identification.
   * - Passing an empty or invalid value could result in future misidentification of rooms if validation is implemented.
   *
   * #### Returns
   * - Returns the `name` that was set for the `PokerRoom`.
   *
   * #### Usage
   * Use this method to set or update the name of a room in a system where unique or identifiable room names
   * are necessary for reference.
   *
   * @param {string} name - The new name for the `PokerRoom`.
   * @returns {string} - Returns the name of the room that was set.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room1", tableSize: 6 });
   * pokerRoom.setName("HighRollers"); // Sets the name of the room to "HighRollers"
   * console.log(pokerRoom.getName()); // Logs "HighRollers"
   * ```
   */
  setName(name: string): string;

  /**
   * #### Description
   * Sets the queue of players waiting to enter the `PokerTable` within the `PokerRoom`. This queue helps
   * manage player flow and assign seating as tables become available.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setQueue` method provides a structured way to set or update the player queue. This queue is essential
   * for room management, helping to keep a record of players awaiting entry and manage seating arrangements.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `queue`: An array of `PokerPlayerInterface` objects, each representing a player awaiting entry into the room’s `PokerTable`.
   *
   * #### Requirements
   * - `queue` should be an array of valid `PokerPlayerInterface` instances.
   * - If empty, the queue indicates that no players are currently waiting for entry.
   *
   * #### Returns
   * - Returns the `queue` array after updating it within the room.
   *
   * #### Usage
   * Use this method to set or update the player queue in cases where player flow needs control,
   * ensuring smooth transitions as players are seated at the table.
   *
   * @param {PokerPlayerInterface[]} queue - The new list of players waiting to enter the table.
   * @returns {PokerPlayerInterface[]} - Returns the updated player queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room2", tableSize: 6 });
   * const queue = [new PokerPlayer("Alice"), new PokerPlayer("Bob")];
   * pokerRoom.setQueue(queue); // Sets the player queue
   * console.log(pokerRoom.getQueue()); // Logs the updated player queue
   * ```
   */
  setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[];

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getId(): string;

  /**
   * @method `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  getSeats(): PokerSeatInterface[];

  /**
   * #### Description
   * Retrieves the current queue of players awaiting seating in the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is part of `PokerRoomInterface` without implementing external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getQueue` method is essential for accessing the list of players waiting for a seat in the `PokerRoom`.
   * It provides insight into the queue length and composition, helping manage room capacity and player flow.
   *
   * #### Events
   * `N/A` - This method does not emit any events.
   *
   * #### Parameters
   * `N/A` - No parameters are required for this method.
   *
   * #### Requirements
   * `N/A` - This method simply returns the existing queue without modifying it.
   *
   * #### Returns
   * - Returns an array of `PokerPlayerInterface` instances, representing the players in the waiting queue.
   *
   * #### Usage
   * Call this method to view the list of players awaiting entry to the room. This can be used for monitoring,
   * player assignment, and room management purposes.
   *
   * @returns {PokerPlayerInterface[]} - An array containing the players in the waiting queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Lobby", tableSize: 6 });
   * console.log(pokerRoom.getQueue()); // Logs an array of players awaiting seating
   * ```
   */
  getQueue(): PokerPlayerInterface[];

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves the total number of `PokerRoom` instances currently managed by the Casino.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides insight into the number of poker rooms that the Casino manages, supporting
   * validation for index-bound operations or general information on Casino state.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * `N/A`
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the total count of rooms managed by the Casino.
   *
   * #### Usage
   * Use this method to retrieve the total count of active poker rooms, which is helpful when iterating over
   * rooms or confirming index-bound conditions.
   *
   * @returns {number} - The current count of rooms in the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const count = casino.roomCount();
   * console.log(count); // Logs the total number of managed rooms, e.g., 5
   * ```
   */
  seatCount(): number;

  /**
   * #### Description
   * Validates if a specified index is within the valid bounds of the Casino’s room list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Prevents out-of-bounds errors by confirming that an index is within the acceptable range for the Casino’s
   * room list, ensuring that subsequent calls to access rooms by index have a valid target.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `index`: A zero-based integer specifying the position of a room within the Casino's managed room list.
   *
   * #### Requirements
   * - The `index` must be a non-negative integer within the bounds of the `__rooms` array.
   *
   * #### Returns
   * - Returns `true` if the index is within bounds.
   * - Throws an `Error` if the index is out of bounds.
   *
   * #### Usage
   * Call this method before performing operations involving indexed access to rooms, ensuring the index
   * falls within valid boundaries.
   *
   * @param {number} index - The zero-based index to validate within the room list.
   * @returns {boolean} - Returns `true` if the index is within bounds.
   *
   * @throws {Error} - Throws an error with a descriptive message if the index is out of bounds.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * try {
   *   casino.isValidIndex(2); // Returns true if index 2 exists in the list of rooms
   * } catch (error) {
   *   console.error(error.message); // Logs error if index 2 is invalid
   * }
   * ```
   */
  isValidIndex(index: number): boolean;
}

export { PokerTableConfig, PokerTableInterface };
