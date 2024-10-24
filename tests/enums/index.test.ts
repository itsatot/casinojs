/**
 * @file `index.test.ts`
 * This file contains unit tests for the centralized export of all poker-related enums.
 * It verifies that each enum is correctly exported and accessible, and that the values
 * within the enums are as expected.
 *
 * Enums being tested:
 * - `pokerPhaseName`: Represents different phases of a poker game (e.g., pre-flop, flop, turn, river).
 * - `rank`: Represents the ranks of playing cards (e.g., Ace, King, Queen).
 * - `suit`: Represents the suits of playing cards (e.g., Hearts, Spades).
 *
 * @example
 * // This test file ensures that you can import all enums like this:
 * import { Rank, Suit, pokerPhaseName } from './src/enums';
 *
 * @see `./src/enums/index.ts`
 */

import * as Enums from "../../src/enums";

/**
 * @testgroup Centralized Enum Exports
 * The following tests verify the correct export of enums from the centralized `index.ts` file in the enums directory.
 */

describe("Enum Centralized Exports", () => {
  /**
   * @test `pokerPhaseName` export verification
   * This test ensures that the `pokerPhaseName` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have phases like "PreFlop", "Flop", "Turn", "River"
   */
  it("should export pokerPhaseName enum with correct values", () => {
    const { PokerPhaseName } = Enums;

    // Expected phases in the poker game
    expect(PokerPhaseName.PRE_FLOP).toBe("Pre-Flop");
    expect(PokerPhaseName.FLOP).toBe("Flop");
    expect(PokerPhaseName.TURN).toBe("Turn");
    expect(PokerPhaseName.RIVER).toBe("River");
    expect(PokerPhaseName.SHOWDOWN).toBe("ShowDown");
  });

  /**
   * @test `rank` export verification
   * This test ensures that the `rank` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have ranks like "Ace", "King", "Queen", "Jack"
   */
  it("should export rank enum with correct values", () => {
    const { Rank } = Enums;

    // Expected card ranks
    expect(Rank.Ace).toBe("A");
    expect(Rank.King).toBe("K");
    expect(Rank.Queen).toBe("Q");
    expect(Rank.Jack).toBe("J");
  });

  /**
   * @test `suit` export verification
   * This test ensures that the `suit` enum is correctly exported from the centralized enums module.
   *
   * @example
   * // The enum should have suits like "Hearts", "Spades", "Clubs", "Diamonds"
   */
  it("should export suit enum with correct values", () => {
    const { Suit } = Enums;

    // Expected card suits
    expect(Suit.Hearts).toBe("Hearts");
    expect(Suit.Spades).toBe("Spades");
    expect(Suit.Clubs).toBe("Clubs");
    expect(Suit.Diamonds).toBe("Diamonds");
  });
});
