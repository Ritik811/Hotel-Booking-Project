import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/listings/",
});

export const deleteReviews = async (id, reviewId) => {
  try {
    const res = await apiClient.delete(`${id}/reviews/${reviewId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createReviews = async (id, formData) => {
  try {
    const res = await apiClient.post(`${id}/reviews`, formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateReviews = async (id, reviewId, formData) => {
  try {
    const res = apiClient.put(`${id}/reviews/${reviewId}`, formData);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
