import { EventEmitter } from "events";
import { CasinoInterface, PokerRoomInterface } from "../../interfaces";

/**
 * @class `Casino`
 * Represents a Casino which manages multiple PokerRooms.
 * The Casino emits events related to room creation, removal, and other activities.
 *
 * Implements the `CasinoInterface` and extends `EventEmitter`.
 *
 * @example
 * const casino = new Casino();
 * casino.on('casino:roomCreated', (room) => console.log(`Room created: ${room.name}`));
 * const room = casino.createRoom("Room1", 6, 10, 20);
 */
class Casino extends EventEmitter implements CasinoInterface {
  /**
   * @property {PokerRoomInterface[]} _rooms
   * @private
   * An array of PokerRooms managed by the Casino.
   * @default []
   */
  private _rooms: PokerRoomInterface[];

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor() {
    super();
    this._rooms = [];
  }

  /**
   * @method `getRooms`
   * @public
   * Gets the list of rooms managed by the Casino.
   *
   * @returns {PokerRoomInterface[]} - Returns the array of PokerRooms.
   * @example
   * const rooms = casino.getRooms();
   */
  public getRooms(): PokerRoomInterface[] {
    return this._rooms;
  }

  /**
   * @method `createRoom`
   * @public
   * Creates a new PokerRoom and adds it to the casino's list of rooms.
   * Emits a `casino:roomCreated` event when the room is successfully created.
   *
   * @param {string} roomName - The name of the PokerRoom to create.
   * @param {number} tableSize - The number of players the PokerTable can seat.
   * @param {number} smallBlind - The small blind value for the table.
   * @param {number} bigBlind - The big blind value for the table.
   * @returns {PokerRoomInterface} - Returns the newly created PokerRoom.
   *
   * @example
   * const room = casino.createRoom("HighRollers", 6, 10, 20);
   */
  public createRoom(
    name: string,
    tableSize: number,
    smallBlind: number,
    bigBlind: number
  ): PokerRoomInterface {
    const room: PokerRoomInterface = {
      name,
      tableSize,
      smallBlind,
      bigBlind,
      // Initialize other PokerRoom properties
    };

    this._rooms.push(room);
    this.emit("casino:roomCreated", room);
    return room;
  }

  /**
   * @method `findRoom`
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
    const room = this._rooms.find((room) => room.roomName === roomName);
    this.emit("casino:roomSearched", room);
    return room;
  }

  /**
   * @method `listRooms`
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
    this.emit("casino:roomsListed", this._rooms);
    return this._rooms;
  }

  /**
   * @method `removeRoom`
   * @public
   * Removes a PokerRoom from the Casino.
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
    const index = this._rooms.findIndex((room) => room.roomName === roomName);
    if (index !== -1) {
      const removedRoom = this._rooms.splice(index, 1)[0];
      this.emit("casino:roomRemoved", removedRoom);
      return true;
    }
    return false;
  }
}

export { Casino };
