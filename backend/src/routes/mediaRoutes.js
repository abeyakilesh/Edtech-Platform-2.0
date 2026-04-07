import { Router } from "express";
import { uploadMedia, uploadSingleMedia } from "../controllers/mediaController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/upload", protect, requireRole("admin"), uploadSingleMedia, asyncHandler(uploadMedia));

export default router;
