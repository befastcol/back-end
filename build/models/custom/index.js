"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentSchema = exports.pointSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pointSchema = new mongoose_1.Schema({
    type: { type: String, default: "Point", enum: ["Point"] },
    coordinates: { type: [Number], required: true },
    title: String,
    subtitle: String,
});
exports.pointSchema.index({ coordinates: "2dsphere" });
exports.documentSchema = new mongoose_1.Schema({
    front: { type: String, default: null },
    back: { type: String, default: null },
});
