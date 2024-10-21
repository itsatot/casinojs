import { EventEmitter } from "events";
import { DeckInterface } from "../deck";
import { CardInterface } from "../card";

/**
 * @interface `PokerGameInterface`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerGameInterface extends NodeJS.EventEmitter {
  /**
   * @property {DeckInterface} deck
   * The deck of cards used in the current PokerGame.
   */
  deck: DeckInterface;

  /**
   * @property {string} currentPhase
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  currentPhase: string;

  /**
   * @property {CardInterface[]} communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  communityCards: CardInterface[];

  /**
   * @method `shuffleDeck`
   * Shuffles the deck of cards in preparation for dealing.
   * @returns {void}
   */
  shuffleDeck(): void;

  /**
   * @method `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {void}
   */
  dealHoleCards(): void;

  /**
   * @method `dealCommunityCards`
   * Deals the community cards to the table during the flop, turn, or river phases.
   * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
   * @returns {void}
   */
  dealCommunityCards(count: number): void;

  /**
   * @method `advancePhase`
   * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
   * @returns {void}
   */
  advancePhase(): void;

  /**
   * @method `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  resolveBets(): void;
}

export { PokerGameInterface };
