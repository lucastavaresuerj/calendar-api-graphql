import jwt from "jsonwebtoken";

import { blackList } from "../services/index.js";

const { TOKEN_SECRET } = process.env;

export function createToken(id) {
  return jwt.sign(id, TOKEN_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  if (blackList.has(token)) {
    throw new Error("Token at black list");
  }
  return jwt.verify(token, TOKEN_SECRET);
}
