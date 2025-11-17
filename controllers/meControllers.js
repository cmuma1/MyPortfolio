// controllers/meController.js

// GET /me (protected)
export const getMe = (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,  // comes from auth middleware
  });
};
