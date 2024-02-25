import { verify } from "jsonwebtoken";
import { findById } from "../models/User";

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    token = token.split(" ")[1];
    const decoded = verify(token, "secret-key");

    const user = await findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

export default authenticate;
