"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
var mongoose_1 = require("mongoose");
var custom_1 = require("./custom");
var deliverySchema = new mongoose_1.Schema({
    requestedDate: {
        type: Date,
        default: Date.now,
    },
    deliveredDate: {
        type: Date,
        default: null,
    },
    origin: {
        type: custom_1.pointSchema,
        required: true,
    },
    destination: {
        type: custom_1.pointSchema,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courier: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending",
    },
    currentLocation: {
        type: [Number],
        required: false,
    },
});
exports.Delivery = mongoose_1.default.model("Delivery", deliverySchema);
