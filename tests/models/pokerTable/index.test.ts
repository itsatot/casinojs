import { PokerTable } from "../../../src/models/pokerTable";
import { PokerSeat } from "../../../src/models/pokerSeat";
import { PokerPlayer } from "../../../src/models/pokerPlayer";
import { PokerSeatRoles } from "../../../src/enums";
import { PokerPlayerInterface } from "../../../src/interfaces";

describe("PokerTable Class", () => {
  let pokerTable: PokerTable;

  beforeEach(() => {
    pokerTable = new PokerTable({
      id: "table-1",
      name: "Test Table",
      smallBlind: 10,
      size: 5,
    });
  });

  // Test Constructor and Initialization
  it("should initialize the table with correct properties", () => {
    expect(pokerTable.getId()).toBe("table-1");
    expect(pokerTable.getName()).toBe("Test Table");
    expect(pokerTable.getSmallBlind()).toBe(10);
    expect(pokerTable.getBigBlind()).toBe(20); // SmallBlind * BIG_BLIND_MULTIPLIER
    expect(pokerTable.getSeats().length).toBe(5);
  });

  // Test Setting Table Name
  it("should set the table name correctly", () => {
    pokerTable.setName("New Table Name");
    expect(pokerTable.getName()).toBe("New Table Name");
  });

  // Test Blinds Update
  it("should update smallBlind and bigBlind correctly", () => {
    pokerTable.updateBlinds(15);
    expect(pokerTable.getSmallBlind()).toBe(15);
    expect(pokerTable.getBigBlind()).toBe(30);
  });

  it("should throw an error when updating blinds with a non-positive value", () => {
    expect(() => pokerTable.updateBlinds(0)).toThrow(
      "Small blind must be a positive finite number."
    );
  });

  // Test Role Assignment
  it("should not assign roles if less than 2 players are seated", () => {
    const seats = pokerTable.getSeats();;
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });

    seats[0].occupy(player1); // Only one player occupies a seat
    pokerTable.assignRoles();

    expect(seats[0].getRoles()).not.toContain(PokerSeatRoles.DEALER);
    expect(seats[0].getRoles()).not.toContain(PokerSeatRoles.SMALLBLIND);
    expect(seats[0].getRoles()).not.toContain(PokerSeatRoles.BIGBLIND);
  });

  it("should assign roles correctly for exactly 2 players", () => {
    const seats = pokerTable.getSeats();;
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });
    const player2 = new PokerPlayer({ id: "p2", name: "Player 2" });

    seats[0].occupy(player1);
    seats[2].occupy(player2);

    pokerTable.assignRoles();

    expect(seats[0].getRoles()).toContain(PokerSeatRoles.DEALER);
    expect(seats[2].getRoles()).toContain(PokerSeatRoles.SMALLBLIND);
    expect(seats[0].getRoles()).toContain(PokerSeatRoles.BIGBLIND); // Dealer also takes Big Blind
  });

  it("should assign roles correctly for 3 players in sequential seats", () => {
    const seats = pokerTable.getSeats();;
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });
    const player2 = new PokerPlayer({ id: "p2", name: "Player 2" });
    const player3 = new PokerPlayer({ id: "p3", name: "Player 3" });

    seats[0].occupy(player1);
    seats[1].occupy(player2);
    seats[2].occupy(player3);

    pokerTable.assignRoles();

    expect(seats[0].getRoles()).toContain(PokerSeatRoles.DEALER);
    expect(seats[1].getRoles()).toContain(PokerSeatRoles.SMALLBLIND);
    expect(seats[2].getRoles()).toContain(PokerSeatRoles.BIGBLIND);
  });

  it("should assign roles correctly for 3 players in non-sequential seats", () => {
    const seats = pokerTable.getSeats();;
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });
    const player2 = new PokerPlayer({ id: "p2", name: "Player 2" });
    const player3 = new PokerPlayer({ id: "p3", name: "Player 3" });

    seats[3].occupy(player1);
    seats[1].occupy(player2);
    seats[4].occupy(player3);

    pokerTable.assignRoles();

    expect(seats[1].getRoles()).toContain(PokerSeatRoles.DEALER); // First occupied seat is Seat 1
    expect(seats[3].getRoles()).toContain(PokerSeatRoles.SMALLBLIND);
    expect(seats[4].getRoles()).toContain(PokerSeatRoles.BIGBLIND);
  });

 

  // Test Occupancy Count
  it("should return the correct occupancy count", () => {
    const seats = pokerTable.getSeats();
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });
    const player2 = new PokerPlayer({ id: "p2", name: "Player 2" });
    seats[0].occupy(player1);
    seats[1].occupy(player2);

    expect(pokerTable.occupancyCount()).toBe(2);
  });

  // Test Player Balance Validation
  it("should validate player balances correctly", () => {
    const seats = pokerTable.getSeats();
    seats[0].occupy({
      getId: () => "player1",
      getChips: () => 50,
    } as PokerPlayerInterface);

    seats[1].occupy({
      getId: () => "player2",
      getChips: () => 5,
    } as PokerPlayerInterface);

    const event = {
      id: "event-1",
      name: "ValidateBalances",
      createdAt: new Date(),
      source: "PokerTable",
      data: {},
    };

    const isValid = pokerTable["__validatePlayerBalances"](event, () => {});
    expect(isValid).toBe(false); // Player 2 has insufficient chips
  });

  // Test Seat Initialization
  it("should initialize seats correctly", () => {
    const seats = pokerTable.getSeats();
    expect(seats.length).toBe(5);
    seats.forEach((seat, index) => {
      expect(seat.getPosition()).toBe(index);
    });
  });

  // Test Seat Management
  it("should occupy and vacate seats correctly", () => {
    const seats = pokerTable.getSeats();
    const player = new PokerPlayer({ id: "p1", name: "Player 1" });

    seats[0].occupy(player);
    expect(seats[0].getPlayer()?.getId()).toBe("p1");

    seats[0].vacate();
    expect(seats[0].getPlayer()).toBeUndefined();
  });

  // Test Game Players List Creation
  it("should create the correct game players list", () => {
    const seats = pokerTable.getSeats();
    const player1 = new PokerPlayer({ id: "p1", name: "Player 1" });
    const player2 = new PokerPlayer({ id: "p2", name: "Player 2" });
    const player3 = new PokerPlayer({ id: "p3", name: "Player 3" });

    seats[0].occupy(player1);
    seats[1].occupy(player2);
    seats[2].occupy(player3);

    seats[0].addRole(PokerSeatRoles.DEALER);

    const event = {
      id: "event-1",
      name: "ValidateBalances",
      createdAt: new Date(),
      source: "PokerTable",
      data: {},
    };

    const players = pokerTable["__createGamePlayersList"](event, () => {});
    expect(players.length).toBe(3);
    expect(players[0].getId()).toBe("p1");
    expect(players[1].getId()).toBe("p2");
    expect(players[2].getId()).toBe("p3");
  });
});
