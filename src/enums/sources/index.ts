//@collapse

/**
 * @enum {string} `Source`
 * Defines the sources of various components and entities within the library, each representing a specific
 * entity or module that can emit events or interact within the system. This enum is used as a standardized
 * identifier for the origin of actions, events, or data across the library.
 *
 * #### Purpose
 * `Source` is designed to standardize the identification of each module or entity within the library,
 * facilitating tracing, logging, and debugging. Each value corresponds to a distinct source, making it
 * clear where specific events or actions originate.
 *
 * #### Enum Values
 * - **_BASE**: Represents the `BaseEventEmitter`, the foundational emitter for events within the library.
 * - **CARD**: Represents the `Card` model, corresponding to individual playing cards in the library.
 * - **CASINO**: Refers to the `Casino` model, handling high-level operations related to game management.
 * - **DECK**: Identifies the `Deck`, representing a collection or set of cards in a game context.
 * - **POKER_GAME**: Corresponds to the `PokerGame` model, managing game-specific actions and states.
 * - **POKER_PHASE**: Represents the `PokerPhase` model, indicating the stages or phases within a poker game.
 * - **POKER_PLAYER**: Refers to the `PokerPlayer` model, encompassing player-specific data and actions.
 * - **POKER_ROOM**: Corresponds to the `PokerRoom` model, representing rooms where games take place.
 * - **POKER_SEAT**: Refers to the `PokerSeat` model, representing individual seats within a poker table.
 * - **POKER_TABLE**: Represents the `PokerTable` model, handling table-specific settings and seating.
 *
 * #### Usage
 * `Source` provides a standard set of identifiers used across the library for event emission and origin
 * tracking. Each entity or module can reference its corresponding `Source` value when emitting events or
 * logging actions, enhancing traceability and modularity.
 *
 * @example
 * ```typescript
 * const source = Source.POKER_GAME;
 * console.log(source);
 * // Console Output: "PokerGame"
 * ```
 */
enum Source {
  /**
   * Represents the `BaseEventEmitter`, the foundational event emitter for the library.
   *
   * @example
   * ```typescript
   * const source = Source._BASE;
   * console.log(source);
   * // Console Output: "BaseEventEmitter"
   * ```
   */
  _BASE = "BaseEventEmitter",

  /**
   * Represents the `Card` model, corresponding to individual playing cards.
   *
   * @example
   * ```typescript
   * const source = Source.CARD;
   * console.log(source);
   * // Console Output: "Card"
   * ```
   */
  CARD = "Card",

  /**
   * Refers to the `Casino` model, which handles casino or game management operations.
   *
   * @example
   * ```typescript
   * const source = Source.CASINO;
   * console.log(source);
   * // Console Output: "Casino"
   * ```
   */
  CASINO = "Casino",

  /**
   * Identifies the `Deck`, representing a collection of playing cards.
   *
   * @example
   * ```typescript
   * const source = Source.DECK;
   * console.log(source);
   * // Console Output: "Deck"
   * ```
   */
  DECK = "Deck",

  /**
   * Corresponds to the `PokerGame` model, responsible for managing the poker game actions and states.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_GAME;
   * console.log(source);
   * // Console Output: "PokerGame"
   * ```
   */
  POKER_GAME = "PokerGame",

  /**
   * Represents the `PokerPhase` model, indicating stages or phases within a poker game.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_PHASE;
   * console.log(source);
   * // Console Output: "PokerPhase"
   * ```
   */
  POKER_PHASE = "PokerPhase",

  /**
   * Refers to the `PokerPlayer` model, encompassing player-specific data and actions.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_PLAYER;
   * console.log(source);
   * // Console Output: "PokerPlayer"
   * ```
   */
  POKER_PLAYER = "PokerPlayer",

  /**
   * Corresponds to the `PokerRoom` model, representing rooms where games take place.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_ROOM;
   * console.log(source);
   * // Console Output: "PokerRoom"
   * ```
   */
  POKER_ROOM = "PokerRoom",

  /**
   * Refers to the `PokerSeat` model, representing individual seats within a poker table.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_SEAT;
   * console.log(source);
   * // Console Output: "PokerSeat"
   * ```
   */
  POKER_SEAT = "PokerSeat",

  /**
   * Represents the `PokerTable` model, which handles table-specific settings and seating.
   *
   * @example
   * ```typescript
   * const source = Source.POKER_TABLE;
   * console.log(source);
   * // Console Output: "PokerTable"
   * ```
   */
  POKER_TABLE = "PokerTable",
}

export { Source };
