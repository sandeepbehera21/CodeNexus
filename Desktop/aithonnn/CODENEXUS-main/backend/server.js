const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Logging middleware

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs requests for debugging

// 🔹 Initialize Firebase Admin SDK
let serviceAccount;
try {
  serviceAccount = require("./serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized successfully!");
} catch (error) {
  console.error("❌ Error initializing Firebase Admin SDK:", error.message);
  process.exit(1); // Exit process if Firebase config fails
}

// 🔐 JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("⚠️ JWT_SECRET is missing in .env file!");
  process.exit(1);
}

// ✅ Import & Use Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🌍 Fix: Add Root Route to Prevent "Cannot GET /" Error
app.get("/", (req, res) => {
  res.send("✅ Server is running on CODENEXUS!");
});

// 🏁 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
