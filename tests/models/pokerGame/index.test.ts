// import { PokerGame } from "../../../src/models/pokerGame";
// import { Deck } from "../../../src/models/deck";
// import { PokerPhases, PokerGameEvents ,Suit } from "../../../src/enums";
// import { PokerPlayer } from "../../../src/models/pokerPlayer";
// import { PokerPlayerInterface, PokerGameConfig } from "../../../src/interfaces";

// describe("PokerGame", () => {
//   let players: PokerPlayerInterface[];
//   let config: PokerGameConfig;
//   let game: PokerGame;

//   beforeEach(() => {
//     players = [
//       new PokerPlayer({
//         id: "1",
//         name: "Player 1",
//         chips: 1000,
//         holeCards: [],
//         isFolded: false,
//         currentBet: 0,
//       }),
//       new PokerPlayer({
//         id: "2",
//         name: "Player 2",
//         chips: 1000,
//         holeCards: [],
//         isFolded: false,
//         currentBet: 0,
//       }),
//       new PokerPlayer({
//         id: "3",
//         name: "Player 3",
//         chips: 1000,
//         holeCards: [],
//         isFolded: false,
//         currentBet: 0,
//       }),
//     ];

//     config = {
//       id: "game-123",
//       players,
//       smallBlind: 10,
//       bigBlind: 20,
//     };

//     game = new PokerGame(config);
//   });

//   describe("Initialization", () => {
//     test("should initialize with correct configurations", () => {
//       expect(game.getId()).toBe("game-123");
//       expect(game.getPlayers()).toHaveLength(3);
//       expect(game.getDeck().getCards()).toHaveLength(52);
//       expect(game.getCurrentPhase()?.getName()).toBe(PokerPhases.PRE_FLOP);
//     });

//     test("should shuffle the deck during initialization", () => {
//       const deck1 = new Deck().getCards();
//       const deck2 = game.getDeck().getCards();
//       expect(deck1).not.toEqual(deck2); // Deck should be shuffled
//     });

//     test("should emit INITIALIZED event", () => {
//       const spy = jest.spyOn(game, "emitEvent");
//       new PokerGame(config);
//       expect(spy).toHaveBeenCalledWith(
//         PokerGameEvents.INITIALIZED,
//         expect.any(Object)
//       );
//     });
//   });

//   describe("Phase Management", () => {
//     test("should advance to the next phase", () => {
//       game.advanceToNextPhase();
//       expect(game.getCurrentPhase()?.getName()).toBe(PokerPhases.FLOP);
//     });

//     test("should emit PHASE_CHANGED event when advancing phases", () => {
//       const spy = jest.spyOn(game, "emitEvent");
//       game.advanceToNextPhase();
//       expect(spy).toHaveBeenCalledWith(
//         PokerGameEvents.PHASE_CHANGED,
//         expect.any(Object)
//       );
//     });

//     test("should emit GAME_ENDED event at the end of the last phase", () => {
//       game.advanceToNextPhase(); // FLOP
//       game.advanceToNextPhase(); // TURN
//       game.advanceToNextPhase(); // RIVER
//       const spy = jest.spyOn(game, "emitEvent");
//       game.advanceToNextPhase();
//       expect(spy).toHaveBeenCalledWith(
//         PokerGameEvents.GAME_ENDED,
//         expect.any(Object)
//       );
//     });
//   });

//   describe("Pot Management", () => {
//     test("should calculate pots correctly for side pots", () => {
//       players[0].setCurrentBet(50);
//       players[1].setCurrentBet(100);
//       players[2].setCurrentBet(150);
//       game["__pot"] = 300;

//       const pots = game["__calculatePots"](game["__getActivePlayers"]());
//       expect(pots).toHaveLength(3);
//       expect(pots[0].amount).toBe(150);
//       expect(pots[1].amount).toBe(100);
//       expect(pots[2].amount).toBe(50);
//     });

//     test("should reset pot and bets after resolution", () => {
//       game["__pot"] = 500;
//       players[0].setCurrentBet(100);
//       players[1].setCurrentBet(200);

//       game["__resetBetsAndPot"]();
//       expect(game.getPot()).toBe(0);
//       players.forEach((player) => expect(player.getCurrentBet()).toBe(0));
//     });
//   });

//   describe("Community Cards", () => {
//     test("should distribute community cards correctly", () => {
//       game["__communityCards"] = [
//         {
//           getRank: () => 10,
//           getSuit: () => Suit.Hearts,
//           toObj: () => ({ rank: 10, suit: Suit.Hearts }),
//         },
//         {
//           getRank: () => 11,
//           getSuit: () => Suit.Hearts,
//           toObj: () => ({ rank: 11, suit: Suit.Hearts }),
//         },
//         {
//           getRank: () => 12,
//           getSuit: () => Suit.Hearts,
//           toObj: () => ({ rank: 12, suit: Suit.Hearts }),
//         },
//         {
//           getRank: () => 13,
//           getSuit: () => Suit.Hearts,
//           toObj: () => ({ rank: 13, suit: Suit.Hearts }),
//         },
//         {
//           getRank: () => 14,
//           getSuit: () => Suit.Hearts,
//           toObj: () => ({ rank: 14, suit: Suit.Hearts }),
//         },
//       ];

//       const communityHand = game["__determineBestHand"](
//         game.getCommunityCards()
//       );
//       expect(communityHand.rank).toBe(1); // Royal Flush
//     });

//     test("should emit BETS_RESOLVED event after bets are resolved", () => {
//       const spy = jest.spyOn(game, "emitEvent");
//       players[0].setCurrentBet(50);
//       players[1].setCurrentBet(50);
//       game["__resolveBets"]();
//       expect(spy).toHaveBeenCalledWith(
//         PokerGameEvents.BETS_RESOLVED,
//         expect.any(Object)
//       );
//     });
//   });

//   describe("Edge Cases", () => {
//     // test("should split pots when community cards form a Royal Flush", () => {
//     //   game["__communityCards"] = [
//     //     { getRank: () => 10, getSuit: () => "Hearts" },
//     //     { getRank: () => 11, getSuit: () => "Hearts" },
//     //     { getRank: () => 12, getSuit: () => "Hearts" },
//     //     { getRank: () => 13, getSuit: () => "Hearts" },
//     //     { getRank: () => 14, getSuit: () => "Hearts" },
//     //   ];

//     //   const pots = [{ amount: 300, players }];
//     //   const spy = jest.spyOn(players[0], "addChips");
//     //   game["__splitPotEqually"](pots, game["__getActivePlayers"]());
//     //   expect(spy).toHaveBeenCalledWith(100); // Each player gets 100
//     // });

//     test("should handle no active players gracefully", () => {
//       players.forEach((player) => player.setIsFolded(true));
//       const spy = jest.spyOn(console, "error");
//       game["__resolveBets"]();
//       expect(spy).toHaveBeenCalledWith("No active players to resolve bets.");
//     });

//     test("should handle tie-breaking logic correctly", () => {
//       const playersHands = [
//         { rank: 2, highCard: 14, cards: [] }, // Straight Flush
//         { rank: 2, highCard: 13, cards: [] }, // Straight Flush
//         { rank: 3, highCard: 12, cards: [] }, // Four of a Kind
//       ];

//       const result = game(playersHands);
//       expect(result.playerIndex).toBe(0); // Player with Ace high Straight Flush wins
//     });
//   });
// });
