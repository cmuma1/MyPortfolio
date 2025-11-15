import express from "express";
import Qualification from "../models/qualification.js";

const router = express.Router();

// GET /api/qualifications
router.get("/", async (_req, res) => {
  try {
    const data = await Qualification.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/qualifications/:id
router.get("/:id", async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST /api/qualifications
router.post("/", async (req, res) => {
  try {
    const qualification = new Qualification(req.body);
    const saved = await qualification.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

// PUT /api/qualifications/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
});

// DELETE /api/qualifications/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json({ message: "Qualification deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE /api/qualifications
router.delete("/", async (_req, res) => {
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

export default router;
