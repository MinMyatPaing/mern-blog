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
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      throwError(403, "Unauthorized");
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User is signed out.");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  console.log("req get users");
  try {
    if (!req.user.isAdmin) {
      throwError(403, "Not authorized");
    }

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.params.limit) || 9;

    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const omitPasswordUsers = users.map((user) => {
      const { password: _, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res
      .status(200)
      .json({ users: omitPasswordUsers, totalUsers, lastMonthUsers });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCommentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if(!user) {
      throwError(404, "User not found!");
    }

    const {password: _, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}