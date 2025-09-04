import projectModal from "../Models/project.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();
 
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,  
    api_secret: process.env.api_secret
});



// Add a project
// Add a project
export const addproject = async (req, res) => {
    const {
        title,
        category,
        description,
        pro,
        details,
        backgroundImage, // already { public_id, url }
        logo,            // already { public_id, url }
        images = [],     // already array of { public_id, url }
        reviews = [],
        instructions = []
    } = req.body;

    console.log("📥 Received project data:", req.body);

    try {
        // ✅ Validate required fields
        if (!title || !category || !description) {
            return res.status(400).json({
                success: false,
                message: "Title, category, and description are required",
            });
        }


        // ✅ Create project (no Cloudinary upload here)
        const result = await projectModal.create({
            title,
            category,
            description,
            pro,
            details,
            backgroundImage: backgroundImage || null,
            logo: logo || null,
            images: Array.isArray(images) ? images : [],
            reviews,
            instructions,
        });

        res.status(201).json({
            success: true,
            message: "Project added successfully",
            result,
        });
    } catch (error) {
        console.error("❌ Error adding project:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add project",
        });
    }
};

// Get all projects
export const getAllprojects = async (req, res) => {
    try {
        const projects = await projectModal.find();
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: "Failed to fetch projects" });
    }
};

// Delete a project
export const deleteproject = async (req, res) => {
    const { id } = req.params;

    console.log("📥 Received delete request for project ID:",);

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const project = await projectModal.findById(id);

  
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // ✅ Delete background image from Cloudinary
        if (project.backgroundImage?.public_id) {
            await cloudinary.uploader.destroy(project.backgroundImage.public_id);
        }

        // ✅ Delete logo from Cloudinary
        if (project.logo?.public_id) {
            await cloudinary.uploader.destroy(project.logo.public_id);
        }

        // ✅ Delete all images from Cloudinary
        if (Array.isArray(project.images) && project.images.length > 0) {
            for (const img of project.images) {
                if (img.public_id) {
                    await cloudinary.uploader.destroy(img.public_id);
                }
            }
        }

        // ✅ Delete project from DB
        await projectModal.deleteOne({ _id: id });

        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting project:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message
        });
    }
}

// Update a project
export const updateproject = async (req, res) => {
    const { id } = req.params;

    console.log("📥 Received update request for project ID:", req.body);

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const existingProject = await projectModal.findById(id);
        if (!existingProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // Dynamically update only provided fields
        const updatedData = { ...existingProject._doc }; // start with existing data

        // Only overwrite if present in body
        if (req.body.title !== undefined) updatedData.title = req.body.title;
        if (req.body.category !== undefined) updatedData.category = req.body.category;
        if (req.body.description !== undefined) updatedData.description = req.body.description;
        if (req.body.pro !== undefined) updatedData.pro = req.body.pro;
        if (req.body.details !== undefined) updatedData.details = req.body.details;
        // if (req.body.backgroundImage !== undefined) updatedData.backgroundImage = req.body.backgroundImage;
        // if (req.body.logo !== undefined) updatedData.logo = req.body.logo;
        // if (req.body.images !== undefined) updatedData.images = req.body.images;
        if (req.body.reviews !== undefined) updatedData.reviews = req.body.reviews;
        if (req.body.instructions !== undefined) updatedData.instructions = req.body.instructions;

        if (req.body.backgroundImage && req.body.backgroundImage.public_id) {
            updatedData.backgroundImage = req.body.backgroundImage;
        }
        if (req.body.logo && req.body.logo.public_id) {
            updatedData.logo = req.body.logo;
        }
        if (Array.isArray(req.body.images) && req.body.images.length > 0) {
            updatedData.images = req.body.images;
        }


        const updatedProject = await projectModal.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            result: updatedProject,
        });
    } catch (error) {
        console.error("❌ Error updating project:", error);
        res.status(500).json({ success: false, message: "Failed to update project" });
    }
};


// Get a single project by ID
export const getSingleproject = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) {
            return res.status(400).json({ success: false, message: "ID is required" });
        }

        const project = await projectModal.findById(id);

        if (project) {
            res.status(200).json({ success: true, project });
        } else {
            res.status(404).json({ success: false, message: "project not found" });
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ success: false, message: "Failed to fetch project" });
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
        console.error("Error adding project:", error);
        res.status(500).json({ success: false, message: "Failed to authenticate" });
    }
};
 