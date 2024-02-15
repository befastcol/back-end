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
exports.getUserDeliveries = exports.getCourierDeliveries = exports.updateDelivery = exports.getDelivery = exports.deleteDelivery = exports.createDelivery = exports.getDeliveryPrice = void 0;
var delivery_1 = require("../models/delivery");
var price_1 = require("./helpers/price");
var getDeliveryPrice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, distance, duration, price;
    return __generator(this, function (_b) {
        try {
            _a = req.query, distance = _a.distance, duration = _a.duration;
            if (!distance && !duration)
                return [2 /*return*/, res.status(400).json({ message: "Invalid query parameters" })];
            price = (0, price_1.calculatePrice)(Number(distance), Number(duration));
            res.status(200).json(price);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
        return [2 /*return*/];
    });
}); };
exports.getDeliveryPrice = getDeliveryPrice;
var createDelivery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newDelivery, savedDelivery, _1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newDelivery = new delivery_1.Delivery({
                    origin: req.body.origin,
                    destination: req.body.destination,
                    price: req.body.price,
                    customer: req.params.userId,
                });
                return [4 /*yield*/, newDelivery.save()];
            case 1:
                savedDelivery = _a.sent();
                res.status(201).json(savedDelivery);
                return [3 /*break*/, 3];
            case 2:
                _1 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createDelivery = createDelivery;
var deleteDelivery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delivery, _2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, delivery_1.Delivery.findByIdAndDelete(req.params.deliveryId)];
            case 1:
                delivery = _a.sent();
                if (!delivery)
                    return [2 /*return*/, res.status(404).json({ message: "Not found" })];
                res.status(200).json({ message: "Delivery deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                _2 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteDelivery = deleteDelivery;
var getDelivery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryId, courierServices, _3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                deliveryId = req.params.deliveryId;
                return [4 /*yield*/, delivery_1.Delivery.findById(deliveryId)];
            case 1:
                courierServices = _a.sent();
                res.status(200).json(courierServices);
                return [3 /*break*/, 3];
            case 2:
                _3 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDelivery = getDelivery;
var updateDelivery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveryId, _a, status_1, courier, currentLocation, updatedDelivery, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                deliveryId = req.params.deliveryId;
                _a = req.body, status_1 = _a.status, courier = _a.courier, currentLocation = _a.currentLocation;
                if (!status_1 && !courier) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Status and CourierId are required" })];
                }
                return [4 /*yield*/, delivery_1.Delivery.findByIdAndUpdate(deliveryId, { $set: { status: status_1, courier: courier, currentLocation: currentLocation } }, { new: true })];
            case 1:
                updatedDelivery = _b.sent();
                if (!updatedDelivery) {
                    return [2 /*return*/, res.status(404).json({ message: "Delivery not found" })];
                }
                res.status(200).json(updatedDelivery);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateDelivery = updateDelivery;
var getCourierDeliveries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courierId, courierServices, _4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courierId = req.params.courierId;
                return [4 /*yield*/, delivery_1.Delivery.find({ courier: courierId })];
            case 1:
                courierServices = _a.sent();
                res.status(200).json(courierServices);
                return [3 /*break*/, 3];
            case 2:
                _4 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCourierDeliveries = getCourierDeliveries;
var getUserDeliveries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userServices, _5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, delivery_1.Delivery.find({ customer: userId }).sort({
                        requestedDate: -1,
                    })];
            case 1:
                userServices = _a.sent();
                res.status(200).json(userServices);
                return [3 /*break*/, 3];
            case 2:
                _5 = _a.sent();
                res.status(500).json({ message: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserDeliveries = getUserDeliveries;
