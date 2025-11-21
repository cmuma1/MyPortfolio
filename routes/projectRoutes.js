import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects
} from "../controllers/projectController.js";

const router = express.Router();

// READ all projects
router.get("/getProjects", getProjects);

// READ single project
router.get("/getProject/:id", getProjectById);

// CREATE project
router.post("/createProject", createProject);

// UPDATE project
router.put("/updateProject/:id", updateProject);

// DELETE one project
router.delete("/deleteProject/:id", deleteProject);

// DELETE all projects
router.delete("/deleteAllProjects", deleteAllProjects);

export default router;
