import { Rank, Suit, ICard } from "../../interfaces";

/**
 * @class `Card` : Represents a playing card in a poker game, consisting of a rank and a suit.
 * Implements the `ICard` interface.
 *
 * @example
 * const card = new Card(Rank.Ace, Suit.Spades);
 * console.log(card.toString()); // "A of Spades"
 */
class Card {
  /**
   * @property {Rank} rank
   * @public
   * Holds the rank of the card (e.g., Ace, Two, King).
   */
  public rank: Rank;

  /**
   * @property {Suit} suit
   * @public
   * Holds the suit of the card (e.g., Hearts, Spades).
   */
  public suit: Suit;

  /**
   * @method constructor
   * @public
   * Creates an instance of a `Card` with the given rank and suit.
   *
   * @param {Rank} rank - The rank of the card.
   * @param {Suit} suit - The suit of the card.
   *
   * @example
   * const card = new Card(Rank.Ace, Suit.Spades);
   */
  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  /**
   * @method `toString`
   * @public
   * Returns a string representation of the card, displaying its rank and suit.
   * @returns {string} The card's rank and suit as a formatted string.
   *
   * @example
   * const card = new Card(Rank.Ace, Suit.Spades);
   * console.log(card.toString()); // "A of Spades"
   */
  public toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}

export { Card };
