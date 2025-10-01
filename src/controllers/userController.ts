import { Request, Response } from "express";
import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/handlePassword";
import { generateJWT } from "../utils/jwt";

export class UserController {
    static createUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(409).json({ message: "User already exists" });
            }

            const newUser = new User(req.body);
            newUser.password = await hashPassword(password);
            await newUser.save();

            res.status(201).json({
                message: "User created",
                data: {
                    id: newUser._id,
                    email: newUser.email,
                },
            });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (!userExists) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const passwordMatch = await comparePassword(
                userExists.password,
                password
            );
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const jwt = generateJWT({
                id: userExists.id,
                email: userExists.email,
            });
            res.status(200).json({
                message: "Login successful",
                data: jwt,
            });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find().select("-password");
            res.status(200).json({ message: "Users retrieved", data: users });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User retrieved", data: user });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static updateUserEmail = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const { email } = req.body;

            const emailTaken = await User.findOne({
                email: email,
                _id: { $ne: userId },
            });
            if (emailTaken) {
                return res
                    .status(409)
                    .json({ message: "Email already in use" });
            }

            req.user.email = email;
            const updatedUser = await req.user.save();

            res.status(200).json({
                message: "Email updated, please log in again",
                data: {
                    id: updatedUser._id,
                    email: updatedUser.email,
                },
            });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static updateUserPassword = async (req: Request, res: Response) => {
        try {
            const { password } = req.body;

            const hashedPassword = await hashPassword(password);
            req.user.password = hashedPassword;
            await req.user.save();

            res.status(200).json({ message: "Password updated" });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static deleteUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted" });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };

    static deleteAllUsers = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            await User.deleteMany({ _id: { $ne: userId } });
            res.status(200).json({ message: "All other users deleted" });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };
}
