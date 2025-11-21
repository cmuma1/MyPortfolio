// routes/meRoutes.js
import express from "express";
import { getMe } from "../controllers/meController.js";
import auth from "../middleware/auth.js";   

const router = express.Router();

// GET /api/me/getMe  (protected)
router.get("/getMe", auth, getMe);          

export default router;
