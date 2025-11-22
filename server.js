// server.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES THAT ARE ALREADY WORKING
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import meRoutes from "./routes/meRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// MODELS
import Project from "./models/project.js";
import Qualification from "./models/qualification.js";

dotenv.config();

// 1) Create express app
const app = express();

// 2) Middleware
app.use(cors());
app.use(express.json());

// 3) Existing route groups
app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/users", userRoutes);

// ------------------------------------------------------------------
// 4) DIRECT PROJECTS ROUTES  (no projectRoutes file needed)
// ------------------------------------------------------------------

// GET /api/projects - list all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/projects/:id - single project
app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/projects - create new project
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

// PUT /api/projects/:id - update project
app.put("/api/projects/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

// DELETE /api/projects/:id - delete project
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/projects - delete all projects
app.delete("/api/projects", async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({
      message: "All projects deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------------------------------------------------------
// 5) DIRECT QUALIFICATIONS ROUTES  (already working for you)
// ------------------------------------------------------------------

// GET all qualifications
app.get("/api/qualifications", async (req, res) => {
  try {
    const items = await Qualification.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET qualification by ID
app.get("/api/qualifications/:id", async (req, res) => {
  try {
    const item = await Qualification.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST qualification
app.post("/api/qualifications", async (req, res) => {
  try {
    const item = new Qualification(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

// DELETE qualification
app.delete("/api/qualifications/:id", async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Qualification deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE all qualifications
app.delete("/api/qualifications", async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.json({
      message: "All qualifications deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ------------------------------------------------------------------

// Root route – quick check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio API" });
});

// ------------------------------------------------------------------

// 6) DB + Server Start
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

