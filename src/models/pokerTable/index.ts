import { EventEmitter } from "events";
import {
  PokerPlayerInterface,
  PokerSeatInterface,
  PokerTableConfig,
  PokerTableInterface,
  PokerPlayerConfig,
} from "../../interfaces";
import { PokerPlayer } from "../pokerPlayer";
import { PokerSeat } from "../pokerSeat";
import { generateUniqueId } from "../../utils";

/**
 * @class `PokerTable`
 *
 * Represents a poker table within a larger casino or poker room environment. This class manages player seating,
 * tracks the positions of the dealer, small blind, and big blind, and coordinates the start and stop of poker games.
 * It includes several methods and properties to control game flow and player seating effectively.
 *
 * #### Purpose
 * The `PokerTable` class is central to organizing poker games within a room. It keeps track of players, manages game
 * states, and ensures a smooth flow of actions at the table by overseeing betting rounds, blind assignments, and game
 * progression.
 *
 * #### Extends
 * This class extends the Node.js `EventEmitter`, enabling it to emit events for key actions such as player seating,
 * game start, or game completion. This event-driven approach facilitates integration with other parts of the casino
 * system, allowing external components to listen and respond to table actions.
 *
 * #### Implements
 * Implements the `PokerTableInterface`, ensuring a consistent structure and a clear contract for managing poker games,
 * player queues, and table configuration.
 *
 * #### Methods Overview
 * The `PokerTable` class includes essential methods for:
 * - **Player Management**: `seatPlayer`, `removePlayer`, `getQueue`, `setQueue`.
 * - **Game Control**: `startGame`, `endGame`, `setBlinds`.
 * - **Table Configuration**: `setTableConfig`, `getTableConfig`, `resetTable`.
 *
 * #### Events Overview
 * The `PokerTable` emits events to signal key actions, including:
 * - `table:playerSeated` - Emitted when a new player is seated.
 * - `table:gameStarted` - Emitted at the start of a new game.
 * - `table:gameEnded` - Emitted upon game completion.
 *
 * #### Usage
 * This class is designed to be used within a larger poker or casino environment, providing a structured system for
 * managing player actions, game states, and blind assignments at a poker table. It offers methods to control various
 * aspects of the game and seating, making it a foundational part of managing poker tables in an organized way.
 *
 * @example
 * ```typescript
 * const pokerTable = new PokerTable();
 * pokerTable.on('table:gameStarted', () => console.log("Game has started"));
 * pokerTable.seatPlayer({ name: "Alice", chips: 100 });
 * pokerTable.startGame();
 * console.log(pokerTable.getQueue()); // Logs the current queue of waiting players
 * ```
 */
