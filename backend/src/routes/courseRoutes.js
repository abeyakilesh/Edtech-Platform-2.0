import { Router } from "express";
import {
  addModule,
  addQuiz,
  createCourse,
  getCourseById,
  getCourses,
  getModulesByCourse,
  getUsers,
} from "../controllers/courseController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { optionalAuth, protect, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/admin/users/list", protect, requireRole("admin"), asyncHandler(getUsers));
router.get("/", optionalAuth, asyncHandler(getCourses));
router.get("/:id", optionalAuth, asyncHandler(getCourseById));
router.get("/:id/modules", optionalAuth, asyncHandler(getModulesByCourse));
router.post("/", protect, requireRole("admin"), asyncHandler(createCourse));
router.post("/:id/modules", protect, requireRole("admin"), asyncHandler(addModule));
router.post("/:courseId/quiz", protect, requireRole("admin"), asyncHandler(addQuiz));

export default router;
