import mongoose, { Document, Schema } from "mongoose";

export interface ILocation extends Document {
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;
}

const LocationSchema: Schema = new Schema(
    {
        address: {
            type: String,
            required: true,
            trim: true,
        },
        place_id: {
            type: String,
            required: true,
            unique: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Location = mongoose.model<ILocation>("Location", LocationSchema);
export default Location;
