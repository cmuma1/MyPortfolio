// routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers
} from "../controllers/userController.js";

const router = express.Router();

// GET all users
router.get("/getUsers", getUsers);

// GET single user by ID
router.get("/getUser/:id", getUserById);

// CREATE a user
router.post("/createUser", createUser);

// UPDATE a user
router.put("/updateUser/:id", updateUser);

// DELETE one user
router.delete("/deleteUser/:id", deleteUser);

// DELETE ALL users
router.delete("/deleteAllUsers", deleteAllUsers);

export default router;
