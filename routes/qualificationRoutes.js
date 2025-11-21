import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualificationController.js";

const router = express.Router();

// READ all qualifications
router.get("/getQualifications", getQualifications);

// READ single qualification
router.get("/getQualification/:id", getQualificationById);

// CREATE qualification
router.post("/createQualification", createQualification);

// UPDATE qualification
router.put("/updateQualification/:id", updateQualification);

// DELETE one qualification
router.delete("/deleteQualification/:id", deleteQualification);

// DELETE all qualifications
router.delete("/deleteAllQualifications", deleteAllQualifications);

export default router;

