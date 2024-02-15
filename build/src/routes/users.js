"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
//Admin routes
router.get("/all", users_1.getAllUsers);
router.get("/couriers/pending", users_1.getPendingCouriers);
router.get("/couriers/accepted", users_1.getAcceptedCouriers);
router.post("/create", users_1.createUser);
router.get("/:userId", users_1.getUserById);
router.put("/update/:userId", users_1.updateUserById);
router.delete("/delete/:userId", users_1.deleteUserById);
exports.default = router;
