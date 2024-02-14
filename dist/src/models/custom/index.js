"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentSchema = exports.pointSchema = void 0;
const mongoose_1 = require("mongoose");
exports.pointSchema = new mongoose_1.Schema({
    coordinates: {
        type: [Number],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
});
exports.documentSchema = new mongoose_1.Schema({
    front: { type: String, default: null },
    back: { type: String, default: null },
});
