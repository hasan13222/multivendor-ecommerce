import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../middleware/verifyToken";
import { reviewValidations } from "./review.validation";
import { reviewController } from "./review.controller";

const router = express.Router();

router.post(
  "/",
  verifyToken(),
  validateRequest(reviewValidations.createReviewValidationSchema),
  reviewController.createReview
);
router.get("/:productId", reviewController.getProductReview);

export const reviewRoutes = router;
