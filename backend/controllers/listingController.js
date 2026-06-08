import { Listing } from "../models/Listing.js";
import { StatusCodes } from "http-status-codes";

export const getAllListings = async (req, res) => {
  try {
    const data = await Listing.find({});
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "data is find", data });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal issue" });
  }
};

export const createListings = async (req, res) => {
  try {
    const { title, description, image, category, price, location, country } =
      req.body;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !location ||
      !country
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Bhai saheb, saari fields bharna zaroori hai!" });
    }
    let data = {
      title,
      description,
      image,
      category,
      price,
      location,
      country,
    };
    const response = await Listing.create(data);
    console.log(response);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Data add in Data base", response });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal issue" });
  }
};

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Listing.findById(id);
    if (!data) {
      return res
        .status(StatusCodes.NOT_FOUND) // 404
        .json({
          success: false,
          message: "Bhai, yeh hotel database mein nahi mila!",
        });
    }
    return res.status(StatusCodes.OK).json({ message: "Success", data });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Issue" });
  }
};

export const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, image, category, price, location, country } =
      req.body;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !location ||
      !country
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Bhai saheb, saari fields bharna zaroori hai!" });
    }
    let updateData = {
      title,
      description,
      image,
      category,
      price,
      location,
      country,
    };
    const response = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    console.log(response);

    if (!response) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "data is Not Found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Update data", response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Issue" });
  }
};

export const deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    const response = await Listing.findByIdAndDelete(id);
    if (!response) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "data delete", response });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Issue" });
  }
};
