import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

export const authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const [, token] = bearer.split(" ");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && decoded != null) {
            const user = await User.findById(decoded.id).select("_id email");
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
