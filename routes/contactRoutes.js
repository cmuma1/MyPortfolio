import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts
} from "../controllers/contactController.js";

const router = express.Router();

// READ all contacts
router.get("/getContacts", getContacts);

// READ single contact
router.get("/getContact/:id", getContactById);

// CREATE contact
router.post("/createContact", createContact);

// UPDATE contact
router.put("/updateContact/:id", updateContact);

// DELETE one contact
router.delete("/deleteContact/:id", deleteContact);

// DELETE all contacts
router.delete("/deleteAllContacts", deleteAllContacts);

export default router;
