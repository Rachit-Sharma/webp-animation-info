"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chunks_1 = require("./chunks");
const errors_1 = require("./errors");
const parsers_1 = require("./parsers");
const webPAnimationInfo = (webp) => {
    if (!webp.name.endsWith(".webp") && !webp.name.endsWith(".WEBP")) {
        throw new Error("File has incorrect extension");
    }
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = (progressEvent) => {
            let fileRepresentation = progressEvent.target?.result;
            if (!fileRepresentation)
                return;
            fileRepresentation = fileRepresentation;
            const byteArray = new Uint8Array(fileRepresentation);
            const results = {
                isAnimated: false,
                loops: 0,
                frameDurations: [],
                totalDuration: 0,
            };
            let byteArrayIndex = 0, chunkIndex = 0;
            try {
                while (chunkIndex < chunks_1.chunks.length) {
                    byteArrayIndex = (0, parsers_1.parseChunk)(byteArray, byteArrayIndex, chunks_1.chunks[chunkIndex], webp, results);
                    chunkIndex++;
                }
                while (byteArrayIndex < byteArray.length) {
                    chunks_1.anmfChunks.forEach((chunk) => {
                        byteArrayIndex = (0, parsers_1.parseChunk)(byteArray, byteArrayIndex, chunk, webp, results);
                    });
                }
            }
            catch (error) {
                if (![errors_1.notVP8XError, errors_1.notAnimatedError].includes(error))
                    throw error;
            }
            resolve(results);
        };
        reader.readAsArrayBuffer(webp);
    });
};
exports.default = webPAnimationInfo;
