import bcrypt from "bcrypt";
import BaseController from "../BaseController";
import { IUserRepo } from "../../repos/abstract/IUserRepo";
import { JsonWebTokenService } from "../../services/JsonWebTokenService";

export class AddUserController extends BaseController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    super();
    this.userRepo = userRepo;
  }
  protected async executeImpl(): Promise<any> {
    const { email, password } = this.req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userRepo.add({ email, password: hash });
    return this.ok();
  }
}
