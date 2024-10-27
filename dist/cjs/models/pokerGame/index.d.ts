import { EventEmitter } from "events";
import { PokerGameConfig, DeckInterface, PokerGameInterface, PokerPlayerInterface } from "../../interfaces";
/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
declare class PokerGame extends EventEmitter implements PokerGameInterface {
    /*************************************************************************************
     * PROPERTIES
     *************************************************************************************/
    /**
     * @property {DeckInterface} _id
     * The deck of cards used in the current PokerGame.
     */
    private _id;
    /**
     * @property {string} _currentPhase
     * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
     */
    private _deck;
    /**
     * @property {number} _smallBlindAmount
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _smallBlindAmount;
    /**
     * @property {number} _bigBlindAmount
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _bigBlindAmount;
    /**
     * @property {number} _bigBlindAmount
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _phases;
    /**
     * @property {number} _bigBlindAmount
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _currentPhase;
    /**
     * @property {CardInterface[]} _communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private _communityCards;
    private _players;
    private _dealerPos;
    private _smallBlindPos;
    private _bigBlindPos;
    private _pot;
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
    constructor(config: PokerGameConfig);
    /**
     * @method `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    private init;
    getPlayers(): PokerPlayerInterface[];
    getDeck(): DeckInterface;
    getPot(): number;
    private setPlayers;
    setPot(pot: number): number;
    getDealerPos(): number;
    private setDealerPos;
    getSmallBlindPos(): number;
    private setSmallBlindPos;
    getBigBlindPos(): number;
    private setBigBlindPos;
    private tagPos;
    private validatePlayerList;
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
}
export { PokerGame };
