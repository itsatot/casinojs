/**@collapse */

import { EventEmitter } from "events";
import {
  PokerPlayerConfig,
  PokerPlayerInterface,
  PokerRoomInterface,
  PokerRoomConfig,
  PokerTableConfig,
  PokerTableInterface,
} from "../../../src/interfaces";

/**
 * @class `MockPokerRoom`
 * A mock implementation of `PokerRoomInterface` used in testing, implementing all required methods for compliance.
 *
 * @implements {PokerRoomInterface}
 */
class MockPokerRoom extends EventEmitter implements PokerRoomInterface {
  private id: string;
  private name: string;
  private queue: PokerPlayerInterface[] = [];
  private table: PokerTableInterface;

  constructor(config: PokerRoomConfig) {
    super();
    this.id = config.id || "default-id";
    this.name = config.name || "default-room";
    this.table = new config.tableConfig() as PokerTableConfig;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getQueue(): PokerPlayerInterface[] {
    return this.queue;
  }

  addToQueue(config: PokerPlayerConfig): boolean {
    const player: PokerPlayerInterface = { ...config } as PokerPlayerInterface;
    this.queue.push(player);
    return true;
  }

  getTable(): PokerTableInterface {
    return this.table;
  }
}

export { MockPokerRoom };
