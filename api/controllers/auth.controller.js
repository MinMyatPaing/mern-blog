import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import throwError from "../utils/throwError.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      throwError(404, "All fields are required");
    }

    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();
    res.json({ message: "signed up successfully" });
  } catch (error) {
    next(error);
  }
};
