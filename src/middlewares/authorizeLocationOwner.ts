import { Response, Request, NextFunction } from "express";
import Location, { ILocation } from "../models/location";

declare global {
    namespace Express {
        interface Request {
            location?: ILocation;
        }
    }
}

export const authorizeLocationOwnner = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { place_id } = req.params;
        const locationExists = await Location.findOne({ place_id });
        if (!locationExists) {
            return res.status(404).json({
                message: "Location with this place_id does not exist",
            });
        }
        if (locationExists.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        req.location = locationExists;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
