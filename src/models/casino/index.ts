//@collapse

// Import Enums
import { CasinoEventName } from "../../enums";

// Import Interfaces
import {
  CasinoInterface,
  PokerRoomConfig,
  PokerRoomInterface,
} from "../../interfaces";

// Import Models
import { PokerRoom } from "../pokerRoom";
import { BaseEventEmitter } from "../_base";

/**
 * @class `Casino`
 * Represents a Casino environment that manages multiple poker rooms (`PokerRooms`).
 * This class handles operations related to room creation, listing, removal, and searching.
 *
 * #### Purpose
 * A Casino serves as a central hub for organizing poker games by managing rooms.
 * Each room can accommodate players and maintain its own game state.
 *
 * #### Extends
 * Additionally, it extends the Node.js `BaseEventEmitter` to emit events when specific actions
 * occur, such as creating or removing a room.
 *
 * #### Implements
 * This class implements the `CasinoInterface` and inherits from the `BaseEventEmitter` class,
 * allowing it to emit events and conform to the defined interface structure for consistency
 * and predictability.
 *
 * #### Events
 * The `Casino` class emits custom events to signal room-related actions. For instance,
 * when a room is created, an event `casino:roomCreated` is emitted, making it easy
 * to handle notifications or updates related to the Casino’s operations.
 *
 * @example
 * ```typescript
 * const casino = new Casino();
 * casino.on('casino:roomCreated', (room) => console.log(`Room created: ${room.name}`));
 * const room = casino.createRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 });
 * console.log(room); // Logs details of "Room1"
 * ```
 */
