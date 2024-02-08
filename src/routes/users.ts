import express from "express";
import {
  createUser,
  updateUserById,
  getAllUsers,
  getUserById,
  getPendingCouriers,
  getAcceptedCouriers,
  deleteUserById,
} from "../controllers/users";

const router = express.Router();

router.post("/create", createUser);
router.get("/:userId", getUserById);
router.put("/update/:userId", updateUserById);
router.delete("/delete/:userId", deleteUserById);

//Admin routes
router.get("/all", getAllUsers);
router.get("/couriers/pending", getPendingCouriers);
router.get("/couriers/accepted", getAcceptedCouriers);

export default router;
