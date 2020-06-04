import jwt from "jsonwebtoken";

export class JsonWebTokenService {
  public static TOKEN_SECRET = process.env.TOKEN_SECRET || "TOP_SECRET";

  public createToken(userData: any, expiresIn?: string | number) {
    const options: any = {};

    if (expiresIn !== undefined) {
      options.expiresIn = expiresIn;
    }

    return jwt.sign(userData, JsonWebTokenService.TOKEN_SECRET, options);
  }
}
