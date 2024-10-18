import { ICard } from "../card";

/**
 * @interface `IDeck`
 * Represents the structure of a deck in a poker game.
 */
interface IDeck {
  /**
   * @method `shuffle`
   * Shuffles the deck of cards.
   */
  shuffle(): void;

  /**
   * @method `draw`
   * Draws a card from the top of the deck.
   * @returns {ICard | undefined} Returns the drawn card or `undefined` if no cards remain.
   */
  draw(): ICard | undefined;
}

export { IDeck };
