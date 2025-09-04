import mongoose from "mongoose";    

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email1: { type: String, required: true, },
    message: { type: String, required: true, },

    time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
    date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
})

 const contactData = mongoose.models.contacts || mongoose.model("contacts", contactSchema);

export default contactData
