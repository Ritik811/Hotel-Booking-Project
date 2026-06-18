import { Booking } from "../models/Booking.js";
import { Listing } from "../models/Listing.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { StatusCodes } from "http-status-codes";

export const createBooking = wrapAsync(async (req, res) => {
  let { listingId, checkIn, checkOut, totalPrice } = req.body;

  const listing = await Listing.findById(listingId);

  if (!listing) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: "Listing is Not Found" });
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Check-out date hamesha Check-in date ke baad honi chahiye!",
    });
  }

  const bookingObj = {
    listing: listingId,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    totalPrice,
    status: "Pending",
  };

  const newBooking = await Booking.create(bookingObj);

  if (!newBooking) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal issue" });
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "New Booking is Created Successfully",
    booking: newBooking,
  });
});

export const getUserBooking = wrapAsync(async (req, res) => {
  const userId = req.user._id;

  
  if (!userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED) 
      .json({ success: false, message: "User is not authorized or logged in" });
  }

  // 2. Fetch Bookings
  const bookings = await Booking.find({ user: userId }) 
    .populate({
      path: "listing",
      select: "title description image price location country",
    })
    .sort({ createdAt: -1 });

  
  if (bookings.length === 0) {
    return res
      .status(StatusCodes.OK) 
      .json({
        success: true,
        message: "Bhai, abhi tak koi booking nahi ki hai tumne!",
        data: [],
      });
  }

  
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "User Bookings returned successfully",
    data: bookings, 
  });
});
