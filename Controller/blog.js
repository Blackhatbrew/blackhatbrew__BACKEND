import blogModal from "../Models/blog.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key,  
    api_secret: process.env.api_secret
});

// Add a blog
export const addblog = async (req, res) => {
  const { title, blog, tags, shortblog, image, public_id } = req.body;

  try {

    if (!title || !blog || !tags || !shortblog) {
      res.status(500).json({ success: false, message: "Title, blog content, and tags are required." });
    }

    const result1 = await cloudinary.uploader.upload(image, {
      folder: "products",

    })


    const result = await blogModal.create({
      image: { public_id: public_id, url: image},
      
      title, blog, tags, shortblog
    });
    res.status(201).json({ success: true, message: "blog added successfully", result });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: "Failed to add blog" });
  }
};

// Get all blogs
export const getAllblogs = async (req, res) => {
  try {
    const blogs = await blogModal.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

// Delete a blog
export const deleteblog = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const blog = await blogModal.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Delete image from Cloudinary
    if (blog.image && blog.image.public_id) {
      await cloudinary.uploader.destroy(blog.image.public_id);
    }

    await blogModal.deleteOne({ _id: id });

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};


export const updateblog = async (req, res) => {
  const { id } = req.params;
  const { title, blog, tags, shortblog, image } = req.body;

  try {
    console.log("Received update request for blog ID:", id);

    if (!id) {
      console.error("❌ Error: ID is missing in request");
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    // Find existing blog
    console.log("🔍 Searching for the blog in the database...");
    const existingBlog = await blogModal.findById(id);
    
    if (!existingBlog) {
      console.error("❌ Error: Blog not found for ID:", id);
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    console.log("✅ Blog found:", existingBlog.title);

    let updatedImage = existingBlog.image; // Keep existing image data

    // If a new image is provided, delete the old one and upload the new one
    if (image && typeof image === "string") {
      try {
        console.log("🖼️ New image provided. Uploading to Cloudinary...");
        
        // Delete the old image if it exists
        if (existingBlog.image?.public_id) {
          console.log("🚮 Deleting old image from Cloudinary:", existingBlog.image.public_id);
          await cloudinary.uploader.destroy(existingBlog.image.public_id);
        }

        const uploadedImage = await cloudinary.uploader.upload(image, { folder: "blogs" });
        updatedImage = {
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url
        };

        console.log("✅ Image uploaded successfully:", uploadedImage.secure_url);
      } catch (imageError) {
        console.error("❌ Error uploading image to Cloudinary:", imageError);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // Update blog fields
    const updatedData = {
      title: title || existingBlog.title,
      blog: blog || existingBlog.blog,
      tags: tags || existingBlog.tags,
      shortblog: shortblog || existingBlog.shortblog,
      image: updatedImage
    };

    console.log("📝 Updating blog in database...");
    await blogModal.updateOne({ _id: id }, { $set: updatedData });

    console.log("✅ Blog updated successfully:", title);
    res.status(200).json({ success: true, message: "Blog updated successfully" });

  } catch (error) {
    console.error("❌ Unexpected error updating blog:", error);
    res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

// Get a single blog by ID
export const getSingleblog = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const blog = await blogModal.findById(id);

    if (blog) {
      res.status(200).json({ success: true, blog });
    } else {
      res.status(404).json({ success: false, message: "blog not found" });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

export const admin = async (req, res) => {
  const { email, password } = req.body;
  console.log('sa')

  try {

    if (!password || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    if (email === 'S@foto@gmail.yum' && password === 'mxiqIO@J*(HNIAN;klsndj') {
      res.status(200).json({ success: true, message: "Login successful" });
    }
    else {
      res.status(404).json({ success: false, message: "Login Unsuccessful" });
    }

  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: "Failed to authenticate" });
  }
};
