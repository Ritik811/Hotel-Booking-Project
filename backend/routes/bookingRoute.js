import { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";
import { isLoggedIn } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.post("/", isLoggedIn, createBooking);
router.get("/my-bookings", isLoggedIn, getUserBookings);

export const bookingRoute = router;
