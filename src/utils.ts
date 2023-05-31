export const getChunkEndIndex = (startIndex: number, bits: number) =>
  startIndex + Math.floor(bits / 8);
