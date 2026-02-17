import express from "express";
import {
  register,
  login,
  approveDoctor,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/approve-doctor/:doctorId", protect, approveDoctor);

export default router;
