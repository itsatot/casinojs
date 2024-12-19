//@collapse

import { BaseEventEmitterInterface } from "../_base";
import { PokerRoomConfig, PokerRoomInterface } from "../pokerRoom";

/**
 * @interface `CasinoInterface`
 * Represents the core responsibilities and structure of a Casino entity within the system. It manages multiple `PokerRoom` instances and facilitates the organization of poker games through room creation, player allocation, and game tracking.
 *
 * #### Purpose
 * The `CasinoInterface` serves as a blueprint for any `Casino` class that manages multiple poker rooms. It defines room management methods, player allocation functions, and potentially methods for tracking player statistics or games across rooms.
 *
 * #### Extends
 * This interface extends `NodeJS.EventEmitter` to emit events associated with key actions, such as room creation or removal, enhancing flexibility in managing event-driven operations across the Casino system.
 *
 * #### Methods Overview
 * The `CasinoInterface` includes essential methods to:
 * - **Create** new rooms with specified configurations.
 * - **Retrieve** details of individual rooms or a complete list of active rooms.
 * - **Update** rooms dynamically by adding or modifying existing rooms.
 * - **Delete** specific rooms, ensuring the Casino environment remains organized.
 *
 * #### Events
 * The `CasinoInterface` supports event emissions for room-related actions. Events allow other parts of the application to subscribe to changes in the Casino, making it easier to handle notifications and updates.
 *
 * @extends NodeJS.EventEmitter
 *
 * @example
 * ```typescript
 * const casino: CasinoInterface = new Casino();
 * casino.on('casino:roomCreated', (room) => console.log(`Room created: ${room.name}`));
 * const room = casino.createRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 });
 * console.log(casino.listRooms());
 * ```
 */
