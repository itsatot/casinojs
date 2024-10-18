import { ICard, IDeck, Rank, Suit } from "./interfaces";
import { Card, Deck } from "./models";

/**
 * @module `pokerjs`
 * Centralized export for the entire `pokerjs` library, providing access to interfaces, models, and types.
 *
 * This module exports all necessary components for working with poker games, including:
 * - Interfaces (`ICard`, `IDeck`)
 * - Models (`Card`, `Deck`)
 * - Enums (`Rank`, `Suit`)
 *
 * @example
 * // Importing from the centralized library module
 * import { ICard, Card, Deck, Rank, Suit } from 'pokerjs';
 *
 * const deck = new Deck();
 * deck.shuffle();
 * const card = deck.draw();
 * console.log(card?.toString());
 */

export { ICard, IDeck, Rank, Suit, Card, Deck };
