import { Request, Response } from "express";
import Truck from "../models/truck";
import User from "../models/user";

export class TruckController {
    static createTruck = async (req: Request, res: Response) => {
        try {
            const { plates } = req.body;
            const truckExistsByPlates = await Truck.findOne({ plates });
            if (truckExistsByPlates) {
                return res
                    .status(400)
                    .json({ message: "Truck with this plates already exists" });
            }

            const { id } = req.body;
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }

            const { year, color } = req.body;
            const newTruck = new Truck({
                user: id,
                year,
                color,
                plates,
            });
            await newTruck.save();
            res.status(201).json({
                message: "Truck created successfully",
                truck: newTruck,
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static updateTruck = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const truckExists = await Truck.findById(id);
            if (!truckExists) {
                return res.status(404).json({ message: "Truck not found" });
            }

            const { plates, userId } = req.body;
            const platesTaken = await Truck.findOne({
                plates,
                _id: { $ne: id },
            });
            if (platesTaken) {
                return res
                    .status(400)
                    .json({ message: "Truck with this plates already exists" });
            }

            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }

            const { year, color } = req.body;
            truckExists.user = userId;
            truckExists.year = year;
            truckExists.color = color;
            truckExists.plates = plates;
            await truckExists.save();
            res.status(200).json({
                message: "Truck updated successfully",
                truck: truckExists,
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static deleteTruckById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const truck = await Truck.findByIdAndDelete(id);
            if (!truck) {
                return res.status(404).json({ message: "Truck not found" });
            }
            res.status(200).json({ message: "Truck deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static getAllTrucks = async (req: Request, res: Response) => {
        try {
            const trucks = await Truck.find();
            res.status(200).json(trucks);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static getTrickById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const truckExists = await Truck.findById(id);
            if (!truckExists) {
                return res.status(404).json({ message: "Truck not found" });
            }
            res.status(200).json(truckExists);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };

    static deleteAllTrucks = async (req: Request, res: Response) => {
        try {
            await Truck.deleteMany({});
            res.status(200).json({
                message: "All trucks deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };
}
