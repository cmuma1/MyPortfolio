// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectroutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import meRoutes from "./routes/meRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // Load env vars (MONGODB_URI, PORT, etc.)

// 1) Create express app
const app = express();

// 2) Middleware
app.use(cors());
app.use(express.json());

// 3) API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);         // ⭐ Correct me route
app.use("/api/users", userRoutes);    // ⭐ Correct user route

// 4) Root route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// 5) DB + Server Start
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
