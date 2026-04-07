import { Router } from "express";
import { confirmCheckoutSession, createCheckoutSession } from "../controllers/paymentController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create-checkout-session", protect, asyncHandler(createCheckoutSession));
router.post("/confirm", protect, asyncHandler(confirmCheckoutSession));

export default router;
