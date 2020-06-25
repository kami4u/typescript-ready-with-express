import bcrypt from "bcrypt";
import BaseController from "../BaseController";
import { IUserRepo } from "../../repos/abstract/IUserRepo";
import { JsonWebTokenService } from "../../services/JsonWebTokenService";

export class AddUserController extends BaseController {
  private userRepo: IUserRepo;
  private jsonWebTokenService: JsonWebTokenService;

  constructor(userRepo: IUserRepo, jsonWebTokenService: JsonWebTokenService) {
    super();
    this.userRepo = userRepo;
    this.jsonWebTokenService = jsonWebTokenService;
  }
  protected async executeImpl(): Promise<any> {
    const { email, password } = this.req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await this.userRepo.add({ email, password: hash });
    const token = this.jsonWebTokenService.createToken(user, "1 day");
    return this.ok({ token });
  }
}
