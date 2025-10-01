import { Request, Response } from "express";
import Location from "../models/location";
import { getPlaceDetails } from "../services/placesAPI";

export class LocationController {
    static createLocation = async (req: Request, res: Response) => {
        try {
            const { place_id } = req.body;
            const locationExists = await Location.findOne({ place_id });
            if (locationExists) {
                return res.status(409).json({
                    message: "Location with this place_id already exists",
                });
            }
            const data = getPlaceDetails(place_id);
        } catch (error) {
            return res.status(500).json({ message: "Server error", error });
        }
    };
}
