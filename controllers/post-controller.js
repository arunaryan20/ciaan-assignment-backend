const postModel = require("../models/models").postModel;

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;
    if (!title || !description || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const data = {
      title: title,
      description: description,
      userId: userId,
    };
    await postModel.create(data);
    return res
      .status(201)
      .json({ success: true, message: "Post Created Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.getPostDetails = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, PostDetails: post });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.userAllPost = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const posts = await postModel.find({ userId: userId });
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found for this user" });
    }
    return res.status(200).json({ success: true, Posts: posts });       
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await postModel.find();
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No posts found" });
    }
    return res.status(200).json({ success: true, AllPostList: posts });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body;
    if (!postId || !title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
     const data={
        title: title,
        description: description,
     }
    const options = { new: true };
    await postModel.findByIdAndUpdate(postId, data, options);
    return res.status(200).json({ success: true, message: "Post updated successfully" });   

  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required" });
    }
    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    await postModel.findByIdAndDelete(postId);
    return res.status(200).json({ success: true, message: "Post deleted successfully" });   
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
