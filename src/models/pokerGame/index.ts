import { EventEmitter } from "events";
import {
  DeckInterface,
  CardInterface,
  PokerGameInterface,
} from "../../interfaces";
import { Card } from "../card";
import { Deck } from "../deck";

/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerGame extends EventEmitter implements PokerGameInterface {
  /**
   * @property {DeckInterface} _deck
   * The deck of cards used in the current PokerGame.
   */
  private _deck: DeckInterface;

  /**
   * @property {string} _currentPhase
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private _currentPhase: string;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _communityCards: CardInterface[];

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor() {
    super();
    this._deck = new Deck();
    this._currentPhase = ``;
    this._communityCards = [];
  }

  /**
   * @method `shuffleDeck`
   * Shuffles the deck of cards in preparation for dealing.
   * @returns {void}
   */
  shuffleDeck(): void {}

  /**
   * @method `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {void}
   */
  dealHoleCards(): void {}

  /**
   * @method `dealCommunityCards`
   * Deals the community cards to the table during the flop, turn, or river phases.
   * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
   * @returns {void}
   */
  dealCommunityCards(count: number): void {}

  /**
   * @method `advancePhase`
   * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
   * @returns {void}
   */
  advancePhase(): void {}

  /**
   * @method `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  resolveBets(): void {}
}

export { PokerGame };
