import { EventEmitter } from "events";
import { PokerSeat } from "../pokerSeat";
/**
 * @interface `PokerTable`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerTable extends EventEmitter {
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
        this._seats = [];
        this._gameInProgress = false;
        this.init(config.size ? config.size : 8);
    }
    /**
     * @method `init`
     * @private
     * Initializes the deck with 52 unique cards.
     * This method is called automatically inside the constructor during deck creation.
     * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
     * @returns {void}
     */
    init(size) {
        for (let i = 0; this.getSeats().length !== size; i++) {
            const seat = new PokerSeat({
                id: ``,
                position: i,
                isDealer: false,
                isBigBlind: false,
                isSmallBlind: false,
                player: undefined,
            });
            this._seats?.push(seat);
        }
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
     * @method `getSize`
     * Starts a new PokerGame if there are at least two active players at the PokerTable.
     * This method initiates the game flow, including assigning blinds and starting the rounds.
     * @returns {number}
     */
    getSize() {
        return this.getSeats().length;
    }
    /**
     * @method `getSeats`
     * Starts a new PokerGame if there are at least two active players at the PokerTable.
     * This method initiates the game flow, including assigning blinds and starting the rounds.
     * @returns {number}
     */
    getSeats() {
        return this._seats;
    }
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
    setSeats(seats) {
        this._seats = seats;
        return true;
    }
    occupySeat(position, player) {
        for (let i = 0; i < this.getSeats().length; i++) {
            let seat = this.getSeats()[i];
            let seatPosition = seat.getPosition();
            if (seatPosition === position) {
                if (!seat.isOccupied()) {
                    seat.setPlayer(player);
                    console.log("Seat has been assigned");
                    return true;
                }
            }
        }
        return false;
    }
}
export { PokerTable };
//# sourceMappingURL=index.js.map