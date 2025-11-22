// routes/qualificationRoutes.js
import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} from "../controllers/qualificationController.js";

const router = express.Router();

// GET /api/qualifications
router.get("/", getQualifications);

// GET /api/qualifications/:id
router.get("/:id", getQualificationById);

// POST /api/qualifications
router.post("/", createQualification);

// PUT /api/qualifications/:id
router.put("/:id", updateQualification);

// DELETE /api/qualifications/:id
router.delete("/:id", deleteQualification);

// DELETE /api/qualifications
router.delete("/", deleteAllQualifications);

export default router;

