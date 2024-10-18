import { Rank } from "../rank";
import { Suit } from "../suit";

/**
 * @interface `ICard`
 * Represents the structure of a card in a poker game.
 */
interface ICard {
  /**
   * @property {Rank} rank
   * The rank of the card (e.g., Ace, Two, King).
   */
  rank: Rank;

  /**
   * @property {Suit} suit
   * The suit of the card (e.g., Hearts, Spades).
   */
  suit: Suit;

  /**
   * @method `toString`
   * Returns a string representation of the card, displaying its rank and suit.
   * @returns {string} The card's rank and suit as a formatted string.
   */
  toString(): string;
}

export { ICard };
