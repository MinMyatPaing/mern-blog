import bcryptjs from "bcryptjs";

import throwError from "../utils/throwError.js";
import User from "../models/user.model.js";

export const updateUserById = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throwError(403, "Unauthorized");
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        throwError(402, "Password must be atleast 6 characters");
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        throwError(402, "User name must be between 7 and 20 characters");
      }

      if (req.body.username.includes(" ")) {
        throwError(402, "User name must not contain spaces");
      }

      if (req.body.username !== req.body.username.toLowerCase()) {
        throwError(402, "User name must be in lower case");
      }

      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        throwError(402, "User name must not contain special characters");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password: _, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId) {
      throwError(403, "Unauthorized");
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    next(error);
  }
};
