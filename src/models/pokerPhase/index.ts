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
   * @property {DeckInterface} __name
   * The deck of cards used in the current PokerPhase.
   */
  private __name: PokerPhaseName = PokerPhaseName.PRE_FLOP;

  /**
   * @property {DeckInterface} __deck
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private __deck: DeckInterface = new Deck();

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __communityCards: CardInterface[] = [];

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __players: PokerPlayerInterface[] = [];

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __pot: number = 0;

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __currentPlayerPos: number = 0;

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __dealerPos: number = 0;

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __smallBlindPos: number = 1;

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __bigBlindPos: number = 2;

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
  constructor(config?: PokerPhaseConfig) {
    super();
  }

  /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config?: PokerPhaseConfig): void {
    if (config) {
      this.__name = config.name ? config.name : PokerPhaseName.PRE_FLOP;
      this.__deck = config.deck ? config.deck : new Deck();
      this.__communityCards = config.communityCards
        ? config.communityCards
        : [];
      this.__players = config.players ? config.players : [];
      this.__pot = config.pot ? config.pot : 0;
      this.__currentPlayerPos = 1;
      this.__dealerPos = config.dealerPos ? config.dealerPos : 0;
      this.__smallBlindPos = config.smallBlindPos ? config.smallBlindPos : 0;
      this.__bigBlindPos = config.bigBlindPos ? config.bigBlindPos : 0;
      // new PokerPlayer({id:``,name:``,chips:100,hand:[],isFolded:false});
    } else {
    }
    if (this.getName() === PokerPhaseName.PRE_FLOP) {
      this.deal();
    }
  }

  /*************************************************************************************
   * GET METHODS
   *************************************************************************************/

  public getName(): PokerPhaseName {
    return this.__name;
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this.__players;
  }

  public getCurrentPlayerPos(): number {
    return this.__currentPlayerPos;
  }

  public getDeck(): DeckInterface {
    return this.__deck;
  }

  public getPot(): number {
    return this.__pot;
  }

  public getDealerPos(): number {
    return this.__dealerPos;
  }

  public getSmallBlindPos(): number {
    return this.__smallBlindPos;
  }

  public getBigBlindPos(): number {
    return this.__bigBlindPos;
  }

  /****************************************************************
   * SET METHODS
   ****************************************************************/

  private setPlayers(players: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return (this.__players = players);
  }

  public setPot(pot: number): number {
    return (this.__pot = pot);
  }

  public setCurrentPlayerPos(player: number): boolean {
    this.__currentPlayerPos = player;
    return true;
  }

  private setDealerPos(pos: number): boolean {
    this.__dealerPos = pos;
    return true;
  }

  private setSmallBlindPos(pos: number): boolean {
    this.__smallBlindPos = pos;
    return true;
  }

  private setBigBlindPos(pos: number): boolean {
    this.__bigBlindPos = pos;
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
    this.__name = name;
    return this.__name;
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
      card ? this.__communityCards.push(card) : {};
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
