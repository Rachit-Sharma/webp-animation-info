export type ResultsT = {
  isAnimated: boolean;
  loops: number;
  frameDurations: Array<number>;
  totalDuration: number;
};

export type ChunkT = {
  name: string;
  type: "number" | "fourCC";
  offsetBits: number;
  bits: number;
  skipBits: number;
  process: (parsedValue: string, image: File, results: ResultsT) => void;
};

export type ParserT = (
  byteArray: Uint8Array,
  byteArrayIndex: number,
  chunk: ChunkT,
  image: File,
  results: ResultsT
) => number;
