import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      name: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }] 
},{timestamps:true});

export default mongoose.model("Post", postSchema);
