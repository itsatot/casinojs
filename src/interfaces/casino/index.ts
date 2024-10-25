import { EventEmitter } from "events";
import { PokerRoomConfig, PokerRoomInterface } from "../pokerRoom";

/**
 * @interface `CasinoInterface`
 * Extends NodeJS.EventEmitter to allow the Casino to emit events related to room creation, removal, and other activities.
 * Represents the Casino, which manages multiple PokerRooms.
 *
 * The Casino is responsible for room management, player allocations, and possibly
 * tracking ongoing games and player statistics across rooms.
 *
 * @extends NodeJS.EventEmitter
 * @example
 * const casino: CasinoInterface = new Casino();
 * const room = casino.createRoom("Room1", 6, 10, 20);
 * console.log(casino.listRooms());
 */
interface CasinoInterface extends NodeJS.EventEmitter {
  /**
   * @method `createRoom`
   * Creates a new PokerRoom and adds it to the casino's list of rooms.
   * Emits a `casino:roomCreated` event when the room is successfully created.
   *
   * @param {string} roomName - The name of the PokerRoom to create.
   * @param {number} tableSize - The number of players the PokerTable can seat (2-14).
   * @param {number} smallBlind - The small blind value for the table.
   * @param {number} bigBlind - The big blind value for the table.
   * @returns {PokerRoomInterface} - Returns the newly created PokerRoom.
   * @emits `casino:roomCreated`
   *
   * @example
   * const room = casino.createRoom("HighRollers", 6, 10, 20);
   */
  createRoom(config: PokerRoomConfig): PokerRoomInterface;

  /**
   * @method `findRoom`
   * Searches for an existing room by its name.
   * Emits a `casino:roomSearched` event when the search is performed.
   *
   * @param {string} roomName - The name of the PokerRoom to find.
   * @returns {PokerRoomInterface | undefined} - Returns the PokerRoom if found, otherwise undefined.
   * @emits `casino:roomSearched`
   *
   * @example
   * const room = casino.findRoom("HighRollers");
   */
  findRoom(roomName: string): PokerRoomInterface | undefined;

  /**
   * @method `listRooms`
   * Lists all active PokerRooms in the Casino.
   * Emits a `casino:roomsListed` event when the list is retrieved.
   *
   * @returns {PokerRoomInterface[]} - Returns an array of all PokerRooms.
   * @emits `casino:roomsListed`
   *
   * @example
   * const rooms = casino.listRooms();
   * console.log(rooms); // [PokerRoom1, PokerRoom2]
   */
  listRooms(): PokerRoomInterface[];

  /**
   * @method `removeRoom`
   * Removes a PokerRoom from the Casino.
   * Emits a `casino:roomRemoved` event when the room is successfully removed.
   *
   * @param {string} roomName - The name of the PokerRoom to remove.
   * @returns {boolean} - Returns true if the room was successfully removed, false otherwise.
   * @emits `casino:roomRemoved`
   *
   * @example
   * const success = casino.removeRoom("HighRollers");
   * console.log(success); // true or false
   */
  removeRoom(roomName: string): boolean;
}

export { CasinoInterface };
