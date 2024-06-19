import express from "express";

import { updateUserById, getCommentUser, deleteUserById, signout, getUsers } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get-users", verifyUser, getUsers);
router.put("/update/:userId", verifyUser, updateUserById);
router.delete("/delete/:userId", verifyUser, deleteUserById);
router.post("/signout", signout);
router.get("/get-comment-user/:userId", getCommentUser);

export default router;
