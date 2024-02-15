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
exports.getUserDeliveries = exports.getCourierDeliveries = exports.updateDelivery = exports.getDelivery = exports.deleteDelivery = exports.createDelivery = exports.getDeliveryPrice = void 0;
const delivery_1 = require("../models/delivery");
const price_1 = require("./helpers/price");
const getDeliveryPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { distance, duration } = req.query;
        if (!distance && !duration)
            return res.status(400).json({ message: "Invalid query parameters" });
        const price = (0, price_1.calculatePrice)(Number(distance), Number(duration));
        res.status(200).json(price);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDeliveryPrice = getDeliveryPrice;
const createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDelivery = new delivery_1.Delivery({
            origin: req.body.origin,
            destination: req.body.destination,
            price: req.body.price,
            customer: req.params.userId,
        });
        const savedDelivery = yield newDelivery.save();
        res.status(201).json(savedDelivery);
    }
    catch (_) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createDelivery = createDelivery;
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery = yield delivery_1.Delivery.findByIdAndDelete(req.params.deliveryId);
        if (!delivery)
            return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Delivery deleted successfully" });
    }
    catch (_) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteDelivery = deleteDelivery;
const getDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = req.params.deliveryId;
        const courierServices = yield delivery_1.Delivery.findById(deliveryId);
        res.status(200).json(courierServices);
    }
    catch (_) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDelivery = getDelivery;
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryId = req.params.deliveryId;
        const { status, courier, currentLocation } = req.body;
        if (!status && !courier) {
            return res
                .status(400)
                .json({ message: "Status and CourierId are required" });
        }
        const updatedDelivery = yield delivery_1.Delivery.findByIdAndUpdate(deliveryId, { $set: { status, courier, currentLocation } }, { new: true });
        if (!updatedDelivery) {
            return res.status(404).json({ message: "Delivery not found" });
        }
        res.status(200).json(updatedDelivery);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateDelivery = updateDelivery;
const getCourierDeliveries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courierId = req.params.courierId;
        const courierServices = yield delivery_1.Delivery.find({ courier: courierId });
        res.status(200).json(courierServices);
    }
    catch (_) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCourierDeliveries = getCourierDeliveries;
const getUserDeliveries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const userServices = yield delivery_1.Delivery.find({ customer: userId }).sort({
            requestedDate: -1,
        });
        res.status(200).json(userServices);
    }
    catch (_) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserDeliveries = getUserDeliveries;
