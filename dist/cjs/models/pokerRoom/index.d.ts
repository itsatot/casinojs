import { EventEmitter } from "events";
import { PokerRoomConfig, PokerPlayerInterface, PokerRoomInterface, PokerTableInterface, PokerPlayerConfig } from "../../interfaces";
/**
 * @class `PokerRoom`
 * Represents a PokerRoom within a Casino that holds a single PokerTable. The PokerRoom manages the player queue, automatically assigning players to the PokerTable as seats become available.
 * This class extends `EventEmitter` and implements the `PokerRoomInterface` interface.
 */
declare class PokerRoom extends EventEmitter implements PokerRoomInterface {
    /****************************************************************
     * PROPERTIES
     ****************************************************************/
    /**
     * @property {string} _id
     * @private
     * A unique identifier for the PokerRoom.
     */
    private _id;
    /**
     * @property {string} _name
     * @private
     * The name of the PokerRoom.
     */
    private _name;
    /**
     * @property {PokerPlayerInterface[]} _queue
     * @private
     * An array of players who are waiting for a seat at the PokerTable.
     * Every player who enters the PokerRoom is automatically added to this queue.
     */
    private _queue;
    /**
     * @property {PokerTableInterface} _table
     * @private
     * The PokerTable that is contained within the PokerRoom.
     */
    private _table;
    /**
     * @method constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor(config: PokerRoomConfig);
    /****************************************************************
     * GET METHODS
     ****************************************************************/
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
    getId(): string;
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
    getName(): string;
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
    getQueue(): PokerPlayerInterface[];
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
    addToQueue(config: PokerPlayerConfig): boolean;
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
    getTable(): PokerTableInterface;
    /****************************************************************
     * SET METHODS
     ****************************************************************/
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
    private setId;
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
    setName(name: string): string;
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
    setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[];
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
    private setTable;
    /****************************************************************
     * UPDATE METHODS
     ****************************************************************/
    /****************************************************************
     * DELETE METHODS
     ****************************************************************/
    moveToTable(seatPostion: number): boolean;
}
export { PokerRoom };
