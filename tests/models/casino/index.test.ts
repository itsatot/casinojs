// Import necessary modules and classes
import { Casino } from "../../../src/models/casino";
import { PokerRoom } from "../../../src/models/pokerRoom";
import { PokerRoomConfig } from "../../../src/interfaces/pokerRoom";
import { PokerTableConfig } from "../../../src/interfaces/pokerTable";

describe("Casino Class Tests", () => {
  let casino: Casino;

  beforeEach(() => {
    casino = new Casino();
  });

  // Tests for the `createRoom` method
  describe("createRoom", () => {
    test("should create a new poker room with valid configurations", () => {
      /**
       * Test Description:
       * Verifies that the `createRoom` method successfully creates a new room with valid configurations.
       * Inputs:
       * - Valid `PokerRoomConfig` with table configurations.
       * Expected Output:
       * - Room is created with the specified name and table configurations.
       */
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
      /**
       * Test Description:
       * Ensures that an error is thrown if the room name is missing in the `PokerRoomConfig`.
       * Inputs:
       * - `PokerRoomConfig` without a `name` property.
       * Expected Output:
       * - Error message indicating missing room name.
       */
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
      /**
       * Test Description:
       * Ensures that an error is thrown when attempting to create a room with a duplicate name.
       * Inputs:
       * - `PokerRoomConfig` with a duplicate `name`.
       * Expected Output:
       * - Error message indicating the duplicate room name.
       */
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

  // Tests for the `getRoomByName` method
  describe("getRoomByName", () => {
    test("should retrieve a room by its name", () => {
      /**
       * Test Description:
       * Verifies that `getRoomByName` successfully retrieves a room by its name.
       * Inputs:
       * - Room name to search for.
       * Expected Output:
       * - The `PokerRoom` instance with the specified name.
       */
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
      /**
       * Test Description:
       * Ensures that `getRoomByName` returns `undefined` if the specified room name does not exist.
       * Inputs:
       * - Non-existent room name.
       * Expected Output:
       * - `undefined`.
       */
      const room = casino.getRoomByName("Nonexistent Room");
      expect(room).toBeUndefined();
    });
  });

  // Tests for the `addRoom` method
  describe("addRoom", () => {
    test("should add a new room to the casino", () => {
      /**
       * Test Description:
       * Verifies that `addRoom` successfully adds a new room to the casino.
       * Inputs:
       * - A valid `PokerRoom` instance.
       * Expected Output:
       * - Room is added to the casino's list.
       */
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

  // Tests for the `deleteRoom` method
  describe("deleteRoom", () => {
    test("should delete a room by index", () => {
      /**
       * Test Description:
       * Verifies that `deleteRoom` successfully removes a room by its index.
       * Inputs:
       * - Index of the room to delete.
       * Expected Output:
       * - The room is removed, and the rooms list is updated.
       */
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
  });

  // Tests for the `roomCount` method
  describe("roomCount", () => {
    test("should return the number of rooms in the casino", () => {
      /**
       * Test Description:
       * Ensures that `roomCount` correctly returns the number of rooms in the casino.
       * Inputs:
       * - Two created rooms.
       * Expected Output:
       * - Room count equals the number of created rooms.
       */
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

  // Tests for the `isValidIndex` method
  describe("isValidIndex", () => {
    test("should return true for a valid index", () => {
      /**
       * Test Description:
       * Ensures that `isValidIndex` returns true for a valid index within bounds.
       * Inputs:
       * - A valid index.
       * Expected Output:
       * - `true`.
       */
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
      /**
       * Test Description:
       * Ensures that `isValidIndex` throws an error for an invalid index.
       * Inputs:
       * - An out-of-bounds index.
       * Expected Output:
       * - Error indicating the invalid index.
       */
      expect(() => casino.isValidIndex(0)).toThrow(
        "Invalid index: 0. It must be between 0 and -1."
      );
    });
  });
});
