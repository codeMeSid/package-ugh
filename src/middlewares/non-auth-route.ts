import { Request, Response, NextFunction } from "express";

export const nonAuthRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser) res.redirect("/");
  else next();
};
