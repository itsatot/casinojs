//collapse

// Import Enums
import { HandRank, PokerGameEvents, PokerPhases, Source } from "../../enums";

// Import Interfaces
import {
  PokerGameConfig,
  DeckInterface,
  CardInterface,
  PokerGameInterface,
  PokerPlayerInterface,
  PokerPhaseInterface,
} from "../../interfaces";

// Import Models
import { BaseEventEmitter } from "../_base";
import { Deck } from "../deck";
import { PokerPhase } from "../pokerPhase";

// Import Utils
import { generateUniqueId, logger } from "../../utils";

class PokerGame extends BaseEventEmitter implements PokerGameInterface {
  /*************************************************************************************
   * PROPERTIES
   *************************************************************************************/

  private __id: string = ``;

  private __deck: DeckInterface = new Deck();

  private __phases: PokerPhaseInterface[] = [];

  private __currentPhase: PokerPhaseInterface | null = null;

  private __communityCards: CardInterface[] = [];

  private __players: PokerPlayerInterface[] = [];

  private __pot: number = 0;

  /*************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   *************************************************************************************/

  constructor(config: PokerGameConfig) {
    super();
    this.__init(config);
  }

  private __init(config: PokerGameConfig): void {
    this.__setId(config.id || generateUniqueId());
    this.__setDeck(new Deck());
    this.__deck.shuffle();
    this.__setPlayers(config.players || this.getPlayers());
    this.__setPhases(this.__phases);

    // Initialize Phases
    this.__setPhases([
      new PokerPhase({
        name: PokerPhases.PRE_FLOP,
        deck: this.__deck,
        players: this.__players,
        smallBlind: 10,
        bigBlind: 20,
      }),
      new PokerPhase({
        name: PokerPhases.FLOP,
        deck: this.__deck,
        players: this.__players,
        smallBlind: 10,
        bigBlind: 20,
      }),
      new PokerPhase({
        name: PokerPhases.TURN,
        deck: this.__deck,
        players: this.__players,
        smallBlind: 10,
        bigBlind: 20,
      }),
      new PokerPhase({
        name: PokerPhases.RIVER,
        deck: this.__deck,
        players: this.__players,
        smallBlind: 10,
        bigBlind: 20,
      }),
    ]);

    this.__currentPhase = this.__phases[0];

    // Emit `INITIALIZED` event after initialization
    this.emitEvent(PokerGameEvents.INITIALIZED, {
      event: {
        source: Source.POKER_GAME,
        data: { gameId: this.getId() },
      },
      middlewares: [],
    });
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  public getId(): string {
    return this.__id;
  }

  public getPlayers(): PokerPlayerInterface[] {
    return this.__players;
  }

  public getDeck(): DeckInterface {
    return this.__deck;
  }

  public getPot(): number {
    return this.__pot;
  }

  public getCurrentPhase(): PokerPhaseInterface | null {
    return this.__currentPhase;
  }

  public getCommunityCards(): CardInterface[] {
    return this.__communityCards;
  }

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  public advanceToNextPhase(): void {
    return this.__advanceToNextPhase();
  }

  private __resolveBets(): void {
    const activePlayers = this.__getActivePlayers();

    if (activePlayers.length === 0) {
      console.error("No active players to resolve bets.");
      return;
    }

    const pots = this.__calculatePots(activePlayers);
    this.__distributePots(pots);
    this.__resetBetsAndPot();

    this.__emitBetsResolvedEvent(pots);
  }

  /**
   * Filters active players who have not folded.
   */
  private __getActivePlayers(): PokerPlayerInterface[] {
    return this.__players.filter((player) => !player.isFolded());
  }

  /**
   * Calculates the main and side pots based on player bets.
   */
  private __calculatePots(
    activePlayers: PokerPlayerInterface[]
  ): { amount: number; players: PokerPlayerInterface[] }[] {
    const playersByBet = [...activePlayers].sort(
      (a, b) => a.getCurrentBet() - b.getCurrentBet()
    );

    let remainingPot = this.__pot;
    const pots: { amount: number; players: PokerPlayerInterface[] }[] = [];

    for (let i = 0; i < playersByBet.length; i++) {
      const currentBet = playersByBet[i].getCurrentBet();
      const playersInPot = playersByBet.slice(i);

      if (currentBet > 0) {
        const potContribution = currentBet * playersInPot.length;
        pots.push({
          amount: Math.min(remainingPot, potContribution),
          players: playersInPot,
        });

        remainingPot -= potContribution;

        // Reduce bets for all players in this pot
        playersInPot.forEach((player) =>
          player.setCurrentBet(player.getCurrentBet() - currentBet)
        );
      }

      if (remainingPot <= 0) break;
    }

    return pots;
  }

  /**
   * Distributes the pots among winners.
   */
  private __distributePots(
    pots: { amount: number; players: PokerPlayerInterface[] }[]
  ): void {
    for (const pot of pots) {
      const playersInPot = pot.players;

      const handsMap = this.__generateHandsForPlayers();

      const playersHands = playersInPot.map((player) => ({
        rank: handsMap.get(player.getId())?.rank || 10,
        highCard: handsMap.get(player.getId())?.highCard || -1,
        cards: handsMap.get(player.getId())?.bestHand || [],
      }));

      // Determine the winner by evaluating hands
      const { winningHand, playerIndex } = this.__breakTie(playersHands);

      const winner = playersInPot[playerIndex];
      winner.addChips(pot.amount);

      console.log(
        `Player ${winner.getId()} wins pot of ${
          pot.amount
        } chips with hand: ${winningHand}`
      );
    }
  }

  /**
   * Resets all player bets and the pot for the next phase.
   */
  private __resetBetsAndPot(): void {
    this.__players.forEach((player) => player.setCurrentBet(0));
    this.__pot = 0;
  }

  /**
   * Emits the BETS_RESOLVED event with pot details.
   */
  private __emitBetsResolvedEvent(
    pots: { amount: number; players: PokerPlayerInterface[] }[]
  ): void {
    this.emitEvent(PokerGameEvents.BETS_RESOLVED, {
      event: {
        source: Source.POKER_GAME,
        data: {
          pots,
        },
      },
    });
  }

  private __generateHandsForPlayers(): Map<
    string,
    { bestHand: CardInterface[]; rank: number; highCard: number }
  > {
    const hands = new Map<
      string,
      { bestHand: CardInterface[]; rank: number; highCard: number }
    >();

    const communityCards = this.__communityCards;

    for (const player of this.__players) {
      const holeCards = player.getHoleCards();
      const allCards = [...holeCards, ...communityCards];

      // Generate all 5-card combinations
      const allCombinations = this.__getCombinations(allCards, 5);

      let bestHand: CardInterface[] | null = null;
      let bestRank = 11; // Start with a rank higher than the worst rank
      let bestHighCard = -1;

      for (const combination of allCombinations) {
        const handStrength = this.__determineBestHand(combination);

        // Update the best hand if the current one is stronger
        if (
          handStrength.rank < bestRank || // Lower rank is better (e.g., Royal Flush = 1)
          (handStrength.rank === bestRank &&
            handStrength.highCard > bestHighCard)
        ) {
          bestHand = combination;
          bestRank = handStrength.rank;
          bestHighCard = handStrength.highCard;
        }
      }

      if (bestHand) {
        hands.set(player.getId(), {
          bestHand,
          rank: bestRank,
          highCard: bestHighCard,
        });
      }
    }

    return hands;
  }

  private __getCombinations(
    cards: CardInterface[],
    size: number
  ): CardInterface[][] {
    const results: CardInterface[][] = [];

    const helper = (start: number, combination: CardInterface[]): void => {
      if (combination.length === size) {
        results.push([...combination]);
        return;
      }

      for (let i = start; i < cards.length; i++) {
        combination.push(cards[i]);
        helper(i + 1, combination);
        combination.pop();
      }
    };

    helper(0, []);
    return results;
  }

  private __determineBestHand(cards: CardInterface[]): {
    rank: number;
    highCard: number;
  } {
    const cardValues = cards
      .map((card) => card.getRank())
      .sort((a, b) => a - b);
    const suits = cards.map((card) => card.getSuit());

    const isFlush = this.__isFlush(suits);
    const isStraight = this.__isStraight(cardValues);

    if (
      isFlush &&
      isStraight &&
      cardValues.includes(14) &&
      cardValues[cardValues.length - 5] === 10
    ) {
      return {
        rank: 1, // Royal Flush
        highCard: 14, // Ace is the high card in a Royal Flush
      };
        highCard: Math.max(...cardValues),
      };
    }
    }

