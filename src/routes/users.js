"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = require("../controllers/users");
var router = express_1.default.Router();
//Admin routes
router.get("/all", users_1.getAllUsers);
router.get("/couriers/pending", users_1.getPendingCouriers);
router.get("/couriers/accepted", users_1.getAcceptedCouriers);
router.post("/create", users_1.createUser);
router.get("/:userId", users_1.getUserById);
router.put("/update/:userId", users_1.updateUserById);
router.delete("/delete/:userId", users_1.deleteUserById);
exports.default = router;
