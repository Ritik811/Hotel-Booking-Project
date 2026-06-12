import { Router } from "express";
import {
  createReviews,
  deleteReviews,
  updateReviews,
} from "../controllers/reviewController.js";
import { reviewValidate } from "../Middleware/ReviewValidateReq.js";

const router = Router({ mergeParams: true });

router.post("/:id/reviews", reviewValidate, createReviews);
router.delete("/:id/reviews/:reviewId", deleteReviews);
router.put("/:id/reviews/:reviewId", reviewValidate, updateReviews);
export const reviewRouter = router;
