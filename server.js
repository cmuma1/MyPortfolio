// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import your route files
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import qualificationRoutes from "./routes/qualificationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import meRoutes from "./routes/meRoutes.js";

dotenv.config(); // load .env file

const app = express();

// ====== MIDDLEWARE ======
app.use(cors());              // allow frontend to call backend
app.use(express.json());      // parse JSON bodies

// ====== ROUTES ======
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/", meRoutes); // includes /me protected route, and we’ll also add a root message

// Simple health-check route for Part II of assignment
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// ====== START SERVER AFTER DB CONNECTS ======
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
