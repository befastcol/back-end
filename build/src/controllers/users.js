"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingCouriers = exports.getAcceptedCouriers = exports.updateUserAsCourier = exports.getAllUsers = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = void 0;
const user_1 = require("../models/user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        if (!phone)
            return res.status(400).json({ message: "Phone is required" });
        const existingUser = yield user_1.User.findOne({ phone });
        if (existingUser)
            return res.status(409).json({ _id: existingUser._id });
        const newUser = yield new user_1.User({ name, phone }).save();
        res.status(201).json(newUser);
    }
    catch (_) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findById(req.params.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { userId } = req.params;
        const user = yield user_1.User.findByIdAndUpdate(userId, body, { new: true });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findByIdAndDelete(req.params.userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUserById = deleteUserById;
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find({ role: "user" });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllUsers = getAllUsers;
const updateUserAsCourier = ({ params: { userId }, body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { INE, driverLicense } = body;
        const updatedUser = yield user_1.User.findByIdAndUpdate(userId, {
            role: "courier",
            INE: {
                front: INE.front,
                back: INE.back,
            },
            driverLicense: {
                front: driverLicense.front,
            },
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateUserAsCourier = updateUserAsCourier;
const getAcceptedCouriers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const couriers = yield user_1.User.find({ role: "courier" });
        res.status(200).json(couriers);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAcceptedCouriers = getAcceptedCouriers;
const getPendingCouriers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pendingCouriers = yield user_1.User.find({
            role: "user",
            "INE.front": { $ne: null },
            "INE.back": { $ne: null },
            "driverLicense.front": { $ne: null },
        });
        res.status(200).json(pendingCouriers);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPendingCouriers = getPendingCouriers;
