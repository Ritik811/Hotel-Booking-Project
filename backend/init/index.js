import mongoose from "mongoose";
import dotenv from "dotenv";
import { Listing } from "../models/Listing.js";
import { sampleListings } from "./initData.js";

dotenv.config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL;

const initDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DataBase Connected");

    await Listing.deleteMany({});
    console.log("Data is Clear");

    const updatedListings = sampleListings.map((obj) => ({
      ...obj,
      owner: "6a3012d01fbf27424de2a763",
    }));

    await Listing.insertMany(updatedListings);
    console.log("Data initialized");

    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

initDB();
