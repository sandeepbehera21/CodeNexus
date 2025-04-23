const express = require("express");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 🔹 User Signup (Firebase Authentication)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ message: "User registered", uid: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 User Login (JWT Token Generation)
router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    const token = jwt.sign({ uid: user.uid, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user: { uid: user.uid, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
