import { BaseEventEmitterInterface } from "../_base";
import { PokerPlayerInterface } from "../pokerPlayer";
/**
 * @interface `PokerSeatConfig`
 * Represents a PokerTable Config.
 */
interface PokerSeatConfig {
    /**
     * @property {string | undefined} id
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    id?: string;
    /**
     * @property {number} position
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    position: number;
    /**
     * @property {boolean} isDealer
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    isDealer?: boolean;
    /**
     * @property {PokerPlayerInterface | undefined} player
     * The maximum number of players that can be seated at the PokerTable[2-14].
     */
    player?: PokerPlayerInterface;
}
/**
 * @interface `PokerSeatInterface`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerSeatInterface extends BaseEventEmitterInterface {
    /**************************************************************************************************************
     * CREATE METHODS (SETTERS & OBJECT CREATION)
     **************************************************************************************************************/
    /**
     * `setIsDealer`
     * @public
     * Returns the poker table's `id`.
     * @returns {boolean} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    setDealer(bool: boolean): boolean;
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
     * `getPosition`
     * @public
     * Returns the poker table's `id`.
     * @returns {number} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getPosition(): number;
    /**
     * `isDealer`
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
     * `getPlayer`
     * @public
     * Returns the poker table's `id`.
     * @returns {PokerPlayerInterface | undefined} The poker table's `id`.
     *
     * @example
     * const rank = card.getRank();
     * console.log(rank); // "A"
     */
    getPlayer(): PokerPlayerInterface | undefined;
    /**************************************************************************************************************
     * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * DELETE METHODS (REMOVING OBJECTS)
     **************************************************************************************************************/
    /**************************************************************************************************************
     * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
     **************************************************************************************************************/
    isOccupied(): boolean;
    occupy(player: PokerPlayerInterface): void;
    vacate(): void;
}
export { PokerSeatConfig, PokerSeatInterface };
