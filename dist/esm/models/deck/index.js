//@collapse
// Import Enums
import { Suit, Rank } from "../../enums";
// Import Models
import { BaseEventEmitter } from "../_base";
import { Card } from "../card";
/**
 * @class `Deck`
 * Represents a deck of 52 playing cards used in poker games.
 * This class extends `BaseEventEmitter` and implements the `DeckInterface` interface.
 *
 * The `Deck` class provides methods to shuffle the deck, draw cards, and emits
 * events for important actions like shuffling and drawing cards.
 *
 * @example
 * const deck = new Deck();
 * deck.on('deck:shuffled', () => console.log('Deck has been shuffled.'));
 * deck.shuffle();
 * const card = deck.draw();
 * console.log(card?.toString()); // "A of Spades"
 */
class Deck extends BaseEventEmitter {
    /**************************************************************************************************************
     * CONSTRUCTOR & INITIALIZERS
     **************************************************************************************************************/
    /**
     * constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor() {
        super();
        /**************************************************************************************************************
         * PROPERTIES
         **************************************************************************************************************/
        /**
         * @property {CardInterface[]} cards
         * @private
         * Holds the array of 52 playing cards in the deck.
         * @default []
         */
        this.__cards = [];
        this.__init();
    }
    /**
     * `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    __init() {
        for (const suit of Object.values(Suit)) {
            for (const rank of Object.values(Rank)) {
                this.__cards.push(new Card({ rank: rank, suit: suit }));
            }
        }
        this.emit("deck:initialized", this.__cards);
    }
    /**************************************************************************************************************
     * CREATE METHODS (SETTERS & OBJECT CREATION)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * READ METHODS (GETTERS & DATA RETRIEVAL)
     **************************************************************************************************************/
    /**
     * `getCards`
     * @public
     * Returns the current state of the deck.
     * @returns {CardInterface[]} The array of cards in the deck.
     *
     * @example
     * const cards = deck.getCards();
     * console.log(cards.length); // 52 (before shuffling or drawing)
     */
    getCards() {
        return this.__cards;
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
     * `draw`
     * @public
     * Draws a card from the top of the deck.
     * Removes and returns the top card from the deck, or `undefined` if the deck is empty.
     * `deck:drawn` : Emits a `deck:drawn` event when a card is drawn.
     * @returns {CardInterface | undefined} Returns the drawn card or `undefined` if no cards remain.
     *
     * @example
     * const deck = new Deck();
     * const drawnCard = deck.draw();
     * console.log(drawnCard?.toString()); // "A of Spades"
     */
    draw() {
        const drawnCard = this.__cards.pop();
        this.emit("deck:drawn", drawnCard);
        return drawnCard;
    }
    /**
     * `shuffle`
     * @public
     * Shuffles the deck of cards using the Fisher-Yates algorithm.
     * `deck:shuffled` Emits a `deck:shuffled` event after the deck is shuffled.
     * @returns {void}
     *
     * @example
     * const deck = new Deck();
     * deck.shuffle();
     */
    shuffle() {
        for (let i = this.__cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.__cards[i], this.__cards[j]] = [this.__cards[j], this.__cards[i]];
        }
        this.emit("deck:shuffled", this.__cards);
    }
}
export { Deck };
//# sourceMappingURL=index.js.map