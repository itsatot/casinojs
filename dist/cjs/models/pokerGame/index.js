"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerGame = void 0;
const events_1 = require("events");
const deck_1 = require("../deck");
/**
 * @class `PokerGame`
 * Represents the current PokerGame being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerGame extends events_1.EventEmitter {
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
        this._communityCards = [];
        this._players = config.players ? config.players : [];
        this._pot = config.pot ? config.pot : 0;
        // new PokerPlayer({id:``,name:``,chips:100,hand:[],isFolded:false});
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
        return this._pot = pot;
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