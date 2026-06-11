import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";
import { listingRouter } from "./routes/listingRoute.js";
import { INTERNAL_SERVER_ERROR, StatusCodes } from "http-status-codes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
const databaseConnected = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("database Connected");
  } catch (error) {
    console.log(error);
  }
};
databaseConnected();

app.use("/auth", userRouter);
app.use("/listings", listingRouter);

app.get("/", (req, res) => {
  res.send("Start Project");
});

app.use((err, req, res, next) => {
  console.log("Central Error Log:", err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message = err.message || "Something went wrong on the server!";

  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is Listing PORT", PORT);
});
