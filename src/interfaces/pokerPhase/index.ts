import { EventEmitter } from "events";
import { PokerPlayerInterface } from "../pokerPlayer";
import { PokerPhaseName } from "../../enums";

/**
 * @interface `PokerPhaseConfig`
 * Represents a Poker Phase Config.
 */
interface PokerPhaseConfig {
  /**
   * @property {string | undefined} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id: string | undefined;

  /**
   * @property {string | undefined} name
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  players: PokerPlayerInterface[];

  pot: number;
}

/**
 * @interface `PokerPhaseInterface`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerPhaseInterface extends NodeJS.EventEmitter {
  /**
   * @method `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {boolean}
   */
  dealHoleCards(): boolean;

  /**
   * @method `dealCommunityCards`
   * Deals the community cards to the table during the flop, turn, or river phases.
   * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
   * @returns {boolean}
   */
  dealCommunityCards(count: number): boolean;

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

  getPlayers(): PokerPlayerInterface[];

  // bet(amount:number):boolean;
}

export { PokerPhaseConfig, PokerPhaseInterface };
