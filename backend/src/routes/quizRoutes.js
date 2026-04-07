import { Router } from "express";
import { getQuizByCourseId, submitQuiz } from "../controllers/quizController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:courseId", asyncHandler(getQuizByCourseId));
router.post("/submit", protect, asyncHandler(submitQuiz));

export default router;
