"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerGame = void 0;
const events_1 = require("events");
const deck_1 = require("../deck");
const pokerPhase_1 = require("../pokerPhase");
const enums_1 = require("../../enums");
/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerGame extends events_1.EventEmitter {
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
    constructor(config) {
        super();
        this._id = this._id = config.id ? config.id : ``;
        this._deck = new deck_1.Deck();
        this._smallBlindAmount = config.smallBlindAmount
            ? config.smallBlindAmount
            : 5;
        this._bigBlindAmount = config.bigBlindAmount ? config.bigBlindAmount : 10;
        this._communityCards = [];
        this._players = config.players ? config.players : [];
        this._pot = 0;
        this._dealerPos = 0;
        this._smallBlindPos = 0;
        this._bigBlindPos = 0;
        this._phases = [];
        this._currentPhase = new pokerPhase_1.PokerPhase({
            name: enums_1.PokerPhaseName.PRE_FLOP,
            deck: this._deck,
            players: [],
            pot: 0,
            dealerPos: 0,
            smallBlindPos: 0,
            bigBlindPos: 0,
        });
    }
    /**
     * @method `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    init() {
        this.validatePlayerList();
    }
    getPlayers() {
        return this._players;
    }
    getDeck() {
        return this._deck;
    }
    getPot() {
        return this._pot;
    }
    setPlayers(players) {
        return (this._players = players);
    }
    setPot(pot) {
        return (this._pot = pot);
    }
    getDealerPos() {
        return this._dealerPos;
    }
    setDealerPos(pos) {
        this._dealerPos = pos;
        return true;
    }
    getSmallBlindPos() {
        return this._smallBlindPos;
    }
    setSmallBlindPos(pos) {
        this._smallBlindPos = pos;
        return true;
    }
    getBigBlindPos() {
        return this._bigBlindPos;
    }
    setBigBlindPos(pos) {
        this._bigBlindPos = pos;
        return true;
    }
    tagPos() {
        if ((this.getPlayers().length = 2)) {
            this.setDealerPos(0);
            this.setSmallBlindPos(1);
            this.setBigBlindPos(0);
        }
        else if (this.getPlayers().length >= 3) {
            this.setDealerPos(0);
            this.setSmallBlindPos(1);
            this.setBigBlindPos(2);
        }
    }
    validatePlayerList() {
        if (this.getPlayers().length < 2) {
            throw new Error("Players are lesser than two.");
        }
        else {
            return true;
        }
    }
    /**
     * @method `advancePhase`
     * Advances the game to the next phase (pre-flop to flop, flop to turn, etc.).
     * @returns {void}
     */
    advancePhase() { }
    /**
     * @method `resolveBets`
     * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
     * @returns {void}
     */
    resolveBets() { }
}
exports.PokerGame = PokerGame;
//# sourceMappingURL=index.js.map