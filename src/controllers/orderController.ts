import { Request, Response } from "express";
import User from "../models/user";
import Truck from "../models/truck";
import Location from "../models/location";
import Order from "../models/order";

export class OrderController {
    static createOrder = async (req: Request, res: Response) => {
        try {
            const { user, truck, pickup, dropoff } = req.body;
            const userExists = await User.findById(user);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }
            const truckExists = await Truck.findById(truck);
            if (!truckExists) {
                return res.status(404).json({ message: "Truck not found" });
            }
            const pickpuLocationExists = await Location.findById(pickup);
            if (!pickpuLocationExists) {
                return res
                    .status(404)
                    .json({ message: "Pickup location not found" });
            }
            const dropoffLocationExists = await Location.findById(dropoff);
            if (!dropoffLocationExists) {
                return res
                    .status(404)
                    .json({ message: "Dropoff location not found" });
            }

            const newOrder = new Order({ user, truck, pickup, dropoff });
            await newOrder.save();

            res.status(201).json({
                message: "Order created successfully",
                order: {
                    id: newOrder._id,
                    user: newOrder.user,
                    truck: newOrder.truck,
                    pickup: newOrder.pickup,
                    dropoff: newOrder.dropoff,
                    status: newOrder.status,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static getOrderById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const orderExists = await Order.findById(id)
                .populate("user", "username email")
                .populate("truck", "user year color plates")
                .populate("pickup", "address place_id")
                .populate("dropoff", "address place_id");
            if (!orderExists) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json({
                message: "Order found",
                order: {
                    id: orderExists._id,
                    user: orderExists.user,
                    truck: orderExists.truck,
                    pickup: orderExists.pickup,
                    dropoff: orderExists.dropoff,
                    status: orderExists.status,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Order.find()
                .populate("user", "username email")
                .populate("truck", "user year color plates")
                .populate("pickup", "address place_id")
                .populate("dropoff", "address place_id");
            res.status(200).json({
                message: "Orders retrieved successfully",
                orders,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static updateOrderById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const orderExists = await Order.findById(id);
            if (!orderExists) {
                return res.status(404).json({ message: "Order not found" });
            }

            const { user, truck, pickup, dropoff } = req.body;
            const userExists = await User.findById(user);
            if (!userExists) {
                return res.status(404).json({ message: "User not found" });
            }
            const truckExists = await Truck.findById(truck);
            if (!truckExists) {
                return res.status(404).json({ message: "Truck not found" });
            }
            const pickpuLocationExists = await Location.findById(pickup);
            if (!pickpuLocationExists) {
                return res
                    .status(404)
                    .json({ message: "Pickup location not found" });
            }
            const dropoffLocationExists = await Location.findById(dropoff);
            if (!dropoffLocationExists) {
                return res
                    .status(404)
                    .json({ message: "Dropoff location not found" });
            }

            orderExists.user = user;
            orderExists.truck = truck;
            orderExists.pickup = pickup;
            orderExists.dropoff = dropoff;
            await orderExists.save();

            res.status(200).json({
                message: "Order updated successfully",
                order: orderExists,
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static updateOrderStatusById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const orderExists = await Order.findById(id);
            if (!orderExists) {
                return res.status(404).json({ message: "Order not found" });
            }

            const { status } = req.body;
            orderExists.status = status;
            await orderExists.save();

            res.status(200).json({
                message: "Order status updated successfully",
                order: {
                    id: orderExists._id,
                    user: orderExists.user,
                    truck: orderExists.truck,
                    pickup: orderExists.pickup,
                    dropoff: orderExists.dropoff,
                    status: orderExists.status,
                },
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static deleteOrderById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const orderExists = await Order.findById(id);
            if (!orderExists) {
                return res.status(404).json({ message: "Order not found" });
            }

            await orderExists.deleteOne();
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static deleteOrders = async (req: Request, res: Response) => {
        try {
            await Order.deleteMany();
            res.status(200).json({
                message: "All orders deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };
}
