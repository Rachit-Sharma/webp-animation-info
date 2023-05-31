import { anmfChunks, chunks } from "./chunks";
import { notAnimatedError, notVP8XError } from "./errors";
import { parseChunk } from "./parsers";
import type { ResultsT } from "./types";

const webPAnimationInfo = (webp: File) => {
  if (!webp.name.endsWith(".webp") && !webp.name.endsWith(".WEBP")) {
    throw new Error("File has incorrect extension");
  }

  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onload = (progressEvent) => {
      let fileRepresentation = progressEvent.target?.result;
      if (!fileRepresentation) return;

      fileRepresentation = fileRepresentation as ArrayBuffer;
      const byteArray = new Uint8Array(fileRepresentation);

      const results: ResultsT = {
        isAnimated: false,
        loops: 0,
        frameDurations: [],
        totalDuration: 0,
      };

      let byteArrayIndex = 0,
        chunkIndex = 0;

      try {
        while (chunkIndex < chunks.length) {
          byteArrayIndex = parseChunk(
            byteArray,
            byteArrayIndex,
            chunks[chunkIndex],
            webp,
            results
          );
          chunkIndex++;
        }
        while (byteArrayIndex < byteArray.length) {
          anmfChunks.forEach((chunk) => {
            byteArrayIndex = parseChunk(
              byteArray,
              byteArrayIndex,
              chunk,
              webp,
              results
            );
          });
        }
      } catch (error) {
        if (![notVP8XError, notAnimatedError].includes(error as Error))
          throw error;
      }
      resolve(results);
    };
    reader.readAsArrayBuffer(webp);
  });
};

export default webPAnimationInfo;
