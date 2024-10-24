import { EventEmitter } from "events";
import { PokerPlayerInterface, PokerSeatConfig, PokerSeatInterface } from "../../interfaces";
/**
 * @interface `PokerSeat`
 * Represents a PokerSeat within a PokerRoom.
 * The PokerSeat manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
declare class PokerSeat extends EventEmitter implements PokerSeatInterface {
    /******************* PROPERTIES *******************/
    /**
     * @property {string} _id
     * A unique identifier for the PokerSeat.
     */
    private _id;
    /**
     * @property {number} position
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _position;
    /**
     * @property {boolean} isDealer
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _isDealer;
    /**
     * @property {PokerPlayerInterface | undefined} player
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    private _player;
    /**
     * @method constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor(config: PokerSeatConfig);
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
     * @method `getPosition`
     * @public
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getPosition(): number;
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
    private setPosition;
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
    isDealer(): boolean;
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
    setIsDealer(bool: boolean): boolean;
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
    getPlayer(): PokerPlayerInterface | undefined;
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
    setPlayer(player: PokerPlayerInterface | undefined): PokerPlayerInterface | undefined;
    isOccupied(): boolean;
}
export { PokerSeat };
