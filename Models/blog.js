import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    title: { type: String },
    blog: { type: String },
    shortblog: { type: String }, 
    tags: [{ type: String }],
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    
    },    time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
    date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
})

const contactData = mongoose.model("blogs2",contactSchema);
export default contactData

 