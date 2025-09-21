import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import connectDB from "./config/db.js"; // ✅ This works now
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import "./config/passport.js"; // Google strategy setup

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB(); // ✅ Uses the function from db.js

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is working.");
});

const razorpay = new Razorpay({
  key_id: "YOUR_TEST_KEY_ID",
  key_secret: "YOUR_TEST_KEY_SECRET"
});
  app.post("/order", async (req, res) => {
  const options = {
    amount: 50000, // paise me (500.00 INR)
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});
// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
