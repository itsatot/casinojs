//collapse

// Import Enums
import { PokerPhases } from "../../enums";

// Import Interfaces
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
  PokerPhaseInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { Deck } from "../deck";
import { PokerPhase } from "../pokerPhase";

// Import Utils
import { generateUniqueId, logger } from "../../utils";

/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends BaseEventEmitter
 */
class PokerGame extends BaseEventEmitter implements PokerGameInterface {
  /*************************************************************************************
   * PROPERTIES
   *************************************************************************************/

  /**
   * @property {DeckInterface} __id
   * The deck of cards used in the current PokerGame.
   */
  private __id: string = ``;

  /**
   * @property {string} __deck
   * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
   */
  private __deck: DeckInterface = new Deck();

  /**
   * @property {number} __bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __phases: PokerPhaseInterface[] = [];

  /**
   * @property {number} __bigBlind
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __currentPhase: PokerPhaseInterface = new PokerPhase();

  /**
   * @property {CardInterface[]} __communityCards
   * The community cards that are dealt face-up and shared by all players.
   */
  private __communityCards: CardInterface[] = [];

  private __players: PokerPlayerInterface[] = [];

  private __pot: number = 0;

  /*************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   *************************************************************************************/

  /**
   * constructor
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
   * `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config?: PokerGameConfig): void {
    if (config) {
      config.id ? this.__setId(config.id): this.__setId(generateUniqueId());
      this.__setDeck(new Deck());
      config.players ? this.__setPlayers(config.players) : this.__setPlayers(this.getPlayers());
      this.__setPhases(this.__phases);
      this.__currentPhase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        deck: this.getDeck(),
        players: this.getPlayers(),
        smallBlind:config.smallBlind?config.smallBlind:1,
        bigBlind:config.bigBlind?config.bigBlind:2,
      });
      this.__validatePlayerList();
    } else {
    }
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  public getPlayers(): PokerPlayerInterface[] {
    return this.__players;
  }

  public getDeck(): DeckInterface {
    return this.__deck;
  }

  public getPot(): number {
    return this.__pot;
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**
   * `advancePhase`
   * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
   * @returns {void}
   */
  private __advancePhase(): void {}

  /**
   * `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  private __resolveBets(): void {}

  private __validatePlayerList(): boolean {
    if (this.getPlayers().length < 2) {
      throw new Error("Players are lesser than two.");
    } else {
      return true;
    }
  }
  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/
  
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  private __setPot(pot: number): number {
    this.__pot = pot
    return this.__pot;
  }

  private __setPlayers(
    players: PokerPlayerInterface[]
  ): PokerPlayerInterface[] {
    this.__players = players;
    return this.__players;
  }

  private __setDeck(deck: DeckInterface): DeckInterface {
    this.__deck = deck
    return this.__deck;
  }

  private __setPhases(phases: PokerPhaseInterface[]): PokerPhaseInterface[] {
    this.__phases = phases
    return this.__phases;
  }




}

export { PokerGame };
