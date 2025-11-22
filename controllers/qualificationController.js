// controllers/qualificationController.js
import Qualification from "../models/qualification.js";

// GET /api/qualifications
export const getQualifications = async (req, res) => {
  try {
    const items = await Qualification.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/qualifications/:id
export const getQualificationById = async (req, res) => {
  try {
    const item = await Qualification.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/qualifications
export const createQualification = async (req, res) => {
  try {
    const item = new Qualification(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request", error: err.message });
  }
};

// PUT /api/qualifications/:id
export const updateQualification = async (req, res) => {
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
};

// DELETE /api/qualifications/:id
export const deleteQualification = async (req, res) => {
  try {
    const deleted = await Qualification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Qualification not found" });
    }
    res.json({ message: "Qualification deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /api/qualifications
export const deleteAllQualifications = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.json({
      message: "All qualifications deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
