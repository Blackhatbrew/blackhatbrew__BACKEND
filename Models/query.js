import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email1: { type: String, required: true,   },
    message: { type: String, required: true,  },
  
    time: { type: String, default: () => new Date().toLocaleTimeString() }, // Save time
    date: { type: String, default: () => new Date().toLocaleDateString() },  // Save date
})

const queryData = mongoose.model("contact",querySchema);
export default queryData

  