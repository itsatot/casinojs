import { EventEmitter } from "events";
import { PokerGameConfig, DeckInterface, PokerPhaseInterface, PokerPlayerInterface } from "../../interfaces";
/**
 * @class `PokerPhase`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
declare class PokerPhase extends EventEmitter implements PokerPhaseInterface {
    /****************************************************************
     * PROPERTIES
     ****************************************************************/
    /**
     * @property {DeckInterface} _deck
     * The deck of cards used in the current PokerPhase.
     */
    private _id;
    /**
     * @property {string} _currentPhase
     * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
     */
    private _deck;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _communityCards;
    private _players;
    private _pot;
    private _currentPlayer;
    /**
     * @method constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor(config: PokerGameConfig);
    /****************************************************************
     * GET METHODS
     ****************************************************************/
    getPlayers(): PokerPlayerInterface[];
    getDeck(): DeckInterface;
    getPot(): number;
    /****************************************************************
     * SET METHODS
     ****************************************************************/
    private setPlayers;
    setPot(pot: number): number;
    /****************************************************************
     * UPDATE METHODS
     ****************************************************************/
    /**
     * @method `dealHoleCards`
     * Deals two hole cards to each player.
     * @returns {void}
     */
    dealHoleCards(): boolean;
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
}
export { PokerPhase };
