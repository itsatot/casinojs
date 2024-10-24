import { EventEmitter } from "events";
import { Deck } from "../deck";
/**
 * @class `PokerPhase`
 * Represents the current PokerPhase being played at the PokerTable.
 * Manages the deck, community cards, and game phases, such as pre-flop, flop, turn, and river.
 *
 * @extends EventEmitter
 */
class PokerPhase extends EventEmitter {
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
        this._deck = new Deck();
        this._communityCards = [];
        this._players = config.players ? config.players : [];
        this._pot = 0;
        this._currentPlayer = undefined;
        // new PokerPlayer({id:``,name:``,chips:100,hand:[],isFolded:false});
    }
    /****************************************************************
     * GET METHODS
     ****************************************************************/
    getPlayers() {
        return this._players;
    }
    getDeck() {
        return this._deck;
    }
    getPot() {
        return this._pot;
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
    /****************************************************************
     * UPDATE METHODS
     ****************************************************************/
    /**
     * @method `dealHoleCards`
     * Deals two hole cards to each player.
     * @returns {void}
     */
    dealHoleCards() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < this.getPlayers.length; j++) {
                let player = this.getPlayers()[j];
                let card = this.getDeck().draw();
                card ? player.addToHand(card) : {};
            }
        }
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
        this._currentPlayer?.bet(amount);
        this.setPot(this.getPot() + amount);
        return true;
    }
    fold() {
        this._currentPlayer?.setIsFolded(true);
        return true;
    }
}
export { PokerPhase };
//# sourceMappingURL=index.js.map