/**@collapse */

import { EventEmitter } from "events";
import {
  PokerRoomConfig,
  PokerRoomInterface,
  PokerTableInterface,
  PokerTableConfig,
} from "../../interfaces";
import { PokerTable } from "../pokerTable";
import { generateUniqueId } from "../../utils";

/**
 * @class `PokerRoom`
 * Represents a PokerRoom within a Casino that holds a single PokerTable. The PokerRoom manages the player queue, automatically assigning players to the PokerTable as seats become available.
 * This class extends `EventEmitter` and implements the `PokerRoomInterface` interface.
 */
class PokerRoom extends EventEmitter implements PokerRoomInterface {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __id: string = ``;

  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __name: string = ``;

  /**
   * @property {PokerRoomInterface[]} __rooms
   * A private array that holds all the `PokerRoom` instances managed by the Casino.
   *
   * #### Access Level
   * This property is private, meaning it can only be accessed directly within the
   * `Casino` class itself. This encapsulation ensures that external modifications
   * to the list of rooms are controlled through the class’s public methods.
   *
   * #### Default Value
   * The `__rooms` property is initialized as an empty array `[]`, indicating that
   * the Casino starts with no rooms. Rooms are added to this array using the `createRoom`
   * or `addRoom` methods.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Returns an empty array initially
   * ```
   */
  private __tables: PokerTableInterface[] = [];

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * The `constructor` initializes the `Casino` class.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * console.log(casino.getRooms()); // Output: []
   * ```
   */
  constructor(config?: PokerRoomConfig) {
    super();
    this.__init(config);
  }

  /**
   * `__init`: Performs any necessary setup logic when the `Casino` is instantiated.
   * This is an internal method, meaning it's private and only used within the `Casino` class.
   *
   * #### Purpose
   * This method is designed to be a placeholder for any future setup logic or preparation that the
   * Casino might need during initialization. Currently, it's an empty method that gets called within the constructor.
   *
   * #### Usage
   * Developers can add additional logic in this method if there are operations or configurations
   * that need to happen every time the Casino is created.
   *
   * @returns {void} - This method doesn't return any values.
   *
   * @example
   * The `__init` method is automatically invoked when the `Casino` is created:
   * ```typescript
   * const casino = new Casino();
   * ```
   */
  private __init(config?: PokerRoomConfig): void {
    // No current logic, but reserved for future setup or configuration
    if (config) {
      this.__id = config.id ? config.id : generateUniqueId();
      this.__name = config.name ? config.name : this.__name;
      config.tableConfigs?.forEach((tconfig) => {
        this._createTable(tconfig);
      });
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
   * Sets the table configuration within the `PokerRoom`. The table configuration determines essential
   * settings for the poker table, such as table size, small blind, and big blind values.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setTables` method allows configuration or reconfiguration of the poker table within a room.
   * Properly setting up the table configuration is vital for game mechanics and player experience.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * - `table`: A `PokerTableInterface` instance containing configuration details for the room’s table.
   *
   * #### Requirements
   * - The `table` parameter should be a valid instance of `PokerTableInterface`, configured with necessary game parameters.
   *
   * #### Returns
   * - Returns the `PokerTableInterface` instance after updating it within the room.
   *
   * #### Usage
   * Call this method to configure or update the settings of a poker table in the room. This helps ensure
   * all game-related settings, such as seating and blinds, are properly managed.
   *
   * @param {PokerTableInterface} table - The configuration settings for the poker table.
   * @returns {PokerTableInterface} - Returns the table configuration set for the room.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room3", tableSize: 8 });
   * const tableConfig = new PokerTable({ tableSize: 8, smallBlind: 10, bigBlind: 20 });
   * pokerRoom.setTables(tableConfig); // Configures the table for the room
   * console.log(pokerRoom.getTable()); // Logs the table configuration
   * ```
   */
  public setTables(tables: PokerTableInterface[]): PokerTableInterface[] {
    return this._setTables(tables);
  }

  /**
   * #### Description
   * Creates a new `PokerRoom` instance based on the provided configuration and adds it to the Casino's rooms list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino to dynamically create new rooms as needed by providing specific room configurations.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_CREATED` event, enabling listeners to respond to the creation of a new room.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the newly created `PokerRoomInterface` instance.
   *
   * #### Usage
   * Primarily used within subclasses or protected methods to dynamically create and add rooms to the Casino.
   *
   * @param {PokerRoomConfig} config - Configuration settings for creating a new `PokerRoom`.
   * @returns {PokerRoomInterface} - The newly created room instance.
   *
   * @example
   * ```typescript
   * class SpecialCasino extends Casino {
   *   public createSpecialRoom(config: PokerRoomConfig): PokerRoomInterface {
   *     return this._createRoom(config);
   *   }
   * }
   * const specialCasino = new SpecialCasino();
   * const newRoom = specialCasino.createSpecialRoom({ name: "Champions Lounge", tableSize: 10, smallBlind: 100, bigBlind: 200 });
   * console.log(newRoom.getName()); // Outputs: "Champions Lounge"
   * ```
   */
  public createTable(config: PokerTableConfig): PokerTableInterface {
    return this._createTable(config);
  }

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Creates a new `PokerRoom` instance based on the provided configuration and adds it to the Casino's rooms list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino to dynamically create new rooms as needed by providing specific room configurations.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_CREATED` event, enabling listeners to respond to the creation of a new room.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the newly created `PokerRoomInterface` instance.
   *
   * #### Usage
   * Primarily used within subclasses or protected methods to dynamically create and add rooms to the Casino.
   *
   * @param {PokerRoomConfig} config - Configuration settings for creating a new `PokerRoom`.
   * @returns {PokerRoomInterface} - The newly created room instance.
   *
   * @example
   * ```typescript
   * class SpecialCasino extends Casino {
   *   public createSpecialRoom(config: PokerRoomConfig): PokerRoomInterface {
   *     return this._createRoom(config);
   *   }
   * }
   * const specialCasino = new SpecialCasino();
   * const newRoom = specialCasino.createSpecialRoom({ name: "Champions Lounge", tableSize: 10, smallBlind: 100, bigBlind: 200 });
   * console.log(newRoom.getName()); // Outputs: "Champions Lounge"
   * ```
   */
  public getId(): string {
    return this.__id;
  }

