import { Rank, Suit } from "../../interfaces";

/**
 * @class Card
 * Represents a playing card in a poker game, consisting of a rank and a suit.
 * @example
 * const card = new Card(Rank.Ace, Suit.Spades);
 * console.log(card.toString()); // "A of Spades"
 */
class Card {
  /**
   * Creates an instance of a Card.
   * @param {Rank} rank - The rank of the card (e.g., Ace, Two, King).
   * @param {Suit} suit - The suit of the card (e.g., Hearts, Spades).
   */
  constructor(public rank: Rank, public suit: Suit) {}

  /**
   * Get a string representation of the card.
   * @returns {string} The card's rank and suit as a formatted string.
   * @example
   * card.toString(); // "A of Spades"
   */
  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}

export default Card;