class PokerTable extends EventEmitter implements PokerTableInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string} __id
   *
   * A unique identifier for the PokerTable, used to differentiate each table within the Casino system.
   *
   * #### Purpose
   * The `__id` serves as a unique identifier for each PokerTable, allowing for precise management and reference.
   *
   * #### Requirements
   * - **Optional**: Can be auto-generated if not provided.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.getId()); // Console Output: A unique table ID
   * ```
   */
  private __id: string = generateUniqueId();

  /**
   * @property {string} __name
   *
   * A name label for the PokerTable, which can be used in the user interface or logs for easy identification.
   *
   * #### Purpose
   * Provides a human-readable label for the table, aiding both administrators and players in table identification.
   *
   * #### Requirements
   * - **Optional**: If not set, it defaults to an empty string.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * table.setName("High Stakes Table");
   * console.log(table.getName()); // Console Output: "High Stakes Table"
   * ```
   */
  private __name: string = ``;

  /**
   * @property {number} __smallBlind
   *
   * Defines the small blind amount for the table, setting the minimum bet that initiates the betting round.
   *
   * #### Purpose
   * Establishes the basic small blind amount for the game, setting a standard for betting progression at this table.
   *
   * #### Requirements
   * - **Default**: 5
   * - **Non-Negotiable**: Must be a positive number.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.getSmallBlind()); // Console Output: 5
   * ```
   */
  private __smallBlind: number = 5;

  /**
   * @property {number} __bigBlindAmount
   *
   * Represents the big blind amount, which is usually double the small blind and a required ante for players.
   *
   * #### Purpose
   * Sets the big blind, which defines the minimum second bet for the table, supporting the betting structure.
   *
   * #### Requirements
   * - **Default**: Twice the small blind amount.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.getBigBlind()); // Console Output: 10
   * ```
   */
  private __bigBlindAmount: number = this.__smallBlind * 2;

  /**
   * @property {PokerSeatInterface[]} __seats
   *
   * An array that stores each player’s seating arrangement, tracking available and occupied seats at the table.
   *
   * #### Purpose
   * The `__seats` property enables efficient management of seating arrangements for the players at the table.
   *
   * #### Requirements
   * - **Optional**: Starts as an empty array, populated as players take seats.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.getSeats());
   *
   * // Console Output: [] (initially empty)
   * ```
   */
  private __seats: PokerSeatInterface[] = [];

  /**
   * @property {PokerPlayerInterface[]} __queue
   *
   * A queue of players waiting to join the table, useful in cases where the table has limited seating.
   *
   * #### Purpose
   * The queue ensures that players awaiting an open seat can be managed and seated as spots become available.
   *
   * #### Requirements
   * - **Optional**: Begins as an empty array.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.getQueue()); // Console Output: [] (initially empty)
   * ```
   */
  private __queue: PokerPlayerInterface[] = [];

  /**
   * @property {boolean} __gameInProgress
   *
   * Indicates if a poker game is currently active at the table.
   *
   * #### Purpose
   * Helps track the table’s state, signaling whether a game is in progress or the table is free.
   *
   * #### Requirements
   * - **Default**: `false`, meaning the table is initially open for new games.
   *
   * @example
   * ```typescript
   * const table = new PokerTable();
   * console.log(table.isGameInProgress());
   *
   * // Console Output: false (initially)
   * ```
   */
  private __gameInProgress: boolean = false;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * @method constructor
   * @public
   * Creates an instance of a Deck with 52 cards.
   * Automatically initializes the deck with all combinations of ranks and suits.
   *
   * @example
   * const deck = new Deck();
   */
  constructor(config?: PokerTableConfig) {
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
  private __init(config?: PokerTableConfig): void {
    if (config) {
      this.__id = config.id ? config.id : generateUniqueId();
      this.__smallBlind = config.smallBlind ? config.smallBlind : 5;
      this.__bigBlindAmount = this.__smallBlind * 2;
      this.__seats = [];
      this.__gameInProgress = false;

      for (let i = 0; this.getSeats().length !== config.size; i++) {
        const seat = new PokerSeat({
          id: ``,
          position: i,
          isDealer: false,
          player: undefined,
        });
        this.__seats?.push(seat);
      }
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
  public setName(name: string): string {
    return this._setName(name);
  }

  /**
   * #### Description
   * Sets the queue of players waiting to enter the `PokerTable` within the `PokerRoom`. This queue helps
   * manage player flow and assign seating as tables become available.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setQueue` method provides a structured way to set or update the player queue. This queue is essential
   * for room management, helping to keep a record of players awaiting entry and manage seating arrangements.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `queue`: An array of `PokerPlayerInterface` objects, each representing a player awaiting entry into the room’s `PokerTable`.
   *
   * #### Requirements
   * - `queue` should be an array of valid `PokerPlayerInterface` instances.
   * - If empty, the queue indicates that no players are currently waiting for entry.
   *
   * #### Returns
   * - Returns the `queue` array after updating it within the room.
   *
   * #### Usage
   * Use this method to set or update the player queue in cases where player flow needs control,
   * ensuring smooth transitions as players are seated at the table.
   *
   * @param {PokerPlayerInterface[]} queue - The new list of players waiting to enter the table.
   * @returns {PokerPlayerInterface[]} - Returns the updated player queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room2", tableSize: 6 });
   * const queue = [new PokerPlayer("Alice"), new PokerPlayer("Bob")];
   * pokerRoom.setQueue(queue); // Sets the player queue
   * console.log(pokerRoom.getQueue()); // Logs the updated player queue
   * ```
   */
  public setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[] {
    return this._setQueue(queue);
  }

  /**
   * #### Description
   * Sets the queue of players waiting to enter the `PokerTable` within the `PokerRoom`. This queue helps
   * manage player flow and assign seating as tables become available.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setQueue` method provides a structured way to set or update the player queue. This queue is essential
   * for room management, helping to keep a record of players awaiting entry and manage seating arrangements.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `queue`: An array of `PokerPlayerInterface` objects, each representing a player awaiting entry into the room’s `PokerTable`.
   *
   * #### Requirements
   * - `queue` should be an array of valid `PokerPlayerInterface` instances.
   * - If empty, the queue indicates that no players are currently waiting for entry.
   *
   * #### Returns
   * - Returns the `queue` array after updating it within the room.
   *
   * #### Usage
   * Use this method to set or update the player queue in cases where player flow needs control,
   * ensuring smooth transitions as players are seated at the table.
   *
   * @param {PokerPlayerInterface[]} queue - The new list of players waiting to enter the table.
   * @returns {PokerPlayerInterface[]} - Returns the updated player queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room2", tableSize: 6 });
   * const queue = [new PokerPlayer("Alice"), new PokerPlayer("Bob")];
   * pokerRoom.setQueue(queue); // Sets the player queue
   * console.log(pokerRoom.getQueue()); // Logs the updated player queue
   * ```
   */
  public setSmallBlind(smallBlind: number): number {
    return this._setSmallBlind(smallBlind);
  }

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

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
   * @method `getId`
   * @public
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  public getSmallBlind(): number {
    return this.__smallBlind;
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
  public getBigBlind(): number {
    return this.__bigBlindAmount;
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
   * #### Description
   * Retrieves the current queue of players awaiting seating in the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is part of `PokerRoomInterface` without implementing external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getQueue` method is essential for accessing the list of players waiting for a seat in the `PokerRoom`.
   * It provides insight into the queue length and composition, helping manage room capacity and player flow.
   *
   * #### Events
   * `N/A` - This method does not emit any events.
   *
   * #### Parameters
   * `N/A` - No parameters are required for this method.
   *
   * #### Requirements
   * `N/A` - This method simply returns the existing queue without modifying it.
   *
   * #### Returns
   * - Returns an array of `PokerPlayerInterface` instances, representing the players in the waiting queue.
   *
   * #### Usage
   * Call this method to view the list of players awaiting entry to the room. This can be used for monitoring,
   * player assignment, and room management purposes.
   *
   * @returns {PokerPlayerInterface[]} - An array containing the players in the waiting queue.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Lobby", tableSize: 6 });
   * console.log(pokerRoom.getQueue()); // Logs an array of players awaiting seating
   * ```
   */
  public getQueue(): PokerPlayerInterface[] {
    return this.__queue;
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

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
  public addToQueue(config: PokerPlayerConfig): boolean {
    const player = new PokerPlayer(config);
    this.__queue.push(player);
    return true;
  }

  public moveToTable(seatPostion: number): boolean {
    let roomSeats = this.getSeats();
    if (roomSeats) {
      for (let index = 0; index < roomSeats.length; index++) {
        if (
          roomSeats[index].getPosition() === seatPostion &&
          !roomSeats[index].isOccupied() &&
          this.getQueue().length >= 1
        ) {
          let queue = this.getQueue();
          let pokerPlayer = queue.splice(0, 1);
          this.setQueue(queue);
          roomSeats[index].setPlayer(pokerPlayer[0]);
          return true;
        }
      }
    }

    return false;
  }

  /**
   * update
   */
  public updateBlinds(smallBlind: number) {
    this._setSmallBlind(smallBlind);
    this._setBigBlind(this.getSmallBlind() * 2);
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

  /**
   * @method `size`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public size(): number {
    return this.seatCount();
  }

  /**
   * #### Description
   * Returns the total number of `PokerRoom` instances currently managed by the Casino.
   *
   * #### Implements
   * Implements the `roomCount` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Provides a simple way to check how many poker rooms the Casino is currently managing. Useful for general
   * information about the Casino's state and for validating indices or conditions that depend on room count.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * `N/A`
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the number of rooms currently managed by the Casino.
   *
   * #### Usage
   * This method is useful for any scenario where the total number of active rooms is needed, such as iterating
   * over all rooms or validating index-based operations.
   *
   * @returns {number} - The current count of rooms in the Casino.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * const count = casino.roomCount();
   * console.log(count); // Logs the total number of managed rooms, e.g., 5
   * ```
   */
  public seatCount(): number {
    return this.getSeats().length;
  }

  /**
   * #### Description
   * Checks if a provided index is within the valid range of the Casino’s room list.
   *
   * #### Implements
   * Implements the `isValidIndex` method of `CasinoInterface`.
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method helps validate that an index is within the valid bounds of the Casino’s room list. It prevents
   * out-of-bound errors and ensures that methods calling on rooms by index are provided with a valid reference.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `index`: A zero-based integer representing the position of a room in the Casino's managed list of rooms.
   *
   * #### Requirements
   * - The `index` should be a non-negative integer and within the bounds of the `__rooms` array.
   *
   * #### Returns
   * - Returns `true` if the index is within bounds.
   * - Throws an `Error` if the index is out of range.
   *
   * #### Usage
   * Call this method before performing operations that require a valid room index to prevent out-of-bounds errors.
   * Can be used in any index-based access patterns for room retrieval or modification.
   *
   * @param {number} index - The zero-based index to validate.
   * @returns {boolean} - Returns `true` if the index is within bounds.
   *
   * @throws {Error} - Throws an error with a message indicating the invalid index.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * try {
   *   casino.isValidIndex(2); // Returns true if there are at least 3 rooms
   * } catch (error) {
   *   console.error(error.message); // If index 2 is out of bounds, logs error message
   * }
   * ```
   */
  public isValidIndex(index: number): boolean {
    if (index >= 0 && index < this.seatCount()) {
      throw new Error(
        `Invalid index: ${index}. It must be between 0 and ${
          this.seatCount() - 1
        }.`
      );
    } else {
      return true;
    }
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  protected _setName(name: string): string {
    this.__name = name;
    return this.__name;
  }

  protected _setSmallBlind(smallBlind: number): number {
    if (smallBlind <= 0) {
      throw new Error(`Small Blind should always be greator than 0.`);
    } else {
      return (this.__smallBlind = smallBlind);
    }
  }

  protected _setBigBlind(bigBlind: number): number {
    return (this.__bigBlindAmount = bigBlind);
  }

  protected _setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[] {
    this.__queue = queue;
    return this.__queue;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

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
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
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
  private __setSeats(seats: PokerSeatInterface[]): boolean {
    this.__seats = seats;
    return true;
  }

  private __occupySeat(
    position: number,
    player: PokerPlayerInterface
  ): boolean {
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
