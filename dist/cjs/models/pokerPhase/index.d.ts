import { EventEmitter } from "events";
import { DeckInterface, PokerPhaseConfig, PokerPhaseInterface, PokerPlayerInterface } from "../../interfaces";
import { PokerPhaseName } from "../../enums";
/**
 * @class `PokerPhase`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
declare class PokerPhase extends EventEmitter implements PokerPhaseInterface {
    /*************************************************************************************
     * PROPERTIES
     *************************************************************************************/
    /**
     * @property {DeckInterface} _name
     * The deck of cards used in the current PokerPhase.
     */
    private _name;
    /**
     * @property {DeckInterface} _deck
     * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
     */
    private _deck;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _communityCards;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _players;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _pot;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _currentPlayerPos;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _dealerPos;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _smallBlindPos;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _bigBlindPos;
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
    constructor(config: PokerPhaseConfig);
    /**
     * @method `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    private init;
    /*************************************************************************************
     * GET METHODS
     *************************************************************************************/
    getName(): PokerPhaseName;
    getPlayers(): PokerPlayerInterface[];
    getCurrentPlayerPos(): number;
    getDeck(): DeckInterface;
    getPot(): number;
    getDealerPos(): number;
    getSmallBlindPos(): number;
    getBigBlindPos(): number;
    /****************************************************************
     * SET METHODS
     ****************************************************************/
    private setPlayers;
    setPot(pot: number): number;
    setCurrentPlayerPos(player: number): boolean;
    private setDealerPos;
    private setSmallBlindPos;
    private setBigBlindPos;
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
    setName(name: PokerPhaseName): PokerPhaseName;
    /****************************************************************
     * UPDATE METHODS
     ****************************************************************/
    /**
     * @method `dealHoleCards`
     * Deals two hole cards to each player.
     * @returns {void}
     */
    deal(): boolean;
    /**
     * @method `dealCommunityCards`
     * Deals the community cards to the table during the flop, turn, or river phases.
     * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
     * @returns {boolean}
     */
    dealCommunityCards(count: number): boolean;
    /**
     * @method `advancePhase`
     * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
     * @returns {void}
     */
    advancePhase(): void;
    /**
     * @method `resolveBets`
     * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
     * @returns {void}
     */
    resolveBets(): void;
    bet(amount: number): boolean;
    fold(): boolean;
    /**
     * name
     */
    nextPlayer(): void;
}
export { PokerPhase };
