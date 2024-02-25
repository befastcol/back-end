import express from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  getPendingCouriers,
  getAcceptedCouriers,
  getActiveCouriers,
  deleteUserById,
} from "../controllers/users";

const router = express.Router();

//Admin routes
router.get("/all", getAllUsers);
router.get("/couriers/pending", getPendingCouriers);
router.get("/couriers/accepted", getAcceptedCouriers);
router.get("/couriers/active", getActiveCouriers);

router.post("/create", createUser);
router.get("/:userId", getUser);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUserById);

export default router;
