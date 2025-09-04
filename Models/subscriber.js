import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
    date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
})

const subscriberData = mongoose.model("subscribe",subscriberSchema);
export default subscriberData

 