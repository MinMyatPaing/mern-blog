import express from "express";

import { createComment, getPostComments, likeComment } from "../controllers/comment.controller.js";

import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get('/get-post-comments/:postId', getPostComments);
router.put('/like-comment/:commentId', verifyUser, likeComment)

export default router;