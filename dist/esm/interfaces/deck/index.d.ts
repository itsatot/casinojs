import { CardInterface } from "../card";
/**
 * @interface `DeckInterface`
 * Represents the structure of a deck in a poker game.
 * The interface provides methods to shuffle the deck and draw cards from the top.
 *
 * @extends NodeJS.EventEmitter
 *
 * @example
 * const deck: DeckInterface = new Deck();
 * deck.shuffle();
 * const card = deck.draw();
 * console.log(card?.toString()); // "A of Spades"
 */
interface DeckInterface extends NodeJS.EventEmitter {
    /**
     * @method `shuffle`
     * Shuffles the deck of cards.
     *
     * @example
     * const deck = new Deck();
     * deck.shuffle();
     */
    shuffle(): void;
    /**
     * @method `draw`
     * Draws a card from the top of the deck.
     *
     * @returns {CardInterface | undefined} Returns the drawn card or `undefined` if no cards remain.
     *
     * @example
     * const drawnCard = deck.draw();
     * console.log(drawnCard?.toString()); // "A of Spades"
     */
    draw(): CardInterface | undefined;
}
export { DeckInterface };
