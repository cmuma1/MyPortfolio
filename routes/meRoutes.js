import express from "express";
import auth from "../middleware/auth.js";
import { getMe } from "../controllers/meControllers.js";

const router = express.Router();

router.get("/", auth, getMe);

export default router;
