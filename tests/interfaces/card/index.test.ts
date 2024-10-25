/**
 * @file `indext.test.ts`
 * This test file verifies the implementation of the `CardInterface`.
 * It uses mock implementations to ensure that the contract defined by the interface is followed.
 * Jest is used to create unit tests for validating the behavior of the `CardInterface`.
 *
 * @example
 * To run this test:
 * $ npx jest ./tests/interfaces/card/index.test.ts
 */

import { Rank, Suit } from "../../../src/enums";
import { CardInterface } from "../../../src/interfaces/card";

/**
 * @class `MockCard`
 * A mock implementation of the `CardInterface` used for testing purposes.
 * This mock class simulates the behavior of a real card in a poker game.
 *
 * @implements {CardInterface}
 */
class MockCard implements CardInterface {
  private rank: Rank;
  private suit: Suit;

  /**
   * @constructor
   * Initializes a mock card with the given rank and suit.
   *
   * @param {Rank} rank - The rank of the card (e.g., Ace, King).
   * @param {Suit} suit - The suit of the card (e.g., Hearts, Spades).
   *
   * @example
   * const mockCard = new MockCard(Rank.Ace, Suit.Spades);
   */
  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  /**
   * @method `getRank`
   * Returns the rank of the card.
   *
   * @returns {Rank} - The rank of the card.
   *
   * @example
   * const rank = mockCard.getRank();
   * console.log(rank); // "A"
   */
  getRank(): Rank {
    return this.rank;
  }

  /**
   * @method `getSuit`
   * Returns the suit of the card.
   *
   * @returns {Suit} - The suit of the card.
   *
   * @example
   * const suit = mockCard.getSuit();
   * console.log(suit); // "Spades"
   */
  getSuit(): Suit {
    return this.suit;
  }

  /**
   * @method `toString`
   * Returns a string representation of the card.
   *
   * @returns {string} - A string in the format of "Rank of Suit".
   *
   * @example
   * const cardStr = mockCard.toString();
   * console.log(cardStr); // "A of Spades"
   */
  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }

  /**
   * @method `toObj`
   * Returns an object representation of the card.
   *
   * @returns {object} - An object with the `rank` and `suit` properties.
   *
   * @example
   * const cardObj = mockCard.toObj();
   * console.log(cardObj); // { rank: "A", suit: "Spades" }
   */
  toObj(): { rank: Rank; suit: Suit } {
    return { rank: this.rank, suit: this.suit };
  }
}

describe("CardInterface", () => {
  let mockCard: MockCard;

  /**
   * @beforeEach
   * This block runs before each test. It creates a new instance of `MockCard` to be used in the tests.
   *
   * @example
   * Before each test, a new mock card is created:
   * const mockCard = new MockCard(Rank.Ace, Suit.Spades);
   */
  beforeEach(() => {
    mockCard = new MockCard(Rank.Ace, Suit.Spades);
  });

  /**
   * @test
   * Verifies that the card has the correct rank and suit when initialized.
   *
   * @example
   * expect(mockCard.getRank()).toBe(Rank.Ace);
   * expect(mockCard.getSuit()).toBe(Suit.Spades);
   */
  it("should create a card with the correct rank and suit", () => {
    expect(mockCard.getRank()).toBe(Rank.Ace);
    expect(mockCard.getSuit()).toBe(Suit.Spades);
  });

  /**
   * @test
   * Verifies that the `toString` method returns the correct string representation of the card.
   *
   * @example
   * expect(mockCard.toString()).toBe("A of Spades");
   */
  it("should return the correct string representation", () => {
    expect(mockCard.toString()).toBe("A of Spades");
  });

  /**
   * @test
   * Verifies that the `toObj` method returns the correct object representation of the card.
   *
   * @example
   * expect(mockCard.toObj()).toEqual({ rank: Rank.Ace, suit: Suit.Spades });
   */
  it("should return the correct object representation", () => {
    expect(mockCard.toObj()).toEqual({ rank: Rank.Ace, suit: Suit.Spades });
  });
});
