import { CardInterface, PokerPlayerConfig, PokerPlayerInterface } from "../../interfaces";
import { BaseEventEmitter } from "../_base";
/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
declare class PokerPlayer extends BaseEventEmitter implements PokerPlayerInterface {
    /**************************************************************************************************************
     * PROPERTIES
     **************************************************************************************************************/
    /**
     * @property {string} _id
     * @private
     * A unique identifier for the PokerPlayer.
     */
    private __id;
    /**
     * @property {string} _name
     * @private
     * The player's name or alias.
     */
    private __name;
    /**
     * @property {number} _chips
     * @private
     * The number of chips the player currently has.
     */
    private __chips;
    /**
     * @property {CardInterface[]} _hand
     * @private
     * The player's hole cards (the two cards dealt to the player at the start of the game).
     */
    private __hand;
    /**
     * @property {boolean} _isFolded
     * @private
     * Indicates whether the player is still active in the current round or has folded.
     */
    private __isFolded;
    /**
     * @property {boolean} _isFolded
     * @private
     * Indicates whether the player is still active in the current round or has folded.
     */
    private __isBetMatched;
    /**************************************************************************************************************
     * CONSTRUCTOR & INITIALIZERS
     **************************************************************************************************************/
    /**
     * constructor
     * @public
     * Creates an instance of a Deck with 52 cards.
     * Automatically initializes the deck with all combinations of ranks and suits.
     *
     * @example
     * const deck = new Deck();
     */
    constructor(config?: PokerPlayerConfig);
    private __init;
    /**************************************************************************************************************
     * CREATE METHODS (SETTERS & OBJECT CREATION)
     **************************************************************************************************************/
    /**
     * #### Description
     * Sets the name of the `PokerRoom`, allowing the name to be updated or customized.
     *
     * #### Implements
     * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
     *
     * #### Overrides
     * `N/A` - This method does not override any superclass or parent methods.
     *
     * #### Purpose
     * The `setName` method is used to assign a specific name to a `PokerRoom`, which helps distinguish it within the system.
     * This is essential for systems where rooms need to be identifiable and manageable through a unique name.
     *
     * #### Events
     * `N/A` - No events are emitted by this method.
     *
     * #### Parameters
     * - `name`: A string representing the new name for the room. It must be a valid, non-empty string to ensure
     *   the room has a clear, identifiable label.
     *
     * #### Requirements
     * - The `name` parameter should be a non-empty string to provide meaningful identification.
     * - Passing an empty or invalid value could result in future misidentification of rooms if validation is implemented.
     *
     * #### Returns
     * - Returns the `name` that was set for the `PokerRoom`.
     *
     * #### Usage
     * Use this method to set or update the name of a room in a system where unique or identifiable room names
     * are necessary for reference.
     *
     * @param {string} name - The new name for the `PokerRoom`.
     * @returns {string} - Returns the name of the room that was set.
     *
     * @example
     * ```typescript
     * const pokerRoom = new PokerRoom({ name: "Room1", tableSize: 6 });
     * pokerRoom.setName("HighRollers"); // Sets the name of the room to "HighRollers"
     * console.log(pokerRoom.getName()); // Logs "HighRollers"
     * ```
     */
    setName(name: string): string;
    /**
     * `setChips`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setChips(chips: number): number;
    /**
     * `setHand`
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
     * `getHand`
     * @public
     * Returns the poker table's `id`.
     * @returns {CardInterface[]} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setisBetMatched(betMatched: boolean): boolean;
    /**
     * `setIsFolded`
     * @private
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setIsFolded(bool: boolean): boolean;
    /**************************************************************************************************************
     * READ METHODS (GETTERS & DATA RETRIEVAL)
     **************************************************************************************************************/
    /**
     * `getId`
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
     * `getName`
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
     * `getChips`
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
     * `getHand`
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
     * `isFolded`
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
     * `getHand`
     * @public
     * Returns the poker table's `id`.
     * @returns {CardInterface[]} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    isBetMatched(): boolean;
    /**************************************************************************************************************
     * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
     **************************************************************************************************************/
    bet(amount: number): boolean;
    /**
     * `setHand`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    addToHand(hand: CardInterface): boolean;
    /**************************************************************************************************************
     * DELETE METHODS (REMOVING OBJECTS)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * WRAPPER METHODS (UTILITY & CONVENIENCE)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * INTERNAL METHODS (PROTECTED)
     **************************************************************************************************************/
    protected _setName(name: string): string;
    /**
     * `setChips`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    protected _setChips(chips: number): number;
    /**
     * `setHand`
     * @private
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    protected _setHand(hand: CardInterface[]): CardInterface[];
    /**************************************************************************************************************
     * INTERNAL METHODS (PRIVATE)
     **************************************************************************************************************/
    /**
     * `setId`
     * @private
     * Returns the poker table's `id`.
     * @returns {string} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    private __setId;
    /**
     * `setIsFolded`
     * @private
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    private __setIsFolded;
    /**
     * `getHand`
     * @public
     * Returns the poker table's `id`.
     * @returns {CardInterface[]} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    private __setisBetMatched;
}
export { PokerPlayer };
