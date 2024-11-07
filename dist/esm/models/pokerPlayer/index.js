//@collapse
// Import Models
import { BaseEventEmitter } from "../_base";
// Import Utils
import { generateUniqueId } from "../../utils";
/**
 * @class `PokerPlayerInterface`
 * Represents a player seated at the PokerTable.
 * The player can place bets, fold, and manage their chip stack during the game.
 */
class PokerPlayer extends BaseEventEmitter {
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
    constructor(config) {
        super();
        /**************************************************************************************************************
         * PROPERTIES
         **************************************************************************************************************/
        /**
         * @property {string} _id
         * @private
         * A unique identifier for the PokerPlayer.
         */
        this.__id = ``;
        /**
         * @property {string} _name
         * @private
         * The player's name or alias.
         */
        this.__name = ``;
        /**
         * @property {number} _chips
         * @private
         * The number of chips the player currently has.
         */
        this.__chips = 100;
        /**
         * @property {CardInterface[]} _hand
         * @private
         * The player's hole cards (the two cards dealt to the player at the start of the game).
         */
        this.__hand = [];
        /**
         * @property {boolean} _isFolded
         * @private
         * Indicates whether the player is still active in the current round or has folded.
         */
        this.__isFolded = false;
        /**
         * @property {boolean} _isFolded
         * @private
         * Indicates whether the player is still active in the current round or has folded.
         */
        this.__isBetMatched = false;
        this.__init(config);
    }
    __init(config) {
        if (config) {
            this.__id = config.id ? config.id : generateUniqueId();
            this.__name = config.name ? config.name : this.__name;
            this.__chips = config.chips ? config.chips : this.__chips;
            this.__hand = config.hand ? config.hand : this.__hand;
            this.__isFolded = config.isFolded ? config.isFolded : this.__isFolded;
            this.__isBetMatched = this.__isBetMatched;
        }
    }
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
    setName(name) {
        return this._setName(name);
    }
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
    setChips(chips) {
        return this._setChips(chips);
    }
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
    setHand(hand) {
        return this._setHand(hand);
    }
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
    setisBetMatched(betMatched) {
        return this.__setisBetMatched(betMatched);
    }
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
    setIsFolded(bool) {
        return this.__setIsFolded(bool);
    }
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
    getId() {
        return this.__id;
    }
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
    getName() {
        return this.__name;
    }
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
    getChips() {
        return this.__chips;
    }
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
    getHand() {
        return this.__hand;
    }
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
    isFolded() {
        return this.__isFolded;
    }
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
    isBetMatched() {
        return this.__isBetMatched;
    }
    /**************************************************************************************************************
     * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
     **************************************************************************************************************/
    bet(amount) {
        this.__chips = this.getChips() - amount;
        return true;
    }
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
    addToHand(hand) {
        this.getHand().push(hand);
        return true;
    }
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
    _setName(name) {
        this.__name = name;
        return this.__name;
    }
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
    _setChips(chips) {
        this.__chips = chips;
        return this.__chips;
    }
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
    _setHand(hand) {
        this.__hand = hand;
        return this.__hand;
    }
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
    __setId(id) {
        this.__id = id;
        return this.__id;
    }
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
    __setIsFolded(bool) {
        this.__isFolded = bool;
        return this.__isFolded;
    }
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
    __setisBetMatched(betMatched) {
        this.__isBetMatched = betMatched;
        return this.__isBetMatched;
    }
}
export { PokerPlayer };
//# sourceMappingURL=index.js.map