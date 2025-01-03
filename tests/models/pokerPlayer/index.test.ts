import { PokerPlayer } from "../../../src/models/pokerPlayer";
import { CardInterface, PokerPlayerConfig } from "../../../src/interfaces";
import { Rank, Suit } from "../../../src/enums";

describe("PokerPlayer Class", () => {
  const mockCard: CardInterface = {
    getRank: jest.fn(() => Rank.Ace),
    getSuit: jest.fn(() => Suit.Hearts),
    toString: jest.fn(() => "A of Hearts"),
    toObj: jest.fn(() => ({ rank: Rank.Ace, suit: Suit.Hearts })),
  };

  /**************************************************************************************************************
   * INITIALIZATION TESTS
   **************************************************************************************************************/

  it("should initialize with default values if no config is provided", () => {
    const player = new PokerPlayer();

    expect(player.getId()).toHaveLength(32);;
    expect(player.getName()).toBe("Player 1");
    expect(player.getChips()).toBe(100);
    expect(player.getHand()).toEqual([]);
    expect(player.isFolded()).toBe(false);
    expect(player.isBetMatched()).toBe(false);
  });

  it("should initialize with provided config values", () => {
    const config: PokerPlayerConfig = {
      id: "player1",
      name: "John",
      chips: 200,
      hand: [mockCard],
        isFolded: true,
    };
    const player = new PokerPlayer(config);

    expect(player.getId()).toBe("player1");
    expect(player.getName()).toBe("John");
    expect(player.getChips()).toBe(200);
    expect(player.getHand()).toEqual([mockCard]);
    expect(player.isFolded()).toBe(true);
    // expect(player.isBetMatched()).toBe(true);
  });

  /**************************************************************************************************************
   * SETTER TESTS
   **************************************************************************************************************/

  it("should allow setting the name", () => {
    const player = new PokerPlayer();
    player.setName("Alice");

    expect(player.getName()).toBe("Alice");
  });

  it("should throw an error for negative chips", () => {
    const player = new PokerPlayer();
    expect(() => player.setChips(-10)).toThrow("Chips cannot be negative.");
  });

  /**************************************************************************************************************
   * BUSINESS LOGIC TESTS
   **************************************************************************************************************/

  it("should allow a valid bet", () => {
    const player = new PokerPlayer({ chips: 100 });
    player.bet(50);

    expect(player.getChips()).toBe(50);
  });

  it("should throw an error for betting more than available chips", () => {
    const player = new PokerPlayer({ chips: 50 });
    expect(() => player.bet(100)).toThrow("Insufficient chips.");
  });

  it("should handle adding cards to the hand", () => {
    const player = new PokerPlayer();
    player.addToHand(mockCard);

    expect(player.getHand()).toEqual([mockCard]);
  });

  /**************************************************************************************************************
   * EDGE CASE TESTS
   **************************************************************************************************************/

  it("should handle zero chips in initialization", () => {
    const player = new PokerPlayer({ chips: 0 });
    expect(player.getChips()).toBe(0);
  });


  it("should handle floating-point chips and bets", () => {
    const player = new PokerPlayer({ chips: 100.5 });
    player.bet(50.5);

    expect(player.getChips()).toBe(50);
  });
});
