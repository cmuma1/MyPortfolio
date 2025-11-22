// controllers/userController.js
import User from "../models/user.js";

// GET /api/users/getUsers
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send password hashes
    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/users/getUser/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/users/createUser   (admin use)
// POST /api/users/signup       (signup route reuses this)
export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,  // will be hashed by the pre('save') middleware
      role: role || "user",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("createUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/users/updateUser/:id
export const updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstname !== undefined) user.firstname = firstname;
    if (lastname !== undefined)  user.lastname = lastname;
    if (email !== undefined)     user.email = email;
    if (password !== undefined)  user.password = password; // will be re-hashed
    if (role !== undefined)      user.role = role;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/users/deleteUser/:id
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/users/deleteAllUsers
export const deleteAllUsers = async (_req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted" });
  } catch (err) {
    console.error("deleteAllUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

