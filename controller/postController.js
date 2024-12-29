import dotenv from "dotenv";
import Post from "../model/postSchema.js";
dotenv.config;

const addPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(404).send({
      message: "All the fields are required",
      success: false,
    });
  }
  try {
   const newPost = new Post({ title, content, author: req.user.username });
    await newPost.save();
    res.status(200).json({
      message: "Post created successfully",
      post: newPost,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error, success: false });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
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
      return res
        .status(404)
        .json({ message: "Unauthorized to update this post" });
    }

    post.title = title;
    post.content = content;
    const a = await post.save();
    console.log(a);

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
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
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

export { addPost, deletePost, getAllPost, getPostById, updatePost };
