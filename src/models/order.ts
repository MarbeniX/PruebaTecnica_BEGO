import mongoose, { Document, Schema, Types } from "mongoose";

enum OrderStatus {
    CREATED = "created",
    IN_TRANSIT = "in transit",
    COMPLETED = "completed",
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    truck: Types.ObjectId;
    status: OrderStatus;
    pickup: Types.ObjectId;
    dropoff: Types.ObjectId;
}

const OrderSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        truck: {
            type: Schema.Types.ObjectId,
            ref: "Truck",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.CREATED,
        },
        pickup: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true,
        },
        dropoff: {
            type: Schema.Types.ObjectId,
            ref: "Location",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
