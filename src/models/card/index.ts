import { Rank, Suit } from "../../enums";
import { CardConfig, CardInterface } from "../../interfaces";

/**
 * @class `Card`
 * Represents a playing card in a poker game, consisting of a rank and a suit.
 * Implements the `CardInterface`.
 *
 * The `Card` class encapsulates its properties (`rank` and `suit`) as private
 * and provides public getter methods to access these properties.
 * It also includes private setter methods for internal control over the state.
 *
 * @example
 * const card = new Card(Rank.Ace, Suit.Spades);
 * console.log(card.toString()); // "A of Spades"
 */
class Card implements CardInterface {
  /******************* PROPERTIES *******************/

  /**
   * @property {Rank} _rank
   * @private
   * Holds the rank of the card (e.g., Ace, Two, King).
   */
  private _rank: Rank;

  /**
   * @property {Suit} _suit
   * @private
   * Holds the suit of the card (e.g., Hearts, Spades).
   */
  private _suit: Suit;

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
  constructor(config: CardConfig) {
    this._rank = config.rank;
    this._suit = config.suit;
  }

  /**
   * @method `getRank`
   * @public
   * Returns the card's rank.
   * @returns {Rank} The card's rank.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getRank(): Rank {
    return this._rank;
  }

  /**
   * @method `setRank`
   * @private
   * Sets the card's rank. This method is kept private to control how rank is modified.
   *
   * @param {Rank} rank - The new rank of the card.
   * @returns {Rank} The updated rank of the card.
   */
  private setRank(rank: Rank): Rank {
    this._rank = rank;
    return this._rank;
  }

  /**
   * @method `getSuit`
   * @public
   * Returns the card's suit.
   * @returns {Suit} The card's suit.
   *
   * @example
   * const suit = card.getSuit();
   * console.log(suit); // "Spades"
   */
  public getSuit(): Suit {
    return this._suit;
  }

  /**
   * @method `setSuit`
   * @private
   * Sets the card's suit. This method is kept private to control how suit is modified.
   *
   * @param {Suit} suit - The new suit of the card.
   * @returns {Suit} The updated suit of the card.
   */
  private setSuit(suit: Suit): Suit {
    this._suit = suit;
    return this._suit;
  }

  /**
   * @method `toString`
   * @public
   * Returns a string representation of the card, displaying its rank and suit.
   * @returns {string} The card's rank and suit as a formatted string.
   *
   * @example
   * const description = card.toString();
   * console.log(description); // "A of Spades"
   */
  public toString(): string {
    return `${this._rank} of ${this._suit}`;
  }

  /**
   * @method `toObj`
   * @public
   * Returns an object representation of the card, containing its rank and suit.
   * @returns {object<{ rank: Rank; suit: Suit }>} The card's rank and suit as an object.
   *
   * @example
   * const cardObj = card.toObj();
   * console.log(cardObj); // { rank: "A", suit: "Spades" }
   */
  public toObj(): { rank: Rank; suit: Suit } {
    return { rank: this._rank, suit: this._suit };
  }
}

export { Card };
