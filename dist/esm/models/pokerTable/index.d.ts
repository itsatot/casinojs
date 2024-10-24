import { EventEmitter } from "events";
import { PokerSeatInterface, PokerTableConfig, PokerTableInterface } from "../../interfaces";
/**
 * @interface `PokerTable`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
declare class PokerTable extends EventEmitter implements PokerTableInterface {
    /******************* PROPERTIES *******************/
    /**
     * @property {string} _id
     * A unique identifier for the PokerTable.
     */
    private _id;
    /**
     * @property {PokerSeatInterface[]} _seats
     * An array of players currently seated at the PokerTable.
     */
    private _seats;
    /**
     * @property {boolean} gameInProgress
     * A boolean indicating whether a PokerGame is currently in progress at the table.
     */
    private _gameInProgress;
    /**
     * @method constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor(config: PokerTableConfig);
    /**
     * @method `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    private init;
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
     * @method `setId`
     * @public
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    private setId;
    /**
     * @method `getSize`
     * Starts a new PokerGame if there are at least two active players at the PokerTable.
     * This method initiates the game flow, including assigning blinds and starting the rounds.
     * @returns {number}
     */
    getSize(): number;
    /**
     * @method `getSeats`
     * Starts a new PokerGame if there are at least two active players at the PokerTable.
     * This method initiates the game flow, including assigning blinds and starting the rounds.
     * @returns {number}
     */
    getSeats(): PokerSeatInterface[];
    /**
     * @method `setSeats`
     * @public
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    private setSeats;
    private occupySeat;
}
export { PokerTable };
