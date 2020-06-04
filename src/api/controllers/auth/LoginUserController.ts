import bcrypt from "bcrypt";
import BaseController from "../BaseController";
import { IUserRepo } from "../../repos/abstract/IUserRepo";
import { JsonWebTokenService } from "../../services/JsonWebTokenService";

export class LoginUserController extends BaseController {
  private userRepo: IUserRepo;
  private jsonWebTokenService: JsonWebTokenService;

  constructor(userRepo: IUserRepo, jsonWebTokenService: JsonWebTokenService) {
    super();
    this.userRepo = userRepo;
    this.jsonWebTokenService = jsonWebTokenService;
  }
  protected async executeImpl(): Promise<any> {
    const { email, password } = this.req.body;

    if (!email || !password) {
      return this.badRequest();
    }

    try {
      const user = await this.userRepo.getByEmail(email);
      if (await bcrypt.compare(password, user.password)) {
        const token = this.jsonWebTokenService.createToken(user, "1 day");
        return this.ok({ token });
      }
      return this.unauthorized();
    } catch (error) {
      return this.error(error);
    }
  }
}
