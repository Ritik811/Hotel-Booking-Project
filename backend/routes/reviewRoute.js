import { Router } from "express";
import {
  createReviews,
  deleteReviews,
} from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router.post("/:id/reviews", createReviews);
router.delete("/:id/reviews/:reviewId", deleteReviews);

export const reviewRouter = router;
