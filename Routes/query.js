import express from "express";
const router = express.Router();

import { addquery, getAllquerys, deletequery, updatequery, getSinglequery, sendmail } from "../Controller/query.js";

router.post("/v1", addquery);
router.get("/v1", getAllquerys);
router.delete("/v1/:id", deletequery);
router.put("/v1/:id", updatequery);
router.get("/v1/:id", getSinglequery);
router.post("/v1/sendmail", sendmail);

export default router;