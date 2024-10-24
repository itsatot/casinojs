/**
 * @enum `PokerPhaseName`
 * Represents the ranks of playing cards used in poker.
 * Each rank corresponds to a specific card value from 2 to Ace.
 *
 * @example
 * const pokerPhaseName = PokerPhaseName.PRE_FLOP;
 * console.log(pokerPhaseName);
 * //output: "Pre-Flop"
 */
declare enum PokerPhaseName {
    PRE_FLOP = "Pre-Flop",
    FLOP = "Flop",
    TURN = "Turn",
    RIVER = "River",
    SHOWDOWN = "ShowDown"
}
export { PokerPhaseName };
