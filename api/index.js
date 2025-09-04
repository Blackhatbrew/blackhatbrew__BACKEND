import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import subscriberRoutes from "../Routes/subscriber.js";
import blogRoutes from "../Routes/blog.js";
import projectRoutes from "../Routes/project.js";
import queryRoutes from "../Routes/query.js";
import contactRoutes from "../Routes/contact.js";
import { v2 as cloudinary } from 'cloudinary';

import dotenv from "dotenv";

dotenv.config();  

const PORT = process.env.PORT || 3002;  
const app = express();

// Middleware
app.use(express.json({ limit: "100mb" }));  
app.use(express.urlencoded({ limit: "100mb", extended: true }));  
app.use(cors());  

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api/subscriber", subscriberRoutes); 
app.use("/api/query", queryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/contact", contactRoutes);


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,  
    api_secret: process.env.api_secret
});

mongoose.connect(process.env.CONNECTION_URL).then(() => { console.log('Connected Successfully.'); }).catch((err) => console.log('No connection ', err)); const server = app.listen(PORT, () => console.log("Listening on port ", PORT));
