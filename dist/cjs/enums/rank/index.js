"use strict";
//@collapse
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rank = void 0;
/**
 * @enum {string} `Rank`
 * Represents the ranks of playing cards used in poker.
 * Each rank corresponds to a specific card value from 2 to Ace.
 *
 * @example
 * ```typescript
 * const rank = Rank.Ace;
 * console.log(rank);
 * //output: "A"
 * ```
 */
var Rank;
(function (Rank) {
    Rank["Two"] = "2";
    Rank["Three"] = "3";
    Rank["Four"] = "4";
    Rank["Five"] = "5";
    Rank["Six"] = "6";
    Rank["Seven"] = "7";
    Rank["Eight"] = "8";
    Rank["Nine"] = "9";
    Rank["Ten"] = "10";
    Rank["Jack"] = "J";
    Rank["Queen"] = "Q";
    Rank["King"] = "K";
    Rank["Ace"] = "A";
})(Rank || (exports.Rank = Rank = {}));
//# sourceMappingURL=index.js.map