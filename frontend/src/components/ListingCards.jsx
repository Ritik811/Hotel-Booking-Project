import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function ListingCard({ listing }) {
  return (
    <Card
      sx={{
        width: "100%", // 🎯 Card apni Grid item ki poori width lega
        borderRadius: "12px",
        boxShadow: "none",
        cursor: "pointer",
        backgroundColor: "transparent", // Airbnb look ke liye background transparent
        "&:hover .MuiCardMedia-root": { transform: "scale(1.03)" },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "12px",
          aspectRatio: "20 / 19",
        }}
      >
        {/* 🎯 aspectRatio lagane se saare image box ekdum exact same square/rectangle size ke banenge */}
        <CardMedia
          component="img"
          image={
            listing.image[0] ||
            listing.image ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
          }
          alt={listing.title}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover", // 🎯 Isse photo stretch (kich) nahi hogi, ekdum perfect crop hokar fit hogi
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </Box>

      {/* Details (Baaki code bilkul same rahega) */}
      <CardContent sx={{ padding: "12px 4px" }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", color: "#222222", noWrap: true }}
        >
          {listing.location}, {listing.country}
        </Typography>
        <Typography variant="body2" sx={{ color: "#717171", margin: "4px 0" }}>
          {listing.category}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "600", color: "#222222" }}
        >
          ₹{listing.price ? listing.price.toLocaleString("en-IN") : "N/A"}{" "}
          <span style={{ fontWeight: "400", color: "#717171" }}>/ night</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ListingCard;
