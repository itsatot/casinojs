import { PokerSeat } from "../../../src/models/pokerSeat";
import { PokerPlayerInterface, PokerSeatConfig } from "../../../src/interfaces";

describe("PokerSeat Class", () => {
  let playerMock: PokerPlayerInterface;
  let config: PokerSeatConfig;

  beforeEach(() => {
    playerMock = {
      getId: jest.fn(() => "player1"),
    } as unknown as PokerPlayerInterface;

    config = {
      id: "seat1",
      position: 1,
      isDealer: false,
      player: undefined,
    };
  });

  // Constructor and Initialization
  describe("Constructor", () => {
    it("should initialize with valid config", () => {
      const seat = new PokerSeat(config);
      expect(seat.getId()).toBe(config.id);
      expect(seat.getPosition()).toBe(config.position);
      expect(seat.isDealer()).toBe(config.isDealer);
      expect(seat.isOccupied()).toBe(false);
    });

    it("should throw an error for invalid position", () => {
      config.position = -1;
      expect(() => new PokerSeat(config)).toThrow(
        "PokerSeat: Position must be a positive integer."
      );
    });

    it("should generate a unique ID if no ID is provided", () => {
      config.id = "";
      const seat = new PokerSeat(config);
      expect(seat.getId()).not.toBeNull();
    });
  });

  // Dealer Methods
  describe("Dealer Methods", () => {
    it("should correctly set dealer status", () => {
      const seat = new PokerSeat(config);
      seat.setDealer(true);
      expect(seat.isDealer()).toBe(true);
    });

    it("should reset dealer status to false", () => {
      const seat = new PokerSeat(config);
      seat.setDealer(false);
      expect(seat.isDealer()).toBe(false);
    });
  });

  // Role Management
  describe("Role Management", () => {
    it("should add a role to the seat", () => {
      const seat = new PokerSeat(config);
      seat.addRole("VIP");
      expect(seat.getRoles()).toContain("VIP");
    });

    it("should remove a role from the seat", () => {
      const seat = new PokerSeat(config);
      seat.addRole("VIP");
      seat.removeRole("VIP");
      expect(seat.getRoles()).not.toContain("VIP");
    });

    it("should not add duplicate roles", () => {
      const seat = new PokerSeat(config);
      seat.addRole("VIP");
      seat.addRole("VIP");
      expect(seat.getRoles()).toHaveLength(1);
    });
  });

  // Occupancy
  describe("Occupancy Methods", () => {
    it("should occupy the seat with a player", () => {
      const seat = new PokerSeat(config);
      seat.occupy(playerMock);
      expect(seat.isOccupied()).toBe(true);
      expect(seat.getPlayer()).toBe(playerMock);
    });

    it("should vacate the seat", () => {
      const seat = new PokerSeat(config);
      seat.occupy(playerMock);
      seat.vacate();
      expect(seat.isOccupied()).toBe(false);
      expect(seat.getPlayer()).toBeUndefined();
    });

    it("should not allow occupying an already occupied seat", () => {
      const seat = new PokerSeat(config);
      seat.occupy(playerMock);
      const loggerSpy = jest.spyOn(console, "log");
      seat.occupy(playerMock);
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining("Failed to occupy seat")
      );
    });

    it("should log a warning when vacating an already vacant seat", () => {
      const seat = new PokerSeat(config);
      const loggerSpy = jest.spyOn(console, "log");
      seat.vacate();
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining("Failed to vacate seat")
      );
    });
  });

  // Edge Cases
  describe("Edge Cases", () => {
    it("should handle multiple seat operations correctly", () => {
      const seat = new PokerSeat(config);
      seat.occupy(playerMock);
      expect(seat.isOccupied()).toBe(true);
      seat.vacate();
      expect(seat.isOccupied()).toBe(false);
      seat.occupy(playerMock);
      expect(seat.getPlayer()).toBe(playerMock);
    });

    it("should handle a seat without a player on initialization", () => {
      config.player = undefined;
      const seat = new PokerSeat(config);
      expect(seat.isOccupied()).toBe(false);
      expect(seat.getPlayer()).toBeUndefined();
    });

    it("should not allow invalid roles (empty strings)", () => {
      const seat = new PokerSeat(config);
      seat.addRole("");
      expect(seat.getRoles()).not.toContain("");
    });
  });
});
