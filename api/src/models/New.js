import mongoose from "mongoose";

const NewSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    time : { 
        type : Date, 
        default: Date.now 
    }}
    );

export default mongoose.model("New", NewSchema);