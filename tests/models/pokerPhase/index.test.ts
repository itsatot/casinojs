import { PokerPhase } from "../../../src/models/pokerPhase";
import { Deck } from "../../../src/models/deck";
import { PokerPhases, PokerPhaseEvents } from "../../../src/enums";
import { BaseEventEmitter } from "../../../src/models/_base";
import { CardInterface, DeckInterface, PokerPhaseInterface, PokerPlayerInterface } from "../../../src/interfaces";
import { PokerPlayer } from "../../../src/models/pokerPlayer";


describe("PokerPhase", () => {
  let players: PokerPlayerInterface[];
  let deck: Deck;

  beforeEach(() => {
    players = [
      new PokerPlayer({
        id: "1",
        name: "Player 1",
        chips: 1000,
        hand: [],
        isFolded: false,
        currentBet: 0,
      }),
      new PokerPlayer({
        id: "2",
        name: "Player 2",
        chips: 1000,
        hand: [],
        isFolded: false,
        currentBet: 0,
      }),
    ];

    deck = new Deck();
  });

  describe("Constructor and Initialization", () => {
    test("should initialize PokerPhase with default values", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players: [],
        deck: new Deck(),
        smallBlind: 0,
        bigBlind: 0,
      });
      expect(phase.getName()).toBe(PokerPhases.PRE_FLOP);
      expect(phase.getPlayers()).toEqual([]);
      expect(phase.getPot()).toBe(0);
    });

    test("should initialize PokerPhase with custom configuration", () => {
      const config = {
        name: PokerPhases.FLOP,
        players,
        smallBlind: 10,
        bigBlind: 20,
        deck,
      };
      const phase = new PokerPhase(config);

      expect(phase.getName()).toBe(PokerPhases.FLOP);
      expect(phase.getPlayers()).toBe(players);
    });

    test("should emit INITIALIZED event after initialization", () => {
      const spy = jest.spyOn(PokerPhase.prototype, "emitEvent");

      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      expect(spy).toHaveBeenCalledWith(
        PokerPhaseEvents.INITIALIZED,
        expect.any(Object)
      );
      expect(phase.getName()).toBe(PokerPhases.PRE_FLOP);

      spy.mockRestore();
    });
  });

  describe("Betting", () => {
    test("should process a valid bet", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.currentPlayerBet(50);

      expect(phase.getPlayers()[0].getChips()).toBe(940);
      expect(phase.getPlayers()[0].getCurrentBet()).toBe(60);
      expect(phase.getPot()).toBe(80);
    }); 

    test("should throw an error for insufficient chips", () => {
      
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.getPlayers()[0].setChips(20);

      expect(() => phase.getPlayers()[0].bet(50)).toThrow(
        "Player does not have enough chips to bet."
      );
    });
  });

  describe("Folding", () => {
    test("should fold the current player and advance turn", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.getPlayers()[0].setIsFolded(true);

      expect(players[0].isFolded()).toBe(true);
    });
  });

  describe("Community Cards", () => {
    test("should deal community cards from the deck", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.dealCommunityCards(3);

      expect(deck.getCards().length).toBe(49);
      expect(phase.getCommunityCards()).toHaveLength(3);
    });
  });

  describe("Phase Completion", () => {
    test("should return true if all active players match the highest bet", () => {
      players[0].setCurrentBet(100);
      players[1].setCurrentBet(100);

      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      expect(phase.isCompleted()).toBe(true);
    });

    test("should return false if any active player has not matched the highest bet", () => {
      players[0].setCurrentBet(100);
      players[1].setCurrentBet(100);

      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      expect(phase.isCompleted()).toBe(false);
    });
  });

  describe("Turn Management", () => {
    test("should advance to the next player", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.advanceToNextPlayer();

      expect(phase.getCurrentPlayerPos()).toBe(1);
    });
  });

  describe("Blind Initialization", () => {
    test("should initialize blinds correctly", () => {
      const phase = new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        players,
        deck,
        smallBlind: 10,
        bigBlind: 20,
      });

      phase.initializeBlinds(10, 20);

      expect(players[0].getChips()).toBe(990);
      expect(players[0].getCurrentBet()).toBe(10);
      expect(players[1].getChips()).toBe(980);
      expect(players[1].getCurrentBet()).toBe(20);
    });
  });
});


