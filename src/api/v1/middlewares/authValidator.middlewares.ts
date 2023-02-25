import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret: any = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secret, (error: any, payload: any) => {
    if (error) return res.json({ message: error });

    console.log(payload);

    next();
  });
};
