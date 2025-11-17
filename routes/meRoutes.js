// routes/meRoutes.js
import express from "express";
import auth from "../middleware/auth.js"; 

const router = express.Router();

// GET /me  (protected)
router.get("/", auth, (req, res) => {
  
  res.json({
    message: "You are authenticated",
    user: req.user,  
  });
});

export default router;
