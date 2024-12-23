// //@collapse

// import { EventEmitter } from "events";
// import {
//   CasinoInterface,
//   PokerRoomConfig,
//   PokerRoomInterface,
// } from "../../../src/interfaces";

// /**
//  * @file `index.test.ts`
//  * @description This file contains a suite of tests for `CasinoInterface`, validating core functionality, such as adding, retrieving, and managing poker rooms. Each test verifies adherence to the requirements of the `CasinoInterface`, ensuring correct behavior when managing poker rooms within a Casino entity.
//  *
//  * @jest-environment node
//  */

// // Mock classes to simulate `PokerRoomInterface` and `CasinoInterface` for testing purposes
// class MockPokerRoom implements PokerRoomInterface {
//   constructor(public name: string) {}
// }

// class MockCasino extends EventEmitter implements CasinoInterface {
//   private rooms: PokerRoomInterface[] = [];

//   // Method to set a new list of rooms for the casino
//   setRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
//     this.rooms = rooms;
//     return this.rooms;
//   }

//   // Method to create a new room based on configuration and emit an event upon creation
//   createRoom(config: PokerRoomConfig): PokerRoomInterface {
//     const newRoom = new MockPokerRoom(config.name || "Unnamed Room");
//     this.rooms.push(newRoom);
//     this.emit("casino:roomCreated", newRoom);
//     return newRoom;
//   }

//   // Retrieve a room based on its position in the rooms array
//   getRoom(index: number): PokerRoomInterface | undefined {
//     return this.rooms[index];
//   }

//   // Retrieve the complete list of rooms in the casino
//   getRooms(): PokerRoomInterface[] {
//     return this.rooms;
//   }

//   // Add a single room to the casino
//   addRoom(room: PokerRoomInterface): PokerRoomInterface[] {
//     this.rooms.push(room);
//     return this.rooms;
//   }

//   // Add multiple rooms to the casino
//   addRooms(rooms: PokerRoomInterface[]): PokerRoomInterface[] {
//     this.rooms.push(...rooms);
//     return this.rooms;
//   }

//   // Remove a room by its index in the array
//   deleteRoom(index: number): PokerRoomInterface[] {
//     this.rooms.splice(index, 1);
//     return this.rooms;
//   }

//   // Return the total number of rooms currently in the casino
//   roomCount(): number {
//     return this.rooms.length;
//   }

//   // Validate that an index is within bounds for the rooms array
//   isValidIndex(index: number): boolean {
//     if (index < 0 || index >= this.roomCount()) {
//       throw new Error(`Invalid index: ${index}`);
//     }
//     return true;
//   }
// }

// describe("CasinoInterface Implementation", () => {
//   let casino: CasinoInterface;

//   beforeEach(() => {
//     casino = new MockCasino();
//   });

//   /**
//    * @testgroup Room Creation and Retrieval
//    * Verifies room creation and retrieval functionality.
//    */
//   describe("Room Creation and Retrieval", () => {
//     /**
//      * @test `should create a room and retrieve it by index`
//      * @description Verifies that a room can be created using the configuration, and the created room is retrievable by its index.
//      */
//     it("should create a room and retrieve it by index", () => {
//       const roomConfig: PokerRoomConfig = {
//         name: "Test Room",
//         tableConfig: {} as any,
//       };
//       const room = casino.createRoom(roomConfig);
//       expect(casino.getRoom(0)).toBe(room);
//       expect(room.name).toBe("Test Room");
//     });

//     /**
//      * @test `should set and retrieve the list of rooms`
//      * @description Confirms that a list of rooms can be set and retrieved accurately from the casino.
//      */
//     it("should set and retrieve the list of rooms", () => {
//       const rooms: PokerRoomInterface[] = [
//         new MockPokerRoom("Room 1"),
//         new MockPokerRoom("Room 2"),
//       ];
//       casino.setRooms(rooms);
//       expect(casino.getRooms()).toEqual(rooms);
//     });
//   });

//   /**
//    * @testgroup Adding and Removing Rooms
//    * Tests the functionality of adding and removing rooms from the casino.
//    */
//   describe("Adding and Removing Rooms", () => {
//     /**
//      * @test `should add a single room to the casino`
//      * @description Ensures that a single room can be added to the casino, and it appears in the room list.
//      */
//     it("should add a single room to the casino", () => {
//       const room = new MockPokerRoom("New Room");
//       casino.addRoom(room);
//       expect(casino.getRooms()).toContain(room);
//     });

//     /**
//      * @test `should add multiple rooms to the casino`
//      * @description Verifies that multiple rooms can be added at once, and the room list reflects these additions.
//      */
//     it("should add multiple rooms to the casino", () => {
//       const rooms = [new MockPokerRoom("Room 1"), new MockPokerRoom("Room 2")];
//       casino.addRooms(rooms);
//       expect(casino.getRooms()).toEqual(rooms);
//     });

//     /**
//      * @test `should delete a room by index`
//      * @description Checks that a room can be deleted by specifying its index and confirms the room list updates accordingly.
//      */
//     it("should delete a room by index", () => {
//       const rooms = [new MockPokerRoom("Room 1"), new MockPokerRoom("Room 2")];
//       casino.setRooms(rooms);
//       casino.deleteRoom(0);
//       expect(casino.getRooms()).toHaveLength(1);
//       expect(casino.getRoom(0)?.name).toBe("Room 2");
//     });
//   });

//   /**
//    * @testgroup Room Count and Index Validation
//    * Verifies the functionality related to counting rooms and validating room indexes.
//    */
//   describe("Room Count and Index Validation", () => {
//     /**
//      * @test `should return the correct number of rooms`
//      * @description Checks that the total number of rooms in the casino is accurately returned by `roomCount()`.
//      */
//     it("should return the correct number of rooms", () => {
//       const rooms = [
//         new MockPokerRoom("Room 1"),
//         new MockPokerRoom("Room 2"),
//         new MockPokerRoom("Room 3"),
//       ];
//       casino.setRooms(rooms);
//       expect(casino.roomCount()).toBe(3);
//     });

//     /**
//      * @test `should validate a valid index`
//      * @description Ensures that a valid index is accepted and returns `true`.
//      */
//     it("should validate a valid index", () => {
//       casino.setRooms([new MockPokerRoom("Room 1")]);
//       expect(casino.isValidIndex(0)).toBe(true);
//     });

//     /**
//      * @test `should throw an error for an invalid index`
//      * @description Verifies that an invalid index throws an error, confirming correct validation behavior.
//      */
//     it("should throw an error for an invalid index", () => {
//       casino.setRooms([new MockPokerRoom("Room 1")]);
//       expect(() => casino.isValidIndex(2)).toThrow("Invalid index: 2");
//     });
//   });

//   /**
//    * @testgroup Event Emission
//    * Tests the event emission functionality for room-related actions.
//    */
//   describe("Event Emission", () => {
//     /**
//      * @test `should emit an event when a room is created`
//      * @description Confirms that the `casino:roomCreated` event is emitted with the newly created room as a parameter.
//      */
//     it("should emit an event when a room is created", (done) => {
//       casino.on("casino:roomCreated", (room) => {
//         expect(room.name).toBe("Event Room");
//         done();
//       });
//       casino.createRoom({ name: "Event Room", tableConfig: {} as any });
//     });
//   });
// });
