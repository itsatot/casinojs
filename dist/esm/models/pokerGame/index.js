//@collapse
// Import Enums
import { PokerPhaseName } from "../../enums";
// Import Models
import { BaseEventEmitter } from "../_base";
import { Deck } from "../deck";
import { PokerPhase } from "../pokerPhase";
// Import Utils
import { generateUniqueId } from "../../utils";
/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends BaseEventEmitter
 */
class PokerGame extends BaseEventEmitter {
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
    constructor(config) {
        super();
        /*************************************************************************************
         * PROPERTIES
         *************************************************************************************/
        /**
         * @property {DeckInterface} __id
         * The deck of cards used in the current PokerGame.
         */
        this.__id = ``;
        /**
         * @property {string} __deck
         * The current phase of the game (e.g., "pre-flop", "flop", "turn", "river").
         */
        this.__deck = new Deck();
        /**
         * @property {number} __smallBlind
         * The maximum number of players that can be seated at the PokerTable[2-14].
         */
        this.__smallBlind = 5;
        /**
         * @property {number} __bigBlind
         * The maximum number of players that can be seated at the PokerTable[2-14].
         */
        this.__bigBlind = this.__smallBlind * 2;
        /**
         * @property {number} __bigBlind
         * The maximum number of players that can be seated at the PokerTable[2-14].
         */
        this.__phases = [];
        /**
         * @property {number} __bigBlind
         * The maximum number of players that can be seated at the PokerTable[2-14].
         */
        this.__currentPhase = new PokerPhase();
        /**
         * @property {CardInterface[]} __communityCards
         * The community cards that are dealt face-up and shared by all players.
         */
        this.__communityCards = [];
        this.__players = [];
        this.__dealerPos = 0;
        this.__smallBlindPos = 1;
        this.__bigBlindPos = 2;
        this.__pot = 0;
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
    __init(config) {
        if (config) {
            this.__id = config.id ? config.id : generateUniqueId();
            this.__deck = new Deck();
            this.__smallBlind = config.smallBlind
                ? config.smallBlind
                : this.__smallBlind;
            this.__bigBlind = config.bigBlind ? config.bigBlind : this.__bigBlind;
            this.__communityCards = this.__communityCards;
            this.__players = config.players ? config.players : this.__players;
            this.__pot = this.__pot;
            this.__dealerPos = this.__dealerPos;
            this.__smallBlindPos = this.__smallBlindPos;
            this.__bigBlindPos = this.__bigBlindPos;
            this.__phases = this.__phases;
            this.__currentPhase = new PokerPhase({
                name: PokerPhaseName.PRE_FLOP,
                deck: this.__deck,
                players: [],
                pot: 0,
                dealerPos: 0,
                smallBlindPos: 0,
                bigBlindPos: 0,
            });
            this.__validatePlayerList();
        }
        else {
        }
    }
    /**************************************************************************************************************
     * CREATE METHODS (SETTERS & OBJECT CREATION)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * READ METHODS (GETTERS & DATA RETRIEVAL)
     **************************************************************************************************************/
    getPlayers() {
        return this.__players;
    }
    getDeck() {
        return this.__deck;
    }
    getPot() {
        return this.__pot;
    }
    getDealerPos() {
        return this.__dealerPos;
    }
    getSmallBlindPos() {
        return this.__smallBlindPos;
    }
    getBigBlindPos() {
        return this.__bigBlindPos;
    }
    /**************************************************************************************************************
     * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
     **************************************************************************************************************/
    __tagPos() {
        if ((this.getPlayers().length = 2)) {
            this.__setDealerPos(0);
            this.__setSmallBlindPos(1);
            this.__setBigBlindPos(0);
        }
        else if (this.getPlayers().length >= 3) {
            this.__setDealerPos(0);
            this.__setSmallBlindPos(1);
            this.__setBigBlindPos(2);
        }
    }
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
    __advancePhase() { }
    /**
     * `resolveBets`
     * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
     * @returns {void}
     */
    __resolveBets() { }
    __validatePlayerList() {
        if (this.getPlayers().length < 2) {
            throw new Error("Players are lesser than two.");
        }
        else {
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
    __setPot(pot) {
        return (this.__pot = pot);
    }
    __setPlayers(players) {
        return (this.__players = players);
    }
    __setDealerPos(pos) {
        this.__dealerPos = pos;
        return true;
    }
    __setSmallBlindPos(pos) {
        this.__smallBlindPos = pos;
        return true;
    }
    __setBigBlindPos(pos) {
        this.__bigBlindPos = pos;
        return true;
    }
}
export { PokerGame };
//# sourceMappingURL=index.js.map