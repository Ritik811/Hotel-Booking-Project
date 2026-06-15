import { Router } from "express";
import {
  getAllListings,
  createListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";
import { listingValidate } from "../Middleware/ListingValidateReq.js";
import { isLoggedIn } from "../Middleware/AuthMiddleware.js";

const router = Router();

router.get("/", getAllListings);
router.get("/:id", getListingById);
router.delete("/:id", deleteListing);

router.post("/", listingValidate, isLoggedIn, createListings);
router.put("/:id", listingValidate, updateListing);

export const listingRouter = router;
