"use strict";
/**
 * @module `Interfaces`
 * Centralized export for all poker-related interfaces and types.
 * This module gathers and exports interfaces and types for `Card`, `Deck`.
 * This allows for streamlined imports in other modules, ensuring that all poker-related interfaces
 * and types can be accessed from a single location.
 *
 * @example
 * // Import all interfaces and types from the centralized module
 * import { CardInterface, DeckInterface } from './interfaces';
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerTableInterfaces = exports.PokerSeatInterfaces = exports.PokerRoomInterfaces = exports.PokerPlayerInterfaces = exports.PokerPhaseInterfaces = exports.PokerGameInterfaces = exports.DeckInterfaces = exports.CasinoInterfaces = exports.CardInterfaces = void 0;
exports.CardInterfaces = __importStar(require("./card"));
__exportStar(require("./card"), exports);
exports.CasinoInterfaces = __importStar(require("./casino"));
__exportStar(require("./casino"), exports);
exports.DeckInterfaces = __importStar(require("./deck"));
__exportStar(require("./deck"), exports);
exports.PokerGameInterfaces = __importStar(require("./pokerGame"));
__exportStar(require("./pokerGame"), exports);
exports.PokerPhaseInterfaces = __importStar(require("./pokerPhase"));
__exportStar(require("./pokerPhase"), exports);
exports.PokerPlayerInterfaces = __importStar(require("./pokerPlayer"));
__exportStar(require("./pokerPlayer"), exports);
exports.PokerRoomInterfaces = __importStar(require("./pokerRoom"));
__exportStar(require("./pokerRoom"), exports);
exports.PokerSeatInterfaces = __importStar(require("./pokerSeat"));
__exportStar(require("./pokerSeat"), exports);
exports.PokerTableInterfaces = __importStar(require("./pokerTable"));
__exportStar(require("./pokerTable"), exports);
//# sourceMappingURL=index.js.map