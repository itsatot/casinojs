//@collapse

import { Card } from "../../../src/models";
import { Rank, Suit } from "../../../src/enums";

/**
 * @file `card.test.ts`
 * Unit tests for the `Card` class in the `pokerjs` library.
 * This file contains test cases to ensure the correct functionality of the `Card` class methods.
 *
 * The tests verify:
 * 1. The creation of a card with a specific rank and suit.
 * 2. The string representation of the card.
 * 3. The object representation of the card.
 *
 * @example
 * // To run these tests, use the following command:
 * npm test
 */

/**
 * @describe `Card`
 * Grouping of unit tests for the `Card` class.
 */
describe("Card", () => {
  /**
   * @var {Card} card
   * A variable to store the instance of the `Card` class that will be used in each test.
   */
  let card: Card;

  /**
   * @beforeEach
   * Runs before each individual test case.
   * Initializes a new `Card` instance with a rank of `Ace` and a suit of `Spades`.
   */
  beforeEach(() => {
    card = new Card({ rank: Rank.Ace, suit: Suit.Spades });
  });

  /**
   * @it `should create a card with the correct rank and suit`
   * Test case to check if the `Card` instance is created with the correct rank and suit.
   *
   * @example
   * expect(card.getRank()).toBe(Rank.Ace); // Should return `Ace`
   * expect(card.getSuit()).toBe(Suit.Spades); // Should return `Spades`
   */
  it("should create a card with the correct rank and suit", () => {
    expect(card.getRank()).toBe(Rank.Ace);
    expect(card.getSuit()).toBe(Suit.Spades);
  });

  /**
   * @it `should return the correct string representation`
   * Test case to check if the `toString` method returns the correct string representation of the card.
   *
   * @example
   * expect(card.toString()).toBe("A of Spades"); // Should return the string "A of Spades"
   */
  it("should return the correct string representation", () => {
    expect(card.toString()).toBe("A of Spades");
  });

  /**
   * @it `should return the correct object representation`
   * Test case to check if the `toObj` method returns the correct object representation of the card.
   *
   * @example
   * expect(card.toObj()).toEqual({ rank: Rank.Ace, suit: Suit.Spades }); // Should return the object { rank: "A", suit: "Spades" }
   */
  it("should return the correct object representation", () => {
    expect(card.toObj()).toEqual({ rank: Rank.Ace, suit: Suit.Spades });
  });
});
