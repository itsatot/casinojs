import { EventEmitter } from "events";
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
  PokerPhaseInterface,
} from "../../interfaces";
import { Deck } from "../deck";
import { PokerPhase } from "../pokerPhase";
import { PokerPhaseName } from "../../enums";
import { generateUniqueId } from "../../utils";

/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerGame extends EventEmitter implements PokerGameInterface {
  /*************************************************************************************
   * PROPERTIES
   *************************************************************************************/

  /**
   * @property {DeckInterface} __id
   * The deck of cards used in the current PokerGame.
   */
  private __id: string = ``;

  /**
   * @property {string} _currentPhase
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private __deck: DeckInterface = new Deck();

  /**
   * @property {number} _smallBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __smallBlindAmount: number = 5;

  /**
   * @property {number} _bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __bigBlindAmount: number = this.__smallBlindAmount * 2;

  /**
   * @property {number} _bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __phases: PokerPhaseInterface[] = [];

  /**
   * @property {number} _bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __currentPhase: PokerPhaseInterface = new PokerPhase();

  /**
   * @property {CardInterface[]} _communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __communityCards: CardInterface[] = [];

  private __players: PokerPlayerInterface[] = [];

  private __dealerPos: number = 0;

  private __smallBlindPos: number = 1;

  private __bigBlindPos: number = 2;

  private __pot: number = 0;

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
  constructor(config?: PokerGameConfig) {
    super();
    config ? this.__init(config) : this.__init();
  }

  /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config?: PokerGameConfig): void {
    if (config) {
      this.__id = config.id ? config.id : this.__generateId();
      this.__deck = new Deck();
      this._smallBlindAmount = config.smallBlindAmount
        ? config.smallBlindAmount
        : 5;
      this._bigBlindAmount = config.bigBlindAmount ? config.bigBlindAmount : 10;
      this._communityCards = [];
      this._players = config.players ? config.players : [];
      this._pot = 0;
      this._dealerPos = 0;
      this._smallBlindPos = 0;
      this.__bigBlindPos = 0;
      this._phases = [];
      this._currentPhase = new PokerPhase({
        name: PokerPhaseName.PRE_FLOP,
        deck: this.__deck,
        players: [],
        pot: 0,
        dealerPos: 0,
        smallBlindPos: 0,
        bigBlindPos: 0,
      });
      this.validatePlayerList();
    } else {
    }
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this._players;
  }

  public getDeck(): DeckInterface {
    return this.__deck;
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
    return this.__bigBlindPos;
  }

  private setBigBlindPos(pos: number): boolean {
    this.__bigBlindPos = pos;
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

  /**
   * #### Description
   * The `__generateId` method generates a unique identifier string. This ID is used internally
   * to uniquely identify instances or components within the `PokerRoom` class, helping manage
   * each room separately by its own ID.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * The purpose of the `__generateId` method is to provide a consistent, automatic way
   * to generate unique IDs, ensuring that each `PokerRoom` instance has its own distinct
   * identifier. This prevents conflicts or confusion between instances.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * This method does not take any parameters.
   *
   * #### Requirements
   * - Utilizes the `generateUniqueId` function from an external library or internal utility.
   * - This function must be capable of producing unique, non-repeating strings each time it's called.
   *
   * #### Returns
   * The method returns a `string` type, representing a unique identifier.
   *
   * #### Usage
   * Typically used internally within the `PokerRoom` or `Casino` classes when a new
   * room instance is created, this method is called automatically without requiring
   * external intervention.
   *
   * @returns {string} - A unique string identifier generated by the `generateUniqueId` function.
   *
   * @throws {Error} - This method does not throw any errors.
   *
   * @example
   * ```typescript
   * class PokerRoom {
   *   private __id: string = this.__generateId();
   *
   *   private __generateId(): string {
   *     return generateUniqueId(); // Creates a new unique ID for this PokerRoom instance
   *   }
   * }
   *
   * const room = new PokerRoom();
   * console.log(room.__id); // Outputs a unique identifier, e.g., "room_12345abc"
   * ```
   */
  private __generateId(): string {
    return generateUniqueId();
  }
}

export { PokerGame };
