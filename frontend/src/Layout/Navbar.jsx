import React from "react";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore"; // Airbnb

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#222222",
        boxShadow: "0 1px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE: Logo aur Brand Name */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          {/* MUI ka icon jo logo jaisa dikhega (Humne color Airbnb jaisa pinkish-red rakha hai) */}
          <TravelExploreIcon sx={{ color: "#FF385C", fontSize: "32px" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#FF385C",
              display: { xs: "none", sm: "block" },
            }}
          >
            stayNest
          </Typography>
        </Box>

        {/* RIGHT SIDE: Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ color: "#222222", fontWeight: "600", textTransform: "none" }}
          >
            Home
          </Button>
          {/* variant="contained" se button solid color ka ban jata hai */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF385C",
              color: "white",
              textTransform: "none",
              fontWeight: "600",
              "&:hover": { backgroundColor: "#DC143C" }, // Hover karne par thoda dark red ho jaye
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
