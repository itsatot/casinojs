//@collapse

import { BaseEventEmitterInterface } from "../_base";
import { DeckInterface } from "../deck";
import { PokerPlayerInterface } from "../pokerPlayer";
import { PokerPhases } from "../../enums";
import { CardInterface } from "../card";

/**
 * @interface `PokerPhaseConfig`
 * Represents a Poker Phase Config.
 */
interface PokerPhaseConfig {
  /**
   * @property {PokerPhases} name
   * The deck of cards used in the current PokerPhase.
   */
  name: PokerPhases;

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

  smallBlind: number;

  bigBlind: number;

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
interface PokerPhaseInterface extends BaseEventEmitterInterface {
  getName(): PokerPhases;
  
  getPlayers(): PokerPlayerInterface[];

  getCurrentPlayerPos(): number;

  getDeck(): DeckInterface;

  getPot(): number;

  getDealerPos(): number;

  getSmallBlindPos(): number;

  getBigBlindPos(): number;

  getCommunityCards(): CardInterface[];
}

export { PokerPhaseConfig, PokerPhaseInterface };
