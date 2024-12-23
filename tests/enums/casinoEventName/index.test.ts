//@collapse

import { CasinoEvents } from "../../../src/enums";

/**
 * @file `casinoEventName/index.test.ts`
 * @description This file contains unit tests for the `CasinoEvents` enum using Jest. These tests ensure that each event name in the `CasinoEvents` enum is defined correctly and aligns with expected event names for mutable operations within the Casino class.
 *
 * @jest-environment node
 */

describe("CasinoEvents Enum", () => {
  /**
   * @test `should define all event names correctly`
   * @description This test checks that all expected event names in the `CasinoEvents` enum exist with the correct string values. The test validates each event’s string value.
   *
   * @example
   * // Verifies that CasinoEvents.ROOM_CREATED is defined as "Casino:PokerRoomCreated"
   * expect(CasinoEvents.ROOM_CREATED).toBe("Casino:PokerRoomCreated");
   */
  it("should define all event names correctly", () => {
    expect(CasinoEvents.ROOM_CREATED).toBe("Casino:PokerRoomCreated");
    expect(CasinoEvents.ROOM_ADDED).toBe("Casino:PokerRoomAdded");
    expect(CasinoEvents.ROOM_UPDATED).toBe("Casino:PokerRoomUpdated");
    expect(CasinoEvents.ROOM_DELETED).toBe("Casino:PokerRoomDeleted");
    expect(CasinoEvents.ROOMS_SET).toBe("Casino:PokerRoomsSet");
  });

  /**
   * @test `should contain exactly 5 events`
   * @description This test ensures that the `CasinoEvents` enum includes exactly 5 events, covering all mutable operations related to casino room management.
   *
   * @example
   * // Confirms the number of keys in the CasinoEvents enum
   * expect(Object.keys(CasinoEvents).length).toBe(5);
   */
  it("should contain exactly 5 events", () => {
    const eventCount = Object.keys(CasinoEvents).length;
    expect(eventCount).toBe(5);
  });

  /**
   * @test `should not contain any unexpected event names`
   * @description This test checks that the `CasinoEvents` enum does not contain any additional, undefined event names outside of the required 5 events for room management.
   *
   * @example
   * // Verifies that CasinoEvents only includes the expected values
   * const expectedEvents = ["Casino:PokerRoomCreated", "Casino:PokerRoomAdded", "Casino:PokerRoomUpdated", "Casino:PokerRoomDeleted", "Casino:PokerRoomsSet"];
   * expect(Object.values(CasinoEvents)).toEqual(expectedEvents);
   */
  it("should not contain any unexpected event names", () => {
    const expectedEvents = [
      "Casino:PokerRoomCreated",
      "Casino:PokerRoomAdded",
      "Casino:PokerRoomUpdated",
      "Casino:PokerRoomDeleted",
      "Casino:PokerRoomsSet",
    ];
    expect(Object.values(CasinoEvents)).toEqual(expectedEvents);
  });

  /**
   * @test `should allow usage of event names in conditional checks`
   * @description This test demonstrates the ability to use event names from `CasinoEvents` in conditional logic, ensuring that each event can be utilized programmatically in event-driven code.
   *
   * @example
   * // Example conditional check using CasinoEvents enum
   * const event = CasinoEvents.ROOM_CREATED;
   * if (event === CasinoEvents.ROOM_CREATED) {
   *   console.log("Room creation event triggered");
   * }
   * expect(event).toBe(CasinoEvents.ROOM_CREATED);
   */
  it("should allow usage of event names in conditional checks", () => {
    const event = CasinoEvents.ROOM_CREATED;

    if (event === CasinoEvents.ROOM_CREATED) {
      expect(event).toBe("Casino:PokerRoomCreated");
    } else {
      throw new Error("Incorrect event name used");
    }
  });
});
