import { EventEmitter } from "events";
import {
  PokerPhaseConfig,
  DeckInterface,
  CardInterface,
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
  /****************************************************************
   * PROPERTIES
   ****************************************************************/

  /**
   * @property {DeckInterface} _deck
   * The deck of cards used in the current PokerPhase.
   */
  private _id: string;

  /**
   * @property {DeckInterface} _deck
   * The deck of cards used in the current PokerPhase.
   */
  private _name: PokerPhaseName;

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

  private _pot: number;

  private _currentPlayer: PokerPlayerInterface | undefined;

  

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
    this._id = config.id ? config.id : ``;
    this._name = config.name ? config.name : PokerPhaseName.PRE_FLOP;
    this._deck = new Deck();
    this._communityCards = [];
    this._players = config.players ? config.players : [];
    this._pot = 0;
    this._currentPlayer = undefined;
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
      
    } else {
      
    }
  }



  /****************************************************************
   * GET METHODS
   ****************************************************************/

  public getPlayers(): PokerPlayerInterface[] {
    return this._players;
  }

  public getCurrentPlayer(): PokerPlayerInterface|undefined {
    return this._currentPlayer;
  }

  public getDeck(): DeckInterface {
    return this._deck;
  }

  public getPot(): number {
    return this._pot;
  }

  public getName(): PokerPhaseName {
    return this._name;
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
  dealHoleCards(): boolean {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.getPlayers.length; j++) {
        let player = this.getPlayers()[j];
        let card = this.getDeck().draw();
        card ? player.addToHand(card) : {};
      }
    }
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
    this._currentPlayer?.bet(amount);
    this.setPot(this.getPot() + amount);
    return true;
  }

  public fold(): boolean {
    this._currentPlayer?.setIsFolded(true);
    return true;
  }


  /****************************************************************
   * DELETE METHODS
   ****************************************************************/
}

export { PokerPhase };
