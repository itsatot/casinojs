//@collapse

import { PokerTableConfig, PokerTableInterface } from "../pokerTable";

/**
 * @interface `PokerRoomConfig`
 *
 * Represents the configuration settings necessary to create a `PokerRoom` within the Casino system.
 * This interface defines core properties such as a unique identifier (`id`), room name (`name`),
 * and an array of table configurations (`tableConfigs`) that standardize room setup and ensure consistent
 * properties across all `PokerRoom` instances.
 *
 * #### Purpose
 * The `PokerRoomConfig` interface serves as a blueprint for initializing `PokerRoom` instances.
 * By defining required properties upfront, this configuration helps streamline room creation,
 * reduce errors, and maintain uniformity across room instances within the Casino system.
 *
 * #### Structure Overview
 * The interface includes:
 * - **Room Identification**: `id` and `name` properties for unique identification and naming of the room.
 * - **Table Configurations**: An array, `tableConfigs`, that holds one or more configurations detailing each table's settings within the room.
 *
 * #### Usage
 * Primarily used as an input for the `PokerRoom` constructor, `PokerRoomConfig` allows developers
 * to define each room’s essential properties during instantiation. This structure helps prevent
 * setup errors and ensures consistency among multiple rooms in the Casino.
 *
 * #### Requirements
 * - **`tableConfigs`**: Must be a valid array containing one or more `PokerTableConfig` objects.
 * - **`id` and `name` (optional)**: Enhance room uniqueness and readability, if provided.
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
   * @property {string | undefined} id
   *
   * A unique identifier for the poker room, allowing for easy reference and management within the Casino system.
   *
   * #### Purpose
   * Used to uniquely identify each `PokerRoom` within the Casino, providing a direct reference for room-specific operations.
   *
   * #### Requirements
   * - **Optional**: If provided, `id` must be a unique, non-empty string to avoid conflicts.
   *
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
  id?: string;

  /**
   * @property {string | undefined} name
   *
   * A descriptive name for the poker room, often displayed in user interfaces or logs to enhance human readability.
   *
   * #### Purpose
   * Serves as a user-friendly label for the poker room, assisting administrators and players in identifying the room easily.
   *
   * #### Requirements
   * - **Optional**: `name` should be a non-empty string if defined, providing a clear label for the room.
   *
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
  name?: string;

  /**
   * @property {PokerTableConfig[]} tableConfigs
   *
   * An array of `PokerTableConfig` objects, each defining settings for individual tables within the poker room.
   * Essential configurations include properties like `tableSize`, `smallBlind`, and `bigBlind`.
   *
   * #### Purpose
   * Defines the structure and game settings for each table in the room, supporting multiple table configurations
   * under one `PokerRoom` instance.
   *
   * #### Requirements
   * - **Required**: `tableConfigs` must contain one or more `PokerTableConfig` objects to provide valid game settings.
   *
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
  tableConfigs?: PokerTableConfig[];
}

/**
 * @interface `PokerRoomInterface`
 *
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
 * The `PokerRoomInterface` includes the following methods:
 * - **setName**: Sets or updates the room’s name.
 * - **setTables**: Configures the tables in the room, setting attributes such as table size and blinds.
 *
 * #### Events Overview
 * The `PokerRoomInterface` includes the following events:
 * - **roomUpdated**: Emitted whenever the room’s settings are updated, such as when tables are reconfigured.
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
   * Sets the configuration for multiple tables within the `PokerRoom`. Each table configuration specifies
   * key attributes like table size, small blind, and big blind values, supporting multi-table configurations
   * within a single room.
   *
   * #### Implements
   * `N/A` - This method is part of the `PokerRoomInterface` and does not implement any external methods.
   *
   * #### Overrides
   * `N/A` - This method does not override any superclass or parent methods.
   *
   * #### Purpose
   * The `setTables` method is crucial for defining or updating the configuration of multiple tables in a room.
   * Properly configured tables are essential for ensuring smooth gameplay and an organized player experience.
   *
   * #### Events
   * - **roomUpdated**: This event is emitted whenever the table configurations are successfully set or updated,
   *   allowing external components to respond to changes in the room’s setup.
   *
   * #### Parameters
   * - `tables`: An array of `PokerTableInterface` objects, each containing configuration details for a table.
   *
   * #### Requirements
   * - `tables` must be a non-empty array of `PokerTableInterface` instances, each configured with necessary game parameters.
   *
   * #### Returns
   * - Returns the array of `PokerTableInterface` instances after successfully setting them within the room.
   *
   * #### Usage
   * Call this method to configure or update multiple tables in a poker room, ensuring the settings align with
   * room requirements and player needs.
   *
   * @param {PokerTableInterface[]} tables - The list of table configurations for the poker room.
   * @returns {PokerTableInterface[]} - Returns the updated table configurations for the room.
   *
   * @example
   * ```typescript
   * const pokerRoom = new PokerRoom({ name: "Room3", tableSize: 8 });
   * const tableConfigs = [
   *   new PokerTable({ tableSize: 8, smallBlind: 10, bigBlind: 20 }),
   *   new PokerTable({ tableSize: 10, smallBlind: 20, bigBlind: 40 })
   * ];
   * pokerRoom.setTables(tableConfigs); // Sets multiple table configurations in the room
   * console.log(pokerRoom.getTables()); // Logs the table configurations
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

  /**
   * #### Description
   * Validates if a specified index is within the valid bounds of the Casino’s room list.
   *
   * #### Implements
   * `N/A`
   *
   * #### Overrides
   * `N/A`
   *
   * #### Purpose
   * Prevents out-of-bounds errors by confirming that an index is within the acceptable range for the Casino’s
   * room list, ensuring that subsequent calls to access rooms by index have a valid target.
   *
   * #### Events
   * `N/A`
   *
   * #### Parameters
   * - `index`: A zero-based integer specifying the position of a room within the Casino's managed room list.
   *
   * #### Requirements
   * - The `index` must be a non-negative integer within the bounds of the `__rooms` array.
   *
   * #### Returns
   * - Returns `true` if the index is within bounds.
   * - Throws an `Error` if the index is out of bounds.
   *
   * #### Usage
   * Call this method before performing operations involving indexed access to rooms, ensuring the index
   * falls within valid boundaries.
   *
   * @param {number} index - The zero-based index to validate within the room list.
   * @returns {boolean} - Returns `true` if the index is within bounds.
   *
   * @throws {Error} - Throws an error with a descriptive message if the index is out of bounds.
   *
   * @example
   * ```typescript
   * const casino = new Casino();
   * try {
   *   casino.isValidIndex(2); // Returns true if index 2 exists in the list of rooms
   * } catch (error) {
   *   console.error(error.message); // Logs error if index 2 is invalid
   * }
   * ```
   */
  isValidIndex(index: number): boolean;
}

export { PokerRoomConfig, PokerRoomInterface };
