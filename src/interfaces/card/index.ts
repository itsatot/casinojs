//collapse

import { Rank, Suit } from "../../enums";

/**
 * @interface `CardConfig`
 * Represents a Card Config.
 */
interface CardConfig {

/**************************************************************************************************************
 * PROPERTIES
 **************************************************************************************************************/

  /**
   * @property {string | undefined} rank
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  rank: Rank|number;

  /**
   * @property {string | undefined} suit
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  suit: Suit;
}

/**
 * @interface `CardInterface`
 * Represents the structure of a card in a poker game.
 * The interface provides methods to retrieve the card's rank, suit, and other related details.
 *
 * @example
 * const card: CardInterface = new Card(Rank.Ace, Suit.Spades);
 * console.log(card.toString()); // "A of Spades"
 */
interface CardInterface {

/**************************************************************************************************************
 * CREATE METHODS (SETTERS & OBJECT CREATION)
 **************************************************************************************************************/

/**************************************************************************************************************
 * READ METHODS (GETTERS & DATA RETRIEVAL)
 **************************************************************************************************************/
 
  /**
   * `getRank`
   * @public
   * Returns the card's rank.
   * @returns {Rank} The card's rank.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  getRank(): Rank;

  /**
   * `getSuit`
   * @public
   * Returns the card's suit.
   * @returns {Suit} The card's suit.
   *
   * @example
   * const suit = card.getSuit();
   * console.log(suit); // "Spades"
   */
  getSuit(): Suit;

  
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
   * `toString`
   * @public
   * Returns a string representation of the card, displaying its rank and suit.
   * @returns {string} The card's rank and suit as a formatted string.
   *
   * @example
   * const description = card.toString();
   * console.log(description); // "A of Spades"
   */
  toString(): string;

  /**
   * `toObj`
   * @public
   * Returns an object representation of the card, containing its rank and suit.
   * @returns {object<{ rank: Rank; suit: Suit }>} The card's rank and suit as an object.
   *
   * @example
   * const cardObj = card.toObj();
   * console.log(cardObj); // { rank: "A", suit: "Spades" }
   */
  toObj(): { rank: Rank; suit: Suit };
}

export { CardConfig, CardInterface };
