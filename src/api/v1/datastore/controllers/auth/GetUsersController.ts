import BaseController from "../../../BaseController";
import { IUserRepo } from "../../repos/abstract/IUserRepo";

export class GetUsersController extends BaseController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    super();
    this.userRepo = userRepo;
  }
  protected async executeImpl(): Promise<any> {
    const users = await this.userRepo.getAll();

    return this.ok(users);
  }
}
