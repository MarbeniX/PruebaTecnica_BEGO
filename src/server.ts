import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import truckRoute from "./routes/truckRoute";
import userRoutes from "./routes/userRoutes";
import locationRoute from "./routes/locationRoute";

dotenv.config();
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/trucks", truckRoute);
app.use("/api/location", locationRoute);

export default app;
