import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export const createBookingApi = async (bookingData) => {
  try {
    const res = await apiClient.post("bookings", bookingData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBookingApi = async () => {
  try {
    const res = await apiClient.get("bookings/my-bookings");
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
