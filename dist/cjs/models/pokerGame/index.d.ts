import { PokerGameConfig, DeckInterface, PokerGameInterface, PokerPlayerInterface } from "../../interfaces";
import { BaseEventEmitter } from "../_base";
/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends BaseEventEmitter
 */
declare class PokerGame extends BaseEventEmitter implements PokerGameInterface {
    /*************************************************************************************
     * PROPERTIES
     *************************************************************************************/
    /**
     * @property {DeckInterface} __id
     * The deck of cards used in the current PokerGame.
     */
    private __id;
    /**
     * @property {string} __deck
     * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
     */
    private __deck;
    /**
     * @property {number} __smallBlind
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private __smallBlind;
    /**
     * @property {number} __bigBlind
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private __bigBlind;
    /**
     * @property {number} __bigBlind
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private __phases;
    /**
     * @property {number} __bigBlind
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private __currentPhase;
    /**
     * @property {CardInterface[]} __communityCards
     * The community cards that are dealt face-up and shared by all players.
     */
    private __communityCards;
    private __players;
    private __dealerPos;
    private __smallBlindPos;
    private __bigBlindPos;
    private __pot;
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
    constructor(config?: PokerGameConfig);
    /**
     * `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    private __init;
    /**************************************************************************************************************
     * CREATE METHODS (SETTERS & OBJECT CREATION)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * READ METHODS (GETTERS & DATA RETRIEVAL)
     **************************************************************************************************************/
    getPlayers(): PokerPlayerInterface[];
    getDeck(): DeckInterface;
    getPot(): number;
    getDealerPos(): number;
    getSmallBlindPos(): number;
    getBigBlindPos(): number;
    /**************************************************************************************************************
     * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
     **************************************************************************************************************/
    private __tagPos;
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
    private __advancePhase;
    /**
     * `resolveBets`
     * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
     * @returns {void}
     */
    private __resolveBets;
    private __validatePlayerList;
    /**************************************************************************************************************
     * WRAPPER METHODS (UTILITY & CONVENIENCE)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * INTERNAL METHODS (PROTECTED)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * INTERNAL METHODS (PRIVATE)
     **************************************************************************************************************/
    private __setPot;
    private __setPlayers;
    private __setDealerPos;
    private __setSmallBlindPos;
    private __setBigBlindPos;
}
export { PokerGame };
