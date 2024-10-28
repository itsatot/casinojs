import { EventEmitter } from "events";
import {
  PokerRoomConfig,
  PokerPlayerInterface,
  PokerRoomInterface,
  PokerTableInterface,
  PokerPlayerConfig,
} from "../../interfaces";
import { PokerTable } from "../pokerTable";
import { PokerPlayer } from "../pokerPlayer";

/**
 * @class `PokerRoom`
 * Represents a PokerRoom within a Casino that holds a single PokerTable. The PokerRoom manages the player queue, automatically assigning players to the PokerTable as seats become available.
 * This class extends `EventEmitter` and implements the `PokerRoomInterface` interface.
 */
class PokerRoom extends EventEmitter implements PokerRoomInterface {
  /****************************************************************
   * PROPERTIES
   ****************************************************************/

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
 private __id: string;

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
 private __name: string;

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
 private __queue: PokerPlayerInterface[];

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
 private __table: PokerTableInterface;

 
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
 constructor(config: PokerRoomConfig) {
    super();
    this.__id = config.id ? config.id : ``;
    this.__name = config.name ? config.name : ``;
    this.__queue = [];
    this.__table = new PokerTable(config.tableConfig);
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
  private __init(): void {
    // No current logic, but reserved for future setup or configuration
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
  setName(name: string): string{
    this.__name = name;
    return this.__name;
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
  setQueue(queue: PokerPlayerInterface[]): PokerPlayerInterface[]{
    this.__queue = queue;
    return this.__queue
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
  setTable(table: PokerTableInterface): PokerTableInterface{
    this.__table = table;
    return this.__table;
  }

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
  getId(): string{
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
  getName(): string{
    return this.__name;
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
  getQueue(): PokerPlayerInterface[]{
    return this.__queue;
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
  getTable(): PokerTableInterface{
    return this.__table;
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

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
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
  // public addToQueue(config: PokerPlayerConfig): boolean {
  //   const player = new PokerPlayer(config);
  //   this.__queue.push(player);
  //   return true;
  // }

 

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
  // private setId(id: string): string {
  //   this.__id = id;
  //   return this.__id;
  // }





//   public moveToTable(seatPostion: number): boolean {
//     let roomSeats = this.getTable().getSeats();
//     for (let index = 0; index < roomSeats.length; index++) {
//       if (
//         roomSeats[index].getPosition() === seatPostion &&
//         !roomSeats[index].isOccupied() &&
//         this.getQueue().length >= 1
//       ) {
//         let queue = this.getQueue();
//         let pokerPlayer = queue.splice(0, 1);
//         this.setQueue(queue);
//         roomSeats[index].setPlayer(pokerPlayer[0]);
//         return true;
//       }
//     }
//     return false;
//   }
}

export { PokerRoom };
