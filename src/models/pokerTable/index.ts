//@collapse

// Import Enums
import {
  PokerSeatEvents,
  LogLevel,
  Source,
  PokerTableEvents,
  PokerSeatRoles,
} from "../../enums";

// Import Interfaces
import {
  PokerPlayerInterface,
  PokerSeatInterface,
  PokerTableConfig,
  PokerTableInterface,
  PokerPlayerConfig,
  BaseEventInterface,
  PokerGameInterface,
  PokerGameConfig,
  PokerSeatConfig,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { PokerPlayer } from "../pokerPlayer";
import { PokerSeat } from "../pokerSeat";

// Import Utils
import { generateUniqueId, logger } from "../../utils";
import { PokerGame } from "../pokerGame";
import { exit } from "process";

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
 * This class extends the Node.js `BaseEventEmitter`, enabling it to emit events for key actions such as player seating,
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
class PokerTable extends BaseEventEmitter implements PokerTableInterface {
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
  private __id: string = ``;

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
  private __smallBlind: number = 1;

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

  private __game: PokerGameInterface | undefined = undefined;

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * #### Description
   * Creates a new `PokerTable` instance with configuration settings for table ID, small blind, and number of seats.
   * If a configuration object is provided, it customizes the table based on this data; otherwise, default values are used.
   *
   * #### Implements
   * - N/A (standard constructor for object instantiation).
   *
   * #### Overrides
   * - N/A
   *
   * #### Purpose
   * This constructor initiates a new instance of `PokerTable`, setting up basic table properties and triggering the initialization process.
   *
   * #### Parameters
   * - `config` _(optional)_: A configuration object that includes table properties such as `id`, `smallBlind`, and `size`.
   *
   * #### Requirements
   * - **Optional**: If no configuration is provided, default values for small blind and seat count are applied.
   *
   * #### Usage
   * This constructor is typically called when a new table is added to a poker room, allowing optional customization for game settings.
   *
   * @param {PokerTableConfig} [config] - Configuration settings for the poker table.
   *
   * @example
   * ```typescript
   * const config = { id: "Table42", smallBlind: 25, size: 6 };
   * const pokerTable = new PokerTable(config);
   * console.log(pokerTable.getSeats().length); // Output: 6
   * ```
   */
  constructor(config?: PokerTableConfig) {
    super();
    this.__init(config);
  }

  /**
   * #### Description
   * The `__init` method initializes the table based on a provided configuration, setting up the table ID, blinds, and seating arrangement.
   * It is automatically called within the constructor during instantiation.
   *
   * #### Implements
   * - N/A (private method).
   *
   * #### Overrides
   * - N/A
   *
   * #### Purpose
   * This method completes the setup of the poker table by establishing its unique ID, small blind amount, and number of seats.
   * It also triggers the seating arrangement based on the specified or default seat count.
   *
   * #### Events
   * - Emits `table:initialized` when the table setup is complete, allowing external components to take actions upon initialization.
   *
   * #### Parameters
   * - `config` _(optional)_: A configuration object that can contain `id`, `smallBlind`, and `size` properties.
   *
   * #### Requirements
   * - **Optional**: If no configuration is provided, it will default to a table with a small blind of 5 and a standard seating arrangement.
   *
   * #### Returns
   * - `void`: This method does not return any value.
   *
   * #### Usage
   * Used internally within the constructor to complete table setup, including assigning blinds and initializing seats.
   *
   * @param {PokerTableConfig} [config] - Configuration settings for initializing the poker table.
   * @returns {void} - No return value.
   *
   * @example
   * ```typescript
   * const pokerTable = new PokerTable({ id: "MainTable", smallBlind: 20, size: 8 });
   * pokerTable.on("table:initialized", () => console.log("Table setup complete"));
   * ```
   */
  private __init(config?: PokerTableConfig): void {
    if (config) {
      // Set the unique seat ID; generate a new ID if not provided.
      config.id && config.id !== ``
        ? this.__setId(config.id)
        : this.__setId(generateUniqueId());

      // Set the unique seat ID; generate a new ID if not provided.
      config.smallBlind && config.smallBlind > 0
        ? this.__setSmallBlind(config.smallBlind)
        : this.__setSmallBlind(this.__smallBlind || 1);

      this.__bigBlindAmount = this.__smallBlind * 2;
      this.__seats = [];
      this.__gameInProgress = false;

      for (let i = 0; this.getSeats().length !== config.size; i++) {
        const seat = new PokerSeat({
          position: i,
        });
        this.__seats?.push(seat);

        seat.on(PokerSeatEvents.OCCUPIED, (event) => {
          this.__seatOccupancyUpdateEventHandler();
        });

        seat.on(PokerSeatEvents.VACATED, (event) => {
          this.__seatOccupancyUpdateEventHandler();
        });
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
    return this.__setName(name);
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
  public getId(): string {
    return this.__id;
  }

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
  public getName(): string {
    return this.__name;
  }

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
  public getSmallBlind(): number {
    return this.__smallBlind;
  }

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
  public getBigBlind(): number {
    return this.__bigBlindAmount;
  }

  /**
   * `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getSeats(): PokerSeatInterface[] {
    return this.__seats;
  }

  /**
   * `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public getGame(): PokerGameInterface | undefined {
    return this.__game;
  }

  /**
   * `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  public isGameInProgress(): boolean {
    return this.__gameInProgress;
  }
  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**
   * update
   */
  public updateBlinds(smallBlind: number) {
    this.__setSmallBlind(smallBlind);
    this.__setBigBlind(this.getSmallBlind() * 2);
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
  public occupancyCount(): number {
    let occupiedSeats = 0;

    for (let i = 0; i < this.getSeats().length; i++) {
      let seat = this.getSeats()[i];
      if (seat.getPlayer()) {
        occupiedSeats += 1;
      }
    }

    return occupiedSeats;
  }
  /**
   * `size`
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

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * `setId`
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

  private __setName(name: string): string {
    this.__name = name;
    return this.__name;
  }

  private __setSmallBlind(smallBlind: number): number {
    if (smallBlind <= 0) {
      throw new Error(
        `${Source.POKER_TABLE}: Small Blind should always be greator than 0.`
      );
    }

    // Set the small blind for the table and return it.
    this.__smallBlind = smallBlind;
    return this.__smallBlind;
  }

  private __setBigBlind(bigBlind: number): number {
    return (this.__bigBlindAmount = bigBlind);
  }

  /**
   * `setSeats`
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

  /**
   * `getSeats`
   * Starts a new PokerGame if there are at least two active players at the PokerTable.
   * This method initiates the game flow, including assigning blinds and starting the rounds.
   * @returns {number}
   */
  private __setGameInProgress(bool: boolean): boolean {
    this.__gameInProgress = bool;
    return this.__gameInProgress;
  }

  /**
   * `setSeats`
   * @public
   * Returns the poker table's `id`.
   * @returns {number} The poker table's `id`.
   *
   * @example
   * const rank = card.getRank();
   * console.log(rank); // "A"
   */
  private __setGame(
    game: PokerGameInterface | undefined
  ): PokerGameInterface | undefined {
    this.__game = game;
    return this.__game;
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
          seat.occupy(player);
          console.log("Seat has been assigned");
          return true;
        }
      }
    }
    return false;
  }

  public assignRoles(): void | false {
    this.__assignRoles();
  }

  private __assignRoles(): void | false {
    if (this.occupancyCount() === 2) {
      let foundDealer = false;
      // Iterate over each seat to find the minimum occupied seat position
      for (let i = 0; i < this.getSeats().length; i++) {
        let seat = this.getSeats()[i];

        // Check if the seat is occupied
        if (seat.isOccupied()) {
          if (!foundDealer) {
            // First occupied seat gets DEALER and SMALLBLIND roles
            seat.addRole(PokerSeatRoles.DEALER);
            seat.addRole(PokerSeatRoles.SMALLBLIND);
            foundDealer = true;
          } else {
            // Next occupied seat gets BIGBLIND role
            seat.addRole(PokerSeatRoles.BIGBLIND);
            break; // Exit loop after assigning BIGBLIND
          }
        }
      }
    } else if (this.occupancyCount() > 2) {
      const seats = this.getSeats();
      let dealerAssigned = false;
      let smallBlindAssigned = false;
      let bigBlindAssigned = false;

      for (let i = 0; i < seats.length; i++) {
        let seat = seats[i];

        // Check if the seat is occupied
        if (seat.isOccupied()) {
          if (!dealerAssigned) {
            // First occupied seat gets DEALER role
            seat.addRole(PokerSeatRoles.DEALER);
            dealerAssigned = true;
          } else if (!smallBlindAssigned) {
            // Next occupied seat after DEALER gets SMALLBLIND role
            seat.addRole(PokerSeatRoles.SMALLBLIND);
            smallBlindAssigned = true;
          } else if (!bigBlindAssigned) {
            // Next occupied seat after SMALLBLIND gets BIGBLIND role
            seat.addRole(PokerSeatRoles.BIGBLIND);
            bigBlindAssigned = true;
            break; // Exit loop after assigning BIGBLIND
          }
        }
      }
    }
  }

  private __assignRolesMiddleware(
    event: BaseEventInterface,
    next: () => void
  ): void | false {
    this.__assignRoles();
    next();
  }

  /**
   * #### Description
   * Checks seat availability to determine if it can be occupied by a player.
   *
   * @param {BaseEventInterface} event - The event object containing event data.
   * @param {() => void} next - The next middleware function to call if seat is available.
   */
  private __checkIfGameInProgress(
    event: BaseEventInterface,
    next: () => void
  ): void | false {
    if (this.isGameInProgress()) {
      logger.log(
        LogLevel.WARN,
        "Failed to occupy seat: seat is already occupied.",
        {
          seatId: this.getId(),
        }
      );
      return false;
    }

    event.lastModifiedAt = new Date();
    next();
  }

  private __checkOccupancyCount(
    event: BaseEventInterface,
    next: () => void
  ): void | false {
    let occupiedSeats = this.occupancyCount();

    // Check if all seats are occupied
    if (occupiedSeats === this.getSeats().length) {
      logger.log(LogLevel.WARN, "All seats are occupied", event);
      return false;
    }

    // Update the event timestamp and call the next middleware function
    event.lastModifiedAt = new Date();
    event.occupancyCount = occupiedSeats;
    next();
  }

  private __validatePlayerBalances(
    event: BaseEventInterface,
    next: () => void
  ): void | false {
    const bigBlind = this.getBigBlind();

    // Loop through each seat to check player balances
    for (let seat of this.getSeats()) {
      const player = seat.getPlayer();

      // If the seat is occupied, check the player's balance
      if (player) {
        const playerBalance = player.getChips();

        if (playerBalance < bigBlind) {
          // Log a warning if a player has insufficient funds and halt the game initialization
          logger.log(
            LogLevel.WARN,
            `${
              Source.POKER_TABLE
            }: Player ${player.getId()} has insufficient balance (${playerBalance}). Minimum required is ${bigBlind}.`,
            {
              tableId: this.getId(),
              playerId: player.getId(),
              requiredBalance: bigBlind,
            }
          );

          return false;
        }
      }
    }

    // If all players have sufficient balance, proceed to the next middleware
    event.lastModifiedAt = new Date();
    next();
  }

  private __createGamePlayersList(
    event: BaseEventInterface,
    next: () => void
  ): void | false {
    if (event.occupancyCount >= 2) {
      let players: PokerPlayerInterface[] = [];
      let isDealerPosition = 0;

      this.getSeats().forEach((seat, index) => {
        let player = seat.getPlayer();

        if (player) {
          if (seat.getRoles().includes(PokerSeatRoles.DEALER)) {
            players.push(player);
            isDealerPosition = index;
          }
        }
      });

      for (let i = 0; i < 2; i++) {
        if ((i = 0)) {
          for (let j = 0; j < this.getSeats().length; j++) {
            let seat = this.getSeats()[j];
            let player = seat.getPlayer();
            if (player && seat.getPosition() > isDealerPosition) {
              players.push(player);
            }
          }
        } else if ((i = 1)) {
          for (let k = 0; k < this.getSeats().length; k++) {
            let seat = this.getSeats()[k];
            let player = seat.getPlayer();
            if (player && seat.getPosition() < isDealerPosition) {
              players.push(player);
            }
          }
        }
      }

      event.players = players;
      event.dealerPosition = isDealerPosition;
      event.lastModifiedAt = new Date();
    }
    next();
  }

  private __startGame(event: BaseEventInterface): void {
    let config: PokerGameConfig = {
      smallBlind: this.getSmallBlind(),
      bigBlind: this.getBigBlind(),
      players: event.players,
    };
    let newGame = new PokerGame(config);
    this.__setGame(newGame);
  }

  private __seatOccupancyUpdateEventHandler(event?: BaseEventInterface): void {
    this.emitEvent(PokerTableEvents.NEW_GAME, {
      event: { source: Source.POKER_TABLE, data: { tableId: this.getId() } },
      middlewares: [
        (event, next) => {
          this.__checkIfGameInProgress(event, next);
        },
        (event, next) => {
          this.__checkOccupancyCount(event, next);
        },
        (event, next) => {
          this.__assignRolesMiddleware(event, next);
        },
        (event, next) => {
          this.__validatePlayerBalances(event, next);
        },
        (event, next) => {
          this.__createGamePlayersList(event, next);
        },
        (event) => {
          this.__startGame(event);
        },
      ],
    });
  }
}
export { PokerTable };
