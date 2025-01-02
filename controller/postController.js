import dotenv from "dotenv";
import Post from "../model/postSchema.js";
import cloudinary from "cloudinary"
import fs from "fs/promises"
dotenv.config;

const addPost = async (req, res, next) => {
  console.log(req.body);
  
  const { title, content } = req.body;
  console.log(title);
  

  if (!title || !content) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  let image = null;

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads'
      });

      if (result) {
        image = result.secure_url;
      }

      await fs.rm(req.file.path);
    } catch (err) {
      return res.status(500).json({
        message: "Error uploading image",
        error: err.message,
        success: false,
      });
    }
  }

  try {
    const newPost = new Post({
      title,
      content,
      image,
      author: req.user.username,
    });

    await newPost.save();

    res.status(200).json({
      message: "Post created successfully",
      post: newPost,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error,
      success: false,
    });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author").sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "Unauthorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);

        if (result) {
          post.image = result.secure_url;
        }

        // await fs.rm(req.file.path);
      } catch (err) {
        return res.status(500).json({
          message: "Error uploading image",
          error: err.message,
          success: false,
        });
      }
    }

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating post",
      error,
      success: false,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author !== req.user.username) {
      return res
        .status(404)
        .json({ message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully",success:true });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

export { addPost, deletePost, getAllPost, getPostById, updatePost };
