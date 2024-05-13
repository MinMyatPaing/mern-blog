import express from "express";

import { updateUserById, deleteUserById, signout } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUserById);
router.delete("/delete/:userId", verifyUser, deleteUserById);
router.post("/signout", signout);

export default router;
