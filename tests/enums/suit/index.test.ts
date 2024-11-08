//@collapse

import { Suit } from "../../../src/enums/suit";

/**
 * @file `index.test.ts`
 * This file contains unit tests for the `Suit` enum.
 * The `Suit` enum represents the four suits of a standard deck of playing cards:
 * Hearts, Diamonds, Clubs, and Spades.
 *
 * In this file, we will:
 * 1. Test that the `Suit` enum contains the correct keys and values.
 * 2. Verify that the enum can be used in real-world scenarios like assignments and functions.
 * 3. Ensure that invalid values do not exist within the enum.
 */

describe("Suit Enum", () => {
  /**
   * Test: Check that the `Suit` enum contains the correct values for each suit.
   * This test ensures that all the expected suits (Hearts, Diamonds, Clubs, Spades)
   * are present and correctly mapped to their string values.
   */
  it("should have correct values for each suit", () => {
    // Verify that the enum contains all the expected suits.
    expect(Suit.Hearts).toBe("Hearts");
    expect(Suit.Diamonds).toBe("Diamonds");
    expect(Suit.Clubs).toBe("Clubs");
    expect(Suit.Spades).toBe("Spades");
  });

  /**
   * Test: Use the `Suit` enum in a real-world scenario.
   * This test simulates a typical use case where the `Suit` enum is assigned to a variable
   * and then used within an application (such as selecting a card suit).
   */
  it("should allow using the Suit enum in real-world scenarios", () => {
    // Assign the suit "Clubs" from the enum to a variable.
    const mySuit = Suit.Clubs;

    // Check that the variable contains the correct enum value.
    expect(mySuit).toBe("Clubs");

    // Example use case: passing the suit to a function and verifying behavior.
    function describeSuit(suit: Suit): string {
      return `You selected the ${suit} suit.`;
    }

    // Call the function with `Suit.Spades` and check the output.
    expect(describeSuit(Suit.Spades)).toBe("You selected the Spades suit.");
  });

  /**
   * Test: Ensure the enum only includes valid suits.
   * This test checks that invalid or undefined suits are not part of the `Suit` enum.
   */
  it("should not allow invalid or undefined suits", () => {
    // Ensure that the `Suit` enum does not include invalid values.
    expect(Suit["InvalidSuit"]).toBeUndefined();
    expect(Suit["Unknown"]).toBeUndefined();
  });
});
