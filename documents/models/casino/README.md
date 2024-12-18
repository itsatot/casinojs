# Casino

**🗂️ Table Of Contents**
- [Casino](#casino)
  - [Description](#description)
      - [Purpose](#purpose)
      - [Extends](#extends)
      - [Implements](#implements)
      - [Events](#events)
  - [Methods](#methods)
  - [Properties](#properties)
  - [Examples](#examples)

## Description
The `Casino` class represents a centralized environment for managing poker games. It manages multiple poker rooms, facilitates room creation, deletion, and retrieval, and emits events for room-related actions. The class extends `BaseEventEmitter` and implements the `CasinoInterface`.

`Casino`
Represents a Casino environment that manages multiple poker rooms (`PokerRooms`).
 This class handles operations related to room creation, listing, removal, and searching.

 #### Purpose
 A Casino serves as a central hub for organizing poker games by managing rooms.
 Each room can accommodate players and maintain its own game state.

 #### Extends
 Additionally, it extends the Node.js `BaseEventEmitter` to emit events when specific actions
 occur, such as creating or removing a room.
 
 #### Implements
 This class implements the `CasinoInterface` and inherits from the `BaseEventEmitter` class,
 allowing it to emit events and conform to the defined interface structure for consistency
 and predictability.
 
 #### Events
 The `Casino` class emits custom events to signal room-related actions. For instance,
 when a room is created, an event `casino:roomCreated` is emitted, making it easy
 to handle notifications or updates related to the Casino’s operations.
 
 @example
 ```typescript
 const casino = new Casino();
 casino.on('casino:roomCreated', (room) => console.log(`Room created: ${room.name}`));
 const room = casino.createRoom({ name: "Room1", tableSize: 6, smallBlind: 10, bigBlind: 20 });
 console.log(room); // Logs details of "Room1"
 ```


---

## Methods
| Method Name                              | Description                            |
|------------------------------------------|----------------------------------------|
| [`setRooms`](./methods/setRooms.md)       | Sets the list of poker rooms managed by the Casino. |
| [`createRoom`](./methods/createRoom.md)   | Creates a new `PokerRoom` and adds it to the Casino. |
| [`getRoom`](./methods/getRoom.md)         | Retrieves a specific `PokerRoom` by its index. |
| [`getRooms`](./methods/getRooms.md)       | Retrieves the list of all rooms managed by the Casino. |
| [`getRoomByName`](./methods/getRoomByName.md) | Retrieves a room by its name. |
| [`addRoom`](./methods/addRoom.md)         | Adds a single `PokerRoom` to the Casino. |
| [`addRooms`](./methods/addRooms.md)       | Adds multiple poker rooms to the Casino. |
| [`deleteRoom`](./methods/deleteRoom.md)   | Removes a `PokerRoom` from the Casino's list by its index. |
| [`roomCount`](./methods/roomCount.md)     | Returns the total number of rooms managed by the Casino. |
| [`isValidIndex`](./methods/isValidIndex.md)| Checks if a given index is valid for room operations. |

---

## Properties
| Property Name                              | Type        | Description             |
|--------------------------------------------|-------------|-------------------------|
| [`__rooms`](./properties/__rooms.md)       | `PokerRoomInterface[]` | A private array holding all `PokerRoom` instances. |

---

## Examples
```typescript
// Create a Casino instance
const casino = new Casino();

// Add a new room to the casino
const room = casino.createRoom({ name: "HighRollers", tableSize: 6, smallBlind: 10, bigBlind: 20 });
console.log(casino.getRooms()); // Logs the created room

// Get a specific room by name
const vipRoom = casino.getRoomByName("HighRollers");
console.log(vipRoom);

// Check the number of rooms
console.log(casino.roomCount()); // Output: 1

// Delete a room
casino.deleteRoom(0);
console.log(casino.getRooms()); // Logs an empty array
```