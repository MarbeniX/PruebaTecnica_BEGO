import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITruck extends Document {
    user: Types.ObjectId;
    year: string;
    color: string;
    plates: string;
}

const TruckSchema: Schema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        year: {
            type: String,
            match: [/^\d{4}$/, "Year must be a 4-digit number"],
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        plates: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const Truck = mongoose.model<ITruck>("Truck", TruckSchema);
export default Truck;
