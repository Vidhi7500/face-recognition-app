const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, landmarks, descriptors } = req.body; // Include landmarks and descriptors in the request body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Save the face biometric data for the new user
    const newFaceBiometric = new FaceBiometric({
      user: newUser._id,
      facialData: { landmarks, descriptors },
    });
    await newFaceBiometric.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/uploadImage", async (req, res) => {
  try {
    const { image } = req.body;
    // Here, you can process the uploaded image (e.g., save it to the server, perform face recognition, etc.)
    console.log("Received image:", image);
    // Send a response indicating the successful upload
    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
