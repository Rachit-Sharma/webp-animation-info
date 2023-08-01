import { notAnimatedError, notVP8XError } from "./errors";
import type { ChunkT } from "./types";

export const chunks: Array<ChunkT> = [
  {
    name: "RIFF",
    type: "fourCC",
    offsetBits: 0,
    bits: 32,
    skipBits: 0,
    process: function (parsedValue) {
      if (parsedValue !== "RIFF") throw new Error("RIFF header missing");
    },
  },
  {
    name: "fileSize",
    type: "number",
    offsetBits: 0,
    bits: 32,
    skipBits: 0,
    process: function (parsedValue, image) {
      const chunkSize = Number.parseInt(parsedValue, 2) + 8;

      if (chunkSize % 2 !== 0)
        throw new Error("Signs of file tampering detected");
      if (chunkSize !== image.size)
        throw new Error("File size does not match encoded image size");
    },
  },
  {
    name: "WEBP",
    type: "fourCC",
    offsetBits: 0,
    bits: 32,
    skipBits: 0,
    process: function (parsedValue) {
      if (parsedValue !== "WEBP")
        throw new Error(`File is encoded as ${parsedValue} instead of WEBP`);
    },
  },
  {
    name: "VP8X",
    type: "fourCC",
    offsetBits: 0,
    bits: 32,
    skipBits: 32,
    process: function (parsedValue) {
      if (parsedValue !== "VP8X") throw notVP8XError;
    },
  },
  {
    name: "Animation",
    type: "number",
    offsetBits: 0,
    bits: 8,
    skipBits: 72,
    process: function (parsedValue, _image, results) {
      const animation = parsedValue.at(-2) === "1";

      if (!animation) throw notAnimatedError;

      results.isAnimated = true;
    },
  },
  {
    name: "Loops",
    type: "number",
    offsetBits: 96,
    bits: 16,
    skipBits: 0,
    process: function (parsedValue, _image, results) {
      const loopCount = Number.parseInt(parsedValue, 2);
      results.loops = loopCount;
    },
  },
];

export const anmfChunks: Array<ChunkT> = [
  {
    name: "ANMF",
    type: "fourCC",
    offsetBits: 0,
    bits: 32,
    skipBits: 0,
    process: function (parsedValue) {
      if (parsedValue !== "ANMF")
        throw new Error("Error parsing animation chunks.");
    },
  },
  {
    name: "chunkSize",
    type: "number",
    offsetBits: 0,
    bits: 32,
    skipBits: 96,
    process: function (parsedValue) {
      anmfChunks[2].skipBits = (Number.parseInt(parsedValue, 2) - 15) * 8;
    },
  },
  {
    name: "frameDuration",
    type: "number",
    offsetBits: 0,
    bits: 24,
    skipBits: 0,
    process: function (parsedValue, _image, results) {
      const frameDuration = Number.parseInt(parsedValue, 2);
      results.frameDurations.push(frameDuration);
      results.totalDuration += frameDuration;
    },
  },
];
