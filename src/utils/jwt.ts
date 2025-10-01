import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type JwtPayload = {
    id: Types.ObjectId;
    email: string;
};

export const generateJWT = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
