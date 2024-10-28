import { EventEmitter } from "events";
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
  PokerTableConfig,
  PokerTableInterface,
} from "../../interfaces";
import { PokerSeat } from "../pokerSeat";

/**
 * @interface `PokerTable`
 * Represents a PokerTable within a PokerRoom.
 * The PokerTable manages player seats, tracks the dealer, small blind, and big blind positions,
 * and handles the start and stop of the PokerGame.
 *
 * @extends EventEmitter
 */
class PokerTable extends EventEmitter implements PokerTableInterface {
  /******************* PROPERTIES *******************/

  /**
   * @property {string} __id
   * A unique identifier for the PokerTable.
   */
  private __id: string = ``;

  /**
   * @property {number} __smallBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __smallBlindAmount: number = 5;

  /**
   * @property {number} __bigBlindAmount
   * The maximum number of players that can be seated at the PokerTable[2-14].
   */
  private __bigBlindAmount: number = this.__smallBlindAmount*2;

  /**
   * @property {PokerSeatInterface[]} __seats
   * An array of players currently seated at the PokerTable.
   */
  private __seats: PokerSeatInterface[] =[];

  /**
   * @property {boolean} gameInProgress
   * A boolean indicating whether a PokerGame is currently in progress at the table.
   */
  private __gameInProgress: boolean = false;

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config: PokerTableConfig | undefined) {
    super();
    this.__init(config);
  }
  /**
   * @method `init`
   * @private
   * Initializes the deck with 52 unique cards.
   * This method is called automatically inside the constructor during deck creation.
   * @emits `deck:initialized` : Emits a `deck:initialized` event when the deck is created.
   * @returns {void}
   */
  private __init(config: PokerTableConfig | undefined): void {
    if (config) {
      this.__id = config.id ? config.id : this.__id;
      this.__smallBlindAmount = config.smallBlindAmount
        ? config.smallBlindAmount
        : 5;
      this.__bigBlindAmount = this.__smallBlindAmount * 2;
      this.__seats = [];
      this.__gameInProgress = false;
      
      for (let i = 0; this.getSeats().length !== config.size; i++) {
        const seat = new PokerSeat({
          id: ``,
          position: i,
          isDealer: false,
          isBigBlind: false,
          isSmallBlind: false,
          player: undefined,
        });
        this.__seats?.push(seat);
      }
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
  public getId(): string {
    return this.__id;
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
  private setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  /**
   * @method `getSize`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSize(): number {
    return this.getSeats().length;
  }

  /**
   * @method `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSeats(): PokerSeatInterface[] {
    return this.__seats;
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
  private setSeats(seats: PokerSeatInterface[]): boolean {
    this.__seats = seats;
    return true;
  }

  private occupySeat(position: number, player: PokerPlayerInterface): boolean {
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
