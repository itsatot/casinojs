import { EventEmitter } from "events";
import { PokerTableConfig, PokerTableInterface } from "../pokerTable";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerRoomConfig`
 * Defines the configuration settings required to instantiate a `PokerRoom` in the Casino system. 
 * This configuration object provides essential information such as the room’s unique identifier, 
 * display name, and table settings. Designed to streamline the setup of poker rooms, this config 
 * helps standardize room creation and ensure consistent properties across different rooms.
 *
 * #### Purpose
 * The `PokerRoomConfig` serves as the blueprint for configuring `PokerRoom` instances, allowing
 * developers to initialize new rooms with standardized settings. This configuration ensures that 
 * each `PokerRoom` has all necessary properties predefined, making room setup efficient and reliable.
 *
 * #### Structure Overview
 * This interface includes:
 * - **Room Identification**: `id` and `name` properties for uniquely identifying and naming the room.
 * - **Table Configuration**: `tableConfig`, which defines core table settings such as size and blind values.
 *
 * #### Usage Context
 * The `PokerRoomConfig` is typically used as an input object for the `PokerRoom` constructor. By providing 
 * a well-defined structure for room settings, this config object helps prevent errors during room setup 
 * and enforces consistency across room instances.
 *
 * #### Requirements
 * Each `PokerRoomConfig` must specify:
 * - A valid `tableConfig` object, defining essential game settings.
 * - (Optional) A unique `id` and descriptive `name`, enhancing room identification.
 *
 * @example
 * ```typescript
 * const roomConfig: PokerRoomConfig = {
 *   id: "room42",
 *   name: "High Stakes",
 *   tableConfig: { tableSize: 6, smallBlind: 50, bigBlind: 100 }
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
   * A unique identifier for the poker room. This `id` is used to distinguish each `PokerRoom` within
   * the Casino system, allowing for easy reference and management.
   *
   * #### Access Level
   * This property is intended for internal use within the Casino system, enabling unique identification
   * of each room instance. It may be accessed when updating or querying specific rooms.
   *
   * #### Default Value
   * The `id` property can be `undefined` if not initially assigned, indicating the room may not have been
   * uniquely identified upon creation. Once assigned, this value should remain unchanged to ensure room
   * consistency within the system.
   *
   * #### Requirements
   * - If provided, the `id` should be a non-empty string.
   * - The `id` must be unique across all rooms in the Casino to avoid conflicts.
   *
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room1",
   *   name: "High Rollers",
   *   tableConfig: { tableSize: 6, smallBlind: 10, bigBlind: 20 }
   * };
   * console.log(roomConfig.id); // Output: "room1"
   * ```
   */
  id: string | undefined;

  /**
   * @property {string | undefined} name
   *
   * The name assigned to the poker room. This is used as an identifier in user interfaces or logs,
   * making the room more human-readable and manageable within the Casino system.
   *
   * #### Access Level
   * Accessible throughout the system for room referencing, display, and logging. Unlike `id`, `name` does not
   * have to be unique but should provide clear identification for the room.
   *
   * #### Default Value
   * If `undefined`, the room may be considered unnamed or generic. Assigning a name to the room can enhance
   * identification and help users or administrators differentiate between rooms in a Casino.
   *
   * #### Requirements
   * - Should be a non-empty string if defined to ensure the room has a readable label.
   *
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room2",
   *   name: "VIP Suite",
   *   tableConfig: { tableSize: 8, smallBlind: 50, bigBlind: 100 }
   * };
   * console.log(roomConfig.name); // Output: "VIP Suite"
   * ```
   */
  name: string | undefined;

  /**
   * @property {PokerTableConfig} tableConfig
   *
   * Defines the table settings associated with the poker room. This configuration includes
   * essential settings such as `tableSize`, `smallBlind`, and `bigBlind` values that govern gameplay.
   *
   * #### Access Level
   * Accessible within the room and potentially by the Casino system, this property is essential for defining
   * the core table structure and game settings within the poker room.
   *
   * #### Requirements
   * The `tableConfig` should be defined when the room is created, as it specifies game rules.
   *
   * #### Default Value
   * `N/A` - Must be defined for every `PokerRoom` to ensure the game setup aligns with room specifications.
   *
   * @example
   * ```typescript
   * const roomConfig: PokerRoomConfig = {
   *   id: "room3",
   *   name: "Beginner's Lounge",
   *   tableConfig: { tableSize: 4, smallBlind: 5, bigBlind: 10 }
   * };
   * console.log(roomConfig.tableConfig);
   * // Output: { tableSize: 4, smallBlind: 5, bigBlind: 10 }
   * ```
   */
  tableConfig: PokerTableConfig;
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
  setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[];

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
  setTable(table: PokerTableInterface): PokerTableInterface;

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
  getQueue(): PokerPlayerInterface[];

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
  getTable(): PokerTableInterface;

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
}

export { PokerRoomConfig, PokerRoomInterface };
