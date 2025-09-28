import express from "express";
import cors from "cors";
import subscriberRoutes from "../Routes/subscriber.js";
import blogRoutes from "../Routes/blog.js";
import projectRoutes from "../Routes/project.js";
import queryRoutes from "../Routes/query.js";
import contactRoutes from "../Routes/contact.js";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());

// Connect DB once at startup
connectDB();

// Routes
app.get("/", (req, res) => res.send("Express running ✅"));
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/contact", contactRoutes);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// 👇 Local only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

// 👇 Vercel will use this
export default app;
