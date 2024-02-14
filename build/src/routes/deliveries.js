"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveries_1 = require("../controllers/deliveries");
const router = express_1.default.Router();
router.get("/:deliveryId", deliveries_1.getDelivery);
router.post("/create/:userId", deliveries_1.createDelivery);
router.delete("/delete/:deliveryId", deliveries_1.deleteDelivery);
router.put("/update/:deliveryId", deliveries_1.updateDelivery);
// User deliveries history
router.get("/users/:userId", deliveries_1.getUserDeliveries);
router.get("/couriers/:courierId", deliveries_1.getCourierDeliveries);
exports.default = router;
