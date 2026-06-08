import { Box, Container, Typography } from "@mui/material";
import { getAllListings } from "../api/listings";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCards";

const LandingPage = ({ listing }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      let data = await getAllListings();
      if (data) {
        const actualListings =
          data.data || data.response || data.listings || data;
        setListings(actualListings);
      }
    };
    fetchListings();
  }, []);
  return (
    <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "24px", color: "#222222" }}
      >
        Explore Places to Stay 🌎
      </Typography>

      {/* 🎯 Khel Yahan Hai: Pure CSS Grid Use Kiya Hai */}
      <Box
        sx={{
          display: "grid",
          // Mobile par 1 card, tablet par 2, small laptop par 3, aur bade laptop par exact 4 cards
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: "24px", // Cards ke beech ka gap
          width: "100%",
        }}
      >
        {listings.map((item) => (
          // Kisi wrapper Grid ki zaroorat nahi, seedha card render hoga
          <ListingCard key={item._id} listing={item} />
        ))}
      </Box>
    </Container>
  );
};

export default LandingPage;
