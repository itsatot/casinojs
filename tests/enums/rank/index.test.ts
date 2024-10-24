import { Rank } from "../../../src/enums/rank";

/**
 * @file `index.test.ts`
 * This file contains the unit tests for the `Rank` enum used in a poker game.
 * The tests ensure that the `Rank` enum has the correct values for each rank in a standard poker deck.
 *
 * This tutorial will guide you through writing and understanding Jest tests for the `Rank` enum.
 *
 * @example
 * // To run the tests:
 * // Use the following command in your terminal:
 * // $ npm run test
 *
 * // Jest will execute this file and display results.
 */

describe("Rank Enum", () => {
  /**
   * @test `should contain all expected rank values`
   * This test ensures that the `Rank` enum contains all the correct values for a deck of cards,
   * from 2 through Ace, including the face cards Jack, Queen, and King.
   *
   * @example
   * expect(Rank.Ace).toBe("A");
   */
  it("should contain all expected rank values", () => {
    // Verify that each rank exists in the enum and has the correct string representation.
    expect(Rank.Two).toBe("2");
    expect(Rank.Three).toBe("3");
    expect(Rank.Four).toBe("4");
    expect(Rank.Five).toBe("5");
    expect(Rank.Six).toBe("6");
    expect(Rank.Seven).toBe("7");
    expect(Rank.Eight).toBe("8");
    expect(Rank.Nine).toBe("9");
    expect(Rank.Ten).toBe("10");
    expect(Rank.Jack).toBe("J");
    expect(Rank.Queen).toBe("Q");
    expect(Rank.King).toBe("K");
    expect(Rank.Ace).toBe("A");
  });

  /**
   * @test `should be used in game logic to represent card ranks`
   * This test demonstrates how the `Rank` enum can be used to represent the ranks of playing cards
   * in poker-related logic. The test simulates creating an array of ranks and verifies their values.
   *
   * @example
   * const handRanks = [Rank.Ace, Rank.King];
   * expect(handRanks[0]).toBe("A");
   * expect(handRanks[1]).toBe("K");
   */
  it("should be used in game logic to represent card ranks", () => {
    // Example usage of the `Rank` enum in poker game logic
    const handRanks = [Rank.Ace, Rank.King, Rank.Queen];

    // Ensure that each value in the hand corresponds to the correct rank.
    expect(handRanks[0]).toBe("A");
    expect(handRanks[1]).toBe("K");
    expect(handRanks[2]).toBe("Q");
  });

  /**
   * @test `should have correct rank value types`
   * This test checks that each value in the `Rank` enum is a string.
   * In TypeScript, enums can sometimes have different types, so it's important to ensure consistency.
   *
   * @example
   * expect(typeof Rank.Ace).toBe("string");
   */
  it("should have correct rank value types", () => {
    // Loop through each enum value to check its type
    const ranks = Object.values(Rank);

    ranks.forEach((rank) => {
      expect(typeof rank).toBe("string");
    });
  });

  /**
   * @test `should throw an error for invalid rank`
   * While the enum itself only contains valid ranks, this test demonstrates the importance of handling
   * invalid values gracefully in other parts of the application.
   * Here, we simulate a potential mistake where an invalid rank could be passed into the logic.
   *
   * @example
   * function useRank(rank: Rank) { if (!Object.values(Rank).includes(rank)) throw new Error(); }
   */
  it("should throw an error for invalid rank (example)", () => {
    // A function to simulate usage of rank in a game
    const useRank = (rank: string) => {
      if (!Object.values(Rank).includes(rank as Rank)) {
        throw new Error("Invalid rank");
      }
    };

    // Correct usage
    expect(() => useRank(Rank.Ace)).not.toThrow();
    expect(() => useRank("InvalidRank")).toThrow("Invalid rank");
  });
});
