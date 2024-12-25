//collapse

import { BaseEventEmitterInterface } from "../_base";
import { PokerRoomConfig, PokerRoomInterface } from "../pokerRoom";

/**
 * @interface `CasinoInterface`
 * Defines the blueprint for a Casino entity responsible for managing multiple poker rooms.
 *
 * #### Purpose
 * - Serves as a structured contract to enforce consistency across Casino implementations.
 * - Provides methods for creating, retrieving, updating, and deleting poker rooms.
 * - Ensures adherence to event-driven architecture via extended capabilities from `BaseEventEmitterInterface`.
 *
 * #### Usage
 * Implemented by the `Casino` class to provide an organized approach to managing poker games and rooms.
 *
 * @extends BaseEventEmitterInterface
 *
 * @example
 * ```typescript
 * const casino: CasinoInterface = new Casino();
 * const room = casino.createRoom({ name: "Main Room", tableSize: 6, smallBlind: 10, bigBlind: 20 });
 * console.log(casino.getRooms()); // Logs an array of active rooms
 * ```
 */
interface CasinoInterface extends BaseEventEmitterInterface {
  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * Replaces the current list of poker rooms in the Casino with the provided list.
   *
   * @param {PokerRoomInterface[]} rooms - Array of `PokerRoomInterface` instances to be managed by the Casino.
   * @returns {PokerRoomInterface[]} - Updated list of rooms in the Casino.
   * @throws {Error} - If the input is not a valid array of `PokerRoomInterface` objects.
   * @example
   * ```typescript
   * const rooms = [new PokerRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 })];
   * casino.setRooms(rooms);
   * ```
   */
  setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[];

  /**
   * Creates a new poker room and adds it to the Casino's list of rooms.
   *
   * @param {PokerRoomConfig} config - Configuration object containing details like name, table size, small blind, and big blind.
   * @returns {PokerRoomInterface} - The newly created `PokerRoom`.
   * @throws {Error} - If the configuration is invalid or a room with the same name already exists.
   * @example
   * ```typescript
   * const room = casino.createRoom({ name: "HighRollers", tableSize: 8, smallBlind: 50, bigBlind: 100 });
   * ```
   */
  createRoom(config: PokerRoomConfig): PokerRoomInterface;

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * Retrieves a room by its index from the Casino's list of rooms.
   *
   * @param {number} index - Zero-based index of the room to retrieve.
   * @returns {PokerRoomInterface | undefined} - The `PokerRoom` at the specified index, or `undefined` if out of bounds.
   * @throws {Error} - If the index is out of bounds.
   * @example
   * ```typescript
   * const room = casino.getRoom(0);
   * console.log(room?.getName());
   * ```
   */
  getRoom(index: number): PokerRoomInterface | undefined;

  /**
   * Retrieves all rooms currently managed by the Casino.
   *
   * @returns {PokerRoomInterface[]} - Array of active rooms.
   * @example
   * ```typescript
   * const rooms = casino.getRooms();
   * console.log(rooms);
   * ```
   */
  getRooms(): PokerRoomInterface[];

  /**
   * Retrieves a room by its name from the Casino's list of rooms.
   *
   * @param {string} name - Name of the room to find.
   * @returns {PokerRoomInterface | undefined} - The `PokerRoom` with the specified name, or `undefined` if not found.
   * @throws {Error} - If the name provided is invalid or not a string.
   * @example
   * ```typescript
   * const room = casino.getRoomByName("VIP Room");
   * console.log(room?.getName());
   * ```
   */
  getRoomByName(name: string): PokerRoomInterface | undefined;

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * Adds a new room to the Casino's list of managed rooms.
   *
   * @param {PokerRoomInterface} room - The `PokerRoom` instance to add.
   * @returns {PokerRoomInterface[]} - Updated list of rooms in the Casino.
   * @throws {Error} - If the room is invalid or already exists in the Casino.
   * @example
   * ```typescript
   * const room = new PokerRoom({ name: "New Room", tableSize: 6, smallBlind: 10, bigBlind: 20 });
   * casino.addRoom(room);
   * ```
   */
  addRoom(room: PokerRoomInterface): PokerRoomInterface[];

  /**
   * Adds multiple rooms to the Casino's list of managed rooms.
   *
   * @param {PokerRoomInterface[]} rooms - Array of `PokerRoom` instances to add.
   * @returns {PokerRoomInterface[]} - Updated list of rooms in the Casino.
   * @throws {Error} - If any room in the list is invalid or already exists in the Casino.
   * @example
   * ```typescript
   * const rooms = [new PokerRoom({ name: "Room1", tableSize: 6 }), new PokerRoom({ name: "Room2", tableSize: 8 })];
   * casino.addRooms(rooms);
   * ```
   */
  addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[];

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**
   * Deletes a room by its index from the Casino's list of rooms.
   *
   * @param {number} index - Zero-based index of the room to delete.
   * @returns {PokerRoomInterface[]} - Updated list of rooms in the Casino.
   * @throws {Error} - If the index is out of bounds.
   * @example
   * ```typescript
   * casino.deleteRoom(0);
   * ```
   */
  deleteRoom(index: number): PokerRoomInterface[];

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**
   * Retrieves the total count of rooms currently managed by the Casino.
   *
   * @returns {number} - Total count of active rooms.
   * @throws {Error} - If there is an unexpected error while counting rooms.
   * @example
   * ```typescript
   * const count = casino.roomCount();
   * console.log(count);
   * ```
   */
  roomCount(): number;

  /**
   * Validates if an index is within the bounds of the Casino's room list.
   *
   * @param {number} index - Zero-based index to validate.
   * @returns {boolean} - Returns `true` if the index is valid.
   * @throws {Error} - If the index is out of bounds.
   * @example
   * ```typescript
   * casino.isValidIndex(1); // Returns true if index 1 exists
   * ```
   */
  isValidIndex(index: number): boolean;
}

export { CasinoInterface };
