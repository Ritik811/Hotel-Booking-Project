export const sampleListings = [
  {
    title: "Cozy Beachfront Resort",
    description:
      "Escape to this beautiful beachfront resort with stunning ocean views.",
    image: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"], // 🎯 FIXED: Array format mein string di
    category: "Resort", // 🎯 FIXED: Enum ka part hai
    price: 1500,
    location: "Goa",
    country: "India",
  },
  {
    title: "Modern Luxury Apartment",
    description: "Stay in the heart of the city with world-class amenities.",
    image: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"], // 🎯 FIXED
    category: "Apartment", // 🎯 FIXED: Enum ka part hai
    price: 3500,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Mountain View Villa",
    description: "A peaceful villa surrounded by pine trees and snowy peaks.",
    image: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739"], // 🎯 FIXED
    category: "Villa", // 🎯 FIXED: Enum ka part hai
    price: 2000,
    location: "Manali",
    country: "India",
  },
];
