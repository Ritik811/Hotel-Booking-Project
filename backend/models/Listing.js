import mongoose from "mongoose";
import { Review } from "./Review.js";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      default: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Hotel", "Villa", "Resort", "Apartment"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);
// Middleware: Jo listing delete hone ke baad auto-trigger hoga
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
    console.log("Listing Related Review are Delete");
  }
});

listingSchema.index({
  title: "text",
  location: "text",
  country: "text",
  description: "text",
});

export const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
