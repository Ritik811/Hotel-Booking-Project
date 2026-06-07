import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();

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

app.get("/", (req, res) => {
  res.send("Start Project");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is Listing PORT", PORT);
});
