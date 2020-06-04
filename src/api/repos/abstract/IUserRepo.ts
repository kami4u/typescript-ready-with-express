import { IUser } from "../../models/abstract/IUser";

export interface IUserRepo {
  /**
   * Add a new user record
   * @param user Ther user
   */
  add(user: IUser): Promise<IUser>;

  /**
   * Get all users
   */
  getAll(): Promise<IUser[]>;
}
