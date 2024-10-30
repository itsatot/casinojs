//@collapse

import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerGameConfig`
 * Represents a Poker Game Config.
 */
interface PokerGameConfig {
  /**
   * @property {string} id
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  id?: string;

  /**
   * @property {number} smallBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  smallBlind: number;

  /**
   * @property {number} bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  bigBlind: number;

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
interface PokerGameInterface extends NodeJS.EventEmitter {}

export { PokerGameConfig, PokerGameInterface };
