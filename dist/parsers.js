"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChunk = void 0;
const utils_1 = require("./utils");
const parseFourCC = (byteArray, byteArrayIndex, chunk, image, results) => {
    byteArrayIndex = (0, utils_1.getChunkEndIndex)(byteArrayIndex, chunk.offsetBits);
    const chunkEndIndex = byteArrayIndex + 4;
    let chunkString = "";
    while (byteArrayIndex < chunkEndIndex) {
        chunkString += String.fromCharCode(byteArray[byteArrayIndex++]);
    }
    chunk.process(chunkString, image, results);
    return (0, utils_1.getChunkEndIndex)(byteArrayIndex, chunk.skipBits);
};
const parseNumber = (byteArray, byteArrayIndex, chunk, image, results) => {
    byteArrayIndex = (0, utils_1.getChunkEndIndex)(byteArrayIndex, chunk.offsetBits);
    const chunkEndIndex = (0, utils_1.getChunkEndIndex)(byteArrayIndex, chunk.bits);
    let chunkBinaryString = "";
    while (byteArrayIndex < chunkEndIndex) {
        chunkBinaryString =
            byteArray[byteArrayIndex++].toString(2).padStart(8, "0") +
                chunkBinaryString;
    }
    chunk.process(chunkBinaryString, image, results);
    return (0, utils_1.getChunkEndIndex)(byteArrayIndex, chunk.skipBits);
};
const parseChunk = (byteArray, byteArrayIndex, chunk, image, results) => {
    switch (chunk.type) {
        case "number":
            return parseNumber(byteArray, byteArrayIndex, chunk, image, results);
        case "fourCC":
            return parseFourCC(byteArray, byteArrayIndex, chunk, image, results);
        default:
            throw new Error("Unknown chunk type encountered");
    }
};
exports.parseChunk = parseChunk;
