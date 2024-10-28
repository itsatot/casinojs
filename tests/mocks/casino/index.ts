import { EventEmitter } from "events";
import {
  CasinoInterface,
  PokerRoomInterface,
  PokerRoomConfig,
} from "../../../src/interfaces";
import { MockPokerRoom } from "../pokerRoom";

/**
 * @class `MockCasino`
 * A mock implementation of `CasinoInterface` used in testing, implementing all required methods for compliance.
 *
 * @implements {CasinoInterface}
 */
class MockCasino extends EventEmitter implements CasinoInterface {
  private rooms: PokerRoomInterface[] = [];

  setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    this.rooms = rooms;
    return this.rooms;
  }

  createRoom(config: PokerRoomConfig): PokerRoomInterface {
    const newRoom = new MockPokerRoom(config);
    this.rooms.push(newRoom);
    this.emit("casino:roomCreated", newRoom);
    return newRoom;
  }

  getRoom(index: number): PokerRoomInterface | undefined {
    return this.rooms[index];
  }

  getRooms(): PokerRoomInterface[] {
    return this.rooms;
  }

  addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
    this.rooms.push(room);
    return this.rooms;
  }

  addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
    this.rooms.push(...rooms);
    return this.rooms;
  }

  deleteRoom(index: number): PokerRoomInterface[] {
    this.rooms.splice(index, 1);
    return this.rooms;
  }

  roomCount(): number {
    return this.rooms.length;
  }

  isValidIndex(index: number): boolean {
    if (index < 0 || index >= this.roomCount()) {
      throw new Error(`Invalid index: ${index}`);
    }
    return true;
  }
}

export { MockCasino };
