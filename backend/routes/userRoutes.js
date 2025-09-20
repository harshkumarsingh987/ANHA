import express from "express";
import { updateAvatar, getUserProfile } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/upload-avatar", authenticateUser, upload.single("avatar"), updateAvatar);
router.get("/profile", authenticateUser, getUserProfile);

export default router;
