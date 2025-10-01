import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    //isDeleted?: boolean;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false,
    // },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
