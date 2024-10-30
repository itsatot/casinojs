//@collapse

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
/**************************************************************************************************************
 * PROPERTIES
 **************************************************************************************************************/

  /**
   * @property {Rank} _rank
   * @private
   * Holds the rank of the card (e.g., Ace, Two, King).
   */
  private __rank: Rank = Rank.Ace;

  /**
   * @property {Suit} _suit
   * @private
   * Holds the suit of the card (e.g., Hearts, Spades).
   */
  private __suit: Suit = Suit.Spades;

/**************************************************************************************************************
 * CONSTRUCTOR & INITIALIZERS
 **************************************************************************************************************/

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
    this.__init(config);
  }

   /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
   private __init(config: CardConfig): void {
    this.__rank = config.rank;
    this.__suit = config.suit;
  }

/**************************************************************************************************************
 * CREATE METHODS (SETTERS & OBJECT CREATION)
 **************************************************************************************************************/


/**************************************************************************************************************
 * READ METHODS (GETTERS & DATA RETRIEVAL)
 **************************************************************************************************************/
 
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
  return this.__rank;
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
  return this.__suit;
}

/**************************************************************************************************************
 * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
 **************************************************************************************************************/

/**************************************************************************************************************
 * DELETE METHODS (REMOVING OBJECTS)
 **************************************************************************************************************/

/**************************************************************************************************************
 * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
 **************************************************************************************************************/

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
    return `${this.__rank} of ${this.__suit}`;
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
    return { rank: this.__rank, suit: this.__suit };
  }

/**************************************************************************************************************
 * WRAPPER METHODS (UTILITY & CONVENIENCE)
 **************************************************************************************************************/

/**************************************************************************************************************
 * INTERNAL METHODS (PRIVATE)
 **************************************************************************************************************/

  /**
   * @method `setRank`
   * @private
   * Sets the card's rank. This method is kept private to control how rank is modified.
   *
   * @param {Rank} rank - The new rank of the card.
   * @returns {Rank} The updated rank of the card.
   */
  private __setRank(rank: Rank): Rank {
    this.__rank = rank;
    return this.__rank;
  }

  /**
   * @method `setSuit`
   * @private
   * Sets the card's suit. This method is kept private to control how suit is modified.
   *
   * @param {Suit} suit - The new suit of the card.
   * @returns {Suit} The updated suit of the card.
   */
  private __setSuit(suit: Suit): Suit {
    this.__suit = suit;
    return this.__suit;
  }

}

export { Card };
