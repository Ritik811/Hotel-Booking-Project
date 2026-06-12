import { StatusCodes } from "http-status-codes";
import { Listing } from "../Models/Listing.js";
import { Review } from "../Models/Review.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const createReviews = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const existingData = await Listing.findById(id);

  if (!existingData) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Listing id wrong" });
  }

  let { comment, rating } = req.body;

  const reviewResponse = await Review.create({ comment, rating });
  console.log("Review Created with ID:", reviewResponse._id);

  if (!reviewResponse) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Review is Not Add to DataBase" });
  }

  existingData.review.push(reviewResponse._id);

  const response = await existingData.save();

  if (response) {
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Review is Create",
      data: reviewResponse,
    });
  }
});
