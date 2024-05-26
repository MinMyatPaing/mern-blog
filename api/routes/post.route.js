import express from "express";

import verifyUser from "../utils/verifyUser.js";
import { createPost, getPosts, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/get-posts", getPosts);
router.delete('/delete-post/:postId/:userId', verifyUser, deletePost);

export default router;