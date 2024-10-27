import { EventEmitter } from "events";
/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
class PokerPlayer extends EventEmitter {
    /******************* CONSTRUCTOR *******************/
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
        this._id = config.id ? config.id : ``;
        this._name = config.name ? config.name : ``;
        this._chips = config.chips ? config.chips : 100;
        this._hand = config.hand ? config.hand : [];
        this._isFolded = config.isFolded ? config.isFolded : false;
        this._isBetMatched = false;
    }
    /******************* GETTERS *******************/
    /**
     * @method `getId`
     * @public
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getId() {
        return this._id;
    }
    /**
     * @method `getName`
     * @public
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getName() {
        return this._name;
    }
    /**
     * @method `getChips`
     * @public
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getChips() {
        return this._chips;
    }
    /**
     * @method `getHand`
     * @public
     * Returns the poker table's `id`.
     * @returns {CardInterface[]} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getHand() {
        return this._hand;
    }
    /**
     * @method `isFolded`
     * @public
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    isFolded() {
        return this._isFolded;
    }
    /**
    * @method `getHand`
    * @public
    * Returns the poker table's `id`.
    * @returns {CardInterface[]} The poker table's `id`.
    *
    * @example
    * const rank = card.getRank();
    * console.log(rank); // "A"
    */
    isBetMatched() {
        return this._isBetMatched;
    }
    /******************* SETTERS *******************/
    /**
     * @method `setId`
     * @private
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setId(id) {
        this._id = id;
        return this._id;
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
    /**
     * @method `setChips`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setChips(chips) {
        this._chips = chips;
        return this._chips;
    }
    /**
     * @method `setHand`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setHand(hand) {
        this._hand = hand;
        return this._hand;
    }
    /**
     * @method `setIsFolded`
     * @private
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setIsFolded(bool) {
        this._isFolded = bool;
        return this._isFolded;
    }
    /**
    * @method `getHand`
    * @public
    * Returns the poker table's `id`.
    * @returns {CardInterface[]} The poker table's `id`.
    *
    * @example
    * const rank = card.getRank();
    * console.log(rank); // "A"
    */
    setisBetMatched(betMatched) {
        this._isBetMatched = betMatched;
        return this._isBetMatched;
    }
    bet(amount) {
        this._chips = this.getChips() - amount;
        return true;
    }
    /**
     * @method `setHand`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    addToHand(hand) {
        this.getHand().push(hand);
        return true;
    }
}
export { PokerPlayer };
//# sourceMappingURL=index.js.map