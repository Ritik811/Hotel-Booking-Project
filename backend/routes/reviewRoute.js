import { Router } from "express";
import { createReviews } from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router.post("/:id/reviews", createReviews);

export const reviewRouter = router;
