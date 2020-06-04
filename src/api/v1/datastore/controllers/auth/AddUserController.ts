import BaseController from "../../../BaseController";
import { IUserRepo } from "../../repos/abstract/IUserRepo";

export class AddUserController extends BaseController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    super();
    this.userRepo = userRepo;
  }
  protected async executeImpl(): Promise<any> {
    const { email, password } = this.req.body;

    const newUser = await this.userRepo.add({ email, password });

    return this.ok(newUser);
  }
}
