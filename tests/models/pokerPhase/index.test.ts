import { PokerPhase } from "../../../src/models/pokerPhase";
import { Deck } from "../../../src/models/deck";
import { PokerPhases, PokerPhaseEvents } from "../../../src/enums";
import { BaseEventEmitter } from "../../../src/models/_base";
import { CardInterface, DeckInterface, PokerPhaseConfig, PokerPhaseInterface, PokerPlayerInterface } from "../../../src/interfaces";
import { PokerPlayer } from "../../../src/models/pokerPlayer";


describe("PokerPhase", () => {
  let players: PokerPlayerInterface[];
  let deck: Deck;

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore the original console.log implementation
  });

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
      // new PokerPlayer({
      //   id: "3",
      //   name: "Player 3",
      //   chips: 1000,
      //   hand: [],
      //   isFolded: false,
      //   currentBet: 0,
      // }),
    ];

    deck = new Deck();
  });

  describe("Constructor and Initialization", () => {
    test("should initialize PokerPhase with default values", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      expect(phase.getName()).toBe(PokerPhases.PRE_FLOP);
      expect(phase.getPlayers()).toBe(players);
      expect(phase.getPot()).toBe(30);
      expect(phase.getCurrentPlayerPos()).toBe(0);
    });

    test("should initialize PokerPhase with custom configuration", () => {
      const config : PokerPhaseConfig = {
        name: PokerPhases.FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      expect(phase.getName()).toBe(PokerPhases.FLOP);
      expect(phase.getPlayers()).toBe(players);
      expect(phase.getCurrentPlayerPos()).toBe(1);
    });

    test("should emit INITIALIZED event after initialization", () => {
      const spy = jest.spyOn(PokerPhase.prototype, "emitEvent");

      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

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

      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      const currentPlayer = phase.getPlayers()[phase.getCurrentPlayerPos()];

      phase.currentPlayerBet(50);

      expect(currentPlayer.getChips()).toBe(940);
      expect(currentPlayer.getCurrentBet()).toBe(60);
      expect(phase.getPot()).toBe(80);
    }); 

    test("should throw an error for insufficient chips", () => {
      
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      const currentPlayer = phase.getPlayers()[phase.getCurrentPlayerPos()];

      currentPlayer.setChips(20);

      expect(() => currentPlayer.bet(50)).toThrow("Player does not have enough chips to bet.");
    });
  });

  describe("Folding", () => {
    test("should fold the current player and advance turn", () => {

      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.currentPlayerfold();

      expect(phase.getPlayers()[phase.getCurrentPlayerPos()].isFolded()).toBe(true);
    });


    test("should detect if only one player remains", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.currentPlayerfold();

      const activePlayers = phase.getPlayers().filter((player) => !player.isFolded());

      expect(activePlayers[0].isFolded()).toBe(false);
      expect(console.log).toHaveBeenCalledWith(
        `Player ${activePlayers[0].getId()} wins the hand.`
      );
    });
  });

  describe("Community Cards", () => {
    test("should deal community cards from the deck", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.dealCommunityCards(3);

      expect(phase.getDeck().getCards().length).toBe(45);
      expect(phase.getCommunityCards()).toHaveLength(3);
    });
  });

  describe("Phase Completion", () => {
    test("should return true if all active players match the highest bet", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.currentPlayerBet(10);

      expect(phase.isCompleted()).toBe(true);
    });

    test("should return false if any active player has not matched the highest bet", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      expect(phase.isCompleted()).toBe(false);
    });
  });

  describe("Turn Management", () => {
    test("should advance to the next player", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.advanceToNextPlayer();

      expect(phase.getCurrentPlayerPos()).toBe(1);
    });
  });

  describe("Blind Initialization", () => {
    test("should initialize blinds correctly", () => {
     const config: PokerPhaseConfig = {
       name: PokerPhases.PRE_FLOP,
       players: players,
       smallBlind: 10,
       bigBlind: 20,
       deck: new Deck(),
     };
     const phase = new PokerPhase(config);

      expect(phase.getPlayers()[0].getChips()).toBe(990);
      expect(phase.getPlayers()[0].getCurrentBet()).toBe(10);
      expect(phase.getPlayers()[1].getChips()).toBe(980);
      expect(phase.getPlayers()[1].getCurrentBet()).toBe(20);
    });
  });
});


