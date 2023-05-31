"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunkEndIndex = void 0;
const getChunkEndIndex = (startIndex, bits) => startIndex + Math.floor(bits / 8);
exports.getChunkEndIndex = getChunkEndIndex;
