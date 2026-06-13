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

export const getListingDetails = async (id) => {
  try {
    const res = await apiClient.get(`listings/${id}`);
    console.log("details", res.data);
    return res.data;
  } catch (error) {
    console.log("Internal Issue");
    throw error;
  }
};

export const createListing = async (formData) => {
  try {
    const res = await apiClient.post("listings", formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Error", error.message);
  }
};

export const deleteListing = async (id) => {
  try {
    const res = await apiClient.delete(`listings/${id}`);
    return res.data;
  } catch (error) {
    console.log("Api delete Error", error);
    throw error;
  }
};

export const updateListing = async (id, updateData) => {
  try {
    const res = await apiClient.put(`listings/${id}`, updateData);
    console.log("updateListingDataAxios", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
