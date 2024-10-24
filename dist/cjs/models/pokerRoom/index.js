"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerRoom = void 0;
const events_1 = require("events");
const pokerTable_1 = require("../pokerTable");
const pokerPlayer_1 = require("../pokerPlayer");
/**
 * @class `PokerRoom`
 * Represents a PokerRoom within a Casino that holds a single PokerTable. The PokerRoom manages the player queue, automatically assigning players to the PokerTable as seats become available.
 * This class extends `EventEmitter` and implements the `PokerRoomInterface` interface.
 */
class PokerRoom extends events_1.EventEmitter {
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
        this._queue = [];
        this._table = new pokerTable_1.PokerTable(config.tableConfig);
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
     * @method `getName`
     * @public
     * Returns the poker room's `name`.
     * @returns {string} The poker room's `name`.
     *
     * @example
     * const rank = card.getName();
     * console.log(rank); // "A"
     */
    getName() {
        return this._name;
    }
    /**
     * @method `getQueue`
     * @public
     * Returns the poker room's `name`.
     * @returns {PokerPlayerInterface[]} The poker room's `name`.
     *
     * @example
     * const rank = card.getName();
     * console.log(rank); // "A"
     */
    getQueue() {
        return this._queue;
    }
    addToQueue(config) {
        const player = new pokerPlayer_1.PokerPlayer(config);
        this._queue.push(player);
        return true;
    }
    /**
     * @method `getTable`
     * @public
     * Returns the poker room's `name`.
     * @returns {PokerTableInterface} The poker room's `name`.
     *
     * @example
     * const rank = card.getName();
     * console.log(rank); // "A"
     */
    getTable() {
        return this._table;
    }
    /**
     * @method `setId`
     * @private
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.setRank();
     * console.log(rank); // "A"
     */
    setId(id) {
        this._id = id;
        return this._id;
    }
    /**
     * @method `setName`
     * @private
     * Returns the poker room's `name`.
     * @returns {string} The poker room's `name`.
     *
     * @example
     * const rank = card.setName();
     * console.log(rank); // "A"
     */
    setName(name) {
        this._name = name;
        return this._name;
    }
    /**
     * @method `setQueue`
     * @private
     * Returns the poker room's `name`.
     * @returns {PokerPlayerInterface[]} The poker room's `name`.
     *
     * @example
     * const rank = card.setName();
     * console.log(rank); // "A"
     */
    setQueue(queue) {
        this._queue = queue;
        return this._queue;
    }
    /**
     * @method `setTable`
     * @private
     * Returns the poker room's `name`.
     * @returns {PokerTableInterface} The poker room's `name`.
     *
     * @example
     * const rank = card.setName();
     * console.log(rank); // "A"
     */
    setTable(table) {
        this._table = table;
        return this._table;
    }
    moveToTable(seatPostion) {
        let roomSeats = this.getTable().getSeats();
        for (let index = 0; index < roomSeats.length; index++) {
            if (roomSeats[index].getPosition() === seatPostion &&
                !roomSeats[index].isOccupied() &&
                this.getQueue().length >= 1) {
                let queue = this.getQueue();
                let pokerPlayer = queue.splice(0, 1);
                this.setQueue(queue);
                roomSeats[index].setPlayer(pokerPlayer[0]);
                return true;
            }
        }
        return false;
    }
}
exports.PokerRoom = PokerRoom;
//# sourceMappingURL=index.js.map