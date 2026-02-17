import express from "express";
import { createReceptionist } from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-receptionist", protect, adminOnly, createReceptionist);

export default router;
