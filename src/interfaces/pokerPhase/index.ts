//@collapse

import { BaseEventEmitterInterface } from "../_base";
import { DeckInterface } from "../deck";
import { PokerPlayerInterface } from "../pokerPlayer";
import { PokerPhaseName } from "../../enums";
import { CardInterface } from "../card";

/**
 * @interface `PokerPhaseConfig`
 * Represents a Poker Phase Config.
 */
interface PokerPhaseConfig {
  /**
   * @property {PokerPhaseName} name
   * The deck of cards used in the current PokerPhase.
   */
  name: PokerPhaseName;

  /**
   * @property {DeckInterface} deck
   * The deck of cards used in the current PokerPhase.
   */
  deck: DeckInterface;

  /**
   * @property {PokerPlayerInterface[]} players
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  players: PokerPlayerInterface[];

  /**
   * @property {number} pot
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  pot?: number;

  /**
   * @property {number} pot
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  dealerPos: number;

  /**
   * @property {number} pot
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  smallBlindPos: number;

  /**
   * @property {number} pot
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  bigBlindPos: number;

  /**
   * @property {number} communityCards
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  communityCards?: CardInterface[];
}

/**
 * @interface `PokerPhaseInterface`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerPhaseInterface extends BaseEventEmitterInterface {}

export { PokerPhaseConfig, PokerPhaseInterface };
