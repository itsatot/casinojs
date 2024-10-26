import { EventEmitter } from "events";
import assert from "assert";

// Import Interfaces
import {
  PokerRoomConfig,
  PokerRoomInterface,
} from "../../interfaces/pokerRoom";
import { CasinoInterface } from "../../interfaces/casino";

// Import Models
import { PokerRoom } from "../pokerRoom";

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
 * Additionally, it extends the Node.js `EventEmitter` to emit events when specific actions
 * occur, such as creating or removing a room.
 *
 * #### Implements
 * This class implements the `CasinoInterface` and inherits from the `EventEmitter` class,
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
class Casino extends EventEmitter implements CasinoInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {PokerRoomInterface[]} _rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `_rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private _rooms: PokerRoomInterface[];

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
    // Call the parent class constructor from EventEmitter
    super();

    // Initialize the list of rooms as an empty array
    this._rooms = [];

    // Perform any additional initialization logic
    this.init();
  }

  /**
   * `init`: Performs any necessary setup logic when the `Casino` is instantiated.
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
   * The `init` method is automatically invoked when the `Casino` is created:
   * ```typescript
   * const casino = new Casino();
   * ```
   */
  private init(): void {
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
   * - Calls the internal `_setRooms` method to update the private `_rooms` property securely.
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
  public setRoom(index: number, room: PokerRoomInterface): boolean {
    return this._setRoom(index, room);
  }

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
   * - Calls the internal `_setRooms` method to update the private `_rooms` property securely.
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
  public setRooms(rooms: PokerRoomInterface[]): boolean {
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
   * - The index provided must be within the bounds of the `_rooms` array (i.e., `0 <= index < _rooms.length`).
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
  public getRoom(index: number): PokerRoomInterface | undefined {
    return this._rooms[index];
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
    return this._rooms;
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
  public addRoom(room: PokerRoomInterface): boolean {
    this._rooms.push(room);
    return true;
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
   * @param {string} roomName - The name of the `PokerRoom` to be removed.
   * @returns {boolean} - Returns `true` if the room was removed; `false` if not found.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * casino.createRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * const success = casino.deleteRoom("HighRollers");
   * console.log(success); // true if room was found and removed, false otherwise
   * ```
   */
  public deleteRoom(roomName: string): boolean {
    const index = this._rooms.findIndex((room) => room.getName() === roomName);
    if (index !== -1) {
      const removedRoom = this._rooms.splice(index, 1)[0];
      this.emit("casino:roomRemoved", removedRoom);
      return true;
    }
    return false;
  }

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
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
   * - Calls the internal `_setRooms` method to update the private `_rooms` property securely.
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
  protected _setRoom(index: number, room: PokerRoomInterface): boolean {
    assert(
      index < this.getRooms().length,
      new Error(`Casino: Rooms can't be an empty array`)
    );
    this._rooms[index] = room;
    return true;
  }

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
   * This protected method allows subclasses of `Casino` to modify the entire `_rooms` property, which can be used
   * when needing to replace or reset the Casino's room list.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `rooms`: An array of `PokerRoomInterface` instances representing the new rooms for the Casino.
   *
   * #### Requirements
   * - `rooms` array should contain at least one room (`rooms.length >= 1`).
   *
   * #### Returns
   * - `boolean` - Returns `true` if the rooms were successfully updated.
   *
   * #### Usage
   * Used in scenarios where the Casino requires a complete reset or update of its managed rooms list.
   * As a protected method, it is accessible to subclasses of `Casino`.
   *
   * @param {PokerRoomInterface[]} rooms - Array of new rooms to set in the Casino.
   * @returns {boolean} - Confirmation of successful rooms update.
   *
   * @example
   * ```typescript
   * // Usage in a subclass
   * class ExtendedCasino extends Casino {
   *   public resetRooms(newRooms: PokerRoomInterface[]): boolean {
   *     return this._setRooms(newRooms);
   *   }
   * }
   * const extendedCasino = new ExtendedCasino();
   * const rooms = [new PokerRoom({ name: "VIP", tableSize: 8, smallBlind: 50, bigBlind: 100 })];
   * extendedCasino.resetRooms(rooms); // Resets the Casino's rooms list
   * ```
   */
  protected _setRooms(rooms: PokerRoomInterface[]): boolean {
    assert(
      rooms.length >= 1,
      new Error(`Casino: Rooms can't be an empty array`)
    );
    this._rooms = rooms;
    return true;
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
   * - Emits a `casino:roomCreated` event upon successful room creation, enabling event-driven responses
   *   within other components or parts of the application.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - `PokerRoomInterface` - Returns the newly created `PokerRoom` instance.
   *
   * #### Usage
   * Primarily used within subclasses or by protected methods to create rooms in response to certain conditions
   * or actions within the Casino.
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
  protected _createRoom(config: PokerRoomConfig): PokerRoomInterface {
    const room = new PokerRoom(config);
    this._rooms.push(room);
    this.emit("casino:roomCreated", room);
    return room;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/
}

export { Casino };
