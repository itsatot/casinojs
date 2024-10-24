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
var PokerPhaseName;
(function (PokerPhaseName) {
    PokerPhaseName["PRE_FLOP"] = "Pre-Flop";
    PokerPhaseName["FLOP"] = "Flop";
    PokerPhaseName["TURN"] = "Turn";
    PokerPhaseName["RIVER"] = "River";
    PokerPhaseName["SHOWDOWN"] = "ShowDown";
})(PokerPhaseName || (PokerPhaseName = {}));
export { PokerPhaseName };
//# sourceMappingURL=index.js.map