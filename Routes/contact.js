import express from "express";
const router = express.Router();

import { addContact, getAllContacts, deleteContact, updateContact, getSingleContact } from "../Controller/contact.js";

router.post("/v1", addContact);
router.get("/v1", getAllContacts);
router.delete("/v1/:id", deleteContact);
router.put("/v1/:id", updateContact);
router.get("/v1/:id", getSingleContact);

export default router;