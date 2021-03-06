import { AuthenticationError } from "apollo-server-errors";

import { verifyToken } from "../auth/token.js";

export default function (req, res, next) {
  if (process.env.NODE_ENV === "development" /*&& req.method == "GET"*/) {
    return next();
  }
  const token = req.headers["x-access-token"];
  try {
    const { id } = verifyToken(token);
    req.userId = id;
    next();
  } catch (error) {
    throw new AuthenticationError("Token is not valid");
  }
}
