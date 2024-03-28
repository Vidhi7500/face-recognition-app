const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

async function connectToDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error");
  }
}

connectToDB();

app.use("/api/auth", authRoutes);

// Update the POST /api/register endpoint handler
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password, landmarks, descriptors } = req.body;
    // Your registration logic here
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update the POST /api/uploadImage endpoint handler
app.post("/api/auth/uploadImage", async (req, res) => {
  try {
    const { image } = req.body;
    // Your image processing and face recognition logic here
    console.log("Received image:", image);
    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
