import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums/user-roles";

export const authAdminRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.currentUser && req.currentUser.role === UserRole.Admin) next();
  else res.redirect("/login");
};
