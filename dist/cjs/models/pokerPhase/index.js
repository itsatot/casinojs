"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerPhase = void 0;
const events_1 = require("events");
const enums_1 = require("../../enums");
const deck_1 = require("../deck");
/**
 * @class `PokerPhase`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerPhase extends events_1.EventEmitter {
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
        this._name = config.name ? config.name : enums_1.PokerPhaseName.PRE_FLOP;
        this._deck = config.deck ? config.deck : new deck_1.Deck();
        this._communityCards = [];
        this._players = config.players ? config.players : [];
        this._pot = config.pot ? config.pot : 0;
        this._currentPlayerPos = 1;
        this._dealerPos = config.dealerPos ? config.dealerPos : 0;
        this._smallBlindPos = config.smallBlindPos ? config.smallBlindPos : 0;
        this._bigBlindPos = config.bigBlindPos ? config.bigBlindPos : 0;
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
    init() {
        if (this.getName() === enums_1.PokerPhaseName.PRE_FLOP) {
            this.deal();
        }
    }
    /*************************************************************************************
     * GET METHODS
     *************************************************************************************/
    getName() {
        return this._name;
    }
    getPlayers() {
        return this._players;
    }
    getCurrentPlayerPos() {
        return this._currentPlayerPos;
    }
    getDeck() {
        return this._deck;
    }
    getPot() {
        return this._pot;
    }
    getDealerPos() {
        return this._dealerPos;
    }
    getSmallBlindPos() {
        return this._smallBlindPos;
    }
    getBigBlindPos() {
        return this._bigBlindPos;
    }
    /****************************************************************
     * SET METHODS
     ****************************************************************/
    setPlayers(players) {
        return (this._players = players);
    }
    setPot(pot) {
        return (this._pot = pot);
    }
    setCurrentPlayerPos(player) {
        this._currentPlayerPos = player;
        return true;
    }
    setDealerPos(pos) {
        this._dealerPos = pos;
        return true;
    }
    setSmallBlindPos(pos) {
        this._smallBlindPos = pos;
        return true;
    }
    setBigBlindPos(pos) {
        this._bigBlindPos = pos;
        return true;
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
    setName(name) {
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
    deal() {
        for (let i = 0; i < 2; i++) { }
        return true;
    }
    /**
     * @method `dealCommunityCards`
     * Deals the community cards to the table during the flop, turn, or river phases.
     * @param {number} count - The number of community cards to deal (3 for the flop, 1 for the turn/river).
     * @returns {boolean}
     */
    dealCommunityCards(count) {
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
    advancePhase() { }
    /**
     * @method `resolveBets`
     * Resolves the current betting round, updating player chip stacks and determining the winner if applicable.
     * @returns {void}
     */
    resolveBets() { }
    bet(amount) {
        this.getPlayers()[this.getCurrentPlayerPos()]?.bet(amount);
        this.setPot(this.getPot() + amount);
        this.nextPlayer();
        return true;
    }
    fold() {
        this.getPlayers()[this.getCurrentPlayerPos()]?.setIsFolded(true);
        this.nextPlayer();
        return true;
    }
    /**
     * name
     */
    nextPlayer() {
        if (this.getPlayers().length - 1 === this.getCurrentPlayerPos()) {
            this.setCurrentPlayerPos(0);
        }
        else {
            this.setCurrentPlayerPos(this.getCurrentPlayerPos() + 1);
        }
    }
}
exports.PokerPhase = PokerPhase;
//# sourceMappingURL=index.js.map