import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  getPendingCouriers,
  getAcceptedCouriers,
  getAvailableCouriers,
  deleteUser,
  updateUserCredits,
} from "../controllers/users";

const router = express.Router();

//Admin routes
router.get("/all", getAllUsers);
router.get("/couriers/pending", getPendingCouriers);
router.get("/couriers/accepted", getAcceptedCouriers);
router.get("/couriers/available", getAvailableCouriers);

router.post("/create", createUser);
router.get("/:userId", getUser);
router.put("/update/:userId", updateUser);
router.put("/credits/:userId", updateUserCredits);
router.delete("/delete/:userId", deleteUser);

export default router;
