import { EventEmitter } from "events";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerGameConfig`
 * Represents a Poker Game Config.
 */
interface PokerGameConfig {
  /**
   * @property {string | undefined} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id: string | undefined;

  /**
   * @property {number} smallBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  smallBlindAmount: number;

  /**
   * @property {number} bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  bigBlindAmount: number;

  /**
   * @property {string | undefined} name
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  players: PokerPlayerInterface[];
}

/**
 * @interface `PokerGameInterface`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerGameInterface extends NodeJS.EventEmitter {
  /**
   * @method `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  resolveBets(): void;

  getPlayers(): PokerPlayerInterface[];
}

export { PokerGameConfig, PokerGameInterface };
