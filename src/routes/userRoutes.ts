import express from "express";
import { createUser, updateUser, getUser } from "../controllers/userController";

const router = express.Router();

router.post("/create", createUser);
router.get("/:userId", getUser);
router.put("/update/:userId", updateUser);

export default router;
