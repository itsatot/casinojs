import { PokerPhaseName } from "../../../src/enums/pokerPhaseName";

/**
 * @file `pokerPhaseName/index.test.ts`
 * @description This file contains unit tests for the `PokerPhaseName` enum using Jest. It verifies that the enum values for different poker phases are correctly defined.
 *
 * @jest-environment node
 */

describe("PokerPhaseName Enum", () => {
  /**
   * @test `should define all phases correctly`
   * @description This test checks whether all expected poker phases exist in the `PokerPhaseName` enum with the correct string values.
   *
   * @example
   * // Verifies that PokerPhaseName enum values are correct
   * expect(PokerPhaseName.PRE_FLOP).toBe("Pre-Flop");
   */
  it("should define all phases correctly", () => {
    // Expected phases in the poker game
    expect(PokerPhaseName.PRE_FLOP).toBe("Pre-Flop");
    expect(PokerPhaseName.FLOP).toBe("Flop");
    expect(PokerPhaseName.TURN).toBe("Turn");
    expect(PokerPhaseName.RIVER).toBe("River");
    expect(PokerPhaseName.SHOWDOWN).toBe("ShowDown");
  });

  /**
   * @test `should have exact number of phases`
   * @description This test ensures that the `PokerPhaseName` enum only contains the expected 5 phases.
   *
   * @example
   * // Verifies the number of keys in the PokerPhaseName enum
   * expect(Object.keys(PokerPhaseName).length).toBe(5);
   */
  it("should have exactly 5 phases", () => {
    // Verify that the enum contains exactly 5 phases
    const phaseCount = Object.keys(PokerPhaseName).length;
    expect(phaseCount).toBe(5);
  });

  /**
   * @test `should not contain any unexpected phases`
   * @description This test ensures that the `PokerPhaseName` enum does not include any values outside of the predefined poker phases.
   *
   * @example
   * // Check that PokerPhaseName does not include any invalid phases
   * expect(PokerPhaseName).not.toContain("InvalidPhase");
   */
  it("should not contain any unexpected phases", () => {
    // Get the values of the enum and check that no invalid phase is present
    const validPhases = ["Pre-Flop", "Flop", "Turn", "River", "ShowDown"];
    expect(Object.values(PokerPhaseName)).toEqual(validPhases);
  });

  /**
   * @test `should allow usage of poker phases in conditional checks`
   * @description This test demonstrates how the `PokerPhaseName` enum can be used in conditional logic, ensuring that phases can be matched correctly in code logic.
   *
   * @example
   * // Conditional check using PokerPhaseName enum
   * const currentPhase = PokerPhaseName.FLOP;
   * if (currentPhase === PokerPhaseName.FLOP) {
   *   console.log("It's the Flop phase");
   * }
   * expect(currentPhase).toBe(PokerPhaseName.FLOP);
   */
  it("should allow usage of poker phases in conditional checks", () => {
    // Example of using the enum in a conditional check
    const currentPhase = PokerPhaseName.FLOP;

    if (currentPhase === PokerPhaseName.FLOP) {
      expect(currentPhase).toBe(PokerPhaseName.FLOP);
    } else {
      throw new Error("Current phase is incorrect");
    }
  });
});
