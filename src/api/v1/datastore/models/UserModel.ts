import mongoose from "mongoose";
import { IUser } from "./abstract/IUser";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// mongoose.model("User", userSchema);

export interface IUserModel extends IUser, mongoose.Document {}
export const createModel = () => mongoose.model<IUserModel>("User", userSchema);
