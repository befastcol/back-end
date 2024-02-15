"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var deliveries_1 = require("../controllers/deliveries");
var router = express_1.default.Router();
router.get("/get/:deliveryId", deliveries_1.getDelivery);
router.post("/create/:userId", deliveries_1.createDelivery);
router.delete("/delete/:deliveryId", deliveries_1.deleteDelivery);
router.put("/update/:deliveryId", deliveries_1.updateDelivery);
router.get("/price", deliveries_1.getDeliveryPrice);
// User deliveries history
router.get("/users/:userId", deliveries_1.getUserDeliveries);
router.get("/couriers/:courierId", deliveries_1.getCourierDeliveries);
exports.default = router;
