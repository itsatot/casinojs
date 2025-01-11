import { PokerPhase } from "../../../src/models/pokerPhase";
import { Deck } from "../../../src/models/deck";
import { PokerPhases, PokerPhaseEvents } from "../../../src/enums";
import { BaseEventEmitter } from "../../../src/models/_base";
import { CardInterface, DeckInterface, PokerPhaseConfig, PokerPhaseInterface, PokerPlayerInterface } from "../../../src/interfaces";
import { PokerPlayer } from "../../../src/models/pokerPlayer";


describe("PokerPhaseTwoPlayers", () => {
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







describe("PokerPhaseThreePlayers", () => {
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
      new PokerPlayer({
        id: "3",
        name: "Player 3",
        chips: 1000,
        hand: [],
        isFolded: false,
        currentBet: 0,
      }),
    ];

    deck = new Deck();
  });

  describe("Constructor and Initialization", () => {
    test("should initialize PokerPhase for three players", () => {
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
  });

  describe("Betting", () => {
    test("should process a valid bet for three players", () => {
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

      expect(currentPlayer.getChips()).toBe(950);
      expect(currentPlayer.getCurrentBet()).toBe(50);
      expect(phase.getPot()).toBe(80);
    });
  });

  describe("Turn Management", () => {
    test("should advance to the next player for three players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      // Initially, Player 3's turn
      expect(phase.getCurrentPlayerPos()).toBe(0);

      phase.advanceToNextPlayer();

      // Next player is Player 1
      expect(phase.getCurrentPlayerPos()).toBe(1);
    });
  });

  describe("Folding", () => {
    test("should fold the current player and advance turn for three players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      phase.currentPlayerfold();

      // Player 3 is folded
      expect(phase.getPlayers()[0].isFolded()).toBe(true);

      // Turn advances to Player 1
      expect(phase.getCurrentPlayerPos()).toBe(1);
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

      expect(phase.getDeck().getCards().length).toBe(43);
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

      // All players bet 100
      phase.getPlayers().forEach((player) => player.setCurrentBet(100));

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

      // Player 1 and Player 2 bet 100, Player 3 bets 50
      phase.getPlayers()[0].setCurrentBet(100);
      phase.getPlayers()[1].setCurrentBet(100);
      phase.getPlayers()[2].setCurrentBet(50);

      expect(phase.isCompleted()).toBe(false);
    });
  });

  describe("Blind Initialization", () => {
    test("should initialize blinds correctly for three players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      expect(players[0].getChips()).toBe(1000); // Small blind
      expect(players[0].getCurrentBet()).toBe(0);
      expect(players[1].getChips()).toBe(990); // Big blind
      expect(players[1].getCurrentBet()).toBe(10);
      expect(players[2].getChips()).toBe(980); // Player 3
      expect(players[2].getCurrentBet()).toBe(20);
    });
  });
});





describe("PokerPhaseEightPlayers", () => {
  let players: PokerPlayerInterface[];
  let deck: Deck;

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore the original console.log implementation
  });

  beforeEach(() => {
    players = Array.from(
      { length: 8 },
      (_, i) =>
        new PokerPlayer({
          id: `${i + 1}`,
          name: `Player ${i + 1}`,
          chips: 1000,
          hand: [],
          isFolded: false,
          currentBet: 0,
        })
    );

    deck = new Deck();
  });

  describe("Constructor and Initialization", () => {
    test("should initialize PokerPhase for eight players", () => {
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
      expect(phase.getPot()).toBe(30); // Small + Big blind
      expect(phase.getCurrentPlayerPos()).toBe(3); // First player after big blind
    });
  });

  describe("Betting", () => {
    test("should process a valid bet for eight players", () => {
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

      expect(currentPlayer.getChips()).toBe(950); // Chips after bet
      expect(currentPlayer.getCurrentBet()).toBe(50); // Bet amount
      expect(phase.getPot()).toBe(80); // Total pot
    });
  });

  describe("Turn Management", () => {
    test("should advance to the next player for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      // Initially, Player 3's turn
      expect(phase.getCurrentPlayerPos()).toBe(3);

      phase.advanceToNextPlayer();

      // Next player is Player 4
      expect(phase.getCurrentPlayerPos()).toBe(4);
    });
  });

  describe("Folding", () => {
    test("should fold the current player and advance turn for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      phase.currentPlayerfold();

      // Player 3 is folded
      expect(phase.getPlayers()[3].isFolded()).toBe(true);

      // Turn advances to Player 4
      expect(phase.getCurrentPlayerPos()).toBe(4);
    });
  });

  describe("Community Cards", () => {
    test("should deal community cards from the deck for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      phase.dealCommunityCards(3);

      expect(phase.getDeck().getCards().length).toBe(33); // 52 - 7 (3 community + 2 per player for 8 players)
      expect(phase.getCommunityCards()).toHaveLength(3);
    });
  });

  describe("Phase Completion", () => {
    test("should return true if all active players match the highest bet for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      // All players bet 100
      phase.getPlayers().forEach((player) => player.setCurrentBet(100));

      expect(phase.isCompleted()).toBe(true);
    });

    test("should return false if any active player has not matched the highest bet for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };
      const phase = new PokerPhase(config);

      // Players 1-7 bet 100, Player 8 bets 50
      phase
        .getPlayers()
        .forEach((player, idx) => player.setCurrentBet(idx === 7 ? 50 : 100));

      expect(phase.isCompleted()).toBe(false);
    });
  });

  describe("Blind Initialization", () => {
    test("should initialize blinds correctly for eight players", () => {
      const config: PokerPhaseConfig = {
        name: PokerPhases.PRE_FLOP,
        players: players,
        smallBlind: 10,
        bigBlind: 20,
        deck: new Deck(),
      };

      const phase = new PokerPhase(config);

      expect(players[0].getChips()).toBe(1000); // Small blind
      expect(players[0].getCurrentBet()).toBe(0);
      expect(players[1].getChips()).toBe(990); // Big blind
      expect(players[1].getCurrentBet()).toBe(10);
      expect(players[2].getChips()).toBe(980); // Player 3
      expect(players[2].getCurrentBet()).toBe(20);
    });
  });
});