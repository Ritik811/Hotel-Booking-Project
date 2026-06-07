import mongoose from "mongoose";

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
      require: true,
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
  },
  { timestamps: true },
);

export const Listing = mongoose.model("Listing", listingSchema);
