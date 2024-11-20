import { Request, Response, NextFunction } from "express";
import { RequireAuthError } from "../errors/require-auth-error";
export const requireAuth = (req: Request, res: Response, next: NextFunction): any =>  {
    if (!req.currentUser) {
        throw new RequireAuthError();
    }

    next();
}