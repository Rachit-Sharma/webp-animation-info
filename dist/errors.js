"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAnimatedError = exports.notVP8XError = void 0;
exports.notVP8XError = new Error("This WebP is not in Extended File Format. It does not support animation");
exports.notAnimatedError = new Error("This WebP is not animated");
