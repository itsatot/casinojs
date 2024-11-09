//@collapse

import { PokerPhases } from "../../../src/enums/pokerPhases";

/**
 * @file `pokerPhaseName/index.test.ts`
 * @description This file contains unit tests for the `PokerPhases` enum using Jest. It verifies that the enum values for different poker phases are correctly defined.
 *
 * @jest-environment node
 */

describe("PokerPhases Enum", () => {
  /**
   * @test `should define all phases correctly`
   * @description This test checks whether all expected poker phases exist in the `PokerPhases` enum with the correct string values.
   *
   * @example
   * // Verifies that PokerPhases enum values are correct
   * expect(PokerPhases.PRE_FLOP).toBe("Pre-Flop");
   */
  it("should define all phases correctly", () => {
    // Expected phases in the poker game
    expect(PokerPhases.PRE_FLOP).toBe("Pre-Flop");
    expect(PokerPhases.FLOP).toBe("Flop");
    expect(PokerPhases.TURN).toBe("Turn");
    expect(PokerPhases.RIVER).toBe("River");
    expect(PokerPhases.SHOWDOWN).toBe("ShowDown");
  });

  /**
   * @test `should have exact number of phases`
   * @description This test ensures that the `PokerPhases` enum only contains the expected 5 phases.
   *
   * @example
   * // Verifies the number of keys in the PokerPhases enum
   * expect(Object.keys(PokerPhases).length).toBe(5);
   */
  it("should have exactly 5 phases", () => {
    // Verify that the enum contains exactly 5 phases
    const phaseCount = Object.keys(PokerPhases).length;
    expect(phaseCount).toBe(5);
  });

  /**
   * @test `should not contain any unexpected phases`
   * @description This test ensures that the `PokerPhases` enum does not include any values outside of the predefined poker phases.
   *
   * @example
   * // Check that PokerPhases does not include any invalid phases
   * expect(PokerPhases).not.toContain("InvalidPhase");
   */
  it("should not contain any unexpected phases", () => {
    // Get the values of the enum and check that no invalid phase is present
    const validPhases = ["Pre-Flop", "Flop", "Turn", "River", "ShowDown"];
    expect(Object.values(PokerPhases)).toEqual(validPhases);
  });

  /**
   * @test `should allow usage of poker phases in conditional checks`
   * @description This test demonstrates how the `PokerPhases` enum can be used in conditional logic, ensuring that phases can be matched correctly in code logic.
   *
   * @example
   * // Conditional check using PokerPhases enum
   * const currentPhase = PokerPhases.FLOP;
   * if (currentPhase === PokerPhases.FLOP) {
   *   console.log("It's the Flop phase");
   * }
   * expect(currentPhase).toBe(PokerPhases.FLOP);
   */
  it("should allow usage of poker phases in conditional checks", () => {
    // Example of using the enum in a conditional check
    const currentPhase = PokerPhases.FLOP;

    if (currentPhase === PokerPhases.FLOP) {
      expect(currentPhase).toBe(PokerPhases.FLOP);
    } else {
      throw new Error("Current phase is incorrect");
    }
  });
});
