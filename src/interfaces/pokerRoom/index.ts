import { EventEmitter } from "events";
import { PokerTableInterface } from "../pokerTable";
import { PokerPlayerInterface } from "../pokerPlayer";

/**
 * @interface `PokerRoomInterface`
 * Represents a PokerRoom within a Casino that holds a single PokerTable.
 * The PokerRoom manages the player queue, automatically assigning players to the PokerTable
 * as seats become available.
 *
 * @extends NodeJS.EventEmitter
 */
interface PokerRoomInterface extends NodeJS.EventEmitter {}

export { PokerRoomInterface };
