import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import truckRoute from "./routes/truckRoute";

dotenv.config();
connectDB();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/trucks", truckRoute);

export default app;
