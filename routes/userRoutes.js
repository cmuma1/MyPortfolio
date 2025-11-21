// routes/userRoutes.js
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

// READ all users
router.get("/getUsers", getUsers);

// READ single user
router.get("/getUser/:id", getUserById);

// CREATE user
router.post("/createUser", createUser);

// UPDATE user
router.put("/updateUser/:id", updateUser);

// DELETE one user
router.delete("/deleteUser/:id", deleteUser);

// DELETE all users
router.delete("/deleteAllUsers", deleteAllUsers);

export default router;
