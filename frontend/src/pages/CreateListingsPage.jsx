import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { createListing } from "../api/listings";
import { useNavigate } from "react-router-dom";

export const CreateListingPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Hotel",
    price: "",
    location: "",
    country: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormData = (evt) => {
    let { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    setSuccess("");
    setError("");

    const dataToSend = {
      ...formData,
      image: [formData.image],
    };

    try {
      const res = await createListing(dataToSend);
      console.log("Form res", res);
      navigate("/");
      return setSuccess("Success");
    } catch (error) {
      return setError(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px", marginBottom: "60px" }}>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "24px", sm: "40px" },
          borderRadius: "16px",
          border: "1px solid #eaeaea",
        }}
      >
        {/* Header Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", marginBottom: "8px", color: "#222" }}
        >
          List a New Place 🏡
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#717171", marginBottom: "32px" }}
        >
          Share your beautiful space with travelers from all around the world.
        </Typography>

        {/* Form Container */}
        <Box component="form" onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            {/* 1. Title */}
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Property Title"
                placeholder="e.g., Cozy Beachside Paradise"
                variant="outlined"
                name="title"
                onChange={handleFormData}
              />
            </Grid>

            {/* 2. Description */}
            <Grid xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Description"
                placeholder="Describe your space, amenities, and nearby attractions..."
                variant="outlined"
                name="description"
                onChange={handleFormData}
              />
            </Grid>

            {/* 3. Category (Schema Enum Rules: Hotel, Villa, Resort, Apartment) */}
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  label="Category"
                  defaultValue="Hotel"
                  name="category"
                  onChange={handleFormData}
                >
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
                  <MenuItem value="Resort">Resort</MenuItem>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* 4. Price per Night */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Price per Night (₹)"
                placeholder="e.g., 2500"
                variant="outlined"
                name="price"
                onChange={handleFormData}
                slotProps={{ htmlInput: { min: 0 } }} // Schema min: 0 validation check
              />
            </Grid>

            {/* 5. Image URL (Schema takes an Array of Strings) */}
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                placeholder="https://images.unsplash.com/..."
                variant="outlined"
                helperText="Paste a secure link of your property image"
                name="image"
                onChange={handleFormData}
              />
            </Grid>

            {/* 6. Location */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location / City"
                placeholder="e.g., Calangute, Goa"
                variant="outlined"
                name="location"
                onChange={handleFormData}
              />
            </Grid>

            {/* 7. Country */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                placeholder="e.g., India"
                variant="outlined"
                name="country"
                onChange={handleFormData}
              />
            </Grid>

            {/* 🚀 Submit Button */}
            <Grid xs={12} sx={{ marginTop: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#FF385C", // Airbnb style pinkish-red
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#DC143C",
                    boxShadow: "none",
                  },
                }}
              >
                Publish Listing
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
