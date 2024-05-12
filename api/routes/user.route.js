import express from "express";

import { updateUserById } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifyUser, updateUserById);

export default router;