    if (isFlush && isStraight) {
      return {
        rank: 2, // Straight Flush

    const groups = this.__groupByValue(cardValues);

    if (Object.values(groups).includes(4)) {
      return {
        rank: 3, // Four of a Kind
        highCard: this.__getHighestGroupCard(groups, 4),
      };
    }

    if (
      Object.values(groups).includes(3) &&
      Object.values(groups).includes(2)
    ) {
      return {
        rank: 4, // Full House
        highCard: this.__getHighestGroupCard(groups, 3),
      };
    }

    if (isFlush) {
      return {
        rank: 5, // Flush
        highCard: Math.max(...cardValues),
      };
    }

    if (isStraight) {
      return {
        rank: 6, // Straight
        highCard: Math.max(...cardValues),
      };
    }

    if (Object.values(groups).includes(3)) {
      return {
        rank: 7, // Three of a Kind
        highCard: this.__getHighestGroupCard(groups, 3),
      };
    }

    if (this.__countPairs(groups) === 2) {
      return {
        rank: 8, // Two Pair
        highCard: this.__getHighestGroupCard(groups, 2),
      };
    }

    if (this.__countPairs(groups) === 1) {
      return {
        rank: 9, // One Pair
        highCard: this.__getHighestGroupCard(groups, 2),
      };
    }

    return {
      rank: 10, // High Card
      highCard: Math.max(...cardValues),
    };
  }

  private __breakTie(
    hands: { rank: number; highCard: number; cards: CardInterface[] }[]
  ): { winningHand: CardInterface[]; playerIndex: number } {
    hands.sort((a, b) => {
      if (a.rank !== b.rank) return a.rank - b.rank; // Lower rank wins
      if (a.highCard !== b.highCard) return b.highCard - a.highCard; // Compare high cards

      // If ranks and high cards are the same, compare remaining cards
      const aSorted = a.cards
        .map((card) => card.getRank())
        .sort((x, y) => y - x);
      const bSorted = b.cards
        .map((card) => card.getRank())
        .sort((x, y) => y - x);

      for (let i = 0; i < aSorted.length; i++) {
        if (aSorted[i] !== bSorted[i]) {
          return bSorted[i] - aSorted[i];
        }
      }

      return 0; // Hands are identical
    });

    return {
      winningHand: hands[0].cards,
      playerIndex: hands.indexOf(hands[0]),
    };
  }
  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  private __setId(id: string): string {
    this.__id = id;
    return this.__id;
  }

  private __setPot(pot: number): number {
    this.__pot = pot;
    return this.__pot;
  }

  private __setPlayers(
    players: PokerPlayerInterface[]
  ): PokerPlayerInterface[] {
    this.__players = players;
    return this.__players;
  }

  private __setDeck(deck: DeckInterface): DeckInterface {
    this.__deck = deck;
    return this.__deck;
  }

  private __setPhases(phases: PokerPhaseInterface[]): PokerPhaseInterface[] {
    this.__phases = phases;
    return this.__phases;
  }

  private __advanceToNextPhase(): void {
    const currentIndex = this.__phases.indexOf(this.__currentPhase!);
    if (currentIndex < this.__phases.length - 1) {
      this.__currentPhase = this.__phases[currentIndex + 1];
      this.emitEvent(PokerGameEvents.PHASE_CHANGED, {
        event: {
          source: Source.POKER_GAME,
          data: { phase: this.__currentPhase.getName() },
        },
      });
    } else {
      this.emitEvent(PokerGameEvents.GAME_ENDED, {
        event: {
          source: Source.POKER_GAME,
          data: { gameId: this.getId() },
        },
      });
    }
  }

  private __isFlush(suits: string[]): boolean {
    const suitCounts = suits.reduce((acc, suit) => {
      acc[suit] = (acc[suit] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.values(suitCounts).some((count) => count >= 5);
  }

  private __isStraight(cardValues: number[]): boolean {
    const sortedValues = [...new Set(cardValues)].sort((a, b) => a - b);

    for (let i = 0; i <= sortedValues.length - 5; i++) {
      const slice = sortedValues.slice(i, i + 5);
      if (slice[slice.length - 1] - slice[0] === 4) {
        return true;
      }
    }

    return false;
  }

  private __groupByValue(cardValues: number[]): Record<number, number> {
    return cardValues.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  private __getHighestGroupCard(
    groups: Record<number, number>,
    groupSize: number
  ): number {
    return Math.max(
      ...Object.keys(groups)
        .filter((key) => groups[+key] === groupSize)
        .map(Number)
    );
  }

  private __countPairs(groups: Record<number, number>): number {
    return Object.values(groups).filter((count) => count === 2).length;
  }
}

export { PokerGame };