  /**
   * #### Description
   * Retrieves the current name of the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is defined within `PokerRoomInterface` and is implemented by any class adhering to this interface.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getName` method enables access to the current name of a `PokerRoom`, which can be essential for
   * identification, logging, and displaying room information to users.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * `N/A` - This method does not require any parameters.
   *
   * #### Requirements
   * `N/A` - This method simply returns the current name as set by `setName`.
   *
   * #### Returns
   * - Returns the current name of the `PokerRoom` as a string.
   *
   * #### Usage
   * Use this method to fetch the current name of a `PokerRoom`. This can be particularly helpful for displaying
   * or verifying the room name during operations.
   *
   * @returns {string} - The current name of the `PokerRoom`.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "VIP Room", tableSize: 6 });
   * console.log(pokerRoom.getName()); // Logs "VIP Room"
   * ```
   */
  public getName(): string {
    return this.__name;
  }

  /**
   * #### Description
   * Retrieves the associated `PokerTable` instance within the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method does not implement external interfaces.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getTable` method provides access to the `PokerTable` instance that is actively managed by the `PokerRoom`.
   * This can be used to view table configuration, status, and player seating arrangements.
   *
   * #### Events
   * `N/A` - This method does not emit any events.
   *
   * #### Parameters
   * `N/A` - No parameters are required for this method.
   *
   * #### Requirements
   * `N/A` - This method does not modify the table, only retrieves it.
   *
   * #### Returns
   * - Returns the `PokerTableInterface` instance currently set for the room.
   *
   * #### Usage
   * Use this method to access the poker table associated with a specific room. This allows for table-specific
   * operations and inquiries.
   *
   * @returns {PokerTableInterface} - The `PokerTable` instance associated with this room.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "High Stakes", tableSize: 6 });
   * const table = pokerRoom.getTable();
   * console.log(table); // Logs the PokerTable instance associated with "High Stakes" room
   * ```
   */
  public getTables(): PokerTableInterface[] {
    return this.__tables;
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
    return this.tableCount();
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
  public tableCount(): number {
    return this.getTables().length;
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
    if (index >= 0 && index < this.tableCount()) {
      throw new Error(
        `Invalid index: ${index}. It must be between 0 and ${
          this.tableCount() - 1
        }.`
      );
    } else {
      return true;
    }
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  protected _setName(name: string): string {
    this.__name = name;
    return this.__name;
  }

  protected _setTables(table: PokerTableInterface[]): PokerTableInterface[] {
    this.__tables = table;
    return this.__tables;
  }

  /**
   * #### Description
   * Creates a new `PokerRoom` instance based on the provided configuration and adds it to the Casino's rooms list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Allows the Casino to dynamically create new rooms as needed by providing specific room configurations.
   *
   * #### Events
   * - Emits a `CasinoEventName.ROOM_CREATED` event, enabling listeners to respond to the creation of a new room.
   *
   * #### Parameters
   * - `config`: A `PokerRoomConfig` object containing details like `name`, `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Requirements
   * `N/A`
   *
   * #### Returns
   * - Returns the newly created `PokerRoomInterface` instance.
   *
   * #### Usage
   * Primarily used within subclasses or protected methods to dynamically create and add rooms to the Casino.
   *
   * @param {PokerRoomConfig} config - Configuration settings for creating a new `PokerRoom`.
   * @returns {PokerRoomInterface} - The newly created room instance.
   *
   * @example
   * ```typescript
   * class SpecialCasino extends Casino {
   *   public createSpecialRoom(config: PokerRoomConfig): PokerRoomInterface {
   *     return this._createRoom(config);
   *   }
   * }
   * const specialCasino = new SpecialCasino();
   * const newRoom = specialCasino.createSpecialRoom({ name: "Champions Lounge", tableSize: 10, smallBlind: 100, bigBlind: 200 });
   * console.log(newRoom.getName()); // Outputs: "Champions Lounge"
   * ```
   */
  protected _createTable(config?: PokerTableConfig): PokerTableInterface {
    const table = new PokerTable(config);
    this.__tables.push(table);
    return table;
  }

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * @method `setId`
   * @private
   * Returns the poker table's `id`.
   * @returns {string} The poker table's `id`.
   *
   * @example
   * const rank = card.setRank();
   * console.log(rank); // "A"
   */
  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }
}

export { PokerRoom };
