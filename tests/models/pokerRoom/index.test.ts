// Import dependencies and mock functions
import { PokerRoom } from "../../../src/models/pokerRoom";
import { PokerTable } from "../../../src/models/pokerTable";
import { PokerTableConfig, PokerTableInterface } from "../../../src/interfaces/pokerTable";
import { PokerRoomEvents } from "../../../src/enums/events/pokerRoom";
import { generateUniqueId } from "../../../src/utils/generateUniqueId";

jest.mock("../../../src/models/pokerTable", () => {
  return {
    PokerTable: jest.fn().mockImplementation((config) => ({
      getId: jest.fn(() => config.id),
      getName: jest.fn(() => config.name),
    })),
  };
});

jest.mock("../../../src/utils/generateUniqueId", () => ({
  generateUniqueId: jest.fn(() => "mocked-id"),
}));

jest.mock("../../../src/utils/logger", () => ({
  logger: {
    log: jest.fn(),
  },
}));

console.log(generateUniqueId);

describe("PokerRoom", () => {
  let pokerRoom: PokerRoom;

  beforeEach(() => {
    pokerRoom = new PokerRoom();
  });

  describe("constructor", () => {
    it("initializes with default values", () => {
      expect(pokerRoom.getId()).toBe("mocked-id");
      expect(pokerRoom.getName()).toBe("Unnamed Room");
      expect(pokerRoom.getTables()).toEqual([]);
    });

    it("initializes with provided config", () => {
      const config = {
        id: "room-1",
        name: "High Stakes Room",
        tableConfigs: [{ id: "table-1", name: "Table 1" }],
      };
      pokerRoom = new PokerRoom(config);

      expect(pokerRoom.getId()).toBe("room-1");
      expect(pokerRoom.getName()).toBe("High Stakes Room");
      expect(pokerRoom.getTables()).toHaveLength(1);
    });
  });

  describe("setName", () => {
    it("sets a valid name", () => {
      const newName = "VIP Room";
      expect(pokerRoom.setName(newName)).toBe(newName);
      expect(pokerRoom.getName()).toBe(newName);
    });

    it("throws an error when name is empty", () => {
      expect(() => pokerRoom.setName("")).toThrow("Name cannot be empty.");
    });
  });

  describe("setTables", () => {
    it("sets valid tables", () => {
      const tables = [new PokerTable({ id: "table-1" })];
      expect(pokerRoom.setTables(tables)).toEqual(tables);
    });

    it("throws an error when tables is not an array", () => {
      expect(() =>
        pokerRoom.setTables(null as unknown as PokerTableInterface[])
      ).toThrow("Tables must be an array.");
    });
  });

  describe("createTable", () => {
    it("creates and adds a new table", () => {
      const tableConfig = { id: "table-1", name: "Table 1" };
      const table = pokerRoom.createTable(tableConfig);

      expect(PokerTable).toHaveBeenCalledWith(tableConfig);
      expect(pokerRoom.getTables()).toContain(table);
    });

    it("throws an error when config is invalid", () => {
      expect(() =>
        pokerRoom.createTable(null as unknown as PokerTableConfig)
      ).toThrow("Invalid table configuration.");
    });
  });

  describe("deleteTable", () => {
    it("deletes a table by index", () => {
      const tables = [new PokerTable({ id: "table-1" })];
      pokerRoom.setTables(tables);

      pokerRoom.deleteTable(0);

      expect(pokerRoom.getTables()).toHaveLength(0);
    });

    it("throws an error for invalid index", () => {
      expect(() => pokerRoom.deleteTable(1)).toThrow("Invalid index: 1. It must be between 0 and -1.");
    });
  });

  describe("clearTables", () => {
    it("removes all tables", () => {
      pokerRoom.setTables([new PokerTable({ id: "table-1" })]);

      pokerRoom.clearTables();

      expect(pokerRoom.getTables()).toHaveLength(0);
    });
  });

  describe("findTableById", () => {
    it("finds a table by id", () => {
      const table = new PokerTable({ id: "table-1" });
      console.log(table);
      pokerRoom.setTables([table]);
      console.log(pokerRoom);
      expect(pokerRoom.findTableById("table-1")).toBe(table);
    });

    it("returns null if table not found", () => {
      expect(pokerRoom.findTableById("nonexistent")).toBe(null);
    });
  });

  describe("findTableByName", () => {
    it("finds a table by name", () => {
      const table = new PokerTable({ id: "table-1", name: "Table 1" });
      pokerRoom.setTables([table]);

      expect(pokerRoom.findTableByName("Table 1")).toBe(table);
    });

    it("returns null if table not found", () => {
      expect(pokerRoom.findTableByName("nonexistent")).toBe(null);
    });
  });

  describe("tableCount", () => {
    it("returns the number of tables", () => {
      pokerRoom.setTables([new PokerTable({ id: "table-1" })]);
      expect(pokerRoom.tableCount()).toBe(1);
    });

    it("returns zero when no tables", () => {
      expect(pokerRoom.tableCount()).toBe(0);
    });
  });

  describe("isValidIndex", () => {
    it("validates a correct index", () => {
      pokerRoom.setTables([new PokerTable({ id: "table-1" })]);
      expect(pokerRoom.isValidIndex(0)).toBe(true);
    });

    it("throws an error for an invalid index", () => {
      expect(() => pokerRoom.isValidIndex(1)).toThrow("Invalid index: 1. It must be between 0 and -1.");
    });
  });
});
