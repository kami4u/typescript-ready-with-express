import mongoose from "mongoose";
import { IUserRepo } from "./abstract/IUserRepo";
import { IUser } from "../models/abstract/IUser";
import { IUserModel, createModel } from "../models/UserModel";

export class UserRepo implements IUserRepo {
  private UserModel: mongoose.Model<IUserModel>;

  constructor() {
    this.UserModel = createModel();
  }

  public async add(user: IUser): Promise<IUser> {
    const newUser = new this.UserModel(user);
    await newUser.save();
    return newUser.toObject();
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await this.UserModel.findOne({ email });
    if (user === null) {
      throw new Error("User doesn't Exist");
    }
    return user.toObject();
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.UserModel.find();
    return users;
  }
}
