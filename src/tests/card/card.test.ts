import { Card } from "../../models";
import { Rank, Suit } from "../../enums";

describe("Card", () => {
  let card: Card;

  beforeEach(() => {
    card = new Card({ rank: Rank.Ace, suit: Suit.Spades });
  });

  it("should create a card with the correct rank and suit", () => {
    expect(card.getRank()).toBe(Rank.Ace);
    expect(card.getSuit()).toBe(Suit.Spades);
  });

  it("should return the correct string representation", () => {
    expect(card.toString()).toBe("A of Spades");
  });

  it("should return the correct object representation", () => {
    expect(card.toObj()).toEqual({ rank: Rank.Ace, suit: Suit.Spades });
  });
});
