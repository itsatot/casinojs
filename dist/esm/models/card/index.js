//@collapse
import { Rank, Suit } from "../../enums";
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
class Card {
    /**************************************************************************************************************
     * CONSTRUCTOR & INITIALIZERS
     **************************************************************************************************************/
    /**
     * constructor
     * @public
     * Creates an instance of a `Card` with the given rank and suit.
     *
     * @param {CardConfig} config - The configuration of the card.
     * @example
     * const card = new Card(Rank.Ace, Suit.Spades);
     */
    constructor(config) {
        /**************************************************************************************************************
         * PROPERTIES
         **************************************************************************************************************/
        /**
         * @property {Rank} _rank
         * @private
         * Holds the rank of the card (e.g., Ace, Two, King).
         */
        this.__rank = Rank.Ace;
        /**
         * @property {Suit} _suit
         * @private
         * Holds the suit of the card (e.g., Hearts, Spades).
         */
        this.__suit = Suit.Spades;
        this.__init(config);
    }
    /**
     * `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    __init(config) {
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
     * `getRank`
     * @public
     * Returns the card's rank.
     * @returns {Rank} The card's rank.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getRank() {
        return this.__rank;
    }
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
    getSuit() {
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
     * `toString`
     * @public
     * Returns a string representation of the card, displaying its rank and suit.
     * @returns {string} The card's rank and suit as a formatted string.
     *
     * @example
     * const description = card.toString();
     * console.log(description); // "A of Spades"
     */
    toString() {
        return `${this.__rank} of ${this.__suit}`;
    }
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
    toObj() {
        return { rank: this.__rank, suit: this.__suit };
    }
    /**************************************************************************************************************
     * WRAPPER METHODS (UTILITY & CONVENIENCE)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * INTERNAL METHODS (PRIVATE)
     **************************************************************************************************************/
    /**
     * `setRank`
     * @private
     * Sets the card's rank. This method is kept private to control how rank is modified.
     *
     * @param {Rank} rank - The new rank of the card.
     * @returns {Rank} The updated rank of the card.
     */
    __setRank(rank) {
        this.__rank = rank;
        return this.__rank;
    }
    /**
     * `setSuit`
     * @private
     * Sets the card's suit. This method is kept private to control how suit is modified.
     *
     * @param {Suit} suit - The new suit of the card.
     * @returns {Suit} The updated suit of the card.
     */
    __setSuit(suit) {
        this.__suit = suit;
        return this.__suit;
    }
}
export { Card };
//# sourceMappingURL=index.js.map