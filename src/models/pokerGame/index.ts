import { EventEmitter } from "events";
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
} from "../../interfaces";
import { Card } from "../card";
import { Deck } from "../deck";
import { PokerPlayer } from "../pokerPlayer";

/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerGame extends EventEmitter implements PokerGameInterface {
  /******************* PROPERTIES *******************/

  /**
   * @property {DeckInterface} _deck
   * The deck of cards used in the current PokerGame.
   */
  private _id: string;

  /**
   * @property {string} _currentPhase
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private _deck: DeckInterface;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _communityCards: CardInterface[];

  private _players: PokerPlayerInterface[];

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerGameConfig) {
    super();
    this._id = this._id = config.id ? config.id : ``;
    this._deck = new Deck();
    this._communityCards = [];
    this._players = config.players ? config.players : [];
    // new PokerPlayer({id:``,name:``,chips:100,hand:[],isFolded:false});
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this._players;
  }

  public getDeck(): DeckInterface {
    return this._deck;
  }

  private setPlayers(players: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return (this._players = players);
  }

  /**
   * @method `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {void}
   */
  dealHoleCards(): boolean {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.getPlayers.length; j++) {
        let Player = this.getPlayers()[j];
        let card = this.getDeck().draw();
      }
    }

    this._players;
    return true;
  }

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
