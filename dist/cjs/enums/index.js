"use strict";
/**
 * @module `Enums`
 * Centralized export for all poker-related enums.
 * This module gathers and exports enums for `Rank` and `Suit`,
 * which represent the ranks and suits of playing cards in poker.
 *
 * By centralizing these enums, other modules can import them easily
 * for consistent use across the library.
 *
 * @example
 * // Import all enums from the centralized module
 * import { Rank, Suit } from './enums';
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
exports.SuitEnums = exports.RankEnums = exports.PokerPhaseNameEnums = void 0;
exports.PokerPhaseNameEnums = __importStar(require("./pokerPhaseName"));
__exportStar(require("./pokerPhaseName"), exports);
exports.RankEnums = __importStar(require("./rank"));
__exportStar(require("./rank"), exports);
exports.SuitEnums = __importStar(require("./suit"));
__exportStar(require("./suit"), exports);
//# sourceMappingURL=index.js.map