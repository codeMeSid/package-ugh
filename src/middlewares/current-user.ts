import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../interfaces/user-payload";
import { decodeToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = decodeToken(req.session.jwt, process.env.JWT_KEY!);
    req.currentUser = payload;
  } catch (err) {}

  next();
};
