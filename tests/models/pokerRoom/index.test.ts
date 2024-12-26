import { PokerRoom } from "../path/to/PokerRoom";
import { PokerTable } from "../path/to/PokerTable";
import { generateUniqueId } from "../path/to/utils";

jest.mock("../path/to/PokerTable"); // Mocking PokerTable for isolated tests
jest.mock("../path/to/utils", () => ({
  generateUniqueId: jest.fn(),
}));

describe("PokerRoom Class", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with default values", () => {
    const room = new PokerRoom();
    expect(room.getId()).toBeNull();
    expect(room.getName()).toBe("Unnamed Room");
    expect(room.getTables()).toEqual([]);
  });

  test("should initialize with provided configuration", () => {
    const config = {
      id: "room123",
      name: "Test Room",
      tableConfigs: [{ id: "table1" }, { id: "table2" }],
    };
    const room = new PokerRoom(config);

    expect(room.getId()).toBe("room123");
    expect(room.getName()).toBe("Test Room");
    expect(room.getTables().length).toBe(2);
  });

  test("should set room name", () => {
    const room = new PokerRoom();
    room.setName("New Room");
    expect(room.getName()).toBe("New Room");
  });

  test("should throw error for empty room name", () => {
    const room = new PokerRoom();
    expect(() => room.setName("")).toThrow("Name cannot be empty.");
  });

  test("should add tables using setTables", () => {
    const mockTables = [{}, {}];
    const room = new PokerRoom();
    room.setTables(mockTables);
    expect(room.getTables()).toEqual(mockTables);
  });

  test("should throw error for invalid tables in setTables", () => {
    const room = new PokerRoom();
    expect(() => room.setTables(null)).toThrow("Tables must be an array.");
  });

  test("should create a new table", () => {
    const mockConfig = { id: "table1" };
    const room = new PokerRoom();
    const table = room.createTable(mockConfig);

    expect(room.getTables().length).toBe(1);
    expect(table).toBeInstanceOf(PokerTable);
  });

  test("should throw error for invalid table configuration", () => {
    const room = new PokerRoom();
    expect(() => room.createTable(null)).toThrow(
      "Invalid table configuration."
    );
  });

  test("should find table by ID", () => {
    const mockTable = { getId: jest.fn().mockReturnValue("table1") };
    const room = new PokerRoom();
    room.setTables([mockTable]);

    const foundTable = room
      .getTables()
      .find((table) => table.getId() === "table1");
    expect(foundTable).toBe(mockTable);
  });

  test("should return null if table ID not found", () => {
    const room = new PokerRoom();
    const table = room.findTableById("unknown");
    expect(table).toBeNull();
  });

  test("should delete a table by index", () => {
    const mockTable = { getId: jest.fn().mockReturnValue("table1") };
    const room = new PokerRoom();
    room.setTables([mockTable]);

    room.deleteTable(0);

    expect(room.getTables().length).toBe(0);
  });

  test("should throw error for invalid table index on delete", () => {
    const room = new PokerRoom();
    expect(() => room.deleteTable(0)).toThrow(
      "Invalid index: 0. It must be between 0 and -1."
    );
  });

  test("should return the number of tables", () => {
    const room = new PokerRoom();
    expect(room.tableCount()).toBe(0);

    room.setTables([{}, {}]);
    expect(room.tableCount()).toBe(2);
  });

  test("should validate index correctly", () => {
    const room = new PokerRoom();
    room.setTables([{}, {}]);

    expect(room.isValidIndex(0)).toBe(true);
    expect(() => room.isValidIndex(2)).toThrow(
      "Invalid index: 2. It must be between 0 and 1."
    );
  });
});
