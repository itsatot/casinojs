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
declare enum Rank {
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "J",
    Queen = "Q",
    King = "K",
    Ace = "A"
}
export { Rank };
