import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Rating,
  Divider,
  Avatar,
  Button,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { deleteListing, getListingDetails } from "../api/listings";
import { createReviews, deleteReviews, updateReviews } from "../api/review";
import { toast } from "react-toastify";

export const ListingDetailPage = () => {
  const [listing, setListing] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 5,
  });

  const { currUser } = useOutletContext();

  const [isEditingReview, setIsEditingReview] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchListing = async () => {
    try {
      const res = await getListingDetails(id);
      setListing(res.data || {});
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  useEffect(() => {
    if (id) fetchListing();
  }, [id]);

  const handleDeleteButton = async () => {
    try {
      const deleteData = await deleteListing(id);
      if (deleteData.success) {
        toast.success("Listing is Delete Successfully");
        setTimeout(() => {
          navigate("/");
          console.log("delete data", deleteData);
          return deleteData;
        }, 2000);
      }
    } catch (error) {
      console.log("Frontend Error", error);
      toast.error("Something went wrong listing is Not Deleted");
    }
  };

  const handleEditReview = (rev) => {
    setIsEditingReview(true);
    setEditingReviewId(rev._id);
    setReviewData({
      comment: rev.comment || "",
      rating: rev.rating || 5,
    });
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditingReview) {
        const res = await updateReviews(id, editingReviewId, reviewData);
        if (res.success) {
          toast.success("Review is Update Successfully");
          console.log(
            "Review Update Ho Raha Hai:",
            reviewData,
            "Id:",
            editingReviewId,
          );
        }
        // Form aur states reset
        setIsEditingReview(false);
        setEditingReviewId(null);
      } else {
        //  NORMAL MODE: Naya review create ho rha hai
        const res = await createReviews(id, reviewData);
        if (res.success) {
          toast.success("Review is Create Successfully");
          console.log(res);
        }
      }

      setReviewData({ comment: "", rating: 5 });
      fetchListing();
    } catch (error) {
      console.log(error);
      toast.error("Somethings went wrong ");
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      const res = await deleteReviews(id, reviewId);
      console.log(res);
      if (res) {
        toast.success("Review is Delete Successfully");
        fetchListing();
      }
    } catch (error) {
      console.log("Error Frontend", error);
    }
  };

  const dummyListing = {
    title: "Luxury Beachside Villa with Private Pool",
    description:
      "Welcome to our premium beachside villa. Located just 2 minutes away from the beach, this villa offers a serene environment, a private crystal-clear pool, and state-of-the-art modern amenities. Perfect for family getaways and friends' reunions.",
    image: [
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=1200&auto=format&fit=crop&q=80",
    ],
    category: "Villa",
    price: 8499,
    location: "Goa",
    country: "India",
    rating: 4.85,
    reviewsCount: 124,
    hostName: "Ritik Sharma",
  };

  return (
    <Container sx={{ marginTop: "32px", marginBottom: "60px" }}>
      {/* 🏷️ SECTION 1: Title & Quick Info */}
      <Box sx={{ marginBottom: "24px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", color: "#222222", marginBottom: "8px" }}
        >
          {listing.title || dummyListing.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating
            value={listing.rating || dummyListing.rating}
            precision={0.05}
            readOnly
            size="small"
          />
          <Typography
            variant="body2"
            sx={{ fontWeight: "600", color: "#222222" }}
          >
            {listing.rating || dummyListing.rating} ·
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#717171",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {listing.review?.length || 0} reviews
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#717171", fontWeight: "600", marginLeft: "8px" }}
          >
            · {listing.location || dummyListing.location},{" "}
            {listing.country || dummyListing.country}
          </Typography>
        </Box>
      </Box>

      {/* 🖼️ SECTION 2: Image Banner */}
      <Box
        component="img"
        src={(listing.image && listing.image[0]) || dummyListing.image[0]}
        alt={listing.title || dummyListing.title}
        sx={{
          width: "100%",
          height: { xs: "300px", sm: "450px", md: "500px" },
          borderRadius: "16px",
          objectFit: "cover",
          marginBottom: "32px",
        }}
      />

      {/* 🧱 SECTION 3: Split Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: "64px",
        }}
      >
        {/* ⬅️ LEFT SIDE */}
        <Box>
          {/* Host Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", color: "#222" }}
              >
                Entire {listing.category || dummyListing.category} hosted by{" "}
                {dummyListing.hostName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#717171" }}>
                14 guests · 4 bedrooms · 4 beds · 4 bathrooms
              </Typography>
            </Box>
            <Avatar sx={{ width: 56, height: 56, backgroundColor: "#FF385C" }}>
              {dummyListing.hostName[0]}
            </Avatar>
          </Box>

          <Divider sx={{ margin: "24px 0" }} />

          {/* Description */}
          <Typography
            variant="body1"
            sx={{ color: "#222", lineHeight: "1.6", marginBottom: "24px" }}
          >
            {listing.description || dummyListing.description}
          </Typography>

          <Divider sx={{ margin: "24px 0" }} />

          {/* Amenities */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", marginBottom: "16px" }}
          >
            What this place offers
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#222",
              }}
            >
              <PoolIcon sx={{ color: "#717171" }} />
              <Typography variant="body1">Private Pool</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#222",
              }}
            >
              <WifiIcon sx={{ color: "#717171" }} />
              <Typography variant="body1">Wifi</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#222",
              }}
            >
              <AcUnitIcon sx={{ color: "#717171" }} />
              <Typography variant="body1">Air conditioning</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#222",
              }}
            >
              <TvIcon sx={{ color: "#717171" }} />
              <Typography variant="body1">HDTV with Netflix</Typography>
            </Box>
          </Box>

          <Divider sx={{ margin: "24px 0" }} />

          {/* Admin Buttons */}

          {currUser &&
          listing &&
          (currUser._id === listing.owner?._id ||
            listing.owner === currUser._id) ? (
            <Box sx={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/listings/${listing._id}/edit`)}
                sx={{
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  textTransform: "none",
                  fontWeight: "600",
                  padding: "8px 24px",
                  borderRadius: "8px",
                }}
              >
                Edit Listing
              </Button>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteButton}
                sx={{
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  textTransform: "none",
                  fontWeight: "600",
                  padding: "8px 24px",
                  borderRadius: "8px",
                }}
              >
                Delete Listing
              </Button>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "#717171", mt: 2 }}>
              Hosted by another premium user. ✨
            </Typography>
          )}

          <Divider sx={{ margin: "32px 0" }} />

          {/* ✍️ CREATE / EDIT REVIEW FORM */}
          <Box
            component="form"
            onSubmit={handleReviewSubmit}
            sx={{
              p: 3,
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              backgroundColor: "#fafafa",
            }}
          >
            {/* 🔥 UI DYNAMIC CHANGE: Heading badlegi mode ke hisab se */}
            <Typography variant="h6" sx={{ fontWeight: "600", mb: 2 }}>
              {isEditingReview ? "Edit Your Review ✏️" : "Leave a Review"}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "600", mb: 0.5, color: "#444" }}
              >
                Rating
              </Typography>
              <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
                <Rating
                  name="rating"
                  value={Number(reviewData.rating)}
                  onChange={(event, newValue) => {
                    setReviewData({ ...reviewData, rating: newValue });
                  }}
                  size="large"
                />
              </Paper>
            </Box>

            <TextField
              label="Share your thoughts about this place..."
              fullWidth
              multiline
              rows={3}
              name="comment"
              value={reviewData.comment}
              onChange={handleOnChange}
              sx={{ mb: 2, backgroundColor: "#fff" }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* 🔥 UI DYNAMIC CHANGE: Color aur Text mode ke hisab se change hoga */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: isEditingReview ? "#4CAF50" : "#FF385C",
                  color: "#fff",
                  fontWeight: "600",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: isEditingReview ? "#45a049" : "#DC143C",
                  },
                }}
              >
                {isEditingReview ? "Update Review" : "Submit Review"}
              </Button>

              {/* 🔥 NEW UI ELEMENT: Cancel button jo sirf tab dikhega jab user edit kar raha ho */}
              {isEditingReview && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setIsEditingReview(false);
                    setEditingReviewId(null);
                    setReviewData({ comment: "", rating: 5 });
                  }}
                  sx={{ textTransform: "none", fontWeight: "600" }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* ➡️ RIGHT SIDE: Floating Booking Widget */}
        <Box>
          <Paper
            elevation={4}
            sx={{
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid #dddddd",
              position: "sticky",
              top: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#222" }}
              >
                ₹{" "}
                {listing.price
                  ? listing.price.toLocaleString("en-IN")
                  : dummyListing.price.toLocaleString("en-IN")}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#717171",
                  }}
                >
                  {" "}
                  / night
                </span>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Rating value={1} max={1} readOnly size="small" />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {listing.rating || dummyListing.rating}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid #b0b0b0",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <Box sx={{ display: "flex", borderBottom: "1px solid #b0b0b0" }}>
                <Box sx={{ p: 1.5, flex: 1, borderRight: "1px solid #b0b0b0" }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    CHECK-IN
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#717171" }}>
                    Add date
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    CHECKOUT
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#717171" }}>
                    Add date
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: "bold", display: "block" }}
                >
                  GUESTS
                </Typography>
                <Typography variant="body2" sx={{ color: "#717171" }}>
                  1 guest
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FF385C",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#DC143C" },
              }}
            >
              Reserve Now
            </Button>
          </Paper>
        </Box>
      </Box>

      {/* 📜 ALL REVIEWS CARDS GRID */}
      <Box sx={{ marginTop: "48px" }}>
        <Divider sx={{ mb: 4 }} />
        <Typography
          variant="h5"
          sx={{ fontWeight: "600", mb: 3, color: "#222" }}
        >
          Reviews ({listing.review?.length || 0})
        </Typography>

        {(!listing.review || listing.review.length === 0) && (
          <Typography
            variant="body1"
            sx={{ color: "#717171", fontStyle: "italic" }}
          >
            No reviews yet for this villa. Be the first to write a review!
          </Typography>
        )}

        <Grid container spacing={3}>
          {listing.review &&
            listing.review.map((rev) => (
              <Grid xs={12} sm={6} key={rev._id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{ width: 40, height: 40, bgcolor: "#1976d2" }}
                        >
                          {rev.author?.username
                            ? rev.author.username[0].toUpperCase()
                            : "U"}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "600" }}
                          >
                            {rev.author?.username || "Verified Guest"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {rev.createdAt
                              ? new Date(rev.createdAt).toLocaleDateString(
                                  "en-IN",
                                )
                              : "Recently"}
                          </Typography>
                        </Box>
                      </Box>

                      {/* 🛠️ Action Buttons Container (Edit + Delete) */}
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {/* ✏️ Edit Icon Button */}
                        <IconButton
                          color="primary"
                          onClick={() => handleEditReview(rev)} // 🔥 Tumhaare is purane function ko call par connect kar diya hai
                          size="small"
                          sx={{ color: "#007A87" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        {/* 🗑️ Delete Icon Button */}
                        <IconButton
                          color="error"
                          onClick={() => handleReviewDelete(rev._id)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Rating
                      value={rev.rating || 5}
                      readOnly
                      size="small"
                      sx={{ mb: 1 }}
                    />

                    <Typography
                      variant="body2"
                      sx={{ color: "#484848", lineHeight: "1.5" }}
                    >
                      {rev.comment}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};
