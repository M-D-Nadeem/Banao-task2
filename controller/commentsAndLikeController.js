import Post from "../model/postSchema.js";

const addComment = async (req, res) => {
  const { id } = req.params;
  const { name, message } = req.body;
  console.log(message);
  
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ name, message });
    await post.save();

    res.status(200).json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const addLike = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body; 
  
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likedBy.includes(username)) {
      post.likes += 1;
      post.likedBy.push(username);
      await post.save();
    }

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
};

const disLike = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likedBy.includes(username)) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter(user => user !== username);
      await post.save();
    }

    res.status(200).json({ message: "Post disliked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error disliking post", error });
  }
};

export {addComment,addLike,disLike}
