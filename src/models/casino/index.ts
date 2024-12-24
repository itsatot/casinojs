//collapse

// Import Enums
import { CasinoEvents, Source } from "../../enums";

// Import Interfaces
import {
  CasinoInterface,
  PokerRoomConfig,
  PokerRoomInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { PokerRoom } from "../pokerRoom";

/**
 * @class `Casino`
 * Represents a Casino environment that manages multiple poker rooms (`PokerRooms`).
 * This class handles operations related to room creation, listing, removal, and searching.
 *
 * Full method documentation: [Casino Documentation](../../documents/models/casino/README)
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
   * Sets the complete list of `PokerRoom` instances managed by the Casino.
   * Full method documentation: [setRooms Documentation](../../documents/models/casino/methods/setRooms/README)
   *
   * @param {PokerRoomInterface[]} rooms - An array of `PokerRoom` instances to set as the Casino's room list.
   * @returns {PokerRoomInterface[]} - Returns the updated list of rooms.
   */
  public setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    if (!Array.isArray(rooms) || rooms.some((room) => !room)) {
      throw new Error(
        "Invalid input: rooms must be a non-empty array of PokerRoomInterface."
      );
    }
    return this._setRooms(rooms);
  }

  /**
   * Creates a new `PokerRoom` within the Casino and adds it to the list of rooms.
   * Full method documentation: [createRoom Documentation](../../documents/models/casino/methods/createRoom/README)
   *
   *
   * @param {PokerRoomConfig} config - A configuration object with properties like the room name, table size, small blind, and big blind values.
   * @returns {PokerRoomInterface} - Returns the newly created `PokerRoom` instance.
   */
  public createRoom(config: PokerRoomConfig): PokerRoomInterface {
    return this._createRoom(config);
  }

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * Retrieves a specific `PokerRoom` by its index.
   * Full method documentation: [getRoom Documentation](../../documents/models/casino/methods/getRoom/README)
   *
   * @param {number} index - The index of the room to retrieve.
   * @returns {PokerRoomInterface} - The `PokerRoom` instance at the specified index.
   */
  public getRoom(index: number): PokerRoomInterface {
    return this.__rooms[index];
  }

  /**
   * Retrieves all the `PokerRoom` instances managed by the Casino.
   * Full method documentation: [getRooms Documentation](../../documents/models/casino/methods/getRooms/README)
   *
   * @returns {PokerRoomInterface[]} - An array of all `PokerRoom` instances.
   */
  public getRooms(): PokerRoomInterface[] {
    return this.__rooms;
  }

  /**
   * Retrieves a `PokerRoom` by its name.
   * Full method documentation: [getRoomByName Documentation](../../documents/models/casino/methods/getRoomByName/README)
   *
   * @param {string} name - The name of the room to find.
   * @returns {PokerRoomInterface | undefined} - The `PokerRoom` instance or `undefined` if not found.
   */
  public getRoomByName(name: string): PokerRoomInterface | undefined {
    return this.__rooms.find((room) => room.getName() === name);
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * Adds a single `PokerRoom` to the Casino's list of rooms.
   * Full method documentation: [addRoom Documentation](../../documents/models/casino/methods/addRoom/README)
   *
   * @param {PokerRoomInterface} room - The `PokerRoom` instance to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
   */
  public addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
    return this._addRoom(room);
  }

  /**
   * Adds multiple `PokerRoom` instances to the Casino's list of rooms.
   * Full method documentation: [addRooms Documentation](../../documents/models/casino/methods/addRooms/README)
   *
   * @param {PokerRoomInterface[]} rooms - An array of `PokerRoom` instances to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
   */
  public addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    return this._addRooms(rooms);
  }

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**
   * Deletes a `PokerRoom` by its index.
   * Full method documentation: [deleteRoom Documentation](../../documents/models/casino/methods/deleteRoom/README)
   *
   * @param {number} index - The index of the room to delete.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
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
   * Returns the total count of `PokerRoom` instances managed by the Casino.
   * Full method documentation: [roomCount Documentation](../../documents/models/casino/methods/roomCount/README)
   *
   * @returns {number} - The count of rooms in the Casino.
   */
  public roomCount(): number {
    return this.getRooms().length;
  }

  /**
   * Validates whether the provided index is within the bounds of the room list.
   * Full method documentation: [isValidIndex Documentation](../../documents/models/casino/methods/isValidIndex/README)
   *
   * @param {number} index - The index to validate.
   * @returns {boolean} - Returns `true` if the index is valid.
   * @throws {Error} - Throws an error if the index is out of bounds.
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
   * Sets the complete list of `PokerRoom` instances managed by the Casino.
   * Full method documentation: [setRooms Documentation](../../documents/models/casino/methods/setRooms/README)
   *
   * @param {PokerRoomInterface[]} rooms - An array of `PokerRoom` instances to set as the Casino's room list.
   * @returns {PokerRoomInterface[]} - Returns the updated list of rooms.
   */
  protected _setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    this.__rooms = rooms;
    this.emit(CasinoEvents.ROOMS_SET, this.getRooms());
    return this.getRooms();
  }

  /**
   * Creates a new `PokerRoom` within the Casino and adds it to the list of rooms.
   * Full method documentation: [createRoom Documentation](../../documents/models/casino/methods/createRoom/README)
   *
   *
   * @param {PokerRoomConfig} config - A configuration object with properties like the room name, table size, small blind, and big blind values.
   * @returns {PokerRoomInterface} - Returns the newly created `PokerRoom` instance.
   */
  protected _createRoom(config: PokerRoomConfig): PokerRoomInterface {
    // Validate the input config
    if (!config || typeof config.name !== "string") {
      throw new Error(
        "Invalid room configuration: 'name' is required and must be a string."
      );
    }

    // Check for duplicate room names
    if (this.__rooms.some((room) => room.getName() === config.name)) {
      throw new Error(`A room with the name '${config.name}' already exists.`);
    }

    // Create and add the new room
    const room = new PokerRoom(config);
    this.__rooms.push(room);
    this.emit(CasinoEvents.ROOM_CREATED, room);

    return room;
  }

  /**
   * Adds a single `PokerRoom` to the Casino's list of rooms.
   * Full method documentation: [addRoom Documentation](../../documents/models/casino/methods/addRoom/README)
   *
   * @param {PokerRoomInterface} room - The `PokerRoom` instance to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
   */
  protected _addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
    this.__rooms.push(room);
    this.emit(CasinoEvents.ROOM_ADDED, this.getRooms());
    return this.getRooms();
  }

  /**
   * Adds multiple `PokerRoom` instances to the Casino's list of rooms.
   * Full method documentation: [addRooms Documentation](../../documents/models/casino/methods/addRooms/README)
   *
   * @param {PokerRoomInterface[]} rooms - An array of `PokerRoom` instances to add.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
   */
  protected _addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    rooms.forEach((room) => {
      this._addRoom(room);
    });
    return this.getRooms();
  }

  /**
   * Deletes a `PokerRoom` by its index.
   * Full method documentation: [deleteRoom Documentation](../../documents/models/casino/methods/deleteRoom/README)
   *
   * @param {number} index - The index of the room to delete.
   * @returns {PokerRoomInterface[]} - The updated list of rooms.
   */
  protected _deleteRoom(index: number): PokerRoomInterface[] {
    try {
      this.isValidIndex(index);
      this.__rooms.splice(index, 1);
      this.emit(CasinoEvents.ROOM_DELETED, this.getRooms());
    } catch (error) {
      const err = error as Error; // Explicitly cast
      console.error(`Failed to delete room: ${err.message}`);
    }
    return this.getRooms();
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/
}

export { Casino };
