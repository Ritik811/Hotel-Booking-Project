import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Paper,
} from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore"; // Logo Icon
import SearchIcon from "@mui/icons-material/Search"; // Search Icon
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#222222",
        boxShadow: "0 1px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 24px" }}>
        {/* 1. LEFT SIDE: Logo aur Brand Name */}
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
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

        {/* 2. CENTER: Premium Airbnb Style Search Bar */}
        <Paper
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Search logic tum yahan handle krna bhai!");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "50%", sm: "300px", md: "360px" },
            padding: "4px 8px 4px 16px",
            borderRadius: "24px",
            border: "1px solid #eaeaea",
            boxShadow:
              "0px 1px 2px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.05)",
            transition: "box-shadow 0.2s ease",
            "&:hover": {
              boxShadow:
                "0px 1px 2px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "14px", fontWeight: "500" }}
            placeholder="Search destinations..."
            inputProps={{ "aria-label": "search destinations" }}
            onChange={(e) => console.log("Input text: ", e.target.value)} // 🔥 State update tum handle krna
          />
          <Box
            type="submit"
            component="button"
            sx={{
              backgroundColor: "#FF385C",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background-color 0.2s",
              "&:hover": { backgroundColor: "#DC143C" },
            }}
          >
            <SearchIcon sx={{ fontSize: "18px" }} />
          </Box>
        </Paper>

        {/* 3. RIGHT SIDE: Navigation Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* ✨ NEW: Airbnb your home (Create Listing Button) */}
          <Button
            onClick={() => navigate("/listings/new")}
            sx={{
              color: "#222222",
              fontWeight: "600",
              textTransform: "none",
              borderRadius: "24px",
              padding: "8px 16px",
              fontSize: "14px",
              display: { xs: "none", md: "inline-flex" }, // Mobile par hide ho jayega safai ke liye
              "&:hover": {
                backgroundColor: "#f7f7f7",
              },
            }}
          >
            Airbnb your home
          </Button>

          <Button
            sx={{
              color: "#222222",
              fontWeight: "600",
              textTransform: "none",
              borderRadius: "24px",
              padding: "8px 16px",
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF385C",
              color: "white",
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "24px",
              padding: "8px 20px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#DC143C",
                boxShadow: "none",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
