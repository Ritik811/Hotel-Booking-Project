// import { Box, Container, Typography } from "@mui/material";
// import { getAllListings } from "../api/listings";
// import { useEffect, useState } from "react";
// import ListingCard from "../components/ListingCards";
// import { useSearchParams } from "react-router-dom";

// const LandingPage = ({listing}) => {
//   const [searchParams] = useSearchParams();
//   const searchQuery = searchParams.get("search");
//   const [listings, setListings] = useState([]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       let data = await getAllListings(searchQuery);
//       if (data) {
//         const actualListings =
//           data.data || data.response || data.listings || data;
//         setListings(actualListings);
//       }
//     };
//     fetchListings();
//   }, [searchQuery]);
//   return (
//     <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
//       <Typography
//         variant="h5"
//         sx={{ fontWeight: "bold", marginBottom: "24px", color: "#222222" }}
//       >
//         Explore Places to Stay 🌎
//       </Typography>

//       {/* 🎯 Khel Yahan Hai: Pure CSS Grid Use Kiya Hai */}
//       <Box
//         sx={{
//           display: "grid",
//           // Mobile par 1 card, tablet par 2, small laptop par 3, aur bade laptop par exact 4 cards
//           gridTemplateColumns: {
//             xs: "1fr",
//             sm: "repeat(2, 1fr)",
//             md: "repeat(3, 1fr)",
//             lg: "repeat(4, 1fr)",
//           },
//           gap: "24px", // Cards ke beech ka gap
//           width: "100%",
//         }}
//       >
//         {listings.map((item) => (
//           // Kisi wrapper Grid ki zaroorat nahi, seedha card render hoga
//           <ListingCard key={item._id} listing={item} />
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default LandingPage;

import { Box, Container, Typography } from "@mui/material";
import { getAllListings } from "../api/listings";
import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCards";
import { useSearchParams } from "react-router-dom";

const LandingPage = () => {
  // 👈 Props mein listing hataya kyunki hum state use kar rahe hain
  const [searchParams] = useSearchParams();

  // 🔥 URL se query nikal rahe hain (e.g., /?search=goa)
  // Agar search bar khali hoga toh yeh empty string "" ban jayega
  const searchQuery = searchParams.get("search") || "";
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      // 🔥 FIX: Ab hum searchQuery ko API function ke andar bhej rahe hain!
      let data = await getAllListings(searchQuery);

      if (data) {
        const actualListings =
          data.data || data.response || data.listings || data;
        setListings(actualListings);
      }
      setLoading(false);
    };

    fetchListings();
  }, [searchQuery]); // 👈 CRITICAL FIX: Jab bhi user search bar mein kuch naya likhega, yeh useEffect dobara chalega!

  return (
    <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "24px", color: "#222222" }}
      >
        {searchQuery
          ? `Search Results for "${searchQuery}" 🔍`
          : "Explore Places to Stay 🌎"}
      </Typography>

      {/* ⏳ Loading State Handling */}
      {loading ? (
        <Typography variant="body1">Searching places... ⏳</Typography>
      ) : listings.length === 0 ? (
        // ❌ Agar search karne par kuch na mile
        <Typography variant="body1" sx={{ color: "gray", mt: 4 }}>
          No properties found matching your search. Try searching for something
          else! 🛠️
        </Typography>
      ) : (
        /* 🎯 Pure CSS Grid Wrapper */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: "24px",
            width: "100%",
          }}
        >
          {listings.map((item) => (
            <ListingCard key={item._id} listing={item} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default LandingPage;
