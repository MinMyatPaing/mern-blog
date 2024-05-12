import jwt from "jsonwebtoken";

import throwError from "./throwError.js";

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      throwError(401, "Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throwError(401, "Unauthorized");
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyUser;