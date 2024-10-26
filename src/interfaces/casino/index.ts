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
   * @method `deleteRoom`
   * Removes a PokerRoom from the Casino.
   * Emits a `casino:roomRemoved` event when the room is successfully removed.
   *
   * @param {string} roomName - The name of the PokerRoom to remove.
   * @returns {boolean} - Returns true if the room was successfully removed, false otherwise.
   * @emits `casino:roomRemoved`
   *
   * @example
   * const success = casino.deleteRoom("HighRollers");
   * console.log(success); // true or false
   */
  deleteRoom(roomName: string): boolean;
}

export { CasinoInterface };
