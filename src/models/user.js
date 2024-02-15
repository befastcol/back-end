"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var custom_1 = require("./custom");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "courier", "admin"],
        default: "user",
    },
    INE: custom_1.documentSchema,
    driverLicense: custom_1.documentSchema,
    currentLocation: custom_1.pointSchema,
    originLocation: custom_1.pointSchema,
});
exports.User = mongoose_1.default.model("User", userSchema);
