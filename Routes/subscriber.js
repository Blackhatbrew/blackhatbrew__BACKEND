import express from "express";
const router = express.Router();

import { addsubscriber, getAllsubscribers, deletesubscriber, updatesubscriber, getSinglesubscriber } from "../Controller/subscriber.js";

router.post("/v1", addsubscriber);
router.get("/v1", getAllsubscribers);
router.delete("/v1/:id", deletesubscriber);
router.put("/v1/:id", updatesubscriber);
router.get("/v1/:id", getSinglesubscriber);

export default router;