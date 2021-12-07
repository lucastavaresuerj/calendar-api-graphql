import jwt from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;

export function createToken(id) {
  return jwt.sign({ id }, TOKEN_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  return jwt.verify(token, TOKEN_SECRET);
}
