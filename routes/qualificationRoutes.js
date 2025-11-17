import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications
} from "../controllers/qualificationControllers.js";

const router = express.Router();

router.get("/", getQualifications);
router.get("/:id", getQualificationById);
router.post("/", createQualification);
router.put("/:id", updateQualification);
router.delete("/:id", deleteQualification);
router.delete("/", deleteAllQualifications);

export default router;
