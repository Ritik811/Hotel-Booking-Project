import { Router } from "express";
import {
  createReviews,
  deleteReviews,
  updateReviews,
} from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router.post("/:id/reviews", createReviews);
router.delete("/:id/reviews/:reviewId", deleteReviews);
router.put("/:id/reviews/:reviewId", updateReviews);
export const reviewRouter = router;
