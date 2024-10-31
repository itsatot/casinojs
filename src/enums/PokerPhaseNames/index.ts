//@collapse

/**
 * @enum `PokerPhaseName`
 * Defines the various phases in a standard poker game. Each phase represents a distinct stage
 * within the game sequence, governing the number of community cards dealt and player actions.
 *
 * #### Purpose
 * `PokerPhaseName` is designed to provide a clear, standardized reference for each poker phase.
 * It simplifies managing the game flow and ensures that each phase can be easily referenced
 * within conditional statements and game logic.
 *
 * #### Phases Overview
 * The `PokerPhaseName` includes the following phases:
 * - **PRE_FLOP**: The initial phase before any community cards are dealt.
 * - **FLOP**: The second phase, where the first three community cards are dealt.
 * - **TURN**: The third phase, where a fourth community card is dealt.
 * - **RIVER**: The fourth phase, where the fifth and final community card is dealt.
 * - **SHOWDOWN**: The final phase where players reveal their hands and a winner is determined.
 *
 * #### Usage
 * This enum standardizes the game flow, making it easy to transition between poker phases
 * and ensuring compatibility with various game modules and functions.
 *
 * @example
 * ```typescript
 * const currentPhase: PokerPhaseName = PokerPhaseName.PRE_FLOP;
 * console.log(currentPhase);
 * // Console Output: "Pre-Flop"
 * ```
 */
enum PokerPhaseName {
  /**
   * The initial phase before any community cards are dealt.
   *
   * @example
   * ```typescript
   * const currentPhase: PokerPhaseName = PokerPhaseName.PRE_FLOP;
   * console.log(currentPhase);
   * // Console Output: "Pre-Flop"
   * ```
   */
  PRE_FLOP = "Pre-Flop",

  /** The second phase where the first three community cards are dealt.
   *
   * @example
   * ```typescript
   * const currentPhase: PokerPhaseName = PokerPhaseName.FLOP;
   * console.log(currentPhase);
   * // Console Output: "Flop"
   * ```
   */
  FLOP = "Flop",

  /** The third phase where a fourth community card is dealt.
   *
   * @example
   * ```typescript
   * const currentPhase: PokerPhaseName = PokerPhaseName.TURN;
   * console.log(currentPhase);
   * // Console Output: "Turn"
   * ```
   */
  TURN = "Turn",

  /** The fourth phase where the fifth and final community card is dealt.
   *
   * @example
   * ```typescript
   * const currentPhase: PokerPhaseName = PokerPhaseName.RIVER;
   * console.log(currentPhase);
   * // Console Output: "River"
   * ```
   */
  RIVER = "River",

  /** The final phase where players reveal their hands to determine the winner.
   *
   * @example
   * ```typescript
   * const currentPhase: PokerPhaseName = PokerPhaseName.SHOWDOWN;
   * console.log(currentPhase);
   * // Console Output: "ShowDown"
   * ```
   */
  SHOWDOWN = "ShowDown",
}

export { PokerPhaseName };
