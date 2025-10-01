import { Request, Response } from "express";
import User from "../models/user";
import { hashPassword } from "../utils/handlePassword";

export class UserController {
    static createUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            const newUser = new User(req.body);
            newUser.password = await hashPassword(password);
            await newUser.save();
            res.status(201).json({
                message: "User created",
                id: newUser._id,
                email: newUser.email,
            });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    };
}
