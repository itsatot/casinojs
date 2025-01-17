//@collapse

/**
 * @enum {string} `Rank`
 * Represents the ranks of playing cards used in poker.
 * Each rank corresponds to a specific card value from 2 to Ace.
 *
 * @example
 * ```typescript
 * const rank  = Rank.Ace;
 * console.log(rank);
 * //output = "A"
 * ```
 */
enum HandRank {
  HIGH_CARD  = 10,
  PAIR = 9,
  TWO_PAIR = 8,
  THREE_OF_A_KIND = 7,
  STRAIGHT = 6,
  FLUSH = 5,
  FULL_HOUSE = 4,
  FOUR_OF_A_KIND = 3,
  STRAIGHT_FLUSH = 2,
  ROYAL_FLUSH = 1,
}

export { HandRank };
