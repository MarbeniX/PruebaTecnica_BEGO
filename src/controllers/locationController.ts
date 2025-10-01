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

            const placeDetails = await getPlaceDetails(place_id);
            const newLocation = new Location(placeDetails);
            newLocation.createdBy = req.user.id;

            await newLocation.save();
            return res.status(201).json({
                message: "Location created",
                location: {
                    id: newLocation._id,
                    address: newLocation.address,
                    place_id: newLocation.place_id,
                    latitude: newLocation.latitude,
                    longitude: newLocation.longitude,
                    createdBy: newLocation.createdBy,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };

    static getLocationByPlaceId = async (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "Location found",
                location: {
                    id: req.location.id,
                    address: req.location.address,
                    place_id: req.location.place_id,
                    latitude: req.location.latitude,
                    longitude: req.location.longitude,
                    createdBy: req.location.createdBy,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };

    static getLocationsByUser = async (req: Request, res: Response) => {
        try {
            const locations = await Location.find({ createdBy: req.user.id });
            const locationsData = locations.map((loc) => ({
                id: loc._id,
                address: loc.address,
                place_id: loc.place_id,
                latitude: loc.latitude,
                longitude: loc.longitude,
                createdBy: loc.createdBy,
            }));
            return res
                .status(200)
                .json({ message: "Locations found", locations: locationsData });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };

    static updateLocation = async (req: Request, res: Response) => {
        try {
            const { new_place_id } = req.body;
            const newLocationTaken = await Location.findOne({
                place_id: new_place_id,
            });
            if (newLocationTaken) {
                return res.status(409).json({
                    message: "Location with the new_place_id already exists",
                });
            }

            const placeDetails = await getPlaceDetails(new_place_id);
            req.location.address = placeDetails.address;
            req.location.place_id = placeDetails.place_id;
            req.location.latitude = placeDetails.latitude;
            req.location.longitude = placeDetails.longitude;
            await req.location.save();

            return res.status(200).json({
                message: "Location updated",
                location: {
                    id: req.location.id,
                    address: req.location.address,
                    place_id: req.location.place_id,
                    latitude: req.location.latitude,
                    longitude: req.location.longitude,
                    createdBy: req.location.createdBy,
                },
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };

    static deleteLocation = async (req: Request, res: Response) => {
        try {
            await req.location.deleteOne();
            return res.status(200).json({ message: "Location deleted" });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };

    static deleteLocationsByUser = async (req: Request, res: Response) => {
        try {
            await Location.deleteMany({ createdBy: req.user.id });
            return res.status(200).json({
                message: `All locations created by user ${req.user.id} deleted`,
            });
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    };
}
