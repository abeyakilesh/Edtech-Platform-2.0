import { Router } from "express";
import { downloadCertificate } from "../controllers/certificateController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:courseId/download", protect, asyncHandler(downloadCertificate));

export default router;
