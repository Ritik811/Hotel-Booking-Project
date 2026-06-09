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
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import EditIcon from "@mui/icons-material/Edit"; // 🎯 UI Icons import kiye
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { getListingDetails } from "../api/listings";

export const ListingDetailPage = () => {
  const [listing, setListing] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListingDetails(id);
        console.log("Response aagya hai ", res.data);
        setListing(res.data || {});
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };
    if (id) fetchListing();
  }, [id]);

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
            {dummyListing.reviewsCount} reviews
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
        {/* ⬅️ LEFT SIDE: Description, Amenities & Admin Buttons */}
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
                8 guests · 4 bedrooms · 4 beds · 4 bathrooms
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

          <Divider sx={{ margin: "32px 0" }} />

          {/* 🎯 UI ONLY: EDIT & DELETE BUTTONS AREA */}
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {/* Edit Button UI */}
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                borderColor: "#1976d2",
                color: "#1976d2",
                textTransform: "none",
                fontWeight: "600",
                padding: "8px 24px",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#115293",
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              Edit Listing
            </Button>

            {/* Delete Button UI */}
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{
                borderColor: "#d32f2f",
                color: "#d32f2f",
                textTransform: "none",
                fontWeight: "600",
                padding: "8px 24px",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#9a0007",
                  backgroundColor: "rgba(211, 47, 47, 0.04)",
                },
              }}
            >
              Delete Listing
            </Button>
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
            {/* Price Area */}
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
                ₹
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

            {/* Date Inputs Box */}
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

            {/* Action Button */}
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

            <Typography
              variant="body2"
              sx={{ color: "#717171", textAlign: "center", marginTop: "12px" }}
            >
              You won't be charged yet
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};
