import { Request, Response, NextFunction } from "express";

export const authRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser) next();
  else res.redirect("/login");
};
