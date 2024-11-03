/**
 * @interface BaseEventEmitterInterface
 * Extends the standard Node.js EventEmitter, including listener management methods.
 */
interface BaseEventEmitterInterface extends NodeJS.EventEmitter {
  /**
   * Retrieves the maximum number of listeners allowed for this instance.
   * @returns {number} The maximum number of listeners, defaulting to Node.js’s `EventEmitter.defaultMaxListeners`.
   */
  getMaxListeners(): number;
}

export { BaseEventEmitterInterface };
