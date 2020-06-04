import { Router, Response, Request, NextFunction } from "express";
import { AddUserController } from "../controllers/auth/AddUserController";
import { asyncRoute } from "../utils/async";
import { UserRepo } from "../repos/UserRepo";
import { GetUsersController } from "../controllers/auth/GetUsersController";
import { JsonWebTokenService } from "../services/JsonWebTokenService";
import { LoginUserController } from "../controllers/auth/LoginUserController";
const router = Router();

router.post(
  "/signup",
  asyncRoute(async (req: Request, res: Response, next: NextFunction) => new AddUserController(new UserRepo()).execute(req, res, next))
);

router.post(
  "/login",
  asyncRoute(async (req: Request, res: Response, next: NextFunction) =>
    new LoginUserController(new UserRepo(), new JsonWebTokenService()).execute(req, res, next)
  )
);

router.get(
  "/",
  asyncRoute(async (req: Request, res: Response, next: NextFunction) => new GetUsersController(new UserRepo()).execute(req, res, next))
);

export default router;
