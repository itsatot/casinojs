//collapse

import { Casino } from "../../../src/models/casino";
import { PokerRoom } from "../../../src/models/pokerRoom";
import { PokerRoomConfig } from "../../../src/interfaces/pokerRoom";
import { PokerTableConfig } from "../../../src/interfaces/pokerTable";

// jest.mock("../../../node_modules@types/nodeevents.d.ts", () => {
//   return { eventEmitter: jest.fn() }; // Mock the Deck class
// });

describe("Casino Class Tests", () => {
  let casino: Casino;

  beforeEach(() => {
    casino = new Casino();
  });

  describe("createRoom", () => {
    test("should create a new poker room with valid configurations", () => {
      const tableConfig: PokerTableConfig = {
        id: "table1",
        name: "Table One",
        size: 6,
        smallBlind: 10,
      };

      const roomConfig: PokerRoomConfig = {
        id: "room1",
        name: "Main Room",
        tableConfigs: [tableConfig],
      };

      const room = casino.createRoom(roomConfig);

      expect(room.getName()).toBe("Main Room");
      expect(room.getTables()).toHaveLength(1);
      expect(room.getTables()[0].getName()).toBe("Table One");
    });

    test("should throw an error when room name is missing", () => {
      const roomConfig: PokerRoomConfig = {
        id: "room2",
        tableConfigs: [
          {
            id: "table1",
            name: "Table One",
            size: 6,
            smallBlind: 10,
          },
        ],
      };

      expect(() => casino.createRoom(roomConfig)).toThrow(
        "Invalid room configuration: 'name' is required and must be a string."
      );
    });

    test("should throw an error for duplicate room names", () => {
      const roomConfig: PokerRoomConfig = {
        id: "room1",
        name: "Duplicate Room",
        tableConfigs: [
          {
            id: "table1",
            name: "Table One",
            size: 6,
            smallBlind: 10,
          },
        ],
      };

      casino.createRoom(roomConfig);
      expect(() => casino.createRoom(roomConfig)).toThrow(
        "A room with the name 'Duplicate Room' already exists."
      );
    });
  });

  describe("getRoomByName", () => {
    test("should retrieve a room by its name", () => {
      const roomConfig: PokerRoomConfig = {
        id: "room1",
        name: "VIP Room",
        tableConfigs: [
          {
            id: "table1",
            name: "Exclusive Table",
            size: 9,
            smallBlind: 100,
          },
        ],
      };

      casino.createRoom(roomConfig);
      const room = casino.getRoomByName("VIP Room");

      expect(room?.getName()).toBe("VIP Room");
    });

    test("should return undefined for a non-existent room", () => {
      const room = casino.getRoomByName("Nonexistent Room");
      expect(room).toBeUndefined();
    });
  });

  describe("addRoom", () => {
    test("should add a new room to the casino", () => {
      const tableConfig: PokerTableConfig = {
        id: "table1",
        name: "Standard Table",
        size: 6,
        smallBlind: 10,
      };

      const room = new PokerRoom({
        id: "room2",
        name: "Regular Room",
        tableConfigs: [tableConfig],
      });

      casino.addRoom(room);
      const rooms = casino.getRooms();

      expect(rooms).toHaveLength(1);
      expect(rooms[0].getName()).toBe("Regular Room");
    });
  });

  describe("deleteRoom", () => {
    test("should delete a room by index", () => {
      const roomConfig: PokerRoomConfig = {
        id: "room1",
        name: "Temporary Room",
        tableConfigs: [
          {
            id: "table1",
            name: "Temporary Table",
            size: 6,
            smallBlind: 5,
          },
        ],
      };

      casino.createRoom(roomConfig);
      expect(casino.getRooms()).toHaveLength(1);

      casino.deleteRoom(0);
      expect(casino.getRooms()).toHaveLength(0);
    });

    test("should throw an error when deleting with invalid index", () => {
      expect(() => casino.deleteRoom(0)).toThrow(
        "Invalid index: 0. It must be between 0 and -1."
      );
    });
  });

  describe("roomCount", () => {
    test("should return the number of rooms in the casino", () => {
      const roomConfig1: PokerRoomConfig = {
        id: "room1",
        name: "Room One",
        tableConfigs: [
          {
            id: "table1",
            name: "Table One",
            size: 6,
            smallBlind: 10,
          },
        ],
      };

      const roomConfig2: PokerRoomConfig = {
        id: "room2",
        name: "Room Two",
        tableConfigs: [
          {
            id: "table2",
            name: "Table Two",
            size: 9,
            smallBlind: 20,
          },
        ],
      };

      casino.createRoom(roomConfig1);
      casino.createRoom(roomConfig2);
      expect(casino.roomCount()).toBe(2);
    });
  });

  describe("isValidIndex", () => {
    test("should return true for a valid index", () => {
      const roomConfig: PokerRoomConfig = {
        id: "room1",
        name: "Room One",
        tableConfigs: [
          {
            id: "table1",
            name: "Table One",
            size: 6,
            smallBlind: 10,
          },
        ],
      };

      casino.createRoom(roomConfig);
      expect(casino.isValidIndex(0)).toBe(true);
    });

    test("should throw an error for an invalid index", () => {
      expect(() => casino.isValidIndex(0)).toThrow(
        "Invalid index: 0. It must be between 0 and -1."
      );
    });
  });
});