interface CasinoInterface extends BaseEventEmitterInterface {
  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * #### Description
   * Sets the list of rooms managed by the Casino. This method is typically used to replace or update
   * the entire list of poker rooms in the casino.
   *
   * #### Implements
   * Implements the `setRooms` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Provides a way to update the current list of rooms managed by the Casino, ensuring a consistent and up-to-date
   * list of poker rooms as defined by the casino’s configuration.
   *
   * #### Events
   * - `N/A`: No `event` is emitted by this method.
   *
   * #### Parameters
   * - `rooms`: An array of `PokerRoomInterface` instances, representing individual poker rooms in the Casino.
   *
   * #### Requirements
   * - The `rooms` array must contain at least one room (i.e., `rooms.length >= 1`).
   *
   * #### Returns
   * - Returns `true` when the rooms have been successfully set.
   *
   * #### Usage
   * This method accepts an array of `PokerRoomInterface` objects, representing poker rooms to manage in the casino.
   * - Replaces any existing rooms with the new provided list.
   * - Calls the internal `__setRooms` method to update the private `__rooms` property securely.
   *
   * @param {PokerRoomInterface[]} rooms - The new list of poker rooms to be managed by the Casino.
   * @returns {boolean} - Returns `true` when the rooms have been successfully set.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const rooms: PokerRoomInterface[] = [
   *   new PokerRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 })
   * ];
   * casino.setRooms(rooms);
   * console.log(casino.getRooms()); // Logs an array with the newly set rooms
   * ```
   */
  setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[];

  /**
   * #### Description
   * Creates a new `PokerRoom` within the Casino and adds it to the list of rooms.
   *
   * #### Implements
   * Implements the `createRoom` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Enables the dynamic creation and addition of a `PokerRoom` to the Casino, expanding the Casino’s managed rooms as required.
   * This facilitates flexible game setup and room management in response to user needs.
   *
   * #### Events
   * - `casino:roomCreated`: This custom event is emitted once the room is successfully added.
   *   Listeners to this event can respond with actions, such as logging or notifying users.
   *
   * #### Parameters
   * - `config`: A configuration object containing details like the room’s name, table size, small blind, and big blind values.
   *
   * #### Requirements
   * - The configuration object must include valid values for `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Returns
   * - Returns the newly created `PokerRoom` instance, confirming its addition to the Casino.
   *
   * #### Usage
   * This method creates a new room based on the provided configuration, then pushes it into the Casino’s room list.
   * After adding the room, it emits a `casino:roomCreated` event for any listeners tracking room creation.
   *
   * @param {PokerRoomConfig} config - A configuration object with properties like the room name, table size, small blind, and big blind values.
   * @returns {PokerRoomInterface} - Returns the newly created `PokerRoom` instance.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = casino.createRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * console.log(casino.getRooms()); // Logs the new room within the array of rooms
   * ```
   */
  createRoom(config: PokerRoomConfig): PokerRoomInterface;

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves a specific `PokerRoom` based on its position within the Casino’s list of rooms.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides direct access to a single `PokerRoom` by index, allowing for targeted retrieval of rooms,
   * which can be useful for room-specific operations or when sequentially processing rooms.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `index`: A zero-based index representing the position of the desired `PokerRoom` in the Casino’s room list.
   *
   * #### Requirements
   * - The index provided must be within the bounds of the `__rooms` array (i.e., `0 <= index < __rooms.length`).
   * - Passing an out-of-bounds index will result in an `undefined` return.
   *
   * #### Returns
   * - Returns the `PokerRoomInterface` instance located at the specified index.
   * - Returns `undefined` if the provided index is out of bounds.
   *
   * #### Usage
   * Use this method when you need to access a particular room directly by its index in the Casino’s list of rooms.
   * This can be useful in looped operations or when accessing rooms based on their position in the list.
   *
   * @param {number} index - The zero-based index of the desired room in the Casino’s room list.
   * @returns {PokerRoomInterface | undefined} - The `PokerRoom` at the specified index or `undefined` if the index is out of bounds.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = casino.getRoom(0); // Returns the first room or undefined if no rooms exist
   * ```
   */
  getRoom(index: number): PokerRoomInterface;

  /**
   * #### Description
   * Retrieves the full list of rooms currently managed by the Casino.
   *
   * #### Implements
   * Implements the `getRooms` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Provides access to the Casino's list of rooms, allowing external components or systems to retrieve and display
   * information on all currently managed poker rooms.
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
   * - Returns an array containing all `PokerRoomInterface` instances currently managed by the Casino.
   * - Returns an empty array if no rooms have been added to the Casino.
   *
   * #### Usage
   * This method is useful when a complete list of active rooms is needed, such as when displaying the Casino's
   * available games or managing room states.
   *
   * @returns {PokerRoomInterface[]} - An array of all `PokerRoom` objects in the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Output: []
   * ```
   */
  getRooms(): PokerRoomInterface[];

  getRoomByName(name: string): PokerRoomInterface | undefined;

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * #### Description
   * Adds a new `PokerRoom` instance to the Casino's list of managed rooms, enabling dynamic expansion
   * of rooms within the Casino environment.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides a flexible mechanism for expanding the Casino's room offerings by allowing new
   * rooms to be added as required, thereby supporting various gaming scenarios and player demand.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `room` - A `PokerRoomInterface` instance representing the room to be added to the Casino’s list.
   *
   * #### Requirements
   * - The `room` parameter must be a valid instance implementing `PokerRoomInterface`.
   *
   * #### Returns
   * - Returns `true` to confirm that the room has been successfully added to the Casino.
   *
   * #### Usage
   * Typically used in scenarios where the Casino environment needs to expand by adding more gaming rooms.
   *
   * @param {PokerRoomInterface} room - The `PokerRoom` instance to add.
   * @returns {boolean} - Returns `true` when the room has been added successfully.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = new PokerRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const success = casino.addRoom(room);
   * console.log(success); // true
   * ```
   */
  addRoom(room: PokerRoomInterface): PokerRoomInterface[];

  /**
   * #### Description
   * Adds a new `PokerRoom` instance to the Casino's list of managed rooms, enabling dynamic expansion
   * of rooms within the Casino environment.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides a flexible mechanism for expanding the Casino's room offerings by allowing new
   * rooms to be added as required, thereby supporting various gaming scenarios and player demand.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `room` - A `PokerRoomInterface` instance representing the room to be added to the Casino’s list.
   *
   * #### Requirements
   * - The `room` parameter must be a valid instance implementing `PokerRoomInterface`.
   *
   * #### Returns
   * - Returns `true` to confirm that the room has been successfully added to the Casino.
   *
   * #### Usage
   * Typically used in scenarios where the Casino environment needs to expand by adding more gaming rooms.
   *
   * @param {PokerRoomInterface[]} rooms - The `PokerRoom` instance to add.
   * @returns {boolean} - Returns `true` when the room has been added successfully.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = new PokerRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const success = casino.addRoom(room);
   * console.log(success); // true
   * ```
   */
  addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[];

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**
   * #### Description
   * Removes a `PokerRoom` from the Casino's list of managed rooms based on the room's name, enabling dynamic
   * contraction of the Casino environment as required.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino environment to remain current by dynamically removing rooms that are no longer active
   * or needed. This supports a clean and manageable set of active rooms within the Casino.
   *
   * #### Events
   * - Emits a `casino:roomRemoved` event when a room is successfully removed. This event can be used
   *   to trigger updates, logging, or notifications.
   *
   * #### Parameters
   * - `roomName`: A string representing the name of the `PokerRoom` to be removed from the Casino.
   *
   * #### Requirements
   * - The `roomName` parameter should match the `name` property of an existing room for successful deletion.
   *
   * #### Returns
   * - Returns `true` if the room was successfully removed, or `false` if no room with the specified name was found.
   *
   * #### Usage
   * Use this method when removing a room that is no longer active or required, ensuring that only
   * currently used rooms remain managed by the Casino.
   *
   * @param {number} index - The name of the `PokerRoom` to be removed.
   * @returns {PokerRoomInterface[]} - Returns `true` if the room was removed; `false` if not found.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * casino.createRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const success = casino.deleteRoom("HighRollers");
   * console.log(success); // true if room was found and removed, false otherwise
   * ```
   */
  deleteRoom(index: number): PokerRoomInterface[];

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
  roomCount(): number;

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

export { CasinoInterface };
