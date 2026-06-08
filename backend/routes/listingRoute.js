import { Router } from "express";
import {
  getAllListings,
  createListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = Router();

router.get("/", getAllListings);
router.post("/", createListings);
router.get("/:id", getListingById);
router.put("/:id", updateListing);
router.delete("/:id", deleteListing);

export const listingRouter = router;
