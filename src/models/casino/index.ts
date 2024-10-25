import { EventEmitter } from "events";
import {
  CasinoInterface,
  PokerRoomConfig,
  PokerRoomInterface,
} from "../../interfaces";
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
 * #### Event Emission
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
    super(); // Call the parent class constructor from EventEmitter
    this._rooms = []; // Initialize the list of rooms as an empty array
    this.init(); // Perform any additional initialization logic
  }

  /**
   * @private
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
   * @method `setRooms`
   * @public
   * Sets the list of rooms managed by the Casino. This method is typically used to replace or update
   * the entire list of poker rooms in the casino.
   *
   * #### Usage
   * - Accepts an array of `PokerRoomInterface` objects, which represent individual poker rooms in the casino.
   * - Replaces the existing rooms in the casino with the provided list.
   * - Calls the internal method `_setRooms` to actually update the private `_rooms` property.
   *
   * @param {PokerRoomInterface[]} rooms - The new list of poker rooms to be managed by the Casino.
   * @returns {boolean} - Returns `true` when the rooms have been successfully set.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const rooms: PokerRoomInterface[] = [new PokerRoom({name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20})];
   * casino.setRooms(rooms);
   * console.log(casino.getRooms()); // Logs an array with the newly set rooms
   * ```
   */
  public setRooms(rooms: PokerRoomInterface[]): boolean {
    return this._setRooms(rooms);
  }

  /**
   * @method `createRoom`
   * @public
   * Creates a new PokerRoom in the Casino and adds it to the list of rooms.
   *
   * #### Event Emission
   * - This method emits a custom event `casino:roomCreated` once the room has been successfully added.
   * - Event listeners can be used to respond to room creation, such as logging or notifying users.
   *
   * @param {PokerRoomConfig} config - A configuration object that contains details like the name, table size, small blind, and big blind for the new room.
   * @returns {PokerRoomInterface} - Returns the newly created PokerRoom instance.
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
   * @method `getRooms`
   * @public
   * Retrieves the full list of rooms currently managed by the Casino.
   *
   * #### Purpose
   * - This method provides external access to view all the poker rooms (`PokerRoomInterface[]`) stored in the casino.
   *
   * @returns {PokerRoomInterface[]} - Returns an array of all the `PokerRoom` objects in the casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  public getRooms(): PokerRoomInterface[] {
    return this._rooms;
  }

  /**
   * `getRoomAt`
   * @public
   * Returns the list of rooms managed by the Casino.
   *
   * @returns {PokerRoomInterface} - Returns the PokerRoom at `index`.
   * @example
   * const rooms = casino.getRooms();
   */
  public getRoomAt(index: number): PokerRoomInterface {
    return this._rooms[index];
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * `getRoomAt`
   * @public
   * Returns the list of rooms managed by the Casino.
   *
   * @returns {PokerRoomInterface} - Returns the PokerRoom at `index`.
   * @example
   * const rooms = casino.getRooms();
   */
  public addRoom(room: PokerRoomInterface): boolean {
    this._rooms.push(room);
    return true;
  }

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**
   * `removeRoom`: Removes a PokerRoom from the Casino.
   * Emits a `casino:roomRemoved` event when the room is successfully removed.
   *
   * @param {string} roomName - The name of the PokerRoom to remove.
   * @returns {boolean} - Returns true if the room was successfully removed, false otherwise.
   *
   * @example
   * const success = casino.removeRoom("HighRollers");
   * console.log(success); // true or false
   */
  public removeRoom(roomName: string): boolean {
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

  /**
   * `listRooms`
   * @public
   * Lists all active PokerRooms in the Casino.
   * Emits a `casino:roomsListed` event when the list is retrieved.
   *
   * @returns {PokerRoomInterface[]} - Returns an array of all PokerRooms.
   *
   * @example
   * const rooms = casino.listRooms();
   * console.log(rooms); // [PokerRoom1, PokerRoom2]
   */
  public listRooms(): PokerRoomInterface[] {
    // this.emit("casino:roomsListed", this._rooms);
    return this.getRooms();
  }

  /**
   * `findRoom`
   * @public
   * Searches for an existing room by its name.
   * Emits a `casino:roomSearched` event when the search is performed.
   *
   * @param {string} roomName - The name of the PokerRoom to find.
   * @returns {PokerRoomInterface | undefined} - Returns the PokerRoom if found, otherwise undefined.
   *
   * @example
   * const room = casino.findRoom("HighRollers");
   */
  public findRoom(roomName: string): PokerRoomInterface | undefined {
    const room = this._rooms.find((room) => room.getName() === roomName);
    this.emit("casino:roomSearched", room);
    return room;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**
   * `_setRooms`
   * Sets the poker table's `id`.
   * @returns {boolean} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  protected _setRooms(rooms: PokerRoomInterface[]): boolean {
    this._rooms = rooms;
    return true;
  }

  /**
   * `createRoom`
   *
   * Creates a new PokerRoom and adds it to the casino's list of rooms.
   * Emits a `casino:roomCreated` event when the room is successfully created.
   *
   * @param {PokerRoomConfig} config - The name of the PokerRoom to create.
   * @returns {PokerRoomInterface} - Returns the newly created PokerRoom.
   *
   * @example
   * const room = casino.createRoom("HighRollers", 6, 10, 20);
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
