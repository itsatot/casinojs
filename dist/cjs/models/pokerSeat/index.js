"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerSeat = void 0;
const events_1 = require("events");
/**
 * @interface `PokerSeat`
 * Represents a PokerSeat within a PokerRoom.
 * The PokerSeat manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerSeat extends events_1.EventEmitter {
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
        this._position = config.position;
        this._isDealer = config.isDealer;
        this._player = config.player ? config.player : undefined;
    }
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
     * @method `setId`
     * @public
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
     * @method `getPosition`
     * @public
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getPosition() {
        return this._position;
    }
    /**
     * @method `setPosition`
     * @public
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setPosition(position) {
        this._position = position;
        return this._position;
    }
    /**
     * @method `isDealer`
     * @public
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    isDealer() {
        return this._isDealer;
    }
    /**
     * @method `setIsDealer`
     * @public
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setIsDealer(bool) {
        this._isDealer = bool;
        return this._isDealer;
    }
    /**
     * @method `getPlayer`
     * @public
     * Returns the poker table's `id`.
     * @returns {PokerPlayerInterface | undefined} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getPlayer() {
        return this._player;
    }
    /**
     * @method `setPlayer`
     * @public
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setPlayer(player) {
        this._player = player;
        return this._player;
    }
    isOccupied() {
        if (this.getPlayer() === undefined) {
            return false;
        }
        return true;
    }
}
exports.PokerSeat = PokerSeat;
//# sourceMappingURL=index.js.map