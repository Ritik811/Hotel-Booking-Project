import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
});

export const getAllListings = async () => {
  try {
    const res = await apiClient.get("listings");
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