class Casino extends BaseEventEmitter implements CasinoInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __rooms: PokerRoomInterface[] = [];

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * The `constructor` initializes the `Casino` class.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Output: []
   * ```
   */
  constructor() {
    super();
    this.__init();
  }

  /**
   * `__init`: Performs any necessary setup logic when the `Casino` is instantiated.
   * This is an internal method, meaning it's private and only used within the `Casino` class.
   *
   * #### Purpose
   * This method is designed to be a placeholder for any future setup logic or preparation that the
   * Casino might need during initialization. Currently, it's an empty method that gets called within the constructor.
   *
   * #### Usage
   * Developers can add additional logic in this method if there are operations or configurations
   * that need to happen every time the Casino is created.
   *
   * @returns {void} - This method doesn't return any values.
   *
   * @example
   * The `__init` method is automatically invoked when the `Casino` is created:
   * ```typescript
   * const casino = new Casino();
   * ```
   */
  private __init(): void {
    // No current logic, but reserved for future setup or configuration
  }

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
   * - Calls the internal `_setRooms` method to update the private `__rooms` property securely.
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
  public setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    return this._setRooms(rooms);
  }

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
  public createRoom(config: PokerRoomConfig): PokerRoomInterface {
    return this._createRoom(config);
  }

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
  public getRoom(index: number): PokerRoomInterface {
    return this.__rooms[index];
  }

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
  public getRooms(): PokerRoomInterface[] {
    return this.__rooms;
  }

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
  public addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
    return this._addRoom(room);
  }

  /**
   * #### Description
   * Adds multiple `PokerRoom` instances to the Casino's list of managed rooms in a single operation, enabling
   * efficient and scalable room management.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides a convenient way to add several rooms at once, allowing the Casino's environment to
   * scale in response to gaming demand or operational changes.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `rooms`: An array of `PokerRoomInterface` instances representing the rooms to be added to the Casino.
   *
   * #### Requirements
   * - Each element in the `rooms` array must be a valid `PokerRoomInterface` instance.
   * - The array should contain at least one room.
   *
   * #### Returns
   * - Returns `true` when all rooms have been added successfully.
   *
   * #### Usage
   * Typically used in scenarios where multiple rooms need to be added to the Casino simultaneously, such as
   * during batch operations or initial setup.
   *
   * @param {PokerRoomInterface[]} rooms - Array of `PokerRoomInterface` instances to add.
   * @returns {boolean} - Returns `true` when all rooms have been successfully added.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const rooms = [
   *   new PokerRoom({ name: "Room1", tableSize: 5, smallBlind: 5, bigBlind: 10 }),
   *   new PokerRoom({ name: "Room2", tableSize: 6, smallBlind: 10, bigBlind: 20 })
   * ];
   * const success = casino.addRooms(rooms);
   * console.log(success); // true if both rooms were added successfully
   * ```
   */
  public addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    return this._addRooms(rooms);
  }

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
  public deleteRoom(index: number): PokerRoomInterface[] {
    return this._deleteRoom(index);
  }

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves the total count of rooms managed by the Casino, enabling easy access to the room quantity.
   *
   * #### Implements
   * `N/A` - This method is unique to the Casino class and does not implement any other methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `size` method provides a shortcut to access the number of poker rooms currently managed by the Casino.
   * This method is useful for quickly obtaining the count of active rooms, which can help in managing or displaying
   * the Casino's state.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * `N/A` - This method does not require any input parameters.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns a number representing the current count of poker rooms managed by the Casino.
   *
   * #### Usage
   * Call this method when a quick count of managed rooms is needed, especially for UI updates or managing limits.
   *
   * @returns {number} - Returns the current count of poker rooms.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const count = casino.size();
   * console.log(count); // Console Output: 0 if no rooms have been added
   * ```
   */
  public size(): number {
    return this.roomCount();
  }

  /**
   * #### Description
   * Returns the total number of `PokerRoom` instances currently managed by the Casino.
   *
   * #### Implements
   * Part of `CasinoInterface`, ensuring standardization across implementations of the Casino class.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Provides a reliable way to retrieve the number of active poker rooms managed by the Casino. Useful for
   * general management, reporting, and in situations where the Casino’s room capacity or state must be assessed.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * `N/A` - This method does not accept any parameters.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the current count of managed rooms.
   *
   * #### Usage
   * Use this method whenever a precise count of rooms is required, such as when iterating through rooms
   * or validating bounds.
   *
   * @returns {number} - Returns the count of rooms in the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const count = casino.roomCount();
   * console.log(count); // Console Output: 0 if no rooms exist, or the total count of rooms otherwise
   * ```
   */
  public roomCount(): number {
    return this.getRooms().length;
  }

  /**
   * #### Description
   * Checks if a provided index is within the valid range of the Casino’s room list, helping avoid out-of-bounds errors.
   *
   * #### Implements
   * `isValidIndex` method from `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method validates an index before it's used to access or modify a room in the Casino’s list, protecting
   * against out-of-bound errors. It is useful in any operations that involve room access by index.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `index`: A zero-based integer representing the position of a room in the Casino's managed list.
   *
   * #### Requirements
   * - The `index` should be a non-negative integer within the range `[0, roomCount - 1]`.
   *
   * #### Returns
   * - Returns `true` if the index is valid.
   * - Throws an `Error` if the index is out of range, providing a descriptive message.
   *
   * #### Usage
   * Use this method before performing operations that involve accessing a room by index. This helps prevent
   * out-of-bound errors in index-based room access.
   *
   * @param {number} index - The zero-based index to validate.
   * @returns {boolean} - Returns `true` if the index is within bounds.
   *
   * @throws {Error} - Throws an error with a descriptive message if the index is out of bounds.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * try {
   *   casino.isValidIndex(2); // Returns true if there are at least 3 rooms
   * } catch (error) {
   *   console.error(error.message); // If index 2 is out of bounds, logs error message
   * }
   * ```
   */
  public isValidIndex(index: number): boolean {
    if (index < 0 || index >= this.roomCount()) {
      throw new Error(
        `Invalid index: ${index}. It must be between 0 and ${
          this.roomCount() - 1
        }.`
      );
    }
    return true;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**
   * #### Description
   * Sets the complete list of rooms managed by the Casino with a new array of `PokerRoomInterface` objects.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This protected method allows subclasses of `Casino` to modify the entire `__rooms` property, which can be used
   * when needing to replace or reset the Casino's room list.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOMS_SET` event, allowing external listeners to respond to room updates.
   *
   * #### Parameters
   * - `rooms`: An array of `PokerRoomInterface` instances representing the new rooms for the Casino.
   *
   * #### Requirements
   * - The `rooms` array should contain at least one room (`rooms.length >= 1`).
   *
   * #### Returns
   * - Returns the updated list of rooms currently managed by the Casino.
   *
   * #### Usage
   * This method is useful when an update or replacement of all rooms is needed, such as during initialization
   * or batch updates.
   *
   * @param {PokerRoomInterface[]} rooms - Array of new rooms to set in the Casino.
   * @returns {PokerRoomInterface[]} - The updated list of rooms managed by the Casino.
   *
   * @example
   * ```typescript
   * class ExtendedCasino extends Casino {
   *   public resetRooms(newRooms: PokerRoomInterface[]): PokerRoomInterface[] {
   *     return this._setRooms(newRooms);
   *   }
   * }
   * const extendedCasino = new ExtendedCasino();
   * const rooms = [new PokerRoom({ name: "VIP", tableSize: 8, smallBlind: 50, bigBlind: 100 })];
   * extendedCasino.resetRooms(rooms); // Resets the Casino's rooms list
   * ```
   */
  protected _setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    this.__rooms = rooms;
    this.emit(CasinoEventName.ROOMS_SET, this.getRooms());
    return this.getRooms();
  }

  /**
   * #### Description
   * Creates a new `PokerRoom` instance based on the provided configuration and adds it to the Casino's rooms list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino to dynamically create new rooms as needed by providing specific room configurations.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_CREATED` event, enabling listeners to respond to the creation of a new room.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the newly created `PokerRoomInterface` instance.
   *
   * #### Usage
   * Primarily used within subclasses or protected methods to dynamically create and add rooms to the Casino.
   *
   * @param {PokerRoomConfig} config - Configuration settings for creating a new `PokerRoom`.
   * @returns {PokerRoomInterface} - The newly created room instance.
   *
   * @example
   * ```typescript
   * class SpecialCasino extends Casino {
   *   public createSpecialRoom(config: PokerRoomConfig): PokerRoomInterface {
   *     return this._createRoom(config);
   *   }
   * }
   * const specialCasino = new SpecialCasino();
   * const newRoom = specialCasino.createSpecialRoom({ name: "Champions Lounge", tableSize: 10, smallBlind: 100, bigBlind: 200 });
   * console.log(newRoom.getName()); // Outputs: "Champions Lounge"
   * ```
   */
  protected _createRoom(
    config: PokerRoomConfig | undefined
  ): PokerRoomInterface {
    const room = new PokerRoom(config);
    this.__rooms.push(room);
    this.emit(CasinoEventName.ROOM_CREATED, room);
    return room;
  }

  /**
   * #### Description
   * Adds a single `PokerRoom` instance to the Casino's list of managed rooms.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows dynamic expansion of rooms within the Casino environment, enabling additional gaming options for players.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_ADDED` event after adding a room.
   *
   * #### Parameters
   * - `room`: The `PokerRoomInterface` instance representing the room to be added.
   *
   * #### Requirements
   * - The `room` parameter must be a valid instance implementing `PokerRoomInterface`.
   *
   * #### Returns
   * - The updated list of rooms currently managed by the Casino.
   *
   * #### Usage
   * Useful when adding a new room to the Casino in response to game demand or configuration changes.
   *
   * @param {PokerRoomInterface} room - The `PokerRoom` instance to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms managed by the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = new PokerRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const rooms = casino.addRoom(room);
   * console.log(rooms); // Updated rooms list with the new room
   * ```
   */
  protected _addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
    this.__rooms.push(room);
    this.emit(CasinoEventName.ROOM_ADDED, this.getRooms());
    return this.getRooms();
  }

  /**
   * #### Description
   * Adds multiple `PokerRoom` instances to the Casino's list of managed rooms.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Enables efficient management of batch room additions within the Casino, ensuring all rooms are processed together.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOMS_SET` event once all rooms are added.
   *
   * #### Parameters
   * - `rooms`: An array of `PokerRoomInterface` instances to add.
   *
   * #### Requirements
   * - Each element in the `rooms` array must be a valid `PokerRoomInterface` instance.
   *
   * #### Returns
   * - The updated list of rooms currently managed by the Casino.
   *
   * #### Usage
   * Useful in scenarios where multiple rooms need to be added to the Casino at once, such as during setup or a bulk update.
   *
   * @param {PokerRoomInterface[]} rooms - Array of `PokerRoomInterface` instances to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms managed by the Casino.
   *
   * @example
   * ```typescript
   * const extendedCasino = new Casino();
   * const rooms = [new PokerRoom({ name: "VIP Room", tableSize: 8, smallBlind: 50, bigBlind: 100 })];
   * extendedCasino.addRooms(rooms); // Adds VIP rooms to the Casino
   * ```
   */
  protected _addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    rooms.forEach((room) => {
      this._addRoom(room);
    });
    return this.getRooms();
  }

  /**
   * #### Description
   * Removes a `PokerRoom` from the Casino's list based on the room's index, providing controlled removal of rooms.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows for the safe removal of a specific room from the Casino’s list.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_DELETED` event once the room is successfully removed.
   *
   * #### Parameters
   * - `index`: The zero-based index of the room to remove.
   *
   * #### Requirements
   * - `index` must be valid within the bounds of the `__rooms` array.
   *
   * #### Returns
   * - The updated list of rooms managed by the Casino.
   *
   * #### Usage
   * Primarily used for controlled removal of a specific room from the Casino's room list.
   *
   * @param {number} index - The index of the room to be removed.
   * @returns {PokerRoomInterface[]} - The updated list of rooms managed by the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const room = casino.createRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const rooms = casino.deleteRoom(room);
   * console.log(rooms); // Updated rooms list without the deleted room
   * ```
   */
  protected _deleteRoom(index: number): PokerRoomInterface[] {
    if (this.isValidIndex(index)) {
      this.__rooms.splice(index, 1);
      this.emit(CasinoEventName.ROOM_DELETED, this.getRooms());
    }
    return this.getRooms();
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/
}

export { Casino };
