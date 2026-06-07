import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Start Project");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("server is Listing PORT", PORT);
});
