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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingCouriers = exports.getAcceptedCouriers = exports.updateUserAsCourier = exports.getAllUsers = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.createUser = void 0;
var user_1 = require("../models/user");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, phone, existingUser, newUser, _1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name_1 = _a.name, phone = _a.phone;
                if (!phone)
                    return [2 /*return*/, res.status(400).json({ message: "Phone is required" })];
                return [4 /*yield*/, user_1.User.findOne({ phone: phone })];
            case 1:
                existingUser = _b.sent();
                if (existingUser)
                    return [2 /*return*/, res.status(409).json({ _id: existingUser._id })];
                return [4 /*yield*/, new user_1.User({ name: name_1, phone: phone }).save()];
            case 2:
                newUser = _b.sent();
                res.status(201).json(newUser);
                return [3 /*break*/, 4];
            case 3:
                _1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.findById(req.params.userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var updateUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userId, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                userId = req.params.userId;
                return [4 /*yield*/, user_1.User.findByIdAndUpdate(userId, body, { new: true })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                res.status(200).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserById = updateUserById;
var deleteUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.findByIdAndDelete(req.params.userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                res.status(200).json({ message: "User deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
var getAllUsers = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find({ role: "user" })];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var updateUserAsCourier = function (_a, res) {
    var userId = _a.params.userId, body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var INE, driverLicense, updatedUser, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    INE = body.INE, driverLicense = body.driverLicense;
                    return [4 /*yield*/, user_1.User.findByIdAndUpdate(userId, {
                            role: "courier",
                            INE: {
                                front: INE.front,
                                back: INE.back,
                            },
                            driverLicense: {
                                front: driverLicense.front,
                            },
                        }, { new: true })];
                case 1:
                    updatedUser = _b.sent();
                    if (!updatedUser) {
                        return [2 /*return*/, res.status(404).json({ message: "User not found" })];
                    }
                    res.status(200).json(updatedUser);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    res.status(500).json({ message: "Internal server error" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateUserAsCourier = updateUserAsCourier;
var getAcceptedCouriers = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var couriers, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find({ role: "courier" })];
            case 1:
                couriers = _a.sent();
                res.status(200).json(couriers);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAcceptedCouriers = getAcceptedCouriers;
var getPendingCouriers = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pendingCouriers, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find({
                        role: "user",
                        "INE.front": { $ne: null },
                        "INE.back": { $ne: null },
                        "driverLicense.front": { $ne: null },
                    })];
            case 1:
                pendingCouriers = _a.sent();
                res.status(200).json(pendingCouriers);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPendingCouriers = getPendingCouriers;
