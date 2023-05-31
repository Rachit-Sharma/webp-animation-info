import { ParserT } from "./types";
import { getChunkEndIndex } from "./utils";

const parseFourCC: ParserT = (
  byteArray,
  byteArrayIndex,
  chunk,
  image,
  results
) => {
  byteArrayIndex = getChunkEndIndex(byteArrayIndex, chunk.offsetBits);
  const chunkEndIndex = byteArrayIndex + 4;
  let chunkString = "";

  while (byteArrayIndex < chunkEndIndex) {
    chunkString += String.fromCharCode(byteArray[byteArrayIndex++]);
  }

  chunk.process(chunkString, image, results);

  return getChunkEndIndex(byteArrayIndex, chunk.skipBits);
};

const parseNumber: ParserT = (
  byteArray,
  byteArrayIndex,
  chunk,
  image,
  results
) => {
  byteArrayIndex = getChunkEndIndex(byteArrayIndex, chunk.offsetBits);
  const chunkEndIndex = getChunkEndIndex(byteArrayIndex, chunk.bits);
  let chunkBinaryString = "";

  while (byteArrayIndex < chunkEndIndex) {
    chunkBinaryString =
      byteArray[byteArrayIndex++].toString(2).padStart(8, "0") +
      chunkBinaryString;
  }
  chunk.process(chunkBinaryString, image, results);

  return getChunkEndIndex(byteArrayIndex, chunk.skipBits);
};

export const parseChunk: ParserT = (
  byteArray,
  byteArrayIndex,
  chunk,
  image,
  results
) => {
  switch (chunk.type) {
    case "number":
      return parseNumber(byteArray, byteArrayIndex, chunk, image, results);
    case "fourCC":
      return parseFourCC(byteArray, byteArrayIndex, chunk, image, results);
    default:
      throw new Error("Unknown chunk type encountered");
  }
};
