import express from "express";
const router = express.Router();

import { addblog, getAllblogs, deleteblog, updateblog, getSingleblog,admin } from "../Controller/blog.js";

router.post("/v1", addblog);
router.get("/v1", getAllblogs);
router.delete("/v1/:id", deleteblog);
router.put("/v1/:id", updateblog);
router.get("/v1/:id", getSingleblog);
router.post("/v1/admin", admin);

export default router;