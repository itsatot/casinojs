import { PokerTableConfig, PokerTableInterface } from "../pokerTable";

/**
 * @interface `PokerRoomConfig`
 * Represents the configuration settings necessary to create a `PokerRoom` within the Casino system.
 * This interface outlines essential properties such as a unique identifier, room name, and a set of table configurations,
 * ensuring standardized room setup and consistent properties across all instances.
 *
 * #### Purpose
 * `PokerRoomConfig` is intended to streamline the creation and initialization of `PokerRoom` instances,
 * providing a pre-defined structure for necessary properties. This configuration standardization simplifies
 * room management and improves overall code clarity.
 *
 * #### Structure Overview
 * This interface includes:
 * - **Room Identification**: `id` and `name` properties for unique identification and naming of the room.
 * - **Table Configurations**: `tableConfigs`, an array that specifies one or more configurations for tables within the room.
 *
 * #### Usage Context
 * `PokerRoomConfig` is typically utilized as a parameter for the `PokerRoom` constructor, ensuring that
 * each room is initialized with consistent, complete settings. By using this config object, developers can avoid
 * common setup errors and maintain uniformity across different rooms in the Casino system.
 *
 * #### Requirements
 * Each `PokerRoomConfig` object must:
 * - Provide a valid `tableConfigs` array, containing configuration details for each table within the room.
 * - Optionally specify a unique `id` and `name`, enhancing room distinction and readability.
 *
 * @example
 * ```typescript
 * const roomConfig: PokerRoomConfig = {
 *   id: "room42",
 *   name: "High Stakes",
 *   tableConfigs: [
 *     { tableSize: 6, smallBlind: 50, bigBlind: 100 },
 *     { tableSize: 8, smallBlind: 100, bigBlind: 200 }
 *   ]
 * };
 * const pokerRoom = new PokerRoom(roomConfig); // Initializes a new PokerRoom with the specified configuration
 * ```
 */
interface PokerRoomConfig {
  /**************************************************************************************************************
   * PROPERTIES
   **************************************************************************************************************/

  /**
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room1",
   *   name: "High Rollers",
   *   tableConfigs: [{ tableSize: 6, smallBlind: 10, bigBlind: 20 }]
   * };
   * console.log(roomConfig.id);
   * 
   * // Output: "room1"
   * ```
   */
  id: string | undefined;

  /**
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room2",
   *   name: "VIP Suite",
   *   tableConfigs: [{ tableSize: 8, smallBlind: 50, bigBlind: 100 }]
   * };
   * console.log(roomConfig.name);
   * 
   * // Output: "VIP Suite"
   * ```
   */
  name: string | undefined;

  /**
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room3",
   *   name: "Beginner's Lounge",
   *   tableConfigs: [
   *     { tableSize: 4, smallBlind: 5, bigBlind: 10 },
   *     { tableSize: 6, smallBlind: 10, bigBlind: 20 }
   *   ]
   * };
   * console.log(roomConfig.tableConfigs);
   * // Output: [{ tableSize: 4, smallBlind: 5, bigBlind: 10 }, { tableSize: 6, smallBlind: 10, bigBlind: 20 }]
   * ```
   */
  tableConfigs: PokerTableConfig[] | undefined;
}

/**
 * @interface `PokerRoomInterface`
 * Defines the responsibilities and structure for managing a `PokerRoom` within the Casino system. This interface is
 * essential for implementing operations such as room setup, player queue management, and table configuration, thereby
 * organizing and facilitating smooth poker game management.
 *
 * #### Purpose
 * The `PokerRoomInterface` serves as a standardized blueprint for any `PokerRoom` class, detailing essential methods
 * for room configuration, player management, and table access. By following this structure, the system ensures that each
 * poker room is identifiable, manageable, and consistent in functionality.
 *
 * #### Extends
 * This interface extends `NodeJS.EventEmitter` to allow event-driven management of room actions like table updates,
 * player entry, or exit events, enhancing flexibility in asynchronous operations across the Casino system.
 *
 * #### Methods Overview
 * The `PokerRoomInterface` includes essential methods for:
 * - **Setting Attributes**: Define or update the room name, player queue, and table settings.
 * - **Retrieving Information**: Access current room attributes like ID, name, player queue, and table configuration.
 * - **Event-Driven Management**: Inherits from `NodeJS.EventEmitter`, supporting event emissions for actions related
 *   to room state changes, providing other components within the system with timely updates on key actions.
 *
 * #### Events
 * The `PokerRoomInterface` supports event emissions for significant room-related actions. This enables external components
 * to subscribe to updates, making it easier to manage changes dynamically within the Casino environment.
 *
 * #### Usage
 * This interface is designed to standardize the management of `PokerRoom` instances, offering a complete structure for
 * both client-facing interactions (like displaying room details) and internal operations (like seating players or adjusting
 * tables).
 *
 * @extends NodeJS.EventEmitter
 *
 * @example
 * ```typescript
 * const pokerRoom: PokerRoomInterface = new PokerRoom();
 * pokerRoom.on('roomUpdated', () => console.log(`Room updated with new settings`));
 * pokerRoom.setName("HighRollers");
 * console.log(pokerRoom.getName()); // Logs "HighRollers"
 * ```
 */
interface PokerRoomInterface extends NodeJS.EventEmitter {
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
   * The `setTable` method allows configuration or reconfiguration of the poker table within a room.
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
   * pokerRoom.setTable(tableConfig); // Configures the table for the room
   * console.log(pokerRoom.getTable()); // Logs the table configuration
   * ```
   */
  setTables(tables: PokerTableInterface[]): PokerTableInterface[];

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves the unique identifier of the `PokerRoom`.
   *
   * #### Implements
   * `N/A` - This method is defined within the `PokerRoomInterface` without implementing external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `getId` method enables access to the unique `id` of a `PokerRoom`, which is essential for identifying
   * and referencing specific rooms within the system.
   *
   * #### Events
   * `N/A` - No events are emitted by this method.
   *
   * #### Parameters
   * `N/A` - This method does not require any parameters.
   *
   * #### Requirements
   * `N/A` - This method simply returns the `id` as set by the `setId` method.
   *
   * #### Returns
   * - Returns the unique `id` of the `PokerRoom` as a string.
   *
   * #### Usage
   * Use this method to retrieve the identifier of a `PokerRoom`. This is particularly useful for managing,
   * searching, or displaying room information.
   *
   * @returns {string} - The unique identifier of the `PokerRoom`.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ id: "Room123", name: "VIP Room", tableSize: 6 });
   * console.log(pokerRoom.getId()); // Logs "Room123"
   * ```
   */
  getId(): string;

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
  getName(): string;

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
  getTables(): PokerTableInterface[];

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
   * #### Description
   * Retrieves the total number of `PokerRoom` instances currently managed by the Casino.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * This method provides insight into the number of poker rooms that the Casino manages, supporting
   * validation for index-bound operations or general information on Casino state.
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
   * - Returns the total count of rooms managed by the Casino.
   *
   * #### Usage
   * Use this method to retrieve the total count of active poker rooms, which is helpful when iterating over
   * rooms or confirming index-bound conditions.
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
  tableCount(): number;
}

export { PokerRoomConfig, PokerRoomInterface };
