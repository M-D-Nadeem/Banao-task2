import mongoose from "mongoose";

  const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        name: { type: String, required: true },
        message: { type: String, required: true },
      },
    ],
    likes: { type: Number, default: 0 }, 
  });

  export default mongoose.model("Post",postSchema)