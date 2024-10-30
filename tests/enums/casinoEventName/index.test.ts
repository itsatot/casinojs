//@collapse

import { CasinoEventName } from "../../../src/enums/casinoEventName";

/**
 * @file `casinoEventName/index.test.ts`
 * @description This file contains unit tests for the `CasinoEventName` enum using Jest. These tests ensure that each event name in the `CasinoEventName` enum is defined correctly and aligns with expected event names for mutable operations within the Casino class.
 *
 * @jest-environment node
 */

describe("CasinoEventName Enum", () => {
  /**
   * @test `should define all event names correctly`
   * @description This test checks that all expected event names in the `CasinoEventName` enum exist with the correct string values. The test validates each event’s string value.
   *
   * @example
   * // Verifies that CasinoEventName.ROOM_CREATED is defined as "Casino:PokerRoomCreated"
   * expect(CasinoEventName.ROOM_CREATED).toBe("Casino:PokerRoomCreated");
   */
  it("should define all event names correctly", () => {
    expect(CasinoEventName.ROOM_CREATED).toBe("Casino:PokerRoomCreated");
    expect(CasinoEventName.ROOM_ADDED).toBe("Casino:PokerRoomAdded");
    expect(CasinoEventName.ROOM_UPDATED).toBe("Casino:PokerRoomUpdated");
    expect(CasinoEventName.ROOM_DELETED).toBe("Casino:PokerRoomDeleted");
    expect(CasinoEventName.ROOMS_SET).toBe("Casino:PokerRoomsSet");
  });

  /**
   * @test `should contain exactly 5 events`
   * @description This test ensures that the `CasinoEventName` enum includes exactly 5 events, covering all mutable operations related to casino room management.
   *
   * @example
   * // Confirms the number of keys in the CasinoEventName enum
   * expect(Object.keys(CasinoEventName).length).toBe(5);
   */
  it("should contain exactly 5 events", () => {
    const eventCount = Object.keys(CasinoEventName).length;
    expect(eventCount).toBe(5);
  });

  /**
   * @test `should not contain any unexpected event names`
   * @description This test checks that the `CasinoEventName` enum does not contain any additional, undefined event names outside of the required 5 events for room management.
   *
   * @example
   * // Verifies that CasinoEventName only includes the expected values
   * const expectedEvents = ["Casino:PokerRoomCreated", "Casino:PokerRoomAdded", "Casino:PokerRoomUpdated", "Casino:PokerRoomDeleted", "Casino:PokerRoomsSet"];
   * expect(Object.values(CasinoEventName)).toEqual(expectedEvents);
   */
  it("should not contain any unexpected event names", () => {
    const expectedEvents = [
      "Casino:PokerRoomCreated",
      "Casino:PokerRoomAdded",
      "Casino:PokerRoomUpdated",
      "Casino:PokerRoomDeleted",
      "Casino:PokerRoomsSet",
    ];
    expect(Object.values(CasinoEventName)).toEqual(expectedEvents);
  });

  /**
   * @test `should allow usage of event names in conditional checks`
   * @description This test demonstrates the ability to use event names from `CasinoEventName` in conditional logic, ensuring that each event can be utilized programmatically in event-driven code.
   *
   * @example
   * // Example conditional check using CasinoEventName enum
   * const event = CasinoEventName.ROOM_CREATED;
   * if (event === CasinoEventName.ROOM_CREATED) {
   *   console.log("Room creation event triggered");
   * }
   * expect(event).toBe(CasinoEventName.ROOM_CREATED);
   */
  it("should allow usage of event names in conditional checks", () => {
    const event = CasinoEventName.ROOM_CREATED;

    if (event === CasinoEventName.ROOM_CREATED) {
      expect(event).toBe("Casino:PokerRoomCreated");
    } else {
      throw new Error("Incorrect event name used");
    }
  });
});
