import { Rank, Suit } from "../../interfaces";

class Card {
  constructor(public rank: Rank, public suit: Suit) {}

  toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}

export default Card;
