import express from "express";
const router = express.Router();

import { addproject, getAllprojects, deleteproject, updateproject, getSingleproject,admin } from "../Controller/project.js";

router.post("/v1", addproject);
router.get("/v1", getAllprojects);
router.delete("/v1/:id", deleteproject);
router.put("/v1/:id", updateproject);
router.get("/v1/:id", getSingleproject);
router.post("/v1/admin", admin);

export default router;