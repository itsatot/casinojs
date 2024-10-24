import { PokerPhaseName } from "../../../src/enums/pokerPhaseName";

/**
 * @description Unit tests for the `PokerPhaseName` enum.
 */
describe("PokerPhaseName Enum", () => {
  /**
   * @test Ensures that the enum values are correctly assigned to each phase.
   */
  it("should have correct values for each poker phase", () => {
    expect(PokerPhaseName.PRE_FLOP).toBe("Pre-Flop");
    expect(PokerPhaseName.FLOP).toBe("Flop");
    expect(PokerPhaseName.TURN).toBe("Turn");
    expect(PokerPhaseName.RIVER).toBe("River");
    expect(PokerPhaseName.SHOWDOWN).toBe("ShowDown");
  });

  /**
   * @test Verifies that the enum can be used as expected in a function.
   */
  it("should allow enum values to be passed into functions", () => {
    const getPhaseMessage = (phase: PokerPhaseName): string => {
      return `The current phase is: ${phase}`;
    };

    expect(getPhaseMessage(PokerPhaseName.PRE_FLOP)).toBe(
      "The current phase is: Pre-Flop"
    );
    expect(getPhaseMessage(PokerPhaseName.FLOP)).toBe(
      "The current phase is: Flop"
    );
    expect(getPhaseMessage(PokerPhaseName.TURN)).toBe(
      "The current phase is: Turn"
    );
    expect(getPhaseMessage(PokerPhaseName.RIVER)).toBe(
      "The current phase is: River"
    );
    expect(getPhaseMessage(PokerPhaseName.SHOWDOWN)).toBe(
      "The current phase is: ShowDown"
    );
  });

  /**
   * @test Ensures that only valid enum values are used.
   */
  it("should throw an error for invalid enum values", () => {
    const getPhaseMessage = (phase: PokerPhaseName): string => {
      if (!Object.values(PokerPhaseName).includes(phase)) {
        throw new Error("Invalid poker phase");
      }
      return `The current phase is: ${phase}`;
    };

    // Valid cases
    expect(() => getPhaseMessage(PokerPhaseName.PRE_FLOP)).not.toThrow();
    expect(() => getPhaseMessage(PokerPhaseName.FLOP)).not.toThrow();

    // Invalid cases
    expect(() =>
      getPhaseMessage("InvalidPhase" as PokerPhaseName)
    ).toThrowError("Invalid poker phase");
  });
});
