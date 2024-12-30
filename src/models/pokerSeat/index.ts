//@collapse

// Import Enums
import { LogLevel, PokerSeatEvents, Source } from "../../enums";

// Import Interfaces
import {
  PokerPlayerInterface,
  PokerSeatConfig,
  PokerSeatInterface,
  BaseEventInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";

// Import Utils
import { generateUniqueId } from "../../utils/generateUniqueId";

import { logger } from "../../utils/logger";

console.log(BaseEventEmitter);

/**
 * @class `PokerSeat`
 *
 * Represents a single seat at a poker table, managing player occupancy and seat status events.
 * The `PokerSeat` class is central to tracking each player’s seat position, handling seat-related
 * events like occupancy, vacancy, and position designation for dealer or blind roles.
 *
 * #### Purpose
 * `PokerSeat` is designed to provide a controlled environment for managing players at individual
 * seats on a poker table. It facilitates managing seat occupancy, seat status updates, and emitting
 * events that alert the broader poker room to seat changes or player actions.
 *
 * #### Extends
 * This class extends Node.js’s `EventEmitter`, allowing `PokerSeat` to emit events like
 * `seatOccupied` or `seatVacated` to notify other components when a seat’s status changes.
 *
 * #### Implements
 * This class implements `PokerSeatInterface`, providing a standard interface for seat operations,
 * ensuring consistent seat management across various parts of the application.
 *
 * #### Methods Overview
 * The `PokerSeat` includes the following methods:
 * - `occupySeat`: Adds a player to the seat and emits a seat-occupied event.
 * - `vacateSeat`: Removes the player from the seat and emits a seat-vacated event.
 * - `isSeatOccupied`: Checks if the seat is currently occupied.
 * - `assignBlind`: Assigns the small or big blind role to the seat.
 *
 * #### Events Overview
 * The `PokerSeat` class emits events related to player actions at the seat:
 * - **PokerSeat:Occupied**: Emitted when a player occupies the seat.
 * - **PokerSeat:Vacated**: Emitted when the seat is vacated.
 *
 * #### Usage
 * This class standardizes player management at a single seat, supporting operations like setting
 * the dealer or blind role and monitoring seat status.
 *
 * @example
 * ```typescript
 * const pokerSeat = new PokerSeat();
 * pokerSeat.on(PokerSeatEvents.SEAT_OCCUPIED, () => console.log("Seat is now occupied"));
 * pokerSeat.occupySeat(player);
 * console.log(pokerSeat.isSeatOccupied()); // Console Output: true
 * ```
 */
class PokerSeat extends BaseEventEmitter implements PokerSeatInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {string} __id
   *
   * A unique identifier for the `PokerSeat`.
   *
   * #### Purpose
   * The `__id` property uniquely identifies each `PokerSeat` instance, helping to distinguish between different
   * seats at a poker table, especially when multiple seats are involved in the game.
   *
   * #### Requirements
   * - This property is auto-generated upon creation, providing a unique string identifier for each seat.
   * - Immutable: This property is set once and does not change throughout the seat's lifecycle.
   *
   * #### Usage
   * The `__id` is used internally to track and differentiate seats, especially for operations that require distinct
   * seat identification.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * console.log(pokerSeat.getId()); // Outputs a unique identifier, e.g., "123e4567-e89b-12d3-a456-426614174000"
   * ```
   */
  private __id: string = ``;

  /**
   * @property {number} __position
   *
   * Represents the seat's position at the poker table, usually ranging from 0 to the table’s maximum capacity.
   *
   * #### Purpose
   * The `__position` property assigns each seat a specific position on the table, essential for managing seating
   * order, determining player turns, and assigning blinds.
   *
   * #### Requirements
   * - Immutable: This property is set during seat creation and must be within the table’s seating range.
   * - Example range: 0 to 13 for a table with 14 seats.
   *
   * #### Usage
   * The `__position` is used internally to keep track of each seat’s order at the table, allowing logical seat
   * arrangements and role assignments.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat({ position: 3 });
   * console.log(pokerSeat.getPosition()); // Console Output: 3
   * ```
   */
  private __position: number = 0;

  /**
   * @property {boolean} __isDealer
   *
   * Indicates if this seat is designated as the dealer’s seat for the current round.
   *
   * #### Purpose
   * The `__isDealer` property helps track whether a player in this seat is assigned the dealer role, which is critical
   * for determining game flow, blinds, and the starting point of each round.
   *
   * #### Requirements
   * - Mutable: The `__isDealer` value can change between `true` or `false` depending on the game's dealer rotation.
   * - Default: `false` by default, indicating the seat is not a dealer unless explicitly set.
   *
   * #### Usage
   * This property is toggled as the game progresses to assign the dealer role to different seats.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.setDealerStatus(true);
   * console.log(pokerSeat.isDealer()); // Console Output: true, if set as dealer
   * ```
   */
  private __isDealer: boolean = false;

  /**
   * @property {PokerPlayerInterface | undefined} __player
   *
   * Holds the reference to the player occupying this seat, or `undefined` if no player is seated.
   *
   * #### Purpose
   * The `__player` property keeps track of which player occupies this seat, facilitating player-specific interactions,
   * actions, and status updates at the table.
   *
   * #### Requirements
   * - Mutable: The `__player` can be assigned when a player occupies the seat and set to `undefined` when the seat is vacated.
   * - Default: `undefined` by default, indicating no player occupies the seat.
   *
   * #### Usage
   * The `__player` property is set when a player occupies the seat and is cleared when the seat is vacated.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.occupySeat(player); // player implements PokerPlayerInterface
   * console.log(pokerSeat.getPlayer()); // Console Output: <PlayerInstance>
   * ```
   */
  private __player: PokerPlayerInterface | undefined = undefined;

  private __roles!: string[];

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * #### Description
   * The public `constructor` method initializes a new instance of `PokerSeat`, setting up its configuration based on the
   * provided `PokerSeatConfig` parameter. This configuration includes seat properties such as `id`, `position`, `isDealer`,
   * and the `player` occupying the seat.
   *
   * #### Purpose
   * The `constructor` method creates a fully initialized `PokerSeat` instance. It provides a structure for each seat
   * at a poker table and uses the `__init` method to ensure all required configurations are applied.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `config: PokerSeatConfig` - An optional configuration object that defines initial properties for the seat.
   *   This includes the `id`, `position`, `isDealer` status, and the `player`.
   *
   * #### Requirements
   * - The `config` object should be structured to align with the `PokerSeatConfig` interface.
   * - Default values are set if `config` is missing or incomplete.
   *
   * #### Returns
   * - `N/A` - As a constructor, this does not return a value.
   *
   * #### Usage
   * Use this constructor to create new `PokerSeat` instances for each seat at a poker table, each with a unique
   * configuration. This can be particularly useful when setting up multiple seats within a table class.
   *
   * @param {PokerSeatConfig} config - Configuration object for setting initial seat properties.
   *
   * @example
   * ```typescript
   * const seatConfig = { id: "seat1", position: 3, isDealer: false };
   * const pokerSeat = new PokerSeat(seatConfig);
   * console.log(pokerSeat.getPosition()); // Console Output: 3
   * ```
   */
  constructor(config: PokerSeatConfig) {
    super();
    this.__init(config);
  }

  /**
   * #### Description
   * The `__init` method is a private initializer function that applies the provided configuration to the `PokerSeat` instance.
   * It sets the unique `id`, seat `position`, `isDealer` status, and any player occupying the seat. If a property in the
   * configuration is missing, a default value or auto-generated value is assigned.
   *
   * #### Purpose
   * This initializer separates configuration logic from the main `constructor`, enhancing readability and modularity.
   * It ensures that each seat has consistent properties and auto-generates values where necessary, such as `id` if
   * it is not provided.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `config?: PokerSeatConfig` - An optional configuration object that provides initial values for the seat.
   *   - `id: string` - Optional. If provided, sets a unique identifier for the seat. Defaults to an auto-generated ID if missing.
   *   - `position: number` - Optional. Sets the seat’s position at the table. Throws an error if position is undefined.
   *   - `isDealer: boolean` - Optional. Determines if the seat is designated as the dealer seat.
   *   - `player: PokerPlayerInterface | undefined` - Optional. Assigns a player to the seat if occupied.
   *
   * #### Requirements
   * - If `id` is missing, an auto-generated unique identifier is assigned.
   * - `position` must be a valid number within the allowed seating range; otherwise, an error is thrown.
   * - If `isDealer` is omitted, it defaults to `false`.
   * - If `player` is not provided, the seat remains empty (`undefined`).
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * The `__init` method is called by the `constructor` to apply initial configuration to the `PokerSeat`.
   * It sets default values where needed, ensuring a consistent setup for each seat. Typically, this method is not
   * called directly but through the `constructor`.
   *
   * @param {PokerSeatConfig} config - An optional configuration object for initializing seat properties.
   *
   * @example
   * ```typescript
   * const seatConfig = { position: 1, isDealer: true };
   * const pokerSeat = new PokerSeat(seatConfig);
   * // The seat is initialized with position 1 and dealer status as true.
   * ```
   */
  private __init(config?: PokerSeatConfig): void {
    if (config) {
      // Set the unique seat ID; generate a new ID if not provided.
      config.id && config.id !== ``
        ? this.__setId(config.id)
        : this.__setId(generateUniqueId());

      // Set the seat position; if undefined, an error is thrown.
      config.position
        ? this.__setPosition(config.position)
        : new Error(`PokerSeat: Position must be defined for each seat.`);

      // Set the dealer status; default to `false` if not provided.
      config.isDealer
        ? this.setDealer(config.isDealer)
        : this.setDealer(this.__isDealer);

      // Assign a player to the seat if provided; otherwise, seat remains unoccupied.
      config.player
        ? this.__setPlayer(config.player)
        : this.__setPlayer(this.__player);

      // Assign a player to the seat if provided; otherwise, seat remains unoccupied.
      this.__roles = [];
    }

    // Emit `INITIALIZED` event after initialization
    this.emitEvent(PokerSeatEvents.INITIALIZED, {
      event: {
        source: Source.POKER_SEAT,
        data: { seatId: this.getId() },
      },
      middlewares: [],
    });
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `setDealer` method is a public setter that designates the `PokerSeat` instance as the dealer seat if `true`
   * is passed, or removes the dealer designation if `false` is passed.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method allows toggling the dealer status for a seat, which is essential for poker games where the dealer
   * role shifts between players. By marking a seat as the dealer, this method helps manage game flow, particularly
   * in the context of determining blinds, turn order, and betting phases.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * - `bool: boolean` - A boolean value indicating whether this seat should be designated as the dealer.
   *   - If `true`, the seat is set as the dealer.
   *   - If `false`, the seat's dealer status is removed.
   *
   * #### Requirements
   * - `bool` must be a boolean value (`true` or `false`).
   * - Passing `true` designates the seat as the dealer, while `false` removes the dealer status.
   *
   * #### Returns
   * - `boolean` - The assigned dealer status for the seat.
   *   - Returns `true` if the seat is designated as the dealer, and `false` if it is not.
   *
   * #### Usage
   * Use this method to assign or remove the dealer status of a seat. Typically, only one seat at a table should
   * have the dealer status at any given time. This method is useful in scenarios where the dealer role rotates,
   * such as in each new round of a poker game.
   *
   * @param {boolean} bool - A boolean indicating whether this seat is the dealer.
   *
   * @returns {boolean} - The updated dealer status of the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat({ position: 2 });
   * pokerSeat.setDealer(true); // Sets the seat as the dealer
   * console.log(pokerSeat.isDealer()); // Console Output: true
   *
   * pokerSeat.setDealer(false); // Removes dealer designation
   * console.log(pokerSeat.isDealer()); // Console Output: false
   * ```
   */
  public setDealer(bool: boolean): boolean {
    return this.__setDealer(bool);
  }

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `getId` method is a public getter that retrieves the unique identifier (`id`) of the `PokerSeat` instance.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method provides access to the unique `id` of each `PokerSeat`, allowing it to be referenced or compared
   * with other seats at the table. This identifier is essential for managing individual seats, especially in a table
   * with multiple players.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `string` - Returns the unique identifier (`id`) assigned to the seat.
   *
   * #### Usage
   * Use this method to retrieve the `id` of the seat, which can be useful for logging, comparisons, or when tracking
   * which seat a player occupies.
   *
   * @returns {string} - The unique identifier of the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * console.log(pokerSeat.getId());
   * // Console Output: a unique string identifier, e.g., "123e4567-e89b-12d3-a456-426614174000"
   * ```
   */
  public getId(): string {
    return this.__id;
  }

  /**
   * #### Description
   * The `getPosition` method is a public getter that retrieves the seat’s position at the poker table.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method provides access to the seat's specific position on the poker table, which is important for managing
   * turn order, dealer rotation, and blind assignments in poker games.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `number` - Returns the position of the seat at the table.
   *
   * #### Usage
   * Use this method to retrieve the position of the seat, which can be essential for turn-based logic and managing
   * seating order at the poker table.
   *
   * @returns {number} - The position of the seat at the table.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat({ position: 3 });
   * console.log(pokerSeat.getPosition());
   * // Console Output: 3
   * ```
   */
  public getPosition(): number {
    return this.__position;
  }

  /**
   * #### Description
   * The `isDealer` method is a public getter that checks if this seat is currently designated as the dealer seat.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method indicates whether the seat has been designated as the dealer, which is critical for determining
   * turn order and managing the game's flow, especially in games where the dealer role rotates between players.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `boolean` - Returns `true` if this seat is designated as the dealer, otherwise `false`.
   *
   * #### Usage
   * Use this method to check if the seat has the dealer role, which is particularly useful for managing dealer-related
   * functions like initiating blinds or handling turn order.
   *
   * @returns {boolean} - The dealer status of the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.setDealer(true);
   * console.log(pokerSeat.isDealer());
   * // Console Output: true
   * ```
   */
  public isDealer(): boolean {
    return this.__isDealer;
  }

  /**
   * #### Description
   * The `getPlayer` method is a public getter that retrieves the player occupying this seat, if any.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method provides access to the player currently occupying the seat, allowing the application to retrieve
   * player-specific data, manage player actions, or determine seat vacancy.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `PokerPlayerInterface | undefined` - Returns the player instance occupying this seat, or `undefined` if the seat is vacant.
   *
   * #### Usage
   * Use this method to retrieve the player occupying this seat, which is helpful in managing player actions or
   * determining if the seat is available for another player.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance if occupied, or `undefined` if vacant.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.occupySeat(player); // player implements PokerPlayerInterface
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  public getPlayer(): PokerPlayerInterface | undefined {
    return this.__player;
  }

  /**
   * #### Description
   * The `getPlayer` method is a public getter that retrieves the player occupying this seat, if any.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method provides access to the player currently occupying the seat, allowing the application to retrieve
   * player-specific data, manage player actions, or determine seat vacancy.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `PokerPlayerInterface | undefined` - Returns the player instance occupying this seat, or `undefined` if the seat is vacant.
   *
   * #### Usage
   * Use this method to retrieve the player occupying this seat, which is helpful in managing player actions or
   * determining if the seat is available for another player.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance if occupied, or `undefined` if vacant.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.occupySeat(player); // player implements PokerPlayerInterface
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  public getRoles(): string[] {
    return this.__roles;
  }

  /**
   * #### Description
   * The `getPlayer` method is a public getter that retrieves the player occupying this seat, if any.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Purpose
   * This method provides access to the player currently occupying the seat, allowing the application to retrieve
   * player-specific data, manage player actions, or determine seat vacancy.
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters.
   *
   * #### Returns
   * - `PokerPlayerInterface | undefined` - Returns the player instance occupying this seat, or `undefined` if the seat is vacant.
   *
   * #### Usage
   * Use this method to retrieve the player occupying this seat, which is helpful in managing player actions or
   * determining if the seat is available for another player.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance if occupied, or `undefined` if vacant.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.occupySeat(player); // player implements PokerPlayerInterface
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  public addRole(role: string): string[] {
    return this.__addRole(role);
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `isOccupied` method checks if the seat is currently occupied by a player.
   *
   * #### Purpose
   * This method is essential for determining seat occupancy status, enabling other parts of the program to
   * verify if a seat is taken before allowing actions such as seating another player.
   *
   * @returns {boolean} - `true` if the seat has a player, otherwise `false`.
   */
  public isOccupied(): boolean {
    return this.getPlayer() ? true : false;
  }

  /**
   * #### Description
   * The `occupy` method assigns a player to occupy this seat.
   *
   * #### Purpose
   * This method assigns a player to the seat, indicating the seat is occupied. It is essential for seating
   * management, allowing a player to be seated at a specific position at the poker table.
   *
   * @param {PokerPlayerInterface} player - The player instance to assign to the seat.
   *
   * @returns {void}
   */
  public occupy(player: PokerPlayerInterface): void {
    this.emitEvent(PokerSeatEvents.OCCUPIED, {
      event: {
        source: Source.POKER_SEAT,
        data: { seatId: this.getId(), playerId: player.getId() },
        params: { player: player },
      },
      middlewares: [
        (event, next) => {
          this.__checkSeatVacancy(event, next);
        },
        (event, next) => {
          this.__occupy(event, next);
        },
      ],
    });
  }

  /**
   * #### Description
   * The `vacate` method removes the player from the seat, marking it as unoccupied.
   *
   * #### Purpose
   * This method allows for freeing up the seat by removing the player, which is essential in poker games
   * where players may need to leave their seat or be reassigned to a different seat.
   *
   * @returns {void}
   */
  public vacate(): void {
    this.emitEvent(PokerSeatEvents.VACATED, {
      event: {
        source: Source.POKER_SEAT,
        data: { seatId: this.getId(), playerId: this.getPlayer()?.getId() },
      },
      middlewares: [
        (event, next) => {
          this.__checkSeatOccupancy(event, next);
        },
        (event, next) => {
          this.__vacate(event, next);
        },
      ],
    });
  }

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `__setId` method assigns a unique identifier (`id`) to this `PokerSeat` instance.
   *
   * #### Purpose
   * This method ensures each `PokerSeat` instance has a unique `id`, enabling it to be individually identified
   * within a poker table, which is essential for managing seats in complex games.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `id: string` - The unique identifier to be assigned to the `PokerSeat`.
   *
   * #### Requirements
   * - `id` must be a valid, unique string, typically generated when the seat is initialized.
   *
   * #### Returns
   * - `string` - The assigned unique identifier of the seat.
   *
   * #### Usage
   * This method is called internally during seat initialization to set or update the seat's unique `id`.
   *
   * @param {string} id - A unique identifier for the seat.
   *
   * @returns {string} - The assigned unique identifier of the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setId("unique-seat-id-123");
   * console.log(pokerSeat.getId());
   * // Console Output: "unique-seat-id-123"
   * ```
   */
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  /**
   * #### Description
   * The `__setPosition` method assigns a specific position index to this `PokerSeat` instance within the poker table.
   *
   * #### Purpose
   * This method specifies the seat's location on the table, essential for player turn management and role assignments
   * like the dealer or blinds.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `position: number` - The index position of the seat on the table.
   *
   * #### Requirements
   * - `position` must be a non-negative integer and within the allowed range for the table.
   *
   * #### Returns
   * - `number` - The position of the seat after assignment.
   *
   * #### Usage
   * This method is called internally to set or update the seat’s position at the table during initialization.
   *
   * @param {number} position - Position index of the seat.
   *
   * @returns {number} - The position index of the seat.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setPosition(2);
   * console.log(pokerSeat.getPosition());
   * // Console Output: 2
   * ```
   */
  private __setPosition(position: number): number {
    this.__position = position;
    return this.__position;
  }

  /**
   * #### Description
   * The `__setDealer` method designates this `PokerSeat` as the dealer’s seat.
   *
   * #### Purpose
   * This method toggles the dealer status for the seat, essential for game flow management, such as assigning blinds
   * and determining the first player action.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `bool: boolean` - Indicates if the seat is assigned the dealer role.
   *
   * #### Requirements
   * - `bool` should be `true` to assign the dealer status, or `false` to remove it.
   *
   * #### Returns
   * - `boolean` - The updated dealer status of the seat.
   *
   * #### Usage
   * This method is called internally to assign or toggle the dealer status of the seat.
   *
   * @param {boolean} bool - Specifies if the seat is the dealer.
   *
   * @returns {boolean} - The assigned dealer status.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setDealer(true);
   * console.log(pokerSeat.isDealer());
   * // Console Output: true
   * ```
   */
  private __setDealer(bool: boolean): boolean {
    this.__isDealer = bool;
    return this.__isDealer;
  }

  /**
   * #### Description
   * The `__setPlayer` method assigns a player to this `PokerSeat`.
   *
   * #### Purpose
   * This method designates a player to occupy the seat or clears the seat if set to `undefined`, allowing for
   * seat availability management.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `player: PokerPlayerInterface | undefined` - The player instance to be assigned to the seat, or `undefined` to mark the seat vacant.
   *
   * #### Requirements
   * - `player` must be an instance of `PokerPlayerInterface`, or `undefined` to vacate the seat.
   *
   * #### Returns
   * - `PokerPlayerInterface | undefined` - The player occupying the seat or `undefined` if vacant.
   *
   * #### Usage
   * This method is used internally to assign a player to the seat or clear the seat.
   *
   * @param {PokerPlayerInterface | undefined} player - The player to occupy the seat, or `undefined` if no player is assigned.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance or `undefined` after assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setPlayer(playerInstance);
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  private __setPlayer(
    player: PokerPlayerInterface | undefined
  ): PokerPlayerInterface | undefined {
    this.__player = player;
    return this.__player;
  }

  /**
   * #### Description
   * The `__setPlayer` method assigns a player to this `PokerSeat`.
   *
   * #### Purpose
   * This method designates a player to occupy the seat or clears the seat if set to `undefined`, allowing for
   * seat availability management.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `player: PokerPlayerInterface | undefined` - The player instance to be assigned to the seat, or `undefined` to mark the seat vacant.
   *
   * #### Requirements
   * - `player` must be an instance of `PokerPlayerInterface`, or `undefined` to vacate the seat.
   *
   * #### Returns
   * - `PokerPlayerInterface | undefined` - The player occupying the seat or `undefined` if vacant.
   *
   * #### Usage
   * This method is used internally to assign a player to the seat or clear the seat.
   *
   * @param {PokerPlayerInterface | undefined} player - The player to occupy the seat, or `undefined` if no player is assigned.
   *
   * @returns {PokerPlayerInterface | undefined} - The player instance or `undefined` after assignment.
   *
   * @example
   * ```typescript
   * const pokerSeat = new PokerSeat();
   * pokerSeat.__setPlayer(playerInstance);
   * console.log(pokerSeat.getPlayer());
   * // Console Output: <PlayerInstance>
   * ```
   */
  public __setRoles(role: string[]): string[] {
    this.__roles = role;
    return this.__roles;
  }

  private __addRole(role: string): string[] {
    this.__roles.push(role);
    return this.getRoles();
  }

  /**
   * #### Description
   * Checks seat availability to determine if it can be occupied by a player.
   *
   * @param {BaseEventInterface} event - The event object containing event data.
   * @param {() => void} next - The next middleware function to call if seat is available.
   */
  private __checkSeatVacancy(
    event: BaseEventInterface,
    next: () => void
  ): void {
    if (this.isOccupied()) {
      logger.log(
        LogLevel.WARN,
        "Failed to occupy seat: seat is already occupied.",
        {
          seatId: this.getId(),
        }
      );
      return;
    }

    event.lastModifiedAt = new Date();
    next();
  }

  /**
   * #### Description
   * Assigns a player to the seat.
   *
   * @param {BaseEventInterface} event - The event object with player information.
   * @param {() => void} next - The next middleware function.
   */
  private __occupy(event: BaseEventInterface, next: () => void): void {
    this.__setPlayer(event.params.player);
    logger.log(LogLevel.INFO, "Seat occupied successfully.", {
      seatId: this.getId(),
      playerId: event.params.player.getId(),
    });

    event.lastModifiedAt = new Date();
    next();
  }

  /**
   * #### Description
   * Checks if the seat is occupied to determine if it can be vacated.
   *
   * @param {BaseEventInterface} event - The event object containing event data.
   * @param {() => void} next - The next middleware function if the seat is occupied.
   */
  private __checkSeatOccupancy(
    event: BaseEventInterface,
    next: () => void
  ): void {
    event.lastModifiedAt = new Date();
    if (!this.isOccupied()) {
      logger.log(
        LogLevel.WARN,
        "Failed to vacate seat: seat is already vacant.",
        {
          seatId: this.getId(),
        }
      );
      return;
    }

    event.lastModifiedAt = new Date();
    next();
  }

  /**
   * #### Description
   * Vacates the seat by removing the current player.
   *
   * @param {BaseEventInterface} event - The event object with seat details.
   * @param {() => void} next - The next middleware function.
   */
  private __vacate(event: BaseEventInterface, next: () => void): void {
    this.__setPlayer(undefined);
    logger.log(LogLevel.INFO, "Seat vacated successfully.", {
      seatId: this.getId(),
    });

    event.lastModifiedAt = new Date();
    next();
  }
}

export { PokerSeat };
