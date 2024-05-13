import throwError from "../utils/throwError.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      throwError(403, "Not authorized!");
    }
    if (!req.body.title || !req.body.content) {
      throwError(402, "Please provide all data required");
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-");
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user._id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
