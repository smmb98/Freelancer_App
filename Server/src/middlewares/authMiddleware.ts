import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Users } from "../entities/Users";

interface AuthRequest extends Request {
  currentUser?: Users;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the JWT token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ message: "Auth Error: Token required" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY) as {
      user: Users;
    };

    req.currentUser = decodedToken.user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Auth Error: Invalid token" });
  }
};
