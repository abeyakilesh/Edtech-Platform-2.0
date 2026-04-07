import { Router } from "express";
import {
  getDashboardOverview,
  getProgressByUser,
  updateProgress,
} from "../controllers/progressController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/dashboard/overview", protect, asyncHandler(getDashboardOverview));
router.get("/:userId", protect, asyncHandler(getProgressByUser));
router.post("/update", protect, asyncHandler(updateProgress));

export default router;
