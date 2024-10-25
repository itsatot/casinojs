import { EventEmitter } from "events";
import {
  CardInterface,
  DeckInterface,
  PokerPhaseConfig,
  PokerPhaseInterface,
  PokerPlayerInterface,
} from "../../interfaces";
import { PokerPhaseName } from "../../enums";
import { Deck } from "../deck";

/**
 * @class `PokerPhase`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerPhase extends EventEmitter implements PokerPhaseInterface {
  /*************************************************************************************
   * PROPERTIES
   *************************************************************************************/

  /**
   * @property {DeckInterface} _name
   * The deck of cards used in the current PokerPhase.
   */
  private _name: PokerPhaseName;

  /**
   * @property {DeckInterface} _deck
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private _deck: DeckInterface;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _communityCards: CardInterface[];

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _players: PokerPlayerInterface[];

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _pot: number;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _currentPlayerPos: number;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _dealerPos: number;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _smallBlindPos: number;

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private _bigBlindPos: number;

  /*************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   *************************************************************************************/

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerPhaseConfig) {
    super();
    this._name = config.name ? config.name : PokerPhaseName.PRE_FLOP;
    this._deck = config.deck ? config.deck : new Deck();
    this._communityCards = [];
    this._players = config.players ? config.players : [];
    this._pot = config.pot ? config.pot : 0;
    this._currentPlayerPos = 1;
    this._dealerPos = config.dealerPos ? config.dealerPos : 0;
    this._smallBlindPos = config.smallBlindPos ? config.smallBlindPos : 0;
    this._bigBlindPos = config.bigBlindPos ? config.bigBlindPos : 0;
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
    if (this.getName() === PokerPhaseName.PRE_FLOP) {
      this.deal();
    }
  }

  /*************************************************************************************
   * GET METHODS
   *************************************************************************************/

  public getName(): PokerPhaseName {
    return this._name;
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this._players;
  }

  public getCurrentPlayerPos(): number {
    return this._currentPlayerPos;
  }

  public getDeck(): DeckInterface {
    return this._deck;
  }

  public getPot(): number {
    return this._pot;
  }

  public getDealerPos(): number {
    return this._dealerPos;
  }

  public getSmallBlindPos(): number {
    return this._smallBlindPos;
  }

  public getBigBlindPos(): number {
    return this._bigBlindPos;
  }

  /****************************************************************
   * SET METHODS
   ****************************************************************/

  private setPlayers(players: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return (this._players = players);
  }

  public setPot(pot: number): number {
    return (this._pot = pot);
  }

  public setCurrentPlayerPos(player: number): boolean {
    this._currentPlayerPos = player;
    return true;
  }

  private setDealerPos(pos: number): boolean {
    this._dealerPos = pos;
    return true;
  }

  private setSmallBlindPos(pos: number): boolean {
    this._smallBlindPos = pos;
    return true;
  }

  private setBigBlindPos(pos: number): boolean {
    this._bigBlindPos = pos;
    return true;
  }

  /**
   * @method `setName`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public setName(name: PokerPhaseName): PokerPhaseName {
    this._name = name;
    return this._name;
  }

  /****************************************************************
   * UPDATE METHODS
   ****************************************************************/

  /**
   * @method `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {void}
   */
  deal(): boolean {
    for (let i = 0; i < 2; i++) {}
    return true;
  }

  /**
   * @method `dealCommunityCards`
   * Deals the community cards to the table during the flop, turn, or river phases.
   * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
   * @returns {boolean}
   */
  dealCommunityCards(count: number): boolean {
    for (let index = 0; index < count; index++) {
      let card = this.getDeck().draw();
      card ? this._communityCards.push(card) : {};
    }
    return true;
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

  public bet(amount: number): boolean {
    this.getPlayers()[this.getCurrentPlayerPos()]?.bet(amount);
    this.setPot(this.getPot() + amount);
    this.nextPlayer();

    return true;
  }

  public fold(): boolean {
    this.getPlayers()[this.getCurrentPlayerPos()]?.setIsFolded(true);
    this.nextPlayer();
    return true;
  }

  /**
   * name
   */
  public nextPlayer(): void {
    if (this.getPlayers().length - 1 === this.getCurrentPlayerPos()) {
      this.setCurrentPlayerPos(0);
    } else {
      this.setCurrentPlayerPos(this.getCurrentPlayerPos() + 1);
    }
  }

  /****************************************************************
   * DELETE METHODS
   ****************************************************************/
}

export { PokerPhase };
