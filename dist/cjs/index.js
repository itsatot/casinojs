"use strict";
//@collapse
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
exports.Utils = exports.Models = exports.Interfaces = exports.Enums = void 0;
/**
 * @module `casinojs`
 * Centralized export for the entire `pokerjs` library, providing access to interfaces, models, and types.
 *
 * This module exports all necessary components for working with poker games, including:
 * - Interfaces (`CardInterface`, `DeckInterface`)
 * - Models (`Card`, `Deck`)
 * - Enums (`Rank`, `Suit`)
 *
 * @example
 * // Importing from the centralized library module
 * import { CardInterface, Card, Deck, Rank, Suit } from 'pokerjs';
 *
 * const deck = new Deck();
 * deck.shuffle();
 * const card = deck.draw();
 * console.log(card?.toString());
 */
exports.Enums = __importStar(require("./enums"));
__exportStar(require("./enums"), exports);
exports.Interfaces = __importStar(require("./interfaces"));
__exportStar(require("./interfaces"), exports);
exports.Models = __importStar(require("./models"));
__exportStar(require("./models"), exports);
exports.Utils = __importStar(require("./utils"));
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map