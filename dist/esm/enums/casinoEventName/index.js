/**
 * @enum {string} `CasinoEventName`
 * Defines the events emitted by the `Casino` class for mutable operations.
 * Events are triggered only for state-changing actions like creation, additions, updates, and deletions.
 *
 * @example
 * ```typescript
 * const eventName = CasinoEventName.ROOM_CREATED;
 * console.log(eventName);
 * // Output: "Casino:PokerRoomCreated"
 * ```
 */
var CasinoEventName;
(function (CasinoEventName) {
    /**
     * `ROOM_CREATED` - Emitted when a new room is created and added to the casino's list of managed rooms.
     *
     * #### Purpose
     * Notifies listeners when a new poker room has been successfully created and added to the Casino’s managed list.
     */
    CasinoEventName["ROOM_CREATED"] = "Casino:PokerRoomCreated";
    /**
     * `ROOM_ADDED` - Emitted when a single room is added to the casino's list of managed rooms.
     *
     * #### Purpose
     * Allows listeners to respond when a new room is introduced into the Casino’s list of available rooms.
     */
    CasinoEventName["ROOM_ADDED"] = "Casino:PokerRoomAdded";
    /**
     * `ROOM_UPDATED` - Emitted when an existing room in the casino is modified.
     *
     * #### Purpose
     * Notifies listeners when a room’s configuration or attributes (e.g., blinds, player limits) have been updated.
     */
    CasinoEventName["ROOM_UPDATED"] = "Casino:PokerRoomUpdated";
    /**
     * `ROOM_DELETED` - Emitted when an existing room is removed from the casino's list of managed rooms.
     *
     * #### Purpose
     * Enables clean-up or resource reallocation processes by notifying listeners when a room is removed from the Casino.
     */
    CasinoEventName["ROOM_DELETED"] = "Casino:PokerRoomDeleted";
    /**
     * `ROOMS_SET` - Emitted when the casino’s managed list of rooms is set to a new batch of rooms.
     *
     * #### Purpose
     * Notifies listeners when the Casino’s full list of rooms has been reset or replaced with a new set of rooms.
     */
    CasinoEventName["ROOMS_SET"] = "Casino:PokerRoomsSet";
})(CasinoEventName || (CasinoEventName = {}));
export { CasinoEventName };
//# sourceMappingURL=index.js.map