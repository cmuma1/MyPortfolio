// routes/contactRoutes.js
import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} from "../controllers/contactController.js";

const router = express.Router();

// GET /api/contacts
router.get("/", getContacts);

// GET /api/contacts/:id
router.get("/:id", getContactById);

// POST /api/contacts
router.post("/", createContact);

// PUT /api/contacts/:id
router.put("/:id", updateContact);

// DELETE /api/contacts/:id
router.delete("/:id", deleteContact);

// DELETE /api/contacts
router.delete("/", deleteAllContacts);

export default router;
