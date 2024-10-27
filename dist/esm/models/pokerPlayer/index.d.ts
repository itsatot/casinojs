import { EventEmitter } from "events";
import { CardInterface, PokerPlayerConfig, PokerPlayerInterface } from "../../interfaces";
/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
declare class PokerPlayer extends EventEmitter implements PokerPlayerInterface {
    /******************* PROPERTIES *******************/
    /**
     * @property {string} _id
     * @private
     * A unique identifier for the PokerPlayer.
     */
    private _id;
    /**
     * @property {string} _name
     * @private
     * The player's name or alias.
     */
    private _name;
    /**
     * @property {number} _chips
     * @private
     * The number of chips the player currently has.
     */
    private _chips;
    /**
     * @property {CardInterface[]} _hand
     * @private
     * The player's hole cards (the two cards dealt to the player at the start of the game).
     */
    private _hand;
    /**
     * @property {boolean} _isFolded
     * @private
     * Indicates whether the player is still active in the current round or has folded.
     */
    private _isFolded;
    /**
   * @property {boolean} _isFolded
   * @private
   * Indicates whether the player is still active in the current round or has folded.
   */
    private _isBetMatched;
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
    constructor(config: PokerPlayerConfig);
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
    getId(): string;
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
    getName(): string;
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
    getChips(): number;
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
    getHand(): CardInterface[];
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
    isFolded(): boolean;
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
    isBetMatched(): boolean;
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
    private setId;
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
    setName(name: string): string;
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
    private setChips;
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
    setHand(hand: CardInterface[]): CardInterface[];
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
    setIsFolded(bool: boolean): boolean;
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
    setisBetMatched(betMatched: boolean): boolean;
    bet(amount: number): boolean;
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
    addToHand(hand: CardInterface): boolean;
}
export { PokerPlayer };
