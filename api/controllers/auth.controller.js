import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      throwError(404, "All fields are required");
    }
    console.log(email, password);
    const validUser = await User.findOne({ email: email });

    if (!validUser) {
      throwError(404, "User not found!");
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throwError(402, "Invalid password!");
    }

    const { password: _, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
