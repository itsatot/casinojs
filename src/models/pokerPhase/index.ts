//@collapse

// Import Enums
import { PokerPhases } from "../../enums";

// Import Interfaces
import {
  CardInterface,
  DeckInterface,
  PokerPhaseConfig,
  PokerPhaseInterface,
  PokerPlayerInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { Deck } from "../deck";

// Import Utils
import { logger } from "../../utils";

/**
 * @class `PokerPhase`
 *
 * Manages the various phases of a poker game, such as "Pre-Flop," "Flop," "Turn," and "River." This class encapsulates
 * the deck, community cards, and controls to transition between these game phases within a single round of poker.
 *
 * #### Purpose
 * The `PokerPhase` class standardizes and manages the sequence and actions taken during each phase of a poker game.
 * It ensures that the game progresses logically from one phase to another, maintaining the integrity of gameplay by
 * enforcing rules specific to each phase and managing the deck and community cards.
 *
 * #### Extends
 * - Extends Node.js `BaseEventEmitter`, enabling event-based responses to phase changes and key game events.
 *
 * #### Implements
 * - Implements the `PokerPhaseInterface`, defining essential methods and properties for managing a poker game phase.
 *
 * #### Methods Overview
 * - **Initialization**: `constructor`, `__initPhase` (sets up the deck and initial phase properties).
 * - **Phase Control**: Methods to control transitions between phases like `nextPhase`, `resetPhase`.
 * - **Deck and Community Cards Management**: Methods for dealing and revealing community cards.
 *
 * #### Events Overview
 * - `phase:change` - Emitted each time the phase changes, enabling updates to game state.
 * - `phase:end` - Emitted when the final phase (River) ends, signaling the conclusion of the phase sequence.
 *
 * #### Usage
 * This class is instantiated and utilized during a poker game to control the progression through each game phase.
 * It is designed for integration within a `PokerTable` or `PokerRoom`, where it serves as the core game phase manager.
 *
 * @example
 * ```typescript
 * const pokerPhase = new PokerPhase();
 * pokerPhase.on('phase:change', (newPhase) => console.log(`Phase changed to ${newPhase}`));
 * pokerPhase.nextPhase();
 * console.log(pokerPhase.getCurrentPhase()); // Outputs the next game phase, e.g., "Flop"
 * ```
 */
class PokerPhase extends BaseEventEmitter implements PokerPhaseInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {PokerPhases} __name
   *
   * Tracks the current phase name within the poker game (e.g., "Pre-Flop," "Flop," etc.).
   *
   * #### Purpose
   * This property allows the game to determine which phase-specific actions are permissible,
   * ensuring the correct flow and rules are applied throughout the game.
   *
   * #### Requirements
   * - **Required**: Must be a valid `PokerPhases` that indicates the correct stage of gameplay.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__name); // Expected output: PokerPhases.PRE_FLOP
   * ```
   */
  private __name: PokerPhases = PokerPhases.PRE_FLOP;

  /**
   * @property {DeckInterface} __deck
   *
   * Holds the deck of cards utilized throughout the poker game, initialized at the start of each phase.
   *
   * #### Purpose
   * This property ensures that the game uses a controlled and consistent set of cards for each phase, enabling
   * accurate dealing to players and revealing community cards.
   *
   * #### Requirements
   * - **Required**: Must be initialized with 52 cards for a standard poker game setup.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__deck.countCards()); // Expected output: 52
   * ```
   */
  private __deck: DeckInterface = new Deck();

  /**
   * @property {PokerPlayerInterface[]} __players
   *
   * Contains all player instances actively participating in the current phase.
   *
   * #### Purpose
   * Tracks each player's actions and decisions during the phase, ensuring the game can access player details
   * and update states in real-time.
   *
   * #### Requirements
   * - **Optional**: Populated with player instances at the start of a poker round.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__players); // Expected output: Array of PokerPlayer instances
   * ```
   */
  private __players: PokerPlayerInterface[] = [];

  /**
   * @property {CardInterface[]} __communityCards
   *
   * Stores the community cards revealed at each phase, allowing all players to view them.
   *
   * #### Purpose
   * Community cards are central to poker gameplay, helping players form their best hands.
   * This array is populated during specific phases such as "Flop," "Turn," and "River."
   *
   * #### Requirements
   * - **Optional**: Starts as an empty array and is populated as the game progresses.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * pokerPhase.nextPhase(); // Moves to "Flop"
   * console.log(pokerPhase.__communityCards.length); // Expected output: 3
   * ```
   */
  private __communityCards: CardInterface[] = [];

  /**
   * @property {number} __pot
   *
   * Represents the total amount of chips or money collected from players' bets in the current phase.
   *
   * #### Purpose
   * The pot serves as the prize for the winning player(s) at the end of the poker round, accumulating all
   * bets made during the current phase.
   *
   * #### Requirements
   * - **Default**: Initialized to 0 at the beginning of each phase.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__pot); // Expected output: 0
   * ```
   */
  private __pot: number = 0;

  /**
   * @property {number} __currentPlayerPos
   *
   * Tracks the index position of the current active player within the `__players` array.
   *
   * #### Purpose
   * This property allows the game to identify and manage the player currently taking action in the phase.
   *
   * #### Requirements
   * - **Default**: Starts at 1 to indicate the player after the dealer.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__currentPlayerPos); // Expected output: 1
   * ```
   */
  private __currentPlayerPos: number = 1;

  /**
   * @property {number} __dealerPos
   *
   * Indicates the dealer's position in the game, impacting player actions and responsibilities.
   *
   * #### Purpose
   * This property is critical for correctly rotating the dealer position after each hand and managing the flow of the game.
   *
   * #### Requirements
   * - **Default**: Begins at 0, positioning the dealer at the start.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__dealerPos); // Expected output: 0
   * ```
   */
  private __dealerPos: number = 0;

  /**
   * @property {number} __smallBlindPos
   *
   * Specifies the position of the player who posts the small blind at the start of the phase.
   *
   * #### Purpose
   * The `smallBlindPos` ensures that the correct player posts the small blind in each hand, following standard poker rules.
   *
   * #### Requirements
   * - **Default**: Initialized to position 1 (first position after the dealer).
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__smallBlindPos); // Expected output: 1
   * ```
   */
  private __smallBlindPos: number = 1;

  /**
   * @property {number} __bigBlindPos
   *
   * Specifies the position of the player who posts the big blind at the start of the phase.
   *
   * #### Purpose
   * The `bigBlindPos` ensures that the correct player posts the big blind in each hand, in accordance with poker rules.
   *
   * #### Requirements
   * - **Default**: Set to position 2 (second position after the dealer).
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase();
   * console.log(pokerPhase.__bigBlindPos); // Expected output: 2
   * ```
   */
  private __bigBlindPos: number = 2;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * constructor
   * @public
   * Initializes a new instance of `PokerPhase` with configurable settings for the game round, including players, deck,
   * community cards, pot, and player positions (dealer, small blind, big blind).
   *
   * #### Purpose
   * The constructor sets up the `PokerPhase` instance, calling the `__init` method to initialize the deck, player settings,
   * and positions for the game round. It also emits events for listeners when the phase starts.
   *
   * #### Parameters
   * - `config` (optional): A `PokerPhaseConfig` object to configure properties like phase name, deck, community cards,
   *   players, pot, and positional markers.
   *
   * #### Usage
   * The constructor is used to initialize a `PokerPhase` instance with specific configurations, including player information
   * and positions for the phase.
   *
   * @param {PokerPhaseConfig} config - Optional configuration object with properties for setting up the poker phase.
   *
   * @example
   * ```typescript
   * const pokerPhase = new PokerPhase({
   *   name: PokerPhases.PRE_FLOP,
   *   deck: new Deck(),
   *   communityCards: [],
   *   players: [...],
   *   pot: 0,
   *   dealerPos: 0,
   *   smallBlindPos: 1,
   *   bigBlindPos: 2
   * });
   * ```
   */
  constructor(config?: PokerPhaseConfig) {
    super();
    this.__init(config);
  }

  /**
   * __init
   * @private
   * Handles detailed initialization for `PokerPhase`, setting up phase properties like phase name, deck, community cards,
   * players, and positional markers. This method is automatically called within the constructor.
   *
   * #### Purpose
   * The `__init` method ensures that each phase has the correct configuration, including setting up player hands if it is
   * the "Pre-Flop" phase, initializing community cards, and other positional configurations based on the provided `config`.
   *
   * #### Events
   * - `deck:initialized`: Emits an event when the deck has been initialized, allowing listeners to confirm phase readiness.
   *
   * #### Parameters
   * - `config` (optional): An object of type `PokerPhaseConfig`, used to define the phase's specific properties such as
   *   phase name, deck, players, and pot.
   *
   * #### Requirements
   * - The `config` should contain a valid `PokerPhases` (e.g., `PRE_FLOP`, `FLOP`) and other properties for setting up
   *   the phase accurately.
   * - If no `config` is provided, defaults are used to initialize each phase property.
   *
   * #### Returns
   * - This method has no return value (`void`), but it initializes several instance properties based on the provided configuration.
   *
   * #### Usage
   * This method is internally called by the constructor and should not be called directly. It ensures all properties are correctly
   * initialized based on the phase configuration.
   *
   * @param {PokerPhaseConfig} config - Configuration object containing properties for phase initialization.
   * @returns {void}
   *
   * @example
   * ```typescript
   * const config = {
   *   name: PokerPhases.PRE_FLOP,
   *   players: [...],
   *   communityCards: [],
   *   pot: 0
   * };
   * const pokerPhase = new PokerPhase(config); // Automatically calls __init(config) for phase setup
   * ```
   */
  private __init(config?: PokerPhaseConfig): void {
    if (config) {
      this.__name = config.name ?? PokerPhases.PRE_FLOP;
      this.__deck = config.deck ?? new Deck();
      this.__communityCards = config.communityCards ?? this.__communityCards;
      this.__players = config.players ?? this.__players;
      this.__pot = config.pot ?? this.__pot;
      this.__currentPlayerPos = this.__currentPlayerPos;
      this.__dealerPos = config.dealerPos ?? this.__dealerPos;
      this.__smallBlindPos = config.smallBlindPos ?? this.__smallBlindPos;
      this.__bigBlindPos = config.bigBlindPos ?? this.__bigBlindPos;
    }

    if (this.getName() === PokerPhases.PRE_FLOP) {
      this.deal(); // Deal cards to players if this is the "Pre-Flop" phase
    }
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  public bet(amount: number): boolean {
    return this._bet(amount);
  }

  public fold(): boolean {
    return this._fold();
  }
  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves the current phase name (e.g., "Pre-Flop," "Flop") of the `PokerPhase`.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Provides the phase name, helping other parts of the code determine the current stage of the game round.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {PokerPhases}: The name of the current game phase.
   *
   * #### Usage
   * Useful for determining the phase of gameplay, allowing specific actions based on the current phase.
   *
   * @returns {PokerPhases} - The name of the current phase in the poker round.
   *
   * @example
   * ```typescript
   * const phaseName = pokerPhase.getName();
   * console.log(phaseName); // Outputs: "Pre-Flop"
   * ```
   */
  public getName(): PokerPhases {
    return this.__name;
  }

  /**
   * #### Description
   * Retrieves the list of players currently involved in the `PokerPhase`.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Accesses the players participating in the current phase, supporting functions that involve player actions or status.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {PokerPlayerInterface[]}: An array of player objects involved in this phase.
   *
   * #### Usage
   * This method is commonly used when the current players need to be accessed, such as for dealing cards or determining
   * player turns.
   *
   * @returns {PokerPlayerInterface[]} - List of players in the phase.
   *
   * @example
   * ```typescript
   * const players = pokerPhase.getPlayers();
   * console.log(players); // Outputs an array of player objects
   * ```
   */
  public getPlayers(): PokerPlayerInterface[] {
    return this.__players;
  }

  /**
   * #### Description
   * Retrieves the position of the player whose turn it currently is within the `PokerPhase`.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Helps identify the active player during the phase, supporting turn-based actions.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {number}: The zero-based position of the current player.
   *
   * #### Usage
   * Useful in determining which player should act next in the game round.
   *
   * @returns {number} - Position of the active player.
   *
   * @example
   * ```typescript
   * const currentPosition = pokerPhase.getCurrentPlayerPos();
   * console.log(currentPosition); // Outputs: 2
   * ```
   */
  public getCurrentPlayerPos(): number {
    return this.__currentPlayerPos;
  }

  /**
   * #### Description
   * Retrieves the deck of cards currently being used in the `PokerPhase`.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Accesses the deck to support game actions involving the deck, such as dealing or shuffling.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {DeckInterface}: The deck object used for this phase.
   *
   * #### Usage
   * Useful for accessing the deck when cards need to be drawn or reset.
   *
   * @returns {DeckInterface} - The deck used in the phase.
   *
   * @example
   * ```typescript
   * const deck = pokerPhase.getDeck();
   * console.log(deck); // Outputs the deck object
   * ```
   */
  public getDeck(): DeckInterface {
    return this.__deck;
  }

  /**
   * #### Description
   * Retrieves the current total pot amount for the `PokerPhase`.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Provides the total value of bets placed in the current phase, aiding in bet-related actions.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {number}: The current value of the pot.
   *
   * #### Usage
   * Useful for calculating winnings or determining the total bet pool.
   *
   * @returns {number} - The current pot value in the phase.
   *
   * @example
   * ```typescript
   * const potAmount = pokerPhase.getPot();
   * console.log(potAmount); // Outputs: 1000
   * ```
   */
  public getPot(): number {
    return this.__pot;
  }

  /**
   * #### Description
   * Retrieves the dealer's position for the current phase of poker.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Indicates which player holds the dealer role, which is essential for turn-based actions.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {number}: The position of the dealer in the game.
   *
   * #### Usage
   * Useful for determining turn order and dealer-related actions.
   *
   * @returns {number} - Dealer’s position in the phase.
   *
   * @example
   * ```typescript
   * const dealerPosition = pokerPhase.getDealerPos();
   * console.log(dealerPosition); // Outputs: 0
   * ```
   */
  public getDealerPos(): number {
    return this.__dealerPos;
  }

  /**
   * #### Description
   * Retrieves the position of the player assigned the small blind.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Helps identify the player with the small blind, aiding in betting actions.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {number}: Position of the small blind player.
   *
   * #### Usage
   * Used to determine the small blind in betting rounds.
   *
   * @returns {number} - Position of the small blind player.
   *
   * @example
   * ```typescript
   * const smallBlindPosition = pokerPhase.getSmallBlindPos();
   * console.log(smallBlindPosition); // Outputs: 1
   * ```
   */
  public getSmallBlindPos(): number {
    return this.__smallBlindPos;
  }

  /**
   * #### Description
   * Retrieves the position of the player assigned the big blind.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * Helps identify the player with the big blind, aiding in betting actions.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Returns
   * - {number}: Position of the big blind player.
   *
   * #### Usage
   * Used to determine the big blind in betting rounds.
   *
   * @returns {number} - Position of the big blind player.
   *
   * @example
   * ```typescript
   * const bigBlindPosition = pokerPhase.getBigBlindPos();
   * console.log(bigBlindPosition); // Outputs: 2
   * ```
   */
  public getBigBlindPos(): number {
    return this.__bigBlindPos;
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
   * `dealHoleCards`
   * Deals two hole cards to each player.
   * @returns {void}
   */
  deal(): boolean {
    for (let i = 0; i < 2; i++) {}
    return true;
  }

  /**
   * `dealCommunityCards`
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
   * `advancePhase`
   * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
   * @returns {void}
   */
  advancePhase(): void {}

  /**
   * `resolveBets`
   * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
   * @returns {void}
   */
  resolveBets(): void {}

  /**
   * name
   */
  private nextPlayer(): void {
    if (this.getPlayers().length - 1 === this.getCurrentPlayerPos()) {
      this.__setCurrentPlayerPos(0);
    } else {
      this.__setCurrentPlayerPos(this.getCurrentPlayerPos() + 1);
    }
  }

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  protected _bet(amount: number): boolean {
    this.getPlayers()[this.getCurrentPlayerPos()]?.bet(amount);
    this.__setPot(this.getPot() + amount);
    this.nextPlayer();

    return true;
  }

  protected _fold(): boolean {
    this.getPlayers()[this.getCurrentPlayerPos()]?.setIsFolded(true);
    this.nextPlayer();
    return true;
  }
  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  private __setPot(pot: number): number {
    return (this.__pot = pot);
  }

  private __setCurrentPlayerPos(player: number): boolean {
    this.__currentPlayerPos = player;
    return true;
  }

  /**
   * `setName`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setName(name: PokerPhases): PokerPhases {
    this.__name = name;
    return this.__name;
  }

  private __setPlayers(
    players: PokerPlayerInterface[]
  ): PokerPlayerInterface[] {
    return (this.__players = players);
  }

  private __setDealerPos(pos: number): boolean {
    this.__dealerPos = pos;
    return true;
  }

  private __setSmallBlindPos(pos: number): boolean {
    this.__smallBlindPos = pos;
    return true;
  }

  private __setBigBlindPos(pos: number): boolean {
    this.__bigBlindPos = pos;
    return true;
  }
}

export { PokerPhase };
