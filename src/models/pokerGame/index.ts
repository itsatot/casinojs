import { EventEmitter } from "events";
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
} from "../../interfaces";
import { Deck } from "../deck";

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
   * @property {number} _smallBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _smallBlindAmount: number;

  /**
   * @property {number} _bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private _bigBlindAmount: number;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _communityCards: CardInterface[];

  private _players: PokerPlayerInterface[];

  private _dealerPos: number;

  private _smallBlindPos: number;

  private _bigBlindPos: number;

  private _pot: number;

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
    this._smallBlindAmount = config.smallBlindAmount
      ? config.smallBlindAmount
      : 5;
    this._bigBlindAmount = this._smallBlindAmount * 2;
    this._communityCards = [];
    this._players = config.players ? config.players : [];
    this._pot = config.pot ? config.pot : 0;
    this._dealerPos = 0;
    this._smallBlindPos = 0;
    this._bigBlindPos = 0;
    // new PokerPlayer({id:``,name:``,chips:100,hand:[],isFolded:false});
  }

  /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private init(): void {
    this.validatePlayerList();
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this._players;
  }

  public getDeck(): DeckInterface {
    return this._deck;
  }

  public getPot(): number {
    return this._pot;
  }

  private setPlayers(players: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return (this._players = players);
  }

  public setPot(pot: number): number {
    return (this._pot = pot);
  }

  public getDealerPos(): number {
    return this._dealerPos;
  }

  private setDealerPos(pos: number): boolean {
    this._dealerPos = pos;
    return true;
  }

  public getSmallBlindPos(): number {
    return this._smallBlindPos;
  }

  private setSmallBlindPos(pos: number): boolean {
    this._smallBlindPos = pos;
    return true;
  }

  public getBigBlindPos(): number {
    return this._bigBlindPos;
  }

  private setBigBlindPos(pos: number): boolean {
    this._bigBlindPos = pos;
    return true;
  }

  private tagPos(): void {
    if ((this.getPlayers().length = 2)) {
      this.setDealerPos(0);
      this.setSmallBlindPos(1);
      this.setBigBlindPos(0);
    } else if (this.getPlayers().length >= 3) {
      this.setDealerPos(0);
      this.setSmallBlindPos(1);
      this.setBigBlindPos(2);
    }
  }

  private validatePlayerList(): boolean {
    if (this.getPlayers().length < 2) {
      throw new Error("Players are lesser than two.");
    } else {
      return true;
    }
  }

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
